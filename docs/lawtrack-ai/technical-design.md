# LawTrack AI — Technical Design (Claude API, production)

> How LawTrack is built as a **production product on the Claude API**. Companion to the [spec](spec.md)
> (the *what*) and the [agent plan](agent-plan.md) (the *workflow*); this is the *how*.
>
> **Status: design draft, 2026-07-15.** API facts (model IDs, pricing, PDF/citation/caching/Batch
> behavior) are current as of the Claude API reference loaded this session. Code is Python (the default
> for a document/ML pipeline; the SDK surface is identical in TypeScript). Re-verify model IDs/pricing
> against the Models API before committing budget.

## Design tenets

1. **The model reads and phrases; it never invents a number the reviewer can't trace.** Every finding
   carries the **verbatim source clause + page**. This is the trust contract (spec §4).
2. **Human-in-the-loop, always.** The API produces a *cited draft*; a human Accepts/Edits/Rejects. No
   auto-apply. (Liability feature, not a limitation.)
3. **Precision over recall.** False positives kill the feature — prompt and threshold for precision;
   sweep uncertain findings into a review digest, don't fire them as confident cards.
4. **Deterministic where possible.** "Which tenants are affected" is a DB query over the 4-layer
   inheritance, *not* a model call. The model does extraction, classification, and drafting — nothing
   that has a deterministic answer.

## Models & pricing (plan against these)

Default to **Opus 4.8** for the reasoning-heavy stages (mapping/drafting) — a wrong pay rule is
radioactive, so correctness beats cost there. Use cheaper tiers as explicit levers on the
high-volume/low-judgment stages.

| Model | ID | Input / Output ($/1M) | Context | Use in LawTrack |
|---|---|---|---|---|
| **Opus 4.8** | `claude-opus-4-8` | $5 / $25 | 1M | **Default** — mapping to taxonomy + config drafting (③④); ambiguous extraction |
| **Sonnet 5** | `claude-sonnet-5` | $3 / $15 ($2/$10 intro through 2026‑08‑31) | 1M | Volume lever — bulk clause extraction (②) at scale |
| **Haiku 4.5** | `claude-haiku-4-5` | $1 / $5 | 200K | Cheap triage — "is this a labor agreement / did T&A materially change?" (monitor ② triage) |

Thinking: **adaptive** (`thinking={"type":"adaptive"}`) everywhere; **effort `high`/`xhigh`** on the
mapping stage (hardest judgment), `low`/`medium` on extraction and triage. Batch API is **50% off** all
of the above and is how the monitor and portfolio runs stay affordable.

## The pipeline on the API

### ① Ingest — Files API, upload once, reuse many times

A single CBA gets many model calls (per-clause-family extraction, mapping, re-runs during review).
Upload the PDF **once** via the Files API and reference it by `file_id` — never re-send base64 per call.

- Files API: beta header `files-api-2025-04-14`; up to **500 MB**; persists until deleted.
- Inline base64 alternative (no Files API): **32 MB / 600 pages** per request (100 pages on 200K models).
- The model reads PDFs **natively** (text + visual), so native-text CCTs need no pre-OCR. Scanned/image
  CCTs are the open question (spec §11) — budget a pre-OCR stage if the real pipeline has many.

```python
f = client.beta.files.upload(
    file=("cct.pdf", open("cct.pdf", "rb"), "application/pdf"),
    betas=["files-api-2025-04-14"],
)  # reference f.id as {"type":"document","source":{"type":"file","file_id":f.id}}
```

### ② Extract findings — with provenance (the key design decision)

We need two things at once: **structured findings** (to drive change cards) **and page-anchored
citations** (the trust contract). The API has a hard constraint here:

> **Citations (`citations:{enabled:true}`) are incompatible with structured JSON output
> (`output_config.format`) — the combination returns a 400.**

**Resolution — use strict *tool use* for structure, with a verbatim `source_quote` field**, and enable
citations on the document for page anchors. Strict tool use (`strict:true`) is a separate mechanism from
`output_config.format`, so it composes with the document; the model emits one `record_finding` tool call
per finding, and the `source_quote` it must fill verbatim is what the review UI locates and highlights in
the rendered PDF. (Whether citations + strict tools co-fire cleanly on real CCTs is spec §11 Q2 — the
fallback is a **two-pass** design: a citations-enabled text pass for page anchors, then a structuring
pass. Verify on the golden set before locking.)

```python
RECORD_FINDING = {
    "name": "record_finding",
    "description": "Record one T&A/pay rule found in the agreement.",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "clause_family": {"type": "string", "enum": ["overtime","hours_bank","sunday_holiday",
                              "night","tolerance","on_call","breaks_rest","shift_scale","absence"]},
            "source_quote": {"type": "string", "description": "Verbatim clause text, in the source language."},
            "page": {"type": "integer"},
            "rule_summary": {"type": "string"},
        },
        "required": ["clause_family","source_quote","page","rule_summary"],
        "additionalProperties": False,
    },
}
# messages: [{document block (citations enabled), "Extract every T&A/pay rule; call record_finding once per rule."}]
```

Extraction is near-commodity — Sonnet 5 is the volume choice; escalate ambiguous drafts to Opus 4.8.

### ③ Map to the taxonomy — the product (Opus 4.8, high effort)

Give the model the **fixed context** (prompt-cached, below): the 17-capability taxonomy, the pay-policy
config schema (6 tabs), and the tenant's current policy + statutory baseline. For each extracted finding
it returns a `Finding` (spec §4): `classification` (Match/Adjust/Gap/Conflict), `policy_target`
(tab+field), `current → proposed`, `rationale`, `confidence`, `confidence_basis`. This is where
correctness matters most — **Opus 4.8, adaptive thinking, effort `high`/`xhigh`**. Validate the output
with `messages.parse()` against a Pydantic model so malformed findings never reach the UI.

### ④ Draft the change cards

Assemble the reviewed diff: each finding → a change card with current → proposed and confidence-with-cause.
Deterministic assembly from ③'s validated output; no extra model call unless drafting prose rationale.

### Prompt caching — cache the taxonomy + schema (big win)

The stable prefix — extraction/mapping instructions + the 17-capability taxonomy + the pay-policy config
schema — is large and identical across every clause, every tenant, every run. Cache it: `cache_control:
{"type":"ephemeral"}` on the last system block. Min cacheable prefix on Opus 4.8 is **4096 tokens** (the
taxonomy + schema clear that easily). Use `ttl:"1h"` for a long review session. When one CBA is analyzed
across many calls, cache the **document** too. Verify hits via `usage.cache_read_input_tokens`.

```python
system=[{"type":"text","text": TAXONOMY_AND_SCHEMA, "cache_control":{"type":"ephemeral","ttl":"1h"}}]
```

### Batch API — the portfolio + monitor fan-out

The Batch API (50% cost, up to 100K requests, ~1h typical) is how two things stay affordable:

- **Onboarding / pre-sales:** run a prospect's whole portfolio (Boticário = **72 instruments**) in one
  batch — the same-day support-matrix that closes deals (pain P8).
- **Monitor fan-out (Phase 2):** when a CCT/statute changes, diff it against **every affected tenant's
  policy** in one batch (tenants enumerated deterministically via 4-layer inheritance).

Batch requests share the same prompt-cached prefix, compounding the saving. Results key by `custom_id`
(arrive unordered) — never by position.

## Eval harness — the 72-instrument golden set (nearly free)

The Boticário run (`brazil-cct-support-matrix.md`) is a **ready-made golden set**: 72 instruments already
classified across 17 capabilities by experts. Wire it as a regression harness — every prompt/model change
runs against it and reports clause-level extraction recall + mapping precision + confusion by
classification. This is the rare luxury the deep-dive flags: eval is ~free, and it de-risks "can we read
the documents that actually arrive?" for Brazil before a single design partner.

## Production concerns

- **Confidence + cause on every finding** (spec §4) — surfaced from the model's own signal (explicit
  clause vs inferred field vs ambiguous wording vs shaky extraction). Low-confidence → flag to source,
  don't present as a confident card.
- **Audit trail** — every finding cites its clause; every Accept/Edit/Reject is recorded (= the pay-policy
  template change log). This is both the trust surface and the compliance artifact.
- **Refusals / errors** — guard `stop_reason` before reading content; validate structured output; a
  malformed `record_finding` is dropped to a "needs manual read" queue, never silently.
- **Determinism boundary** — the model never decides "which tenants" or "what the current value is"
  (that's read from config); it classifies and drafts only.
- **Do not over-trust extraction** — position the whole output as a *cited draft for expert review*.

## Build order (maps to the agent plan)

1. **Phase 1 digest loop** — Files ingest → tool-use extraction w/ citations → Opus-4.8 mapping (cached
   prefix) → validated change cards → review surface. Prove it on the golden set + a design partner.
2. **Phase 2 monitor** — Haiku triage → reuse the Phase-1 loop → deterministic tenant enumeration → Batch
   fan-out → internal legal-review queue. Gated on Phase 1 + versioned 4-layer templates.

## Reference implementation

A runnable Phase-1 scaffold of this design lives at [`pipeline/`](pipeline/) — the ingest → extract →
map → draft loop as Python modules (findings schema, the 17-capability taxonomy as the cached context,
strict-tool extraction with citations, Opus-4.8 structured-output mapping, change-card assembly, and an
eval scorer against the golden set). It is **structurally complete but unvalidated** — needs an API key
+ a real CCT PDF, and prompt iteration against the golden set. It may graduate to a dedicated engine repo.

> Open API-design items live in spec §11 (citations×tools verification; scanned-PDF OCR bar). Resolve Q2
> against the golden set before locking the extraction path.
