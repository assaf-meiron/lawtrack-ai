import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload, Building2, Layers, FileText, Gavel, FilePlus, Clock, Search,
  Loader2, RefreshCw, Check, Trash2, LayoutGrid, List,
} from "lucide-react";
import * as api from "./api.js";
import { T, CLASS, CLASS_ORDER, counts, countryFlag, StatusPill, LayerChip } from "./shared.jsx";
import UploadModal from "./UploadModal.jsx";

const KIND_ICON = { cct: FileText, cba: FileText, statute: Gavel, reform: FilePlus, policy: FileText, other: FileText };

export default function DocumentsScreen({ onOpen, fireToast }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState("country");
  const [view, setView] = useState("cards"); // 'cards' | 'list'
  const [uploadOpen, setUploadOpen] = useState(false);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  async function load() {
    try {
      const list = await api.listDocuments();
      const details = await Promise.all(list.map((d) => api.getDocument(d.id)));
      setDocs(details);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    return () => clearTimeout(pollRef.current);
  }, []);

  // poll while anything is analyzing
  useEffect(() => {
    if (docs.some((d) => d.status === "analyzing")) {
      pollRef.current = setTimeout(load, 2500);
      return () => clearTimeout(pollRef.current);
    }
  }, [docs]);

  async function analyze(id) {
    try {
      await api.analyzeDocument(id);
      fireToast("Analyzing document…");
      load();
    } catch (e) {
      fireToast(e.message, "error");
    }
  }

  async function remove(id, password) {
    try {
      await api.deleteDocument(id, password);
      fireToast("Document deleted.");
      setDocs((prev) => prev.filter((d) => d.id !== id));
      return true;
    } catch (e) {
      fireToast(e.message, "error");
      return false;
    }
  }

  const groups = useMemo(() => {
    const g = {};
    docs.forEach((d) => {
      const key = groupBy === "country" ? `${countryFlag(d.jurisdiction)}  ${d.jurisdiction}` : d.cba_name || "—";
      (g[key] = g[key] || []).push(d);
    });
    return Object.entries(g);
  }, [docs, groupBy]);

  const readyCount = docs.filter((d) => d.status === "analyzed").length;
  const reviewedCount = docs.filter((d) => d.status === "reviewed").length;

  return (
    <div className="mx-auto" style={{ maxWidth: 1180 }}>
      {/* controls */}
      <div className="px-6 pt-6 pb-2 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          {/* view: cards vs detailed list */}
          <div className="inline-flex rounded-lg p-0.5" style={{ background: "#eceae5", border: `1px solid ${T.line}` }}>
            {[{ v: "cards", label: "Cards", Icon: LayoutGrid }, { v: "list", label: "List", Icon: List }].map((o) => {
              const on = view === o.v; const Icon = o.Icon;
              return (
                <button key={o.v} onClick={() => setView(o.v)}
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                  style={{ background: on ? "#fff" : "transparent", color: on ? T.ink : T.muted, boxShadow: on ? "0 1px 2px rgba(0,0,0,0.08)" : "none" }}>
                  <Icon size={14} /> {o.label}
                </button>
              );
            })}
          </div>
          {view === "cards" && (
            <div className="inline-flex rounded-lg p-0.5" style={{ background: "#eceae5", border: `1px solid ${T.line}` }}>
              {[{ v: "country", label: "By country", Icon: Building2 }, { v: "cba", label: "By CBA", Icon: Layers }].map((o) => {
                const on = groupBy === o.v; const Icon = o.Icon;
                return (
                  <button key={o.v} onClick={() => setGroupBy(o.v)}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                    style={{ background: on ? "#fff" : "transparent", color: on ? T.ink : T.muted, boxShadow: on ? "0 1px 2px rgba(0,0,0,0.08)" : "none" }}>
                    <Icon size={14} /> {o.label}
                  </button>
                );
              })}
            </div>
          )}
          <div className="text-xs" style={{ color: T.muted }}>
            <span className="font-semibold" style={{ color: T.ink }}>{docs.length}</span> documents ·{" "}
            <span className="font-semibold" style={{ color: T.ink }}>{readyCount}</span> ready ·{" "}
            <span className="font-semibold" style={{ color: T.ink }}>{reviewedCount}</span> reviewed
          </div>
        </div>
        <button onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-white transition-transform active:scale-95"
          style={{ background: T.ink }}>
          <Upload size={16} /> Upload PDF
        </button>
      </div>

      {/* legend */}
      <div className="px-6 pb-3 flex items-center gap-4 flex-wrap">
        {CLASS_ORDER.map((k) => (
          <div key={k} className="flex items-center gap-1.5 text-xs" style={{ color: T.muted }}>
            <span className="inline-block rounded-full" style={{ width: 9, height: 9, background: CLASS[k].dot }} />
            {CLASS[k].label}
          </div>
        ))}
      </div>

      {error && (
        <div className="mx-6 mb-4 text-sm rounded-lg px-3 py-2" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="px-6 py-16 flex items-center gap-2 text-sm" style={{ color: T.muted }}>
          <Loader2 size={16} className="animate-spin" /> Loading documents…
        </div>
      ) : docs.length === 0 ? (
        <div className="mx-6 my-6 rounded-xl p-10 text-center text-sm" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
          No documents yet. Upload a CBA or law PDF to get started.
        </div>
      ) : view === "list" ? (
        <div className="px-6 pb-16">
          <DocTable docs={docs} onOpen={onOpen} onAnalyze={analyze} onDelete={remove} />
        </div>
      ) : (
        <div className="px-6 pb-16">
          {groups.map(([label, ids]) => (
            <div key={label} className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-sm font-semibold tracking-tight" style={{ color: T.ink2 }}>{label}</div>
                <div className="h-px flex-1" style={{ background: T.line }} />
                <div className="text-xs" style={{ color: T.faint }}>{ids.length}</div>
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
                {ids.map((d) => (
                  <DocCard key={d.id} doc={d} onOpen={onOpen} onAnalyze={analyze} onDelete={remove} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {uploadOpen && (
        <UploadModal
          onClose={() => setUploadOpen(false)}
          onUploaded={() => { setUploadOpen(false); fireToast("Analyzing uploaded document…"); load(); }}
          fireToast={fireToast}
        />
      )}
    </div>
  );
}

function DocCard({ doc, onOpen, onAnalyze, onDelete }) {
  const KindIcon = KIND_ICON[doc.doc_type] || FileText;
  const c = counts(doc.findings || []);
  const clickable = ["analyzed", "in_review", "reviewed"].includes(doc.status);
  const btnLabel = doc.status === "reviewed" ? "View" : doc.status === "in_review" ? "Continue" : "Review";
  // Finalized (complete) documents are part of the audit trail — the backend blocks deleting them.
  const deletable = doc.status !== "complete" && !doc.finalized_at;
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${doc.status === "error" ? "#f0c9c9" : T.line}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", opacity: doc.status === "reviewed" ? 0.9 : 1 }}>
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 32, height: 32, background: "#f3f2ef", border: `1px solid ${T.line}` }}>
              <KindIcon size={16} color={T.ink2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-snug truncate" style={{ color: T.ink }}>{doc.title}</div>
              <div className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: T.muted }}>
                <span className="uppercase tracking-wide" style={{ fontSize: 10 }}>{doc.doc_type}</span>
                <span style={{ color: T.line2 }}>·</span>
                <span className="truncate">{countryFlag(doc.jurisdiction)} {doc.jurisdiction}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <StatusPill status={doc.status} />
            {deletable && <DeleteControl doc={doc} onDelete={onDelete} />}
          </div>
        </div>
        {doc.subtitle && <div className="mt-3 text-xs leading-relaxed" style={{ color: T.ink2 }}>{doc.subtitle}</div>}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs" style={{ color: T.faint }}>
          <Search size={12} /> <span className="truncate">{doc.source || "—"}</span>
        </div>
        {doc.status === "error" && doc.error_detail && (
          <div className="mt-2 text-xs rounded px-2 py-1.5" style={{ background: "#fef2f2", color: "#b91c1c" }}>{doc.error_detail}</div>
        )}
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-2" style={{ borderTop: `1px solid ${T.line}`, background: "#faf9f7" }}>
        <div className="min-w-0">
          <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint }}>Layer</div>
          <div className="text-xs font-medium truncate"><LayerChip policy={doc.policy} /></div>
        </div>
        {clickable ? (
          <div className="flex items-center gap-2 shrink-0">
            <MiniCounts c={c} />
            <button onClick={() => onOpen(doc.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform"
              style={doc.status === "reviewed"
                ? { background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }
                : { background: T.ink, color: "#fff" }}>
              {btnLabel}
            </button>
          </div>
        ) : doc.status === "analyzing" ? (
          <div className="flex items-center gap-1.5 text-xs shrink-0" style={{ color: T.muted }}>
            <Loader2 size={14} className="animate-spin" /> Extracting…
          </div>
        ) : (
          <button onClick={() => onAnalyze(doc.id)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform shrink-0"
            style={{ background: "#fff", border: `1px solid ${T.ink}`, color: T.ink }}>
            <RefreshCw size={13} /> Analyze
          </button>
        )}
      </div>
      {doc.status === "reviewed" && (
        <div className="px-4 py-1.5 text-xs flex items-center gap-1.5" style={{ color: T.faint, background: "#faf9f7", borderTop: `1px solid ${T.line}` }}>
          <Check size={12} /> Reconciled — decision record saved
        </div>
      )}
    </div>
  );
}

function MiniCounts({ c }) {
  const parts = [];
  if (c.conflict) parts.push(["conflict", c.conflict]);
  if (c.gap) parts.push(["gap", c.gap]);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold" style={{ color: T.ink2 }}>{c.total}</span>
      {parts.map(([k, n]) => (
        <span key={k} className="inline-flex items-center gap-1 text-xs" style={{ color: CLASS[k].dot }}>
          <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: CLASS[k].dot }} />{n}
        </span>
      ))}
    </div>
  );
}

// full classification breakdown (conflict · gap · adjust · aligned), zeros dimmed — for the list view
function FindingBreakdown({ findings }) {
  const c = counts(findings || []);
  return (
    <div className="flex items-center gap-2.5">
      {CLASS_ORDER.map((k) => (
        <span key={k} title={CLASS[k].label} className="inline-flex items-center gap-1 text-xs" style={{ color: c[k] ? CLASS[k].dot : T.line2 }}>
          <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: c[k] ? CLASS[k].dot : T.line2 }} />{c[k]}
        </span>
      ))}
    </div>
  );
}

function fmtWhen(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

// reusable password-gated delete: a trash button that opens a small confirm popover. Used by both views.
function DeleteControl({ doc, onDelete }) {
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [busy, setBusy] = useState(false);
  async function go() {
    setBusy(true);
    const ok = await onDelete(doc.id, pwd);
    setBusy(false);
    if (ok) { setOpen(false); setPwd(""); }  // wrong password / error keeps the popover open
  }
  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} title="Delete document"
        className="rounded-md p-1 hover:bg-gray-100 transition-colors" style={{ color: open ? "#b91c1c" : T.faint }}>
        <Trash2 size={14} />
      </button>
      {open && (
        <div onClick={(e) => e.stopPropagation()} className="absolute right-0 mt-1 z-30 rounded-lg p-2.5 text-left"
          style={{ background: "#fff", border: "1px solid #fecaca", boxShadow: "0 8px 24px rgba(0,0,0,0.14)", width: 236 }}>
          <div className="text-xs mb-2" style={{ color: "#b91c1c" }}>Delete permanently? Enter the delete password.</div>
          <input type="password" autoFocus value={pwd} onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && pwd) go(); }} placeholder="Delete password"
            className="w-full rounded-md px-2 py-1 text-xs outline-none mb-2" style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }} />
          <div className="flex items-center justify-end gap-1.5">
            <button onClick={() => { setOpen(false); setPwd(""); }} className="rounded-md px-2 py-1 text-xs font-medium" style={{ border: `1px solid ${T.line2}`, color: T.ink2, background: "#fff" }}>Cancel</button>
            <button onClick={go} disabled={!pwd || busy} className="rounded-md px-2 py-1 text-xs font-semibold text-white inline-flex items-center gap-1" style={{ background: "#b91c1c", opacity: !pwd || busy ? 0.6 : 1 }}>{busy && <Loader2 size={11} className="animate-spin" />}Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

// detailed list view: one row per document — status, layer, findings breakdown, last updated, actions
function DocTable({ docs, onOpen, onAnalyze, onDelete }) {
  const rows = [...docs].sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));
  const HEAD = ["Document", "Status", "Layer", "Findings — conflict · gap · adjust · aligned", "Updated", ""];
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${T.line}`, background: "#fff" }}>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: 860 }}>
          <thead>
            <tr style={{ background: "#faf9f7", borderBottom: `1px solid ${T.line}` }}>
              {HEAD.map((h, i) => (
                <th key={i} className="text-left uppercase tracking-wider px-3 py-2.5 font-semibold" style={{ fontSize: 9, color: T.faint }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => <DocRow key={d.id} doc={d} onOpen={onOpen} onAnalyze={onAnalyze} onDelete={onDelete} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocRow({ doc, onOpen, onAnalyze, onDelete }) {
  const KindIcon = KIND_ICON[doc.doc_type] || FileText;
  const clickable = ["analyzed", "in_review", "reviewed"].includes(doc.status);
  const deletable = doc.status !== "complete" && !doc.finalized_at;
  const btnLabel = doc.status === "reviewed" ? "View" : doc.status === "in_review" ? "Continue" : "Review";
  return (
    <tr style={{ borderBottom: `1px solid ${T.line}` }} className="hover:bg-gray-50">
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <KindIcon size={15} color={T.ink2} className="shrink-0" />
          <div className="min-w-0">
            <div className="font-medium truncate" style={{ color: T.ink, maxWidth: 280 }}>{doc.title}</div>
            <div className="text-xs" style={{ color: T.faint }}>
              <span className="uppercase tracking-wide" style={{ fontSize: 9 }}>{doc.doc_type}</span> · {countryFlag(doc.jurisdiction)} {doc.jurisdiction}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-2.5"><StatusPill status={doc.status} /></td>
      <td className="px-3 py-2.5">
        <div className="text-xs" style={{ maxWidth: 210 }}><LayerChip policy={doc.policy} /></div>
      </td>
      <td className="px-3 py-2.5">
        {doc.status === "error" ? <span className="text-xs" style={{ color: T.faint }}>—</span> : <FindingBreakdown findings={doc.findings} />}
      </td>
      <td className="px-3 py-2.5"><span className="text-xs whitespace-nowrap" style={{ color: T.muted }}>{fmtWhen(doc.updated_at || doc.created_at)}</span></td>
      <td className="px-3 py-2.5">
        <div className="flex items-center justify-end gap-1.5">
          {clickable ? (
            <button onClick={() => onOpen(doc.id)} className="rounded-lg px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform"
              style={doc.status === "reviewed" ? { background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 } : { background: T.ink, color: "#fff" }}>
              {btnLabel}
            </button>
          ) : doc.status === "analyzing" ? (
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: T.muted }}><Loader2 size={13} className="animate-spin" /> …</span>
          ) : (
            <button onClick={() => onAnalyze(doc.id)} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform"
              style={{ background: "#fff", border: `1px solid ${T.ink}`, color: T.ink }}><RefreshCw size={12} /> Analyze</button>
          )}
          {deletable && <DeleteControl doc={doc} onDelete={onDelete} />}
        </div>
      </td>
    </tr>
  );
}
