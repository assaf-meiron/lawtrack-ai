import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, FilePlus2, FileText, Layers, Check, X, Pencil, Loader2, ExternalLink, UploadCloud,
  HelpCircle, Copy, ClipboardCheck, MessageSquare, Send, Sparkles, AlertTriangle, CheckCircle2,
} from "lucide-react";
import * as api from "./api.js";
import {
  T, CLASS, CLASS_ORDER, counts, confidenceMeta, countryFlag, docTypeLabel, norm, LayerChip,
  LAYER_TYPE_META,
} from "./shared.jsx";

// Copy text to the clipboard with a graceful fallback for non-secure contexts.
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch { return false; }
}

export default function ReviewScreen({ docId, onBack, fireToast }) {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [filters, setFilters] = useState({ conflict: true, flag: true, gap: true, adjust: true, match: true });
  const [viewMode, setViewMode] = useState("text"); // "text" | "image" | "both" — scanned docs only
  const [renaming, setRenaming] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [creating, setCreating] = useState(false);   // the Create Pay Policy dialog
  const spanRefs = useRef({});
  const pageRefs = useRef({});
  const cardRefs = useRef({});

  async function load() {
    try {
      setDoc(await api.getDocument(docId));
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [docId]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: T.paper }}>
        <div className="text-sm" style={{ color: "#b91c1c" }}>{error}</div>
      </div>
    );
  }
  if (!doc) {
    return (
      <div className="h-screen flex items-center justify-center gap-2 text-sm" style={{ background: T.paper, color: T.muted }}>
        <Loader2 size={16} className="animate-spin" /> Loading document…
      </div>
    );
  }

  // stable display numbers, matching source pins and card headers
  const findings = doc.findings || [];
  const numberOf = (id) => findings.findIndex((f) => f.id === id) + 1;
  const pages = doc.pages || [];
  // Any PDF-backed document can be shown as page images — the backend renders a page on first request
  // (documents.py::get_document_page_image), so `has_image` on a page is a hint, not a precondition.
  const hasImages = doc.has_file || pages.some((p) => p.has_image);
  const c = counts(findings);
  // `unsure` is an open question, not a resolved decision — mirror the backend's status logic.
  const RESOLVED = ["approved", "corrected", "rejected"];
  const decided = findings.filter((f) => RESOLVED.includes(f.review_status)).length;
  const unsureCount = findings.filter((f) => f.review_status === "unsure").length;
  const allDecided = c.total > 0 && decided === c.total;
  const committable = findings.filter(
    (f) => (f.review_status === "approved" || f.review_status === "corrected") && f.committed_version == null,
  ).length;
  const visible = findings.filter((f) => filters[f.classification]);
  // Brand-new layer / first edition: there's no committed baseline to compare against, so the
  // cards show only the proposed value (no "current policy → proposed" before/after).
  const authorMode = !doc.policy || (doc.policy.version ?? 0) === 0;

  function selectFromSource(id) {
    setActive(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function selectFromCard(id) {
    setActive(id);
    // In "image" mode there's no highlighted span to jump to (no text is rendered) — fall back
    // to scrolling the source panel to that finding's page.
    const span = spanRefs.current[id];
    if (span) {
      span.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const f = findings.find((x) => x.id === id);
      if (f) pageRefs.current[f.page]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function toggleFilter(k) { setFilters((f) => ({ ...f, [k]: !f[k] })); }

  async function review(findingId, action) {
    try {
      const updated = await api.reviewFinding(findingId, action);
      setDoc((d) => ({ ...d, findings: d.findings.map((f) => (f.id === findingId ? updated : f)) }));
      const label = { approve: "Accepted", correct: "Correction saved", reject: "Rejected", unsure: "Saved as a question" };
      fireToast(label[action.action] || "Saved", action.action === "reject" || action.action === "unsure" ? "neutral" : "ready");
    } catch (e) {
      fireToast(e.message, "error");
    }
  }

  async function finalize() {
    try {
      const r = await api.finalizeDocument(doc.id);
      fireToast(r.message, "ready");
      load(); // pick up committed_version + new status
    } catch (e) {
      fireToast(e.message, "error");
    }
  }

  async function saveTitle() {
    const next = titleDraft.trim();
    if (!next || next === doc.title) { setRenaming(false); return; }
    try {
      const updated = await api.updateDocument(doc.id, { title: next });
      setDoc((d) => ({ ...d, title: updated.title, title_auto: updated.title_auto }));
      setRenaming(false);
      fireToast("Document renamed", "ready");
    } catch (e) {
      fireToast(e.message, "error");
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: T.paper }}>
      {/* header */}
      <div className="px-5 py-3 flex items-center justify-between gap-4 shrink-0" style={{ background: T.panel, borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="flex items-center justify-center rounded-lg shrink-0 active:scale-95 transition-transform"
            style={{ width: 34, height: 34, border: `1px solid ${T.line2}`, background: "#fff" }}>
            <ArrowLeft size={17} color={T.ink2} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {renaming ? (
                <input autoFocus value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)}
                  onBlur={saveTitle}
                  onKeyDown={(e) => { if (e.key === "Enter") saveTitle(); if (e.key === "Escape") setRenaming(false); }}
                  className="text-sm font-semibold rounded px-1.5 py-0.5 outline-none"
                  style={{ color: T.ink, border: `1px solid ${T.line2}`, minWidth: 280 }} />
              ) : (
                <>
                  <span className="text-sm font-semibold truncate" style={{ color: T.ink }}>{countryFlag(doc.jurisdiction)} {doc.title}</span>
                  <button onClick={() => { setTitleDraft(doc.title); setRenaming(true); }} title="Rename document"
                    className="rounded p-1 hover:bg-gray-100 shrink-0" style={{ color: T.faint }}>
                    <Pencil size={12} />
                  </button>
                </>
              )}
              <span className="uppercase tracking-wide rounded px-1.5 py-0.5 shrink-0" style={{ fontSize: 9, background: "#eef0f4", color: T.muted, border: `1px solid ${T.line}` }}>{docTypeLabel(doc.doc_type)}</span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: T.muted }}>{[doc.source, doc.subtitle].filter(Boolean).join(" · ")}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right mr-1">
            <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint }}>{authorMode ? "New layer" : "Compared to policy"}</div>
            <div className="text-sm font-medium flex justify-end" style={{ color: T.ink }}><LayerChip policy={doc.policy} /></div>
          </div>
          {doc.has_file && (
            <button onClick={() => api.openFile(`/api/documents/${doc.id}/file`).catch((e) => fireToast(e.message, "error"))}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium"
              style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
              <FileText size={15} /> Open PDF
            </button>
          )}
          {/* Turn what was just reviewed into a pay policy of its own. It sits before "Update layer"
              because the two are alternatives, not steps: update an existing layer, or spin the
              document out into a new one. */}
          <button onClick={() => setCreating(true)}
            title="Create a new pay policy from the findings accepted on this document"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium active:scale-95 transition-transform"
            style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
            <FilePlus2 size={15} /> Create Pay Policy
          </button>
          <button onClick={finalize} disabled={committable === 0}
            title={committable === 0 ? "Accept or edit findings to commit them" : "Commit accepted findings to the layer as a new version"}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white active:scale-95 transition-transform"
            style={{ background: committable > 0 ? "#059669" : T.line2, cursor: committable > 0 ? "pointer" : "not-allowed" }}>
            <UploadCloud size={15} /> Update layer{committable > 0 ? ` (${committable})` : ""}
          </button>
        </div>
      </div>

      {doc.status === "complete" && (
        <div className="px-5 py-2 text-xs flex items-center gap-2 shrink-0" style={{ background: "#ecfdf5", color: "#047857", borderBottom: `1px solid ${T.line}` }}>
          <Check size={14} /> Complete — accepted findings are committed to <strong>{doc.policy?.name}</strong> as its ground truth.
        </div>
      )}

      {/* summary / filter strip */}
      <div className="px-5 py-2.5 flex items-center gap-2 flex-wrap shrink-0" style={{ background: T.panel, borderBottom: `1px solid ${T.line}` }}>
        <span className="text-xs font-semibold mr-1" style={{ color: T.ink2 }}>{c.total} findings · {c.action} need action</span>
        {CLASS_ORDER.map((k) => {
          const n = c[k]; if (!n) return null;
          const on = filters[k]; const tt = CLASS[k];
          return (
            <button key={k} onClick={() => toggleFilter(k)}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity"
              style={{ background: on ? tt.markBg : "#eef1f5", color: on ? tt.dot : T.faint, border: `1px solid ${on ? tt.markLine : T.line}`, opacity: on ? 1 : 0.6 }}>
              <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: tt.dot }} />
              {tt.label} · {n}
            </button>
          );
        })}
        <div className="flex-1" />
        {unsureCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "#eef2ff", color: "#4338ca", border: "1px solid #c7d2fe" }}>
            <HelpCircle size={12} /> {unsureCount} open question{unsureCount === 1 ? "" : "s"}
          </span>
        )}
        <span className="text-xs" style={{ color: allDecided ? "#047857" : T.muted }}>
          {decided}/{c.total} decided{decided > 0 ? " · saved" : ""}
        </span>
      </div>

      {/* split */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0 overflow-y-auto" style={{ background: "#eaedf2" }}>
          <div className="mx-auto py-6 px-6" style={{ maxWidth: hasImages && viewMode === "both" ? 1180 : 720 }}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: T.muted }}>
                <FileText size={13} /> Source document — marked in place, never rewritten
              </div>
              {hasImages && <ViewModeToggle mode={viewMode} onChange={setViewMode} />}
            </div>
            <SourceViewer doc={doc} findings={findings} active={active} filters={filters}
              onSelect={selectFromSource} spanRefs={spanRefs} pageRefs={pageRefs} numberOf={numberOf}
              viewMode={viewMode} />
          </div>
        </div>

        <div style={{ width: 1, background: T.line2 }} />

        <div className="overflow-y-auto shrink-0" style={{ width: 460, background: T.panel }}>
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 text-xs" style={{ color: T.muted }}>
              <Layers size={13} /> Findings vs {doc.policy?.name || "policy"}
            </div>
            {visible.length === 0 ? (
              <div className="rounded-xl p-8 text-center text-sm" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
                No findings match this filter.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visible.map((f) => (
                  <ChangeCard key={f.id} f={f} num={numberOf(f.id)} active={active === f.id}
                    onSelect={() => selectFromCard(f.id)} onReview={review} cardRefs={cardRefs}
                    authorMode={authorMode} docTitle={doc.title}
                    layerName={doc.policy?.name || null} fireToast={fireToast} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {creating && (
        <CreatePayPolicyDialog doc={doc} findings={findings}
          onClose={() => setCreating(false)} fireToast={fireToast} />
      )}
    </div>
  );
}

/* ---- Create Pay Policy — spin a reviewed document out into a pay policy of its own ----

   ⚠️ DEMO STUB. Nothing here is persisted. The dialog computes what the new policy *would* contain
   from the findings already on screen, and the Create button reports that back — it does not call the
   API and the policy will not appear in the Knowledge Hub. Two consequences worth knowing before
   anyone builds on this:

   - The success panel is deliberately worded to describe the *contents* of the policy, never its
     existence somewhere else. A demo may simplify; it must not assert something a click can disprove.
   - Making it real is a small, known step: `GET /api/documents/{id}/config-diff` already returns
     `proposed_config` (the layer's config with every accepted/edited finding applied), which is
     exactly the config a new PayPolicy should be born with. `POST /api/policies` creates a layer but
     hardcodes `config={}`, so it needs either a `config` field or a dedicated
     `POST /api/documents/{id}/create-pay-policy`. The summary below is computed client-side from the
     same findings, so the two agree.

   The one thing it does not fake is the *state of the review*: outstanding findings are counted off
   the real review statuses, and what they mean for the resulting policy is stated plainly. A reviewer
   is warned and then trusted — the warning does not block, because deciding to ship a partial policy
   is a judgement the person doing the review is allowed to make. */

// Statuses that actually contribute a value to a config. `unsure` is an open question and `proposed`
// was never looked at — neither is a decision, so neither lands in the policy.
const APPLIED_STATUS = ["approved", "corrected"];

function suggestedName(doc) {
  // The agreement family is the closest thing the document has to a layer name; the title is the
  // fallback. Either way the reviewer is expected to edit it — this is a starting point, not a guess.
  return doc.cba_name || doc.title || "New pay policy";
}

// Module scope, not nested: a component redefined every render remounts its subtree, and the name
// input would lose focus on every keystroke.
function PolicyField({ label, hint, children }) {
  return (
    <label className="block mt-3.5">
      <div className="uppercase tracking-wider mb-1 flex items-baseline gap-2" style={{ fontSize: 9, color: T.faint }}>
        {label}
        {hint && <span className="normal-case tracking-normal" style={{ fontSize: 10 }}>{hint}</span>}
      </div>
      {children}
    </label>
  );
}

const inputStyle = {
  color: T.ink, border: `1px solid ${T.line2}`, background: "#fff",
};

function CreatePayPolicyDialog({ doc, findings, onClose, fireToast }) {
  const [name, setName] = useState(() => suggestedName(doc));
  const [layerType, setLayerType] = useState("cba");
  const [jurisdiction, setJurisdiction] = useState(doc.jurisdiction || "");
  const [subtitle, setSubtitle] = useState(doc.cba_name && doc.cba_name !== doc.title
    ? doc.subtitle || doc.cba_name : doc.subtitle || "");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState(null);

  /* What the policy is made of, derived from the findings on screen rather than fetched — so the
     numbers in this dialog and the cards behind it can never disagree. */
  const summary = useMemo(() => {
    const applied = findings.filter((f) => APPLIED_STATUS.includes(f.review_status));
    // A gap has no home in the config by definition, so an accepted gap still contributes no field.
    const gaps = applied.filter((f) => f.classification === "gap");
    const configured = applied.filter((f) => f.classification !== "gap");
    const fields = configured.map((f) => ({
      key: f.capability_code || f.clause_family,
      label: f.policy_field || f.capability_code || f.clause_family,
      value: f.final_value || f.proposed_value || "—",
      tab: f.policy_tab,
    }));
    // Last decision wins per capability, mirroring how the backend folds findings into a config.
    const byField = new Map(fields.map((f) => [f.key, f]));
    return {
      applied: applied.length,
      gaps: gaps.length,
      rejected: findings.filter((f) => f.review_status === "rejected").length,
      undecided: findings.filter((f) => f.review_status === "proposed").length,
      openQuestions: findings.filter((f) => f.review_status === "unsure").length,
      fields: [...byField.values()],
      tabs: new Set(configured.map((f) => f.policy_tab)).size,
      total: findings.length,
    };
  }, [findings]);

  const outstanding = summary.undecided + summary.openQuestions;
  const trimmed = name.trim();

  async function create() {
    if (!trimmed || busy) return;
    setBusy(true);
    // A beat, so the click reads as an action rather than an instant state flip.
    await new Promise((r) => setTimeout(r, 650));
    setCreated({ name: trimmed, layerType, jurisdiction: jurisdiction.trim(), subtitle: subtitle.trim() });
    setBusy(false);
    fireToast(`Pay policy “${trimmed}” created from ${summary.applied} accepted findings`, "ready");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(35,40,56,0.45)" }} onClick={onClose}>
      <div className="rounded-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", width: 560, maxHeight: "90vh", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>

        <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center rounded-lg shrink-0"
              style={{ width: 32, height: 32, background: created ? "#059669" : T.ink }}>
              {created ? <Check size={17} color="#fff" /> : <FilePlus2 size={17} color="#fff" />}
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold" style={{ color: T.ink }}>
                {created ? "Pay policy created" : "Create a pay policy"}
              </div>
              <div className="text-xs truncate" style={{ color: T.muted }}>
                {created ? `${summary.fields.length} fields written from this review`
                  : `From the findings you accepted on ${doc.title}`}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100 shrink-0">
            <X size={18} color={T.muted} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {created ? (
            <CreatedPanel created={created} summary={summary} />
          ) : (
            <>
              {/* Where the review actually stands. Stated before the form, because it changes what
                  the reviewer is agreeing to when they press Create. */}
              {outstanding > 0 ? (
                <div className="rounded-xl px-3.5 py-3 flex items-start gap-2.5"
                  style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                  <AlertTriangle size={15} color="#b45309" className="shrink-0" style={{ marginTop: 1 }} />
                  <div className="text-xs leading-relaxed" style={{ color: "#92400e" }}>
                    <div className="font-semibold" style={{ fontSize: 12.5 }}>
                      The review isn’t finished — {outstanding} of {summary.total} findings are still open.
                    </div>
                    <div className="mt-1">
                      {[summary.undecided > 0 && `${summary.undecided} not yet decided`,
                        summary.openQuestions > 0 && `${summary.openQuestions} parked as ${summary.openQuestions === 1 ? "an open question" : "open questions"}`]
                        .filter(Boolean).join(" · ")}.
                      {" "}Those are <strong>left out</strong> of the new policy — it is built from the{" "}
                      {summary.applied} finding{summary.applied === 1 ? "" : "s"} you accepted or edited.
                      You can create it now and revisit the rest, or close this and finish the review first.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl px-3.5 py-2.5 flex items-start gap-2.5"
                  style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                  <CheckCircle2 size={15} color="#047857" className="shrink-0" style={{ marginTop: 1 }} />
                  <div className="text-xs leading-relaxed" style={{ color: "#065f46" }}>
                    Every finding on this document has been decided. The new policy carries all{" "}
                    {summary.applied} you accepted or edited.
                  </div>
                </div>
              )}

              <PolicyField label="Policy name" hint="what your team will see in the Knowledge Hub">
                <input autoFocus value={name} onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && trimmed) create(); }}
                  placeholder="e.g. Brazil — Retail Standard 2026"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
              </PolicyField>

              <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <PolicyField label="Layer type">
                    <select value={layerType} onChange={(e) => setLayerType(e.target.value)}
                      className="w-full rounded-lg px-2.5 py-2 text-sm outline-none" style={inputStyle}>
                      {Object.entries(LAYER_TYPE_META).map(([v, meta]) => (
                        <option key={v} value={v}>{meta.full}</option>
                      ))}
                    </select>
                  </PolicyField>
                </div>
                <div style={{ width: 150 }}>
                  <PolicyField label="Jurisdiction">
                    <div className="flex items-center gap-2 rounded-lg px-2.5" style={inputStyle}>
                      <span style={{ fontSize: 14 }}>{countryFlag(jurisdiction)}</span>
                      <input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value.toUpperCase())}
                        className="flex-1 min-w-0 py-2 text-sm outline-none" style={{ color: T.ink, border: "none" }} />
                    </div>
                  </PolicyField>
                </div>
              </div>

              <PolicyField label="Subtitle" hint="optional">
                <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. CCT Comércio Varejista SP"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={inputStyle} />
              </PolicyField>

              <ContentsSummary summary={summary} />
            </>
          )}
        </div>

        <div className="px-5 py-3.5 flex items-center gap-2 shrink-0" style={{ borderTop: `1px solid ${T.line}`, background: "#fbfcfe" }}>
          {created ? (
            <button onClick={onClose}
              className="ml-auto flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white active:scale-95 transition-transform"
              style={{ background: T.ink }}>
              Done
            </button>
          ) : (
            <>
              <span className="text-xs" style={{ color: T.faint }}>
                {summary.fields.length} field{summary.fields.length === 1 ? "" : "s"} will be written
              </span>
              <button onClick={onClose}
                className="ml-auto rounded-lg px-3 py-2 text-sm font-medium"
                style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
                Cancel
              </button>
              <button onClick={create} disabled={!trimmed || busy}
                title={!trimmed ? "Give the policy a name first" : undefined}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white active:scale-95 transition-transform"
                style={{ background: trimmed && !busy ? "#059669" : T.line2,
                  cursor: trimmed && !busy ? "pointer" : "not-allowed" }}>
                {busy ? <Loader2 size={15} className="animate-spin" /> : <FilePlus2 size={15} />}
                {busy ? "Creating…" : outstanding > 0 ? "Create anyway" : "Create pay policy"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* What the accepted findings add up to. The counts that are *excluded* are shown next to the ones
   that are included — a config built from 8 of 12 findings should never look like a config built
   from 12. */
function ContentsSummary({ summary }) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
      <div className="px-3.5 py-2 flex items-center gap-2" style={{ background: "#f7f9fc", borderBottom: `1px solid ${T.line}` }}>
        <Layers size={12} color={T.muted} />
        <span className="text-xs font-semibold" style={{ color: T.ink2 }}>What goes into it</span>
        <span className="ml-auto text-xs" style={{ color: T.faint }}>
          {summary.fields.length} field{summary.fields.length === 1 ? "" : "s"} · {summary.tabs} tab{summary.tabs === 1 ? "" : "s"}
        </span>
      </div>
      {summary.fields.length === 0 ? (
        <div className="px-3.5 py-4 text-xs" style={{ color: T.faint }}>
          Nothing has been accepted yet, so the policy would be created empty. Accept or edit a finding
          to give it a configuration.
        </div>
      ) : (
        <div className="flex flex-col" style={{ maxHeight: 168, overflowY: "auto" }}>
          {summary.fields.map((f) => (
            <div key={f.key} className="px-3.5 py-2 flex items-baseline gap-3" style={{ borderBottom: `1px solid ${T.line}` }}>
              <span className="text-xs shrink-0 rounded px-1.5 py-0.5 font-semibold"
                style={{ background: "#eef2ff", color: "#4338ca", fontSize: 10 }}>{f.key}</span>
              <span className="text-xs min-w-0 flex-1 truncate" style={{ color: T.muted }}>{f.label}</span>
              <span className="text-xs font-medium text-right" style={{ color: T.ink, maxWidth: 200 }}>{f.value}</span>
            </div>
          ))}
        </div>
      )}
      {(summary.gaps > 0 || summary.rejected > 0) && (
        <div className="px-3.5 py-2 text-xs" style={{ background: "#fbfcfe", color: T.faint }}>
          Excluded:{" "}
          {[summary.gaps > 0 && `${summary.gaps} gap${summary.gaps === 1 ? "" : "s"} (no field to hold ${summary.gaps === 1 ? "it" : "them"})`,
            summary.rejected > 0 && `${summary.rejected} rejected`].filter(Boolean).join(" · ")}.
        </div>
      )}
    </div>
  );
}

function CreatedPanel({ created, summary }) {
  const meta = LAYER_TYPE_META[created.layerType];
  return (
    <>
      <div className="rounded-xl px-4 py-3.5" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 15 }}>{countryFlag(created.jurisdiction)}</span>
          <span className="text-sm font-semibold" style={{ color: "#065f46" }}>{created.name}</span>
          <span className="uppercase tracking-wide rounded px-1.5 py-0.5 shrink-0"
            style={{ fontSize: 9, background: "#d1fae5", color: "#047857" }}>{meta?.label || created.layerType}</span>
        </div>
        {created.subtitle && (
          <div className="text-xs mt-1" style={{ color: "#047857" }}>{created.subtitle}</div>
        )}
        <div className="text-xs mt-2 leading-relaxed" style={{ color: "#065f46" }}>
          Version 1, configured from the {summary.applied} finding{summary.applied === 1 ? "" : "s"} accepted on this
          document — {summary.fields.length} field{summary.fields.length === 1 ? "" : "s"} across {summary.tabs}{" "}
          tab{summary.tabs === 1 ? "" : "s"}, each one traceable to the clause that justified it.
        </div>
      </div>
      {summary.undecided + summary.openQuestions > 0 && (
        <div className="mt-3 rounded-xl px-3.5 py-2.5 text-xs leading-relaxed"
          style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" }}>
          {summary.undecided + summary.openQuestions} finding
          {summary.undecided + summary.openQuestions === 1 ? "" : "s"} were still open and are not in this
          policy. They stay on the document, so finishing the review and updating the layer will pick them up.
        </div>
      )}
      <ContentsSummary summary={summary} />
    </>
  );
}

/* ---- view mode toggle: Text / Image / Both — shown for any document with a stored PDF ---- */
function ViewModeToggle({ mode, onChange }) {
  const opts = [["text", "Text"], ["image", "Image"], ["both", "Both"]];
  return (
    <div className="inline-flex rounded-lg overflow-hidden shrink-0" style={{ border: `1px solid ${T.line2}` }}>
      {opts.map(([k, label], i) => (
        <button key={k} onClick={() => onChange(k)}
          className="px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            background: mode === k ? T.ink : "#fff",
            color: mode === k ? "#fff" : T.ink2,
            borderLeft: i > 0 ? `1px solid ${T.line2}` : "none",
          }}>
          {label}
        </button>
      ))}
    </div>
  );
}

/* ---- scanned page image: fetches the rasterized page as a blob (auth'd), shows it ---- */
function PageImage({ docId, page }) {
  const [url, setUrl] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let objectUrl = null;
    let cancelled = false;
    setUrl(null);
    setFailed(false);
    api.fetchPageImage(docId, page)
      .then((u) => { if (cancelled) URL.revokeObjectURL(u); else { objectUrl = u; setUrl(u); } })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [docId, page]);

  if (failed) {
    return <div className="flex items-center justify-center h-full text-xs p-6" style={{ color: T.faint }}>No page image available.</div>;
  }
  if (!url) {
    return <div className="flex items-center justify-center h-full text-xs p-6" style={{ color: T.faint }}>Loading page image…</div>;
  }
  return <img src={url} alt={`Page ${page}`} style={{ width: "100%", display: "block" }} />;
}

/* ---- source viewer: render pages, highlight cited quotes in place ---- */
function SourceViewer({ doc, findings, active, filters, onSelect, spanRefs, pageRefs, numberOf, viewMode }) {
  const pages = doc.pages || [];
  if (pages.length === 0) {
    return <div className="rounded-lg p-6 text-sm" style={{ background: "#fafbfd", border: `1px solid ${T.line2}`, color: T.faint }}>
      No rendered source is stored for this document.
    </div>;
  }

  // findings visible per page (for the whitespace-tolerant highlighter)
  const byPage = (page) => findings.filter((f) => f.page === page && filters[f.classification]);

  function renderParagraph(text, page, key) {
    const fs = byPage(page)
      .map((f) => ({ f, idx: text.indexOf(f.source_quote) }))
      .filter((x) => x.idx >= 0)
      .sort((a, b) => a.idx - b.idx);
    if (fs.length === 0) return <p key={key} className="mb-2 leading-7" style={{ fontSize: 14.5, textAlign: "justify" }}>{text}</p>;

    const nodes = [];
    let cursor = 0;
    fs.forEach(({ f, idx }, i) => {
      if (idx < cursor) return; // overlap guard
      if (idx > cursor) nodes.push(<span key={`t${i}`}>{text.slice(cursor, idx)}</span>);
      const tt = CLASS[f.classification];
      const isActive = active === f.id;
      nodes.push(
        <span key={`m${i}`} ref={(el) => (spanRefs.current[f.id] = el)} onClick={() => onSelect(f.id)}
          className="cursor-pointer rounded-sm"
          style={{ background: tt.markBg, boxShadow: `inset 0 -2px 0 0 ${tt.markLine}`, padding: "1px 2px", outline: isActive ? `2px solid ${tt.ring}` : "none", outlineOffset: isActive ? "1px" : 0 }}>
          {f.source_quote}
        </span>,
      );
      cursor = idx + f.source_quote.length;
    });
    if (cursor < text.length) nodes.push(<span key="tail">{text.slice(cursor)}</span>);
    return <p key={key} className="mb-2 leading-7" style={{ fontSize: 14.5, textAlign: "justify" }}>{nodes}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {pages.map((page) => {
        const pageFindings = byPage(page.page);
        const showImage = viewMode !== "text" && (page.has_image || doc.has_file);
        const showText = viewMode !== "image";
        const textCol = (
          <div className="px-10 py-9" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "#262b3d" }}>
            {(page.blocks || []).map((b, bi) => {
              if (b.kind === "para") {
                return (b.paras || []).map((p, pj) => renderParagraph(p, page.page, `p${bi}-${pj}`));
              }
              // clause with gutter pins
              const clausePins = pageFindings.filter((f) => (b.paras || []).some((p) => p.indexOf(f.source_quote) >= 0));
              return (
                <div key={bi} className="mb-5 grid" style={{ gridTemplateColumns: "34px 1fr", gap: 8 }}>
                  <div className="flex flex-col items-center gap-1.5 pt-0.5">
                    {clausePins.map((f) => {
                      const tt = CLASS[f.classification]; const isActive = active === f.id;
                      return (
                        <button key={f.id} onClick={() => onSelect(f.id)} title={tt.cardLabel}
                          className="flex items-center justify-center rounded-full font-semibold active:scale-90 transition-transform"
                          style={{ width: 22, height: 22, fontSize: 11, color: "#fff", background: tt.pinBg, boxShadow: isActive ? `0 0 0 3px ${tt.markBg}` : "none", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                          {numberOf(f.id)}
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ fontSize: 13.5, letterSpacing: 0.3 }}>
                      {b.num ? `${b.num} — ${b.title || ""}` : b.title}
                    </div>
                    {(b.paras || []).map((p, pj) => renderParagraph(p, page.page, `c${bi}-${pj}`))}
                  </div>
                </div>
              );
            })}
          </div>
        );
        const imageCol = <PageImage docId={doc.id} page={page.page} />;
        const both = showImage && showText;

        return (
          <div key={page.page} ref={(el) => (pageRefs.current[page.page] = el)} className="rounded-sm"
            style={{ background: "#fafbfd", border: `1px solid ${T.line2}`, boxShadow: "0 6px 20px rgba(0,0,0,0.10)" }}>
            {showText && page.transcribed && (
              <div className="px-10 pt-5" style={{ marginBottom: -12 }}>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={{ fontSize: 11, fontFamily: "ui-sans-serif, system-ui, sans-serif", background: "#fdf0d8", color: "#8a5a00", border: "1px solid #f0d9a8" }}
                  title="This page had no text layer (scanned/image PDF). The text shown was transcribed by AI from the page image and may not be verbatim — check against the Original, or switch to Image/Both view."
                >
                  ⚠ Reconstructed from scanned original — not verbatim
                </span>
              </div>
            )}
            <div className={both ? "grid" : ""} style={both ? { gridTemplateColumns: "1fr 1fr" } : {}}>
              {showImage && (
                <div style={{ background: "#eaedf2", borderRight: both ? `1px solid ${T.line}` : "none" }}>
                  {imageCol}
                </div>
              )}
              {showText && textCol}
            </div>
            <div className="px-10 py-2 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${T.line}`, color: "#98a1b3", fontFamily: "Georgia, serif" }}>
              <span>{doc.cba_name}</span>
              <span>Página {page.page} de {pages.length}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- change card (right panel) ---- */
function ChangeCard({ f, num, active, onSelect, onReview, cardRefs, authorMode, docTitle, layerName, fireToast }) {
  const tt = CLASS[f.classification];
  const Icon = tt.Icon;
  const conf = confidenceMeta(f.confidence);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(f.final_value || f.proposed_value || "");
  const [asking, setAsking] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const reviewed = f.review_status !== "proposed";
  const isUnsure = f.review_status === "unsure";

  return (
    <div ref={(el) => (cardRefs.current[f.id] = el)} onClick={onSelect}
      className="rounded-xl cursor-pointer"
      style={{ background: active ? tt.markBg : "#fff", border: `1px solid ${active ? tt.markLine : T.line}`, outline: active ? `2px solid ${tt.ring}` : "none", outlineOffset: active ? "-1px" : 0, boxShadow: active ? `0 4px 16px ${tt.markBg}` : "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div className="p-3.5 pb-2.5 flex items-start gap-2.5">
        <div className="flex items-center justify-center rounded-full font-semibold shrink-0" style={{ width: 22, height: 22, fontSize: 11, background: tt.pinBg, color: "#fff" }}>{num}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Icon size={13} color={tt.dot} />
            <span className="uppercase tracking-wider font-semibold" style={{ fontSize: 9.5, color: tt.dot }}>{tt.cardLabel}</span>
          </div>
          <div className="text-sm font-semibold mt-1 leading-snug" style={{ color: T.ink }}>{f.title || f.rule_summary}</div>
        </div>
        {f.clause_ref && <span className="shrink-0 rounded px-1.5 py-0.5 text-xs" style={{ background: "#eef1f5", color: T.muted, border: `1px solid ${T.line}` }}>{f.clause_ref}</span>}
      </div>

      <div className="px-3.5 pb-3 text-xs leading-relaxed" style={{ color: T.ink2 }}>{f.rule_summary}</div>

      {/* before / after — author mode has no baseline, so show only the proposed value */}
      <div className="mx-3.5 mb-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
        {authorMode ? (
          <div className="p-2.5" style={{ background: tt.markBg }}>
            <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: tt.dot }}>{f.final_value ? "Corrected value" : "Proposed value"}</div>
            <div className="text-xs font-semibold" style={{ color: tt.dot }}>{f.final_value || f.proposed_value || "—"}</div>
          </div>
        ) : (
          <div className="flex items-stretch">
            <div className="flex-1 p-2.5" style={{ background: "#f7f9fc" }}>
              <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: T.faint }}>Current policy</div>
              <div className="text-xs font-medium" style={{ color: T.muted }}>{f.current_value || "—"}</div>
            </div>
            <div className="flex items-center px-1.5" style={{ background: "#f7f9fc", color: T.faint }}>→</div>
            <div className="flex-1 p-2.5" style={{ background: tt.markBg }}>
              <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: tt.dot }}>{f.final_value ? "Corrected" : "Proposed"}</div>
              <div className="text-xs font-semibold" style={{ color: tt.dot }}>{f.final_value || f.proposed_value || "—"}</div>
            </div>
          </div>
        )}
      </div>

      {/* mapping + confidence */}
      <div className="px-3.5 pb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Layers size={12} color={T.faint} />
          <span className="text-xs truncate" style={{ color: T.muted }}>{f.policy_tab} · {f.policy_field}</span>
        </div>
        <span className="text-xs font-semibold shrink-0" style={{ color: conf.color }} title={`basis: ${f.confidence_basis}`}>{conf.label}</span>
      </div>

      {/* recommended action */}
      <div className="px-3.5 py-2.5 text-xs leading-relaxed" style={{ borderTop: `1px solid ${T.line}`, color: T.ink2, background: active ? "transparent" : "#f7f9fc" }}>
        <span className="font-semibold" style={{ color: T.ink }}>Recommended · </span>{f.rationale}
      </div>

      {/* citation */}
      <div className="px-3.5 py-2 flex items-start gap-1.5 text-xs italic leading-relaxed" style={{ borderTop: `1px solid ${T.line}`, color: T.muted }}>
        <span className="flex-1">“{f.source_quote}”</span>
        <button onClick={(e) => { e.stopPropagation(); onSelect(); }} title="Jump to this page in the source viewer"
          className="not-italic shrink-0 rounded-full px-1.5 py-0.5 font-medium active:scale-90 transition-transform"
          style={{ fontSize: 10.5, background: "#eef1f5", color: T.faint, border: `1px solid ${T.line}` }}>
          p.{f.page}
        </button>
      </div>

      {/* needs-clarification banner: the parked question */}
      {isUnsure && !asking && (
        <div className="mx-3.5 mb-1 rounded-lg px-2.5 py-2 text-xs" style={{ background: "#eef2ff", border: "1px solid #c7d2fe", color: "#4338ca" }}>
          <span className="font-semibold">Open question · </span>
          {f.review_notes || "Marked as not sure."}
        </div>
      )}

      {/* review controls */}
      <div className="px-3.5 py-2.5" style={{ borderTop: `1px solid ${T.line}` }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 flex-wrap">
          <ReviewBtn Icon={Check} label={f.review_status === "approved" ? "Accepted" : "Accept"}
            on={f.review_status === "approved"} onColor="#047857" onBg="#ecfdf5" onBorder="#a7f3d0"
            onClick={() => onReview(f.id, { action: "approve" })} />
          <ReviewBtn Icon={Pencil} label={f.review_status === "corrected" ? "Corrected" : "Edit"}
            on={f.review_status === "corrected"} onColor="#b45309" onBg="#fffbeb" onBorder="#fde68a"
            onClick={() => { setEditVal(f.final_value || f.proposed_value || ""); setAsking(false); setEditing((v) => !v); }} />
          <ReviewBtn Icon={X} label={f.review_status === "rejected" ? "Rejected" : "Reject"}
            on={f.review_status === "rejected"} onColor="#b91c1c" onBg="#fef2f2" onBorder="#fecaca"
            onClick={() => onReview(f.id, { action: "reject" })} />
          <ReviewBtn Icon={HelpCircle} label={isUnsure ? "Question" : "Not sure"}
            on={isUnsure} onColor="#4338ca" onBg="#eef2ff" onBorder="#c7d2fe"
            onClick={() => { setEditing(false); setAsking((v) => !v); }} />
          <button onClick={() => setChatOpen((v) => !v)} title="Chat about this finding"
            className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
            style={{ background: chatOpen ? "#eef0f4" : "#fff", color: T.ink2, border: `1px solid ${T.line2}` }}>
            <MessageSquare size={13} /> Chat{f.chat_messages?.length ? ` · ${Math.floor(f.chat_messages.length / 2) || 1}` : ""}
          </button>
        </div>

        {reviewed && (f.reviewer_name || f.reviewer) && (
          <div className="mt-2 text-xs" style={{ color: T.faint }}>
            by {f.reviewer_name || f.reviewer}{f.committed_version != null ? ` · v${f.committed_version}` : ""}
          </div>
        )}

        {editing && (
          <div className="mt-2.5 flex items-center gap-2">
            <input value={editVal} onChange={(e) => setEditVal(e.target.value)} placeholder="Corrected value" autoFocus
              className="flex-1 rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ border: `1px solid ${T.line2}`, color: T.ink }} />
            <button onClick={() => { onReview(f.id, { action: "correct", final_value: editVal }); setEditing(false); }}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium" style={{ background: T.ink, color: "#fff" }}>Save</button>
            <button onClick={() => setEditing(false)} className="rounded-lg px-2 py-1.5 text-xs" style={{ color: T.muted }}><X size={13} /></button>
          </div>
        )}

        {asking && (
          <QuestionComposer f={f} docTitle={docTitle} layerName={layerName} fireToast={fireToast}
            onSave={(q) => { onReview(f.id, { action: "unsure", notes: q }); setAsking(false); }} />
        )}

        {chatOpen && (
          <ChatPanel f={f} fireToast={fireToast}
            onApply={(value) => { onReview(f.id, { action: "correct", final_value: value }); }} />
        )}
      </div>
    </div>
  );
}

/* ---- "Not sure" composer: write a question, then copy a ready-to-send message ---- */
function QuestionComposer({ f, docTitle, layerName, fireToast, onSave }) {
  const [question, setQuestion] = useState(f.review_notes || "");
  const [copied, setCopied] = useState(false);

  function composedMessage() {
    const about = layerName ? `${docTitle} (${layerName})` : docTitle;
    const rec = f.final_value || f.proposed_value || f.rationale || "—";
    const q = question.trim() || "…";
    return (
      `Hi, I've got a question about ${about}.\n\n` +
      `It's written that: "${f.source_quote}"\n` +
      `And the recommendation is: "${rec}"\n\n` +
      `My question is: ${q}`
    );
  }

  async function copy() {
    const ok = await copyToClipboard(composedMessage());
    if (ok) { setCopied(true); fireToast?.("Question copied", "ready"); setTimeout(() => setCopied(false), 1800); }
    else fireToast?.("Couldn't copy to clipboard", "error");
  }

  return (
    <div className="mt-2.5 rounded-lg p-2.5" style={{ background: "#f7f7ff", border: "1px solid #e0e7ff" }}>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} autoFocus
        placeholder="Why is it written weekly OT if above they mentioned daily only?"
        className="w-full rounded-lg px-2.5 py-1.5 text-xs outline-none resize-y"
        style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }} />
      <div className="mt-2 flex items-center gap-2">
        <button onClick={copy}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium"
          style={{ background: "#fff", color: T.ink2, border: `1px solid ${T.line2}` }}>
          {copied ? <ClipboardCheck size={13} color="#047857" /> : <Copy size={13} />} {copied ? "Copied" : "Copy question"}
        </button>
        <button onClick={() => onSave(question.trim())} disabled={!question.trim()}
          className="ml-auto rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white"
          style={{ background: question.trim() ? "#4f46e5" : T.line2, cursor: question.trim() ? "pointer" : "not-allowed" }}>
          Save as question
        </button>
      </div>
      <div className="mt-1.5 text-xs" style={{ color: T.faint }}>
        Copy pastes the clause, the recommendation, and your question — ready to send to a colleague.
      </div>
    </div>
  );
}

/* ---- chat about a finding: the assistant answers grounded in this finding ---- */
function ChatPanel({ f, fireToast, onApply }) {
  const [messages, setMessages] = useState(f.chat_messages || []);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const res = await api.chatFinding(f.id, text);
      setMessages(res.chat_messages || []);
      setSuggestion(res.suggestion || null);
    } catch (e) {
      fireToast?.(e.message, "error");
      setMessages((m) => [...m, { role: "assistant", content: `⚠ ${e.message}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-2.5 rounded-lg overflow-hidden" style={{ border: `1px solid ${T.line2}`, background: "#fafbfc" }}>
      <div className="px-2.5 py-1.5 text-xs flex items-center gap-1.5" style={{ borderBottom: `1px solid ${T.line}`, color: T.muted }}>
        <MessageSquare size={12} /> Ask about this finding
      </div>
      <div className="px-2.5 py-2 flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 240 }}>
        {messages.length === 0 && !busy && (
          <div className="text-xs text-center py-3" style={{ color: T.faint }}>
            Ask why it's classified this way, what the clause means, or whether the proposed value looks right.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className="flex" style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div className="rounded-lg px-2.5 py-1.5 text-xs leading-relaxed" style={{
              maxWidth: "85%", whiteSpace: "pre-wrap",
              background: m.role === "user" ? T.ink : "#fff",
              color: m.role === "user" ? "#fff" : T.ink2,
              border: m.role === "user" ? "none" : `1px solid ${T.line}`,
            }}>{m.content}</div>
          </div>
        ))}
        {busy && (
          <div className="flex items-center gap-1.5 text-xs" style={{ color: T.faint }}>
            <Loader2 size={12} className="animate-spin" /> Thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {suggestion && (suggestion.proposed_value || suggestion.rationale || suggestion.classification) && (
        <div className="mx-2.5 mb-2 rounded-lg px-2.5 py-2 text-xs" style={{ background: "#eef2ff", border: "1px solid #c7d2fe", color: "#4338ca" }}>
          <div className="flex items-center gap-1.5 font-semibold mb-1"><Sparkles size={12} /> Suggested revision</div>
          {suggestion.classification && <div>Classification → <strong>{suggestion.classification}</strong></div>}
          {suggestion.proposed_value && <div>Value → <strong>{suggestion.proposed_value}</strong></div>}
          {suggestion.rationale && <div className="mt-0.5" style={{ color: T.ink2 }}>{suggestion.rationale}</div>}
          {suggestion.proposed_value && (
            <button onClick={() => { onApply(suggestion.proposed_value); fireToast?.("Applied as correction", "ready"); setSuggestion(null); }}
              className="mt-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-white" style={{ background: "#4f46e5" }}>
              Apply as correction
            </button>
          )}
        </div>
      )}

      <div className="px-2.5 py-2 flex items-center gap-2" style={{ borderTop: `1px solid ${T.line}` }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask a question…"
          className="flex-1 rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }} />
        <button onClick={send} disabled={!input.trim() || busy}
          className="flex items-center justify-center rounded-lg p-2" style={{ background: input.trim() && !busy ? T.ink : T.line2, color: "#fff" }}>
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}

function ReviewBtn({ Icon, label, on, onColor, onBg, onBorder, onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
      style={{ background: on ? onBg : "#fff", color: on ? onColor : T.muted, border: `1px solid ${on ? onBorder : T.line2}` }}>
      <Icon size={13} /> {label}
    </button>
  );
}
