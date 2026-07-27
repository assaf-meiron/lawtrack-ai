import React, { useEffect, useMemo, useState } from "react";
import {
  Loader2, History, FileText, AlertCircle, Download, Search, X, Quote, SlidersHorizontal,
} from "lucide-react";
import * as api from "./api.js";
import { T, countryFlag, docTypeLabel, StatusPill, LAYER_TYPE_META } from "./shared.jsx";

const COUNTRY_NAME = {
  US: "United States", FR: "France", AU: "Australia", DE: "Germany", BR: "Brazil",
  CA: "Canada", IN: "India", ES: "Spain", MX: "Mexico", "—": "Reference",
};
// layer types grouped/ordered under a country, with a section label
const SUBTYPE_ORDER = ["country", "state", "cba", "company"];
const SUBTYPE_LABEL = {
  country: "Country / federal", state: "States & provinces",
  cba: "Collective agreements", company: "Reference",
};
const countryCode = (jur) => (jur || "—").split("-")[0];

/* Knowledge Hub — a layer's codified ground truth. ("Layer" stays the word for the thing itself; the
   screen is what got renamed, so the file, the props and the API keep their names.)

   Navigation is a two-column split rather than one long tree: a rail of countries that never needs
   scrolling (one row per country, not per layer) and, beside it, only the selected country's layers.
   The old single tree grew with the *total* layer count, so at the scale this is heading for —
   hundreds of CBAs under a handful of countries — finding anything meant scrolling past everything.
   Here the rail's height tracks the number of countries, which stays small.

   The configuration itself is rendered as the six pay-policy tabs a reviewer actually edits
   (docs/pay-policy/pay-policy-configuration.md), labelled the way the product labels them, with the
   clause each value came from sitting next to it. */
export default function LayersScreen({ fireToast }) {
  const [policies, setPolicies] = useState([]);
  const [schema, setSchema] = useState(null);
  const [country, setCountry] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diffDocId, setDiffDocId] = useState(null);
  const [diff, setDiff] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(null); // null = all, else one of SUBTYPE_ORDER

  // Countries with their layers, filtered by the search box and the layer-type chips. A search
  // spans every country, so the rail also reports how many matches each one holds.
  const countries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (p) =>
      (!typeFilter || p.layer_type === typeFilter) &&
      (!q ||
        [p.name, p.subtitle, p.jurisdiction, p.layer_type, COUNTRY_NAME[countryCode(p.jurisdiction)]]
          .filter(Boolean)
          .some((s) => String(s).toLowerCase().includes(q)));
    const byCountry = {};
    policies.filter(match).forEach((p) => {
      const cc = countryCode(p.jurisdiction);
      (byCountry[cc] = byCountry[cc] || []).push(p);
    });
    return Object.entries(byCountry)
      .map(([cc, layers]) => ({ cc, layers, flag: layers[0].flag || countryFlag(cc) }))
      .sort((a, b) => b.layers.length - a.layers.length || a.cc.localeCompare(b.cc));
  }, [policies, query, typeFilter]);

  const typeCounts = useMemo(() => {
    const c = {};
    policies.forEach((p) => { c[p.layer_type] = (c[p.layer_type] || 0) + 1; });
    return c;
  }, [policies]);

  const active = countries.find((c) => c.cc === country) || countries[0] || null;

  useEffect(() => {
    Promise.all([api.listPolicies(), api.payPolicySchema()])
      .then(([ps, sc]) => {
        setPolicies(ps);
        setSchema(sc);
        if (ps.length) {
          setCountry(countryCode(ps[0].jurisdiction));
          setSelectedId(ps[0].id);
        }
      })
      .catch((e) => fireToast(e.message, "error"))
      .finally(() => setLoading(false));
  }, [fireToast]);

  // Keep the selection inside the country on screen: switching country (or narrowing the filters
  // until the selected layer is gone) should land on something, never on an empty detail pane.
  useEffect(() => {
    if (!active) return;
    if (!active.layers.some((l) => l.id === selectedId)) setSelectedId(active.layers[0].id);
  }, [active, selectedId]);

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
    <div className="mx-auto" style={{ maxWidth: 1240 }}>
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold tracking-tight" style={{ color: T.ink }}>Knowledge Hub — the ground truth</div>
          <div className="text-xs mt-0.5" style={{ color: T.muted }}>
            Every layer's live configuration, the clause behind each value, and what it still can't express.
          </div>
        </div>
        <button onClick={downloadBacklog}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium shrink-0"
          style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink2 }}>
          <Download size={15} /> Unsupported-calc backlog
        </button>
      </div>

      {/* search + type filter, spanning both navigation columns */}
      <div className="px-6 pb-3 flex items-center gap-2.5 flex-wrap">
        <div className="relative" style={{ width: 300 }}>
          <Search size={14} color={T.faint} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country, state, CBA…"
            className="w-full rounded-lg pl-8 pr-7 py-2 text-sm outline-none"
            style={{ border: `1px solid ${T.line2}`, color: T.ink, background: "#fff" }} />
          {query && (
            <button onClick={() => setQuery("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: T.faint }}>
              <X size={13} />
            </button>
          )}
        </div>
        <FilterChip active={!typeFilter} onClick={() => setTypeFilter(null)} label="All" count={policies.length} />
        {SUBTYPE_ORDER.filter((st) => typeCounts[st]).map((st) => (
          <FilterChip key={st} active={typeFilter === st} onClick={() => setTypeFilter(typeFilter === st ? null : st)}
            label={LAYER_TYPE_META[st]?.label || st} count={typeCounts[st]} />
        ))}
        <span className="text-xs ml-auto" style={{ color: T.faint }}>
          {policies.length} layers · {new Set(policies.map((p) => countryCode(p.jurisdiction))).size} countries
        </span>
      </div>

      {countries.length === 0 ? (
        <div className="mx-6 mb-16 text-sm rounded-xl p-10 text-center" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
          No layers match your filters.
        </div>
      ) : (
        <div className="px-6 pb-16 flex gap-4" style={{ alignItems: "flex-start" }}>
          {/* the rail: one row per country, so its height tracks countries and not layers */}
          <div className="shrink-0 rounded-xl overflow-hidden" style={{ width: 82, background: "#fff", border: `1px solid ${T.line}` }}>
            {countries.map((c, i) => {
              const on = active?.cc === c.cc;
              return (
                <button key={c.cc} onClick={() => setCountry(c.cc)} title={`${COUNTRY_NAME[c.cc] || c.cc} · ${c.layers.length} layers`}
                  className="w-full flex flex-col items-center gap-0.5 py-2.5 transition-colors relative"
                  style={{
                    background: on ? T.signalSoft : "transparent",
                    borderTop: i ? `1px solid ${T.line}` : "none",
                  }}>
                  {on && <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: T.signal }} />}
                  <span style={{ fontSize: 21, lineHeight: 1 }}>{c.flag}</span>
                  <span className="font-semibold" style={{ fontSize: 10, color: on ? T.signal : T.ink2 }}>{c.cc}</span>
                  <span style={{ fontSize: 9.5, color: T.faint }}>{c.layers.length}</span>
                </button>
              );
            })}
          </div>

          {/* the selected country's layers, grouped country → state → CBA */}
          <div className="shrink-0 rounded-xl overflow-hidden flex flex-col" style={{ width: 288, background: "#fff", border: `1px solid ${T.line}` }}>
            <div className="px-3.5 py-2.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${T.line}`, background: "#fbfcfe" }}>
              <span style={{ fontSize: 15 }}>{active.flag}</span>
              <span className="text-sm font-semibold truncate" style={{ color: T.ink }}>{COUNTRY_NAME[active.cc] || active.cc}</span>
              <span className="ml-auto text-xs" style={{ color: T.faint }}>{active.layers.length}</span>
            </div>
            <div className="overflow-y-auto p-2 flex flex-col gap-2.5" style={{ maxHeight: "calc(100vh - 290px)" }}>
              {SUBTYPE_ORDER.map((st) => {
                const group = active.layers.filter((l) => l.layer_type === st);
                if (!group.length) return null;
                return (
                  <div key={st} className="flex flex-col gap-1">
                    {/* The tier is the most important word in this column — it's what tells a reader
                        whether they're looking at a statutory floor or an agreement sitting on top of
                        it. It was set in 9px faint caps, which read as a label for the list rather
                        than a heading over it. */}
                    <div className="flex items-center gap-2 px-1.5 pt-1.5">
                      <span style={{ fontSize: 12.5, color: T.ink, fontWeight: 700, letterSpacing: "-0.01em" }}>
                        {SUBTYPE_LABEL[st]}
                      </span>
                      <span className="rounded-full px-1.5" style={{ fontSize: 10, background: "#eef1f6", color: T.muted, fontWeight: 700 }}>
                        {group.length}
                      </span>
                      <span className="h-px flex-1" style={{ background: T.line }} />
                    </div>
                    {group.map((p) => {
                      const on = p.id === selectedId;
                      return (
                        <button key={p.id} onClick={() => setSelectedId(p.id)}
                          className="text-left rounded-lg px-2.5 py-2 transition-colors"
                          style={{
                            background: on ? T.signalSoft : "transparent",
                            borderLeft: `3px solid ${on ? T.signal : "transparent"}`,
                          }}>
                          <div className="text-xs font-medium leading-snug" style={{ color: on ? T.ink : T.ink2 }}>{p.name}</div>
                          <div className="mt-0.5 flex items-center gap-1.5" style={{ fontSize: 10, color: T.faint }}>
                            <span className="truncate">{p.subtitle || p.jurisdiction}</span>
                            <span>·</span>
                            <span style={{ color: p.version > 0 ? "#047857" : T.faint, fontWeight: 600 }}>
                              {p.version > 0 ? `v${p.version}` : "no version"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* right: the layer itself */}
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
                    {LAYER_TYPE_META[detail.layer_type]?.full || detail.layer_type} · {detail.jurisdiction} · current version{" "}
                    <span style={{ color: detail.version > 0 ? "#047857" : T.faint, fontWeight: 600 }}>{detail.version > 0 ? `v${detail.version}` : "—"}</span>
                  </div>
                </div>

                <PayPolicyConfig config={detail.config} provenance={detail.provenance} schema={schema} />

                <Panel Icon={History} title={`Version history (${detail.versions.length})`}>
                  {detail.versions.length === 0 ? (
                    <Empty>No committed versions yet.</Empty>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {[...detail.versions].reverse().map((v) => (
                        <div key={v.id} className="rounded-lg p-3" style={{ border: `1px solid ${T.line}`, background: "#f7f9fc" }}>
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
                              style={{ border: `1px solid ${on ? T.line2 : T.line}`, background: on ? "#f7f9fc" : "#fff" }}>
                              <div className="min-w-0">
                                <div className="text-sm font-medium truncate" style={{ color: T.ink }}>{e.title}</div>
                                <div className="text-xs uppercase tracking-wide" style={{ fontSize: 9, color: T.faint }}>
                                  {docTypeLabel(e.doc_type)} · {on ? "hide changes" : "see how it changes the policy"}
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
      )}
    </div>
  );
}

// count fields across a structured six-tab config ({tab: {code: value}})
function countConfigFields(config) {
  if (!config) return 0;
  return Object.values(config).reduce((n, tab) => n + (tab && typeof tab === "object" ? Object.keys(tab).length : 0), 0);
}

/* The configuration, as the pay policy a reviewer edits: the product's own tabs, the product's own
   field labels, and next to each value the clause it came from.

   The previous rendering listed raw capability codes ("OT/d", "BH->pay", "Not-prg") against dense
   one-line values. Those codes are the pipeline's internal keys — they're how a finding is routed to
   a field, not what anyone configuring a policy sees — so the screen read as a debug dump of a
   product nobody could recognise. */
function PayPolicyConfig({ config, provenance, schema }) {
  const populated = useMemo(() => {
    const order = schema?.tabs || Object.keys(config || {});
    return order
      .map((tab) => [tab, config?.[tab] || {}])
      .filter(([, fields]) => Object.keys(fields).length > 0);
  }, [config, schema]);

  const [tab, setTab] = useState(null);
  const activeTab = populated.some(([t]) => t === tab) ? tab : populated[0]?.[0];
  const total = countConfigFields(config);
  const traced = Object.keys(provenance || {}).length;

  if (total === 0) {
    return (
      <Panel Icon={SlidersHorizontal} title="Pay policy configuration">
        <Empty>No values committed yet. Finalize a document to populate this layer.</Empty>
      </Panel>
    );
  }

  const fields = Object.entries(config[activeTab] || {});

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: `1px solid ${T.line}` }}>
      <div className="px-4 pt-3.5 pb-3 flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <div className="text-sm font-semibold" style={{ color: T.ink }}>Pay policy configuration</div>
          <div className="text-xs mt-0.5" style={{ color: T.muted }}>
            {total} setting{total === 1 ? "" : "s"} across {populated.length} tab{populated.length === 1 ? "" : "s"}
            {traced > 0 && <> · <span style={{ color: "#047857", fontWeight: 600 }}>{traced} traced to a clause</span></>}
          </div>
        </div>
      </div>

      {/* the product's own tabs — only those carrying values */}
      <div className="px-4 flex items-center gap-1 flex-wrap" style={{ borderBottom: `1px solid ${T.line}` }}>
        {populated.map(([t, f]) => {
          const on = t === activeTab;
          return (
            <button key={t} onClick={() => setTab(t)}
              className="relative px-3 py-2.5 text-xs font-semibold transition-colors"
              style={{ color: on ? T.signal : T.muted }}>
              {t}
              <span className="ml-1.5 font-normal" style={{ color: T.faint }}>{Object.keys(f).length}</span>
              {on && <span style={{ position: "absolute", left: 6, right: 6, bottom: -1, height: 2, background: T.signal, borderRadius: 2 }} />}
            </button>
          );
        })}
      </div>

      <div>
        {fields.map(([code, value], i) => {
          const meta = schema?.fields?.[code];
          const src = provenance?.[code];
          return (
            <div key={code} className="px-4 py-3" style={{ borderTop: i ? `1px solid ${T.line}` : "none" }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-medium" style={{ color: T.ink }}>{meta?.label || code}</span>
                <span className="uppercase tracking-wider rounded px-1.5 py-0.5" style={{ fontSize: 8.5, background: "#eef1f6", color: T.faint, fontWeight: 700 }}>
                  {code}
                </span>
                {meta?.unit && meta.unit !== "text" && (
                  <span style={{ fontSize: 10, color: T.faint }}>{meta.unit}</span>
                )}
              </div>

              {/* the value, in something that looks like the control it is */}
              <div className="mt-1.5 rounded-lg px-3 py-2 text-sm leading-relaxed"
                style={{ background: "#f7f9fc", border: `1px solid ${T.line}`, color: T.ink }}>
                {String(value)}
              </div>

              {src ? (
                <div className="mt-1.5 flex items-start gap-1.5" style={{ fontSize: 11, color: T.muted }}>
                  <Quote size={11} color={T.faint} className="shrink-0" style={{ marginTop: 2 }} />
                  <span>
                    <span style={{ color: T.ink2, fontWeight: 600 }}>{src.document_title}</span>
                    {src.clause_ref && <> · {src.clause_ref}</>} · p.{src.page}
                    {src.approver && <> · approved by {src.approver}</>}
                    <span className="block italic mt-0.5" style={{ color: T.faint }}>“{src.source_quote}”</span>
                  </span>
                </div>
              ) : (
                <div className="mt-1.5" style={{ fontSize: 11, color: T.faint }}>
                  Baseline value — not yet traced to a reviewed clause.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// the pay policy and how a document changes it: per-field current → proposed, plus gaps
function ConfigDiff({ diff }) {
  const changed = diff.diff.filter((d) => d.changed);
  const unchanged = diff.diff.filter((d) => !d.changed);
  return (
    <div className="rounded-lg p-3" style={{ border: `1px solid ${T.line2}`, background: "#f9fafc" }}>
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

function FilterChip({ active, onClick, label, count }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
      style={{
        background: active ? T.ink : "#fff",
        color: active ? "#fff" : T.ink2,
        border: `1px solid ${active ? T.ink : T.line2}`,
      }}>
      {label} <span style={{ color: active ? "rgba(255,255,255,0.7)" : T.faint }}>{count}</span>
    </button>
  );
}

const Empty = ({ children }) => (
  <div className="text-sm rounded-lg p-4 text-center" style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>{children}</div>
);
