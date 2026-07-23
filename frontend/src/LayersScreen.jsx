import React, { useEffect, useMemo, useState } from "react";
import { Loader2, History, FileText, AlertCircle, Download, Layers as LayersIcon, Search, ChevronRight } from "lucide-react";
import * as api from "./api.js";
import { T, countryFlag, StatusPill } from "./shared.jsx";

const COUNTRY_NAME = {
  US: "United States", FR: "France", AU: "Australia", DE: "Germany", BR: "Brazil",
  CA: "Canada", IN: "India", ES: "Spain", MX: "Mexico", "—": "Reference",
};
// layer types grouped/ordered under a country, with a section label
const SUBTYPE_ORDER = ["country", "state", "cba", "company"];
const SUBTYPE_LABEL = {
  country: "Country / federal", state: "States & provinces",
  cba: "Collective agreements (CBA · Award · CCN · Tarifvertrag)", company: "Reference",
};
const countryCode = (jur) => (jur || "—").split("-")[0];

export default function LayersScreen({ fireToast }) {
  const [policies, setPolicies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diffDocId, setDiffDocId] = useState(null);
  const [diff, setDiff] = useState(null);
  const [query, setQuery] = useState("");
  const [openCountries, setOpenCountries] = useState({}); // countryCode -> bool (manual toggles)

  // Filter by country / jurisdiction / CBA (name, subtitle, jurisdiction code, layer type), then
  // build a country → layers tree so hundreds of layers stay navigable (collapsed by country).
  const tree = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (p) =>
      !q ||
      [p.name, p.subtitle, p.jurisdiction, p.layer_type, COUNTRY_NAME[countryCode(p.jurisdiction)], countryFlag(p.jurisdiction)]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q));
    const byCountry = {};
    policies.filter(match).forEach((p) => {
      const cc = countryCode(p.jurisdiction);
      (byCountry[cc] = byCountry[cc] || []).push(p);
    });
    return Object.entries(byCountry).sort(([a], [b]) => a.localeCompare(b));
  }, [policies, query]);

  useEffect(() => {
    api.listPolicies()
      .then((ps) => { setPolicies(ps); if (ps.length) setSelectedId(ps[0].id); })
      .catch((e) => fireToast(e.message, "error"))
      .finally(() => setLoading(false));
  }, [fireToast]);

  useEffect(() => {
    if (!selectedId) return;
    setDetail(null);
    setDiffDocId(null);
    setDiff(null);
    api.getPolicy(selectedId).then(setDetail).catch((e) => fireToast(e.message, "error"));
  }, [selectedId, fireToast]);

  function openDiff(docId) {
    if (diffDocId === docId) { setDiffDocId(null); setDiff(null); return; }  // toggle
    setDiffDocId(docId);
    setDiff(null);
    api.configDiff(docId).then(setDiff).catch((e) => fireToast(e.message, "error"));
  }

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
        {/* left: searchable country tree (scales to hundreds of layers) */}
        <div className="shrink-0 flex flex-col gap-2" style={{ width: 320 }}>
          <div className="relative">
            <Search size={14} color={T.faint} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country, state, jurisdiction, CBA…"
              className="w-full rounded-lg pl-8 pr-3 py-2 text-sm outline-none"
              style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }}
            />
          </div>
          <div className="px-1 text-xs" style={{ color: T.faint }}>
            {policies.length} layers across {new Set(policies.map((p) => countryCode(p.jurisdiction))).size} countries
          </div>

          {tree.length === 0 ? (
            <div className="text-xs rounded-lg p-4 text-center" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
              No layers match “{query}”.
            </div>
          ) : (
            <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 220px)" }}>
              {tree.map(([cc, layers]) => {
                const isOpen = query.trim()
                  ? true
                  : (cc in openCountries ? openCountries[cc] : layers.some((l) => l.id === selectedId));
                const bySub = {};
                layers.forEach((l) => { (bySub[l.layer_type] = bySub[l.layer_type] || []).push(l); });
                return (
                  <div key={cc}>
                    <button onClick={() => setOpenCountries((o) => ({ ...o, [cc]: !isOpen }))}
                      className="w-full flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-50 transition-colors">
                      <ChevronRight size={14} color={T.muted} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                      <span className="text-sm">{layers[0].flag || countryFlag(cc)}</span>
                      <span className="text-sm font-semibold truncate" style={{ color: T.ink }}>{COUNTRY_NAME[cc] || cc}</span>
                      <span className="ml-auto text-xs rounded-full px-1.5 py-0.5" style={{ background: "#eceae5", color: T.muted }}>{layers.length}</span>
                    </button>

                    {isOpen && (
                      <div className="ml-3 pl-2 flex flex-col gap-1.5 pb-2" style={{ borderLeft: `1px solid ${T.line}` }}>
                        {SUBTYPE_ORDER.filter((st) => bySub[st]).map((st) => (
                          <div key={st} className="flex flex-col gap-1">
                            <div className="uppercase tracking-wider px-1 pt-1" style={{ fontSize: 8.5, color: T.faint }}>{SUBTYPE_LABEL[st]}</div>
                            {bySub[st].map((p) => {
                              const on = p.id === selectedId;
                              return (
                                <button key={p.id} onClick={() => setSelectedId(p.id)}
                                  className="text-left rounded-lg px-2.5 py-2 transition-colors"
                                  style={{ background: on ? "#fff" : "transparent", border: `1px solid ${on ? T.line2 : "transparent"}`, boxShadow: on ? "0 1px 3px rgba(0,0,0,0.06)" : "none" }}>
                                  <div className="text-sm font-medium leading-snug truncate" style={{ color: on ? T.ink : T.ink2 }}>{p.name}</div>
                                  <div className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: T.faint }}>
                                    {p.subtitle ? <span className="truncate">{p.subtitle}</span> : <span>{p.jurisdiction}</span>}
                                    <span>·</span>
                                    <span style={{ color: p.version > 0 ? "#047857" : T.faint }}>{p.version > 0 ? `v${p.version}` : "no version"}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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

              <Panel Icon={LayersIcon} title={`Pay policy — current configuration (${countConfigFields(detail.config)})`}>
                <StructuredConfig config={detail.config} />
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
                    {detail.editions.map((e) => {
                      const on = e.id === diffDocId;
                      return (
                        <div key={e.id}>
                          <button onClick={() => openDiff(e.id)}
                            className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors"
                            style={{ border: `1px solid ${on ? T.line2 : T.line}`, background: on ? "#faf9f7" : "#fff" }}>
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate" style={{ color: T.ink }}>{e.title}</div>
                              <div className="text-xs uppercase tracking-wide" style={{ fontSize: 9, color: T.faint }}>
                                {e.doc_type} · {on ? "hide changes" : "see how it changes the policy"}
                              </div>
                            </div>
                            <StatusPill status={e.status} />
                          </button>
                          {on && (
                            <div className="mt-2">
                              {!diff ? (
                                <div className="text-xs px-3 py-3" style={{ color: T.faint }}>
                                  <Loader2 size={13} className="animate-spin inline" /> Computing the diff…
                                </div>
                              ) : (
                                <ConfigDiff diff={diff} />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
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

// count fields across a structured six-tab config ({tab: {code: value}})
function countConfigFields(config) {
  if (!config) return 0;
  return Object.values(config).reduce((n, tab) => n + (tab && typeof tab === "object" ? Object.keys(tab).length : 0), 0);
}

// render the pay policy as its six tabs, each listing its configured fields (code → value)
function StructuredConfig({ config }) {
  if (countConfigFields(config) === 0) {
    return <Empty>No values committed yet. Finalize a document to populate this layer.</Empty>;
  }
  const tabs = Object.entries(config).filter(([, fields]) => fields && Object.keys(fields).length > 0);
  return (
    <div className="flex flex-col gap-3">
      {tabs.map(([tab, fields]) => (
        <div key={tab}>
          <div className="text-xs font-semibold mb-1" style={{ color: T.ink2 }}>{tab}</div>
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
            {Object.entries(fields).map(([code, v], i, arr) => (
              <div key={code} className="flex items-start gap-3 px-3 py-2 text-sm"
                style={{ borderBottom: i < arr.length - 1 ? `1px solid ${T.line}` : "none" }}>
                <span className="font-medium shrink-0" style={{ color: T.ink2, width: "40%" }}>{code}</span>
                <span style={{ color: T.ink }}>{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// the pay policy and how a document changes it: per-field current → proposed, plus gaps
function ConfigDiff({ diff }) {
  const changed = diff.diff.filter((d) => d.changed);
  const unchanged = diff.diff.filter((d) => !d.changed);
  return (
    <div className="rounded-lg p-3" style={{ border: `1px solid ${T.line2}`, background: "#fbfaf8" }}>
      <div className="text-xs mb-2" style={{ color: T.muted }}>
        {diff.policy ? <>Against <strong style={{ color: T.ink2 }}>{diff.policy.name}</strong> v{diff.policy.version} · </> : null}
        <span style={{ color: changed.length ? "#b45309" : T.faint }}>{changed.length} field change{changed.length === 1 ? "" : "s"}</span>
        {" · "}
        <span style={{ color: diff.gap_count ? "#2563eb" : T.faint }}>{diff.gap_count} gap{diff.gap_count === 1 ? "" : "s"}</span>
      </div>

      {changed.length === 0 ? (
        <div className="text-xs px-2 py-1" style={{ color: T.faint }}>No field changes proposed.</div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {changed.map((d) => (
            <div key={d.finding_id} className="rounded-md px-3 py-2" style={{ border: `1px solid ${T.line}`, background: "#fff" }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: T.faint }}>
                <span className="uppercase tracking-wide" style={{ fontSize: 9 }}>{d.tab}</span>
                <span>· {d.clause_ref || d.code}</span>
                {!d.applied && <span style={{ color: "#b45309" }}>· pending review</span>}
              </div>
              <div className="text-sm font-medium mt-0.5" style={{ color: T.ink }}>{d.label}</div>
              <div className="flex items-center gap-2 text-sm mt-1 flex-wrap">
                <span className="rounded px-1.5 py-0.5" style={{ background: "#fef2f2", color: "#b91c1c", textDecoration: "line-through" }}>{String(d.current ?? "—")}</span>
                <span style={{ color: T.faint }}>→</span>
                <span className="rounded px-1.5 py-0.5" style={{ background: "#ecfdf5", color: "#047857" }}>{String(d.proposed ?? "—")}</span>
              </div>
              {d.source_quote && (
                <div className="text-xs mt-1 italic" style={{ color: T.muted }}>“{d.source_quote}” — p.{d.page}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {diff.gaps.length > 0 && (
        <div className="mt-2">
          <div className="text-xs font-semibold mb-1" style={{ color: "#2563eb" }}>Gaps — no home in the pay policy (→ gap file)</div>
          <div className="flex flex-col gap-1.5">
            {diff.gaps.map((g) => (
              <div key={g.finding_id} className="rounded-md px-3 py-2" style={{ border: "1px solid #dbeafe", background: "#eff6ff" }}>
                <div className="text-sm font-medium" style={{ color: "#2563eb" }}>{g.title || g.capability}</div>
                {g.rule_summary && <div className="text-xs mt-0.5" style={{ color: T.ink2 }}>{g.rule_summary}</div>}
                {g.source_quote && <div className="text-xs mt-1 italic" style={{ color: T.muted }}>“{g.source_quote}” — p.{g.page}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {unchanged.length > 0 && (
        <div className="text-xs mt-2" style={{ color: T.faint }}>
          {unchanged.length} field{unchanged.length === 1 ? "" : "s"} already aligned.
        </div>
      )}
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
