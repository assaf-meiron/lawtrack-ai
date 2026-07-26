"""The scanner — Phase 2's front end, as far as it exists today.

[`docs/lawtrack-ai/agent-plan.md`](../../../docs/lawtrack-ai/agent-plan.md) sequences the product in two
phases: Phase 1 digests one uploaded PDF (built, and the whole of the review surface), Phase 2 *finds*
the documents and fans the digest out across affected layers. This router exposes Phase 2's shape so
it can be seen and demonstrated while the real detection is still ahead:

* **Real.** The watch list, and what a discovered document turns into — every document surfaced here is
  an ordinary row with real cited findings, reviewed through the same Phase-1 queue as an upload. The
  "affected layers" fan-out is a live query over the four-layer tree, not a number someone typed.
* **Not real yet.** Detection itself. `POST /scan` surfaces the next entry from a prepared pool
  (`seed_extra.SCAN_POOL`) instead of fetching a gazette, and per-source "last checked" times are
  derived from the pool cadence. Nothing here reaches the network.

Kept deliberately separate from the document routers so that when detection lands, this is the only
file that changes.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Classification, Document, DocStatus, Finding, PayPolicy, ReviewStatus, User
from ..security import get_current_user
from ..seed_extra import AGENT_SOURCE_PREFIX, SCAN_POOL, insert_document

router = APIRouter(prefix="/api/agent", tags=["agent"])

FOUND_WINDOW_HOURS = 48


# The per-jurisdiction watch list (agent-plan.md §Phase 2 ①): where renewals and statutory changes are
# published. `every_h` is the intended polling cadence and drives the "last checked" the UI shows.
SOURCES = [
    {"key": "br-mediador", "name": "Sistema Mediador (MTE)", "jurisdiction": "BR",
     "kind": "CCT / ACT registry", "every_h": 6},
    {"key": "br-dou", "name": "Diário Oficial da União", "jurisdiction": "BR",
     "kind": "Statute & reform gazette", "every_h": 6},
    {"key": "br-doesp", "name": "Diário Oficial do Estado de SP", "jurisdiction": "BR-SP",
     "kind": "State gazette", "every_h": 12},
    {"key": "us-fedreg", "name": "Federal Register", "jurisdiction": "US",
     "kind": "Federal rulemaking", "every_h": 12},
    {"key": "us-ca-leg", "name": "California Legislative Counsel", "jurisdiction": "US-CA",
     "kind": "State legislature", "every_h": 24},
    {"key": "us-ny-reg", "name": "New York State Register", "jurisdiction": "US-NY",
     "kind": "State register", "every_h": 24},
    {"key": "ca-on-elaws", "name": "Ontario e-Laws", "jurisdiction": "CA-ON",
     "kind": "Provincial statute", "every_h": 24},
    {"key": "ca-qc-pub", "name": "Publications Québec", "jurisdiction": "CA-QC",
     "kind": "Provincial statute", "every_h": 24},
    {"key": "fr-legifrance", "name": "Légifrance (JORF)", "jurisdiction": "FR",
     "kind": "Statute & CCN registry", "every_h": 12},
    {"key": "de-verdi", "name": "ver.di Tarifarchiv", "jurisdiction": "DE",
     "kind": "Tarifvertrag archive", "every_h": 24},
    {"key": "de-nrw-landtag", "name": "Landtag NRW", "jurisdiction": "DE-NRW",
     "kind": "State legislature", "every_h": 24},
    {"key": "au-fwc", "name": "Fair Work Commission", "jurisdiction": "AU",
     "kind": "Award determinations", "every_h": 12},
    {"key": "au-nsw-leg", "name": "NSW Legislation", "jurisdiction": "AU-NSW",
     "kind": "State statute", "every_h": 24},
    {"key": "in-ka-gaz", "name": "Karnataka Gazette", "jurisdiction": "IN-KA",
     "kind": "State gazette", "every_h": 24},
    {"key": "mx-dof", "name": "Diario Oficial de la Federación", "jurisdiction": "MX",
     "kind": "Statute & reform gazette", "every_h": 12},
]

# The triage step (agent-plan.md §Phase 2 ②) is what keeps volume off the expensive path: most of what
# a gazette publishes doesn't touch time & pay at all. These are the counts a scan run reports.
TRIAGE_NOISE_PER_SOURCE = 4


def _country(jurisdiction: str | None) -> str:
    return (jurisdiction or "").split("-")[0].upper()


def _as_utc(dt: datetime | None) -> datetime | None:
    """Timestamps as tz-aware UTC.

    Postgres hands back aware datetimes and SQLite naive ones, so anything comparing or serializing a
    stored timestamp has to normalize first — otherwise the 48-hour window raises on SQLite, and the
    UI reads a naive timestamp as local time and shows the wrong "found N hours ago".
    """
    if dt is None:
        return None
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def _agent_found(db: Session) -> list[Document]:
    """Documents the scanner surfaced, newest first (see `AGENT_SOURCE_PREFIX`)."""
    return (
        db.query(Document)
        .filter(Document.source.like(f"{AGENT_SOURCE_PREFIX}%"))
        .order_by(Document.created_at.desc())
        .all()
    )


def _affected_layers(db: Session, doc: Document) -> int:
    """How many tracked layers a change to this document reaches — the fan-out of agent-plan.md §④.

    A country-level document reaches every layer in that country (its statutory floor inherits down);
    a state document reaches that state's layers plus the CBAs sitting under them; a collective
    agreement reaches the layers that share its instrument. A real query over the layer tree, which is
    the answer no generic legal-alert service can give.
    """
    country = _country(doc.jurisdiction)
    if not country:
        return 0
    same_country = [p for p in db.query(PayPolicy).all() if _country(p.jurisdiction) == country]
    if "-" in (doc.jurisdiction or ""):  # a state/province document
        region = (doc.jurisdiction or "").upper()
        return sum(1 for p in same_country if (p.jurisdiction or "").upper() == region
                   or (p.layer_type.value if hasattr(p.layer_type, "value") else p.layer_type) == "cba")
    return len(same_country)


def _doc_brief(db: Session, doc: Document) -> dict:
    findings = doc.findings or []
    return {
        "id": str(doc.id),
        "title": doc.title,
        "subtitle": doc.subtitle,
        "jurisdiction": doc.jurisdiction,
        "doc_type": doc.doc_type.value if hasattr(doc.doc_type, "value") else doc.doc_type,
        "source": (doc.source or "").removeprefix(AGENT_SOURCE_PREFIX),
        "found_at": _as_utc(doc.created_at),
        "status": doc.status.value if hasattr(doc.status, "value") else doc.status,
        "layer": doc.policy.name if doc.policy else None,
        "findings": len(findings),
        "needs_action": sum(1 for f in findings if f.classification != Classification.match),
        "conflicts": sum(1 for f in findings if f.classification == Classification.conflict),
        "undecided": sum(1 for f in findings if f.review_status == ReviewStatus.proposed),
        "affected_layers": _affected_layers(db, doc),
    }


def _sources_status(now: datetime, found: list[Document]) -> list[dict]:
    """The watch list with a last-checked time per source, and what each one last turned up."""
    latest: dict[str, Document] = {}
    for doc in found:
        name = (doc.source or "").removeprefix(AGENT_SOURCE_PREFIX)
        if name not in latest:
            latest[name] = doc

    out = []
    for s in SOURCES:
        hit = latest.get(s["name"])
        out.append({
            **{k: s[k] for k in ("key", "name", "jurisdiction", "kind")},
            "checked_at": now - timedelta(minutes=(s["every_h"] * 60) // 3),
            "cadence_hours": s["every_h"],
            "last_find_at": _as_utc(hit.created_at) if hit else None,
            "last_find_title": hit.title if hit else None,
        })
    return out


@router.get("/status")
def agent_status(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    """What the scanner has been doing: the watch list, recent finds, and the review backlog they created."""
    now = datetime.now(timezone.utc)
    found = _agent_found(db)
    cutoff = now - timedelta(hours=FOUND_WINDOW_HOURS)
    recent = [d for d in found if (_as_utc(d.created_at) or now) >= cutoff]

    feed = [_doc_brief(db, d) for d in found[:14]]
    return {
        "sources": _sources_status(now, found),
        "source_count": len(SOURCES),
        "jurisdictions": sorted({_country(s["jurisdiction"]) for s in SOURCES}),
        "found_window_hours": FOUND_WINDOW_HOURS,
        "found_in_window": len(recent),
        "found_total": len(found),
        # ⑥ internal legal review: what the finds are waiting on from a human
        "awaiting_review": sum(
            1 for d in found if d.status in (DocStatus.analyzed, DocStatus.new, DocStatus.in_review)
        ),
        "conflicts_open": db.query(Finding)
            .join(Document)
            .filter(Document.source.like(f"{AGENT_SOURCE_PREFIX}%"))
            .filter(Finding.classification == Classification.conflict)
            .filter(Finding.review_status == ReviewStatus.proposed)
            .count(),
        "candidates_triaged": (len(found) + len(SOURCES) * TRIAGE_NOISE_PER_SOURCE),
        "last_scan_at": _as_utc(found[0].created_at) if found else None,
        "pool_remaining": _pool_remaining(db),
        "feed": feed,
    }


def _pool_remaining(db: Session) -> int:
    existing = {t for (t,) in db.query(Document.title).all()}
    return sum(1 for m in SCAN_POOL if m["title"] not in existing)


@router.post("/scan")
def run_scan(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    """Run one scan cycle: report what was checked and triaged, and surface the next find.

    Detection is the simulated part — the document comes from the prepared pool rather than a gazette
    (see this module's docstring). Everything the find then carries is real: cited findings, the layer
    it lands on, and the fan-out count.
    """
    now = datetime.now(timezone.utc)
    existing = {t for (t,) in db.query(Document.title).all()}
    policies = {p.key: p for p in db.query(PayPolicy).all()}

    pending = [m for m in SCAN_POOL if m["title"] not in existing]
    discovered: list[Document] = []
    if pending:
        meta = pending[0]
        doc = insert_document(db, meta, now, policies.get(meta["policy_key"]))
        db.commit()
        db.refresh(doc)
        discovered.append(doc)

    return {
        "ran_at": now,
        "sources_checked": len(SOURCES),
        "candidates_seen": len(SOURCES) * TRIAGE_NOISE_PER_SOURCE + len(discovered),
        # triage's whole job: everything that doesn't materially change T&A rules stops here
        "triaged_out": len(SOURCES) * TRIAGE_NOISE_PER_SOURCE,
        "discovered": [_doc_brief(db, d) for d in discovered],
        "renewal_of": [m for m in ([pending[0].get("renewal_of")] if pending else []) if m],
        "pool_remaining": _pool_remaining(db),
        "message": (
            f"{len(discovered)} new document digested"
            if discovered
            else "No new documents at the monitored sources."
        ),
    }
