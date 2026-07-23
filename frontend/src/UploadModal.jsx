import React, { useEffect, useRef, useState } from "react";
import { Upload, X, ChevronDown, Check, Loader2, Layers, Plus } from "lucide-react";
import * as api from "./api.js";
import { T } from "./shared.jsx";

const DOC_TYPES = [
  { v: "cct", label: "CCT / collective agreement" },
  { v: "cba", label: "CBA" },
  { v: "statute", label: "Statute / law" },
  { v: "reform", label: "Reform / amendment" },
  { v: "other", label: "Other" },
];
const LAYER_TYPES = [
  { v: "cba", label: "CBA / collective agreement" },
  { v: "company", label: "Company" },
  { v: "state", label: "State / region" },
  { v: "country", label: "Country / federal" },
];

// Defined at module scope (NOT inside UploadModal) so its identity is stable across renders —
// otherwise React remounts the subtree on every keystroke and inputs lose focus.
function Field({ label, children }) {
  return (
    <div className="mt-4">
      <div className="uppercase tracking-wider mb-1" style={{ fontSize: 9, color: T.faint }}>{label}</div>
      {children}
    </div>
  );
}

export default function UploadModal({ onClose, onUploaded, fireToast }) {
  const [policies, setPolicies] = useState([]);
  const [mode, setMode] = useState("existing"); // 'existing' (renewal) | 'new'
  const [policyId, setPolicyId] = useState("");
  const [policyOpen, setPolicyOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newJur, setNewJur] = useState("");
  const [newLayerType, setNewLayerType] = useState("cba");
  const [docType, setDocType] = useState("cct");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    api.listPolicies()
      .then((ps) => { setPolicies(ps); if (ps.length === 0) setMode("new"); })
      .catch((e) => setErr(e.message));
  }, []);

  const selected = policies.find((p) => p.id === policyId);
  const ready =
    file && (mode === "existing" ? !!selected : newName.trim() && newJur.trim());

  async function submit() {
    if (!ready) return;
    setBusy(true);
    setErr(null);
    try {
      let targetPolicyId, jurisdiction;
      if (mode === "new") {
        const created = await api.createPolicy({
          name: newName.trim(), jurisdiction: newJur.trim().toUpperCase(), layer_type: newLayerType,
        });
        targetPolicyId = created.id;
        jurisdiction = created.jurisdiction;
      } else {
        targetPolicyId = selected.id;
        jurisdiction = selected.jurisdiction;
      }
      const fd = new FormData();
      fd.append("file", file);
      fd.append("jurisdiction", jurisdiction);
      fd.append("policy_id", targetPolicyId);
      fd.append("doc_type", docType);
      fd.append("analyze", "true");
      await api.uploadDocument(fd);
      onUploaded();
    } catch (e) {
      setErr(e.message);
      fireToast(e.message, "error");
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(25,25,23,0.45)" }} onClick={onClose}>
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#fff", width: 480, maxHeight: "90vh", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }} onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="text-base font-semibold" style={{ color: T.ink }}>Upload a document</div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100"><X size={18} color={T.muted} /></button>
        </div>

        <div className="p-5 overflow-y-auto">
          <button onClick={() => inputRef.current?.click()}
            className="w-full rounded-xl flex flex-col items-center justify-center text-center py-8 px-4"
            style={{ border: `2px dashed ${file ? T.signal : T.line2}`, background: "#faf9f7" }}>
            <div className="flex items-center justify-center rounded-full mb-2" style={{ width: 40, height: 40, background: T.ink }}>
              <Upload size={18} color="#fff" />
            </div>
            <div className="text-sm font-medium" style={{ color: T.ink }}>{file ? file.name : "Choose a CBA or law PDF"}</div>
            <div className="text-xs mt-1" style={{ color: T.faint }}>PDF · Portuguese, French, Spanish, German</div>
          </button>
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />

          {/* which layer does this document belong to? */}
          <Field label="This document is">
            <div className="inline-flex rounded-lg p-0.5 w-full" style={{ background: "#eceae5", border: `1px solid ${T.line}` }}>
              {[
                { v: "existing", label: "A new edition of a tracked layer", Icon: Layers },
                { v: "new", label: "A brand-new layer", Icon: Plus },
              ].map((o) => {
                const on = mode === o.v; const Icon = o.Icon;
                return (
                  <button key={o.v} onClick={() => setMode(o.v)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors"
                    style={{ background: on ? "#fff" : "transparent", color: on ? T.ink : T.muted, boxShadow: on ? "0 1px 2px rgba(0,0,0,0.08)" : "none" }}>
                    <Icon size={13} /> {o.label}
                  </button>
                );
              })}
            </div>
          </Field>

          {mode === "existing" ? (
            <Field label="Which layer is this an edition of?">
              <div className="relative">
                <button onClick={() => setPolicyOpen((o) => !o)}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-left"
                  style={{ background: "#fff", border: `1px solid ${selected ? T.line2 : "#e6b8b8"}`, color: selected ? T.ink : T.faint }}>
                  {selected
                    ? (<><span>{selected.flag}</span><span className="font-medium">{selected.name}</span><span style={{ color: T.faint }}>· v{selected.version}</span></>)
                    : <span>Choose the layer this updates…</span>}
                  <ChevronDown size={15} color={T.muted} className="ml-auto" />
                </button>
                {policyOpen && (
                  <div className="absolute left-0 right-0 mt-1 rounded-xl overflow-y-auto z-20" style={{ background: "#fff", border: `1px solid ${T.line2}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", maxHeight: 240 }}>
                    {policies.map((p) => (
                      <button key={p.id} onClick={() => { setPolicyId(p.id); setPolicyOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-gray-50" style={{ borderBottom: `1px solid ${T.line}` }}>
                        <span>{p.flag}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium truncate" style={{ color: T.ink }}>{p.name}</span>
                          <span className="block text-xs" style={{ color: T.faint }}>{p.jurisdiction} · {p.layer_type} · v{p.version}</span>
                        </span>
                        {p.id === policyId && <Check size={15} color={T.ink} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs mt-1.5" style={{ color: T.faint }}>
                Findings are compared against this layer's current values — "what changed since the version you're running".
              </div>
            </Field>
          ) : (
            <>
              <Field label="New layer name">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. CCT Comércio Varejista RJ"
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ border: `1px solid ${T.line2}`, color: T.ink }} />
              </Field>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Field label="Jurisdiction">
                    <input value={newJur} onChange={(e) => setNewJur(e.target.value)} placeholder="e.g. BR"
                      className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ border: `1px solid ${T.line2}`, color: T.ink }} />
                  </Field>
                </div>
                <div className="flex-1">
                  <Field label="Layer type">
                    <select value={newLayerType} onChange={(e) => setNewLayerType(e.target.value)}
                      className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }}>
                      {LAYER_TYPES.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
              <div className="text-xs mt-1.5" style={{ color: T.faint }}>Author mode — no baseline; every relevant clause is treated as net-new.</div>
            </>
          )}

          <Field label="Document type">
            <select value={docType} onChange={(e) => setDocType(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }}>
              {DOC_TYPES.map((d) => <option key={d.v} value={d.v}>{d.label}</option>)}
            </select>
          </Field>

          {err && <div className="mt-3 text-xs rounded-lg px-3 py-2" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>{err}</div>}
        </div>

        <div className="px-5 py-4 flex items-center justify-end shrink-0" style={{ borderTop: `1px solid ${T.line}` }}>
          <button onClick={submit} disabled={!ready || busy}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95"
            style={{ background: ready ? T.ink : T.line2, cursor: ready ? "pointer" : "not-allowed", opacity: ready ? 1 : 0.7 }}>
            {busy && <Loader2 size={15} className="animate-spin" />} Analyze document
          </button>
        </div>
      </div>
    </div>
  );
}
