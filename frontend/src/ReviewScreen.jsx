import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, Download, FileText, Layers, Check, X, Pencil, Loader2, ExternalLink, UploadCloud,
} from "lucide-react";
import * as api from "./api.js";
import { T, CLASS, CLASS_ORDER, counts, confidenceMeta, countryFlag, norm } from "./shared.jsx";

export default function ReviewScreen({ docId, onBack, fireToast }) {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [filters, setFilters] = useState({ conflict: true, gap: true, adjust: true, match: true });
  const spanRefs = useRef({});
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
  const c = counts(findings);
  const decided = findings.filter((f) => f.review_status !== "proposed").length;
  const allDecided = c.total > 0 && decided === c.total;
  const committable = findings.filter(
    (f) => (f.review_status === "approved" || f.review_status === "corrected") && f.committed_version == null,
  ).length;
  const visible = findings.filter((f) => filters[f.classification]);

  function selectFromSource(id) {
    setActive(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function selectFromCard(id) {
    setActive(id);
    spanRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function toggleFilter(k) { setFilters((f) => ({ ...f, [k]: !f[k] })); }

  async function review(findingId, action) {
    try {
      const updated = await api.reviewFinding(findingId, action);
      setDoc((d) => ({ ...d, findings: d.findings.map((f) => (f.id === findingId ? updated : f)) }));
      fireToast(
        action.action === "approve" ? "Accepted" : action.action === "correct" ? "Correction saved" : "Rejected",
        action.action === "reject" ? "neutral" : "ready",
      );
    } catch (e) {
      fireToast(e.message, "error");
    }
  }

  async function download(kind) {
    try {
      if (kind === "csv") await api.downloadFile(`/api/documents/${doc.id}/change-set.csv`, `change-set-${doc.id}.csv`);
      else if (kind === "json") await api.downloadFile(`/api/documents/${doc.id}/change-set.json`, `change-set-${doc.id}.json`);
      else await api.downloadFile(`/api/documents/${doc.id}/decision-record`, `decision-record-${doc.id}.json`);
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
              <span className="text-sm font-semibold truncate" style={{ color: T.ink }}>{countryFlag(doc.jurisdiction)} {doc.title}</span>
              <span className="uppercase tracking-wide rounded px-1.5 py-0.5 shrink-0" style={{ fontSize: 9, background: "#f3f2ef", color: T.muted, border: `1px solid ${T.line}` }}>{doc.doc_type}</span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: T.muted }}>{doc.source} · {doc.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right mr-1">
            <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint }}>Compared to policy</div>
            <div className="text-sm font-medium" style={{ color: T.ink }}>{doc.policy?.name || "— (author mode)"}</div>
          </div>
          {doc.has_file && (
            <button onClick={() => api.openFile(`/api/documents/${doc.id}/file`).catch((e) => fireToast(e.message, "error"))}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium"
              style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
              <FileText size={15} /> Original
            </button>
          )}
          <ExportMenu onDownload={download} />
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
              style={{ background: on ? tt.markBg : "#f6f5f3", color: on ? tt.dot : T.faint, border: `1px solid ${on ? tt.markLine : T.line}`, opacity: on ? 1 : 0.6 }}>
              <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: tt.dot }} />
              {tt.label} · {n}
            </button>
          );
        })}
        <div className="flex-1" />
        <span className="text-xs" style={{ color: allDecided ? "#047857" : T.muted }}>
          {decided}/{c.total} decided{decided > 0 ? " · saved" : ""}
        </span>
      </div>

      {/* split */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0 overflow-y-auto" style={{ background: "#eeede9" }}>
          <div className="mx-auto py-6 px-6" style={{ maxWidth: 720 }}>
            <div className="mb-3 flex items-center gap-2 text-xs" style={{ color: T.muted }}>
              <FileText size={13} /> Source document — marked in place, never rewritten
            </div>
            <SourceViewer doc={doc} findings={findings} active={active} filters={filters}
              onSelect={selectFromSource} spanRefs={spanRefs} numberOf={numberOf} />
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
                    onSelect={() => selectFromCard(f.id)} onReview={review} cardRefs={cardRefs} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportMenu({ onDownload }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium"
        style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
        <Download size={15} /> Export
      </button>
      {open && (
        <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-20" style={{ background: "#fff", border: `1px solid ${T.line2}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", width: 240 }}>
          {[
            ["csv", "Change-set (CSV)"],
            ["json", "Change-set (JSON)"],
            ["record", "Decision record (JSON)"],
          ].map(([k, label]) => (
            <button key={k} onClick={() => { setOpen(false); onDownload(k); }}
              className="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50" style={{ borderBottom: `1px solid ${T.line}`, color: T.ink }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- source viewer: render pages, highlight cited quotes in place ---- */
function SourceViewer({ doc, findings, active, filters, onSelect, spanRefs, numberOf }) {
  const pages = doc.pages || [];
  if (pages.length === 0) {
    return <div className="rounded-lg p-6 text-sm" style={{ background: "#fffdf9", border: `1px solid ${T.line2}`, color: T.faint }}>
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
        return (
          <div key={page.page} className="rounded-sm" style={{ background: "#fffdf9", border: `1px solid ${T.line2}`, boxShadow: "0 6px 20px rgba(0,0,0,0.10)" }}>
            <div className="px-10 py-9" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "#26241f" }}>
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
            <div className="px-10 py-2 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${T.line}`, color: "#9a968c", fontFamily: "Georgia, serif" }}>
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
function ChangeCard({ f, num, active, onSelect, onReview, cardRefs }) {
  const tt = CLASS[f.classification];
  const Icon = tt.Icon;
  const conf = confidenceMeta(f.confidence);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(f.final_value || f.proposed_value || "");
  const reviewed = f.review_status !== "proposed";

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
        {f.clause_ref && <span className="shrink-0 rounded px-1.5 py-0.5 text-xs" style={{ background: "#f6f5f3", color: T.muted, border: `1px solid ${T.line}` }}>{f.clause_ref}</span>}
      </div>

      <div className="px-3.5 pb-3 text-xs leading-relaxed" style={{ color: T.ink2 }}>{f.rule_summary}</div>

      {/* before / after */}
      <div className="mx-3.5 mb-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
        <div className="flex items-stretch">
          <div className="flex-1 p-2.5" style={{ background: "#faf9f7" }}>
            <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: T.faint }}>Current policy</div>
            <div className="text-xs font-medium" style={{ color: T.muted }}>{f.current_value || "—"}</div>
          </div>
          <div className="flex items-center px-1.5" style={{ background: "#faf9f7", color: T.faint }}>→</div>
          <div className="flex-1 p-2.5" style={{ background: tt.markBg }}>
            <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: tt.dot }}>{f.final_value ? "Corrected" : "Proposed"}</div>
            <div className="text-xs font-semibold" style={{ color: tt.dot }}>{f.final_value || f.proposed_value || "—"}</div>
          </div>
        </div>
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
      <div className="px-3.5 py-2.5 text-xs leading-relaxed" style={{ borderTop: `1px solid ${T.line}`, color: T.ink2, background: active ? "transparent" : "#faf9f7" }}>
        <span className="font-semibold" style={{ color: T.ink }}>Recommended · </span>{f.rationale}
      </div>

      {/* citation */}
      <div className="px-3.5 py-2 text-xs italic leading-relaxed" style={{ borderTop: `1px solid ${T.line}`, color: T.muted }}>
        “{f.source_quote}” <span className="not-italic" style={{ color: T.faint }}>— p.{f.page}</span>
      </div>

      {/* review controls */}
      {editing ? (
        <div className="px-3.5 py-2.5 flex items-center gap-2" style={{ borderTop: `1px solid ${T.line}` }} onClick={(e) => e.stopPropagation()}>
          <input value={editVal} onChange={(e) => setEditVal(e.target.value)} placeholder="Corrected value"
            className="flex-1 rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ border: `1px solid ${T.line2}`, color: T.ink }} />
          <button onClick={() => { onReview(f.id, { action: "correct", final_value: editVal }); setEditing(false); }}
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium" style={{ background: T.ink, color: "#fff" }}>Save</button>
          <button onClick={() => setEditing(false)} className="rounded-lg px-2 py-1.5 text-xs" style={{ color: T.muted }}><X size={13} /></button>
        </div>
      ) : (
        <div className="px-3.5 py-2.5 flex items-center gap-2" style={{ borderTop: `1px solid ${T.line}` }} onClick={(e) => e.stopPropagation()}>
          <ReviewBtn Icon={Check} label={f.review_status === "approved" ? "Accepted" : "Accept"}
            on={f.review_status === "approved"} onColor="#047857" onBg="#ecfdf5" onBorder="#a7f3d0"
            onClick={() => onReview(f.id, { action: "approve" })} />
          <ReviewBtn Icon={Pencil} label={f.review_status === "corrected" ? "Corrected" : "Edit"}
            on={f.review_status === "corrected"} onColor="#b45309" onBg="#fffbeb" onBorder="#fde68a"
            onClick={() => { setEditVal(f.final_value || f.proposed_value || ""); setEditing(true); }} />
          <ReviewBtn Icon={X} label={f.review_status === "rejected" ? "Rejected" : "Reject"}
            on={f.review_status === "rejected"} onColor="#b91c1c" onBg="#fef2f2" onBorder="#fecaca"
            onClick={() => onReview(f.id, { action: "reject" })} />
          {reviewed && (f.reviewer_name || f.reviewer) && (
            <span className="ml-auto text-xs" style={{ color: T.faint }}>
              by {f.reviewer_name || f.reviewer}{f.committed_version != null ? ` · v${f.committed_version}` : ""}
            </span>
          )}
        </div>
      )}
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
