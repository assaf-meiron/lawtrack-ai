import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload, Building2, Layers, FileText, Gavel, FilePlus, Clock, Search,
  Loader2, RefreshCw, Check,
} from "lucide-react";
import * as api from "./api.js";
import { T, CLASS, CLASS_ORDER, counts, countryFlag, StatusPill } from "./shared.jsx";
import UploadModal from "./UploadModal.jsx";

const KIND_ICON = { cct: FileText, cba: FileText, statute: Gavel, reform: FilePlus, policy: FileText, other: FileText };

export default function DocumentsScreen({ onOpen, fireToast }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState("country");
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
                  <DocCard key={d.id} doc={d} onOpen={onOpen} onAnalyze={analyze} />
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

function DocCard({ doc, onOpen, onAnalyze }) {
  const KindIcon = KIND_ICON[doc.doc_type] || FileText;
  const c = counts(doc.findings || []);
  const clickable = ["analyzed", "in_review", "reviewed"].includes(doc.status);
  const btnLabel = doc.status === "reviewed" ? "View" : doc.status === "in_review" ? "Continue" : "Review";
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", opacity: doc.status === "reviewed" ? 0.9 : 1 }}>
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
          <StatusPill status={doc.status} />
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
          <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint }}>Compared to policy</div>
          <div className="text-xs font-medium truncate" style={{ color: T.ink2 }}>{doc.policy?.name || "— (author mode)"}</div>
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
