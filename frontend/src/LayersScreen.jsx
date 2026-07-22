import React, { useEffect, useState } from "react";
import { Loader2, History, FileText, AlertCircle, Download, Layers as LayersIcon } from "lucide-react";
import * as api from "./api.js";
import { T, countryFlag, StatusPill } from "./shared.jsx";

export default function LayersScreen({ fireToast }) {
  const [policies, setPolicies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listPolicies()
      .then((ps) => { setPolicies(ps); if (ps.length) setSelectedId(ps[0].id); })
      .catch((e) => fireToast(e.message, "error"))
      .finally(() => setLoading(false));
  }, [fireToast]);

  useEffect(() => {
    if (!selectedId) return;
    setDetail(null);
    api.getPolicy(selectedId).then(setDetail).catch((e) => fireToast(e.message, "error"));
  }, [selectedId, fireToast]);

  async function downloadBacklog() {
    try {
      await api.downloadFile("/api/unsupported-calculations.txt", "unsupported-calculations.txt");
    } catch (e) {
      fireToast(e.message, "error");
    }
  }

  if (loading) {
    return <div className="px-6 py-16 flex items-center gap-2 text-sm" style={{ color: T.muted }}><Loader2 size={16} className="animate-spin" /> Loading layers…</div>;
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 1180 }}>
      <div className="px-6 pt-6 pb-3 flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold tracking-tight" style={{ color: T.ink }}>Layers — the ground truth</div>
          <div className="text-xs mt-0.5" style={{ color: T.muted }}>
            Each layer's current configuration, its version history, the documents behind it, and the calculations it still can't fulfil.
          </div>
        </div>
        <button onClick={downloadBacklog}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium shrink-0"
          style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
          <Download size={15} /> Unsupported-calc backlog
        </button>
      </div>

      <div className="px-6 pb-16 flex gap-4" style={{ alignItems: "flex-start" }}>
        {/* left: layer list */}
        <div className="shrink-0 flex flex-col gap-2" style={{ width: 300 }}>
          {policies.map((p) => {
            const on = p.id === selectedId;
            return (
              <button key={p.id} onClick={() => setSelectedId(p.id)}
                className="text-left rounded-xl p-3 transition-colors"
                style={{ background: on ? "#fff" : "#faf9f7", border: `1px solid ${on ? T.line2 : T.line}`, boxShadow: on ? "0 1px 3px rgba(0,0,0,0.06)" : "none" }}>
                <div className="flex items-center gap-2">
                  <span>{p.flag || countryFlag(p.jurisdiction)}</span>
                  <span className="text-sm font-semibold truncate" style={{ color: T.ink }}>{p.name}</span>
                </div>
                <div className="text-xs mt-1 flex items-center gap-1.5" style={{ color: T.faint }}>
                  <span className="uppercase tracking-wide" style={{ fontSize: 9 }}>{p.layer_type}</span>
                  <span>· {p.jurisdiction}</span>
                  <span>·</span>
                  <span style={{ color: p.version > 0 ? "#047857" : T.faint }}>{p.version > 0 ? `v${p.version}` : "no version yet"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* right: detail */}
        <div className="flex-1 min-w-0">
          {!detail ? (
            <div className="rounded-xl p-10 text-center text-sm" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
              <Loader2 size={16} className="animate-spin inline" /> Loading…
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
                <div className="flex items-center gap-2">
                  <span className="text-base">{detail.flag || countryFlag(detail.jurisdiction)}</span>
                  <span className="text-base font-semibold" style={{ color: T.ink }}>{detail.name}</span>
                </div>
                <div className="text-xs mt-1" style={{ color: T.muted }}>
                  {detail.layer_type} · {detail.jurisdiction} · current version{" "}
                  <span style={{ color: detail.version > 0 ? "#047857" : T.faint, fontWeight: 600 }}>{detail.version > 0 ? `v${detail.version}` : "—"}</span>
                </div>
              </div>

              <Panel Icon={LayersIcon} title={`Current configuration (${Object.keys(detail.config || {}).length})`}>
                {Object.keys(detail.config || {}).length === 0 ? (
                  <Empty>No values committed yet. Finalize a document to populate this layer.</Empty>
                ) : (
                  <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
                    {Object.entries(detail.config).map(([k, v], i) => (
                      <div key={k} className="flex items-start gap-3 px-3 py-2 text-sm" style={{ borderBottom: i < Object.keys(detail.config).length - 1 ? `1px solid ${T.line}` : "none" }}>
                        <span className="font-medium shrink-0" style={{ color: T.ink2, width: "45%" }}>{k}</span>
                        <span style={{ color: T.ink }}>{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel Icon={History} title={`Version history (${detail.versions.length})`}>
                {detail.versions.length === 0 ? (
                  <Empty>No committed versions yet.</Empty>
                ) : (
                  <div className="flex flex-col gap-2">
                    {[...detail.versions].reverse().map((v) => (
                      <div key={v.id} className="rounded-lg p-3" style={{ border: `1px solid ${T.line}`, background: "#faf9f7" }}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: T.ink }}>v{v.version}</span>
                          <span className="text-xs" style={{ color: T.faint }}>{new Date(v.created_at).toLocaleString()}</span>
                        </div>
                        <div className="text-xs mt-1" style={{ color: T.ink2 }}>
                          {v.change_count} change{v.change_count === 1 ? "" : "s"} · from <em>{v.source_document_title || "—"}</em> · approved by {v.approver || "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel Icon={FileText} title={`Documents / editions (${detail.editions.length})`}>
                {detail.editions.length === 0 ? (
                  <Empty>No documents attached to this layer.</Empty>
                ) : (
                  <div className="flex flex-col gap-2">
                    {detail.editions.map((e) => (
                      <div key={e.id} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ border: `1px solid ${T.line}` }}>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate" style={{ color: T.ink }}>{e.title}</div>
                          <div className="text-xs uppercase tracking-wide" style={{ fontSize: 9, color: T.faint }}>{e.doc_type}</div>
                        </div>
                        <StatusPill status={e.status} />
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel Icon={AlertCircle} title={`Can't-be-fulfilled calculations (${detail.unsupported.length})`}>
                {detail.unsupported.length === 0 ? (
                  <Empty>None — every accepted rule maps to a config parameter.</Empty>
                ) : (
                  <div className="flex flex-col gap-2">
                    {detail.unsupported.map((u) => (
                      <div key={u.id} className="rounded-lg p-3" style={{ border: `1px solid #dbeafe`, background: "#eff6ff" }}>
                        <div className="text-sm font-semibold" style={{ color: "#2563eb" }}>{u.title || u.capability}</div>
                        <div className="text-xs mt-1" style={{ color: T.ink2 }}>{u.description}</div>
                        <div className="text-xs mt-1 italic" style={{ color: T.muted }}>“{u.source_quote}” — p.{u.page}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Panel({ Icon, title, children }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: T.ink2 }}>
        <Icon size={14} color={T.muted} /> {title}
      </div>
      {children}
    </div>
  );
}

const Empty = ({ children }) => (
  <div className="text-sm rounded-lg p-4 text-center" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>{children}</div>
);
