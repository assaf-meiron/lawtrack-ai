import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Radar, Globe2, Search, Filter, Network, Share2, UserCheck, Flag, FileText, Sparkles,
  X, RefreshCw, Clock, AlertTriangle, CheckCircle2, Loader2, ChevronDown, ChevronRight, Play, Waypoints,
} from "lucide-react";
import * as api from "./api.js";
import { T, CLASS, countryFlag, docTypeLabel } from "./shared.jsx";
import ResourceGraph from "./ResourceGraph.jsx";

/* The source scanner — Phase 2 of docs/lawtrack-ai/agent-plan.md, made visible.

   Phase 1 (digest one uploaded PDF) is the built product and the whole of the review surface. Phase 2
   *finds* the documents: watch per-jurisdiction registries, triage what materially changes time & pay,
   run the same digest, then work out which layers the change reaches and fan the diff out across them.

   This module is the operator's view of that loop: a status chip that says how many documents were
   found in the last 48 hours, a panel with the watch list and the finds, and a scan run that walks the
   seven steps of the plan with live numbers. Detection is the one simulated part (the backend surfaces
   a prepared document instead of fetching a gazette — see app/routers/agent.py); everything a find then
   carries is real, and clicking Review lands in the same Phase-1 queue as a manual upload. */

const AgentCtx = createContext(null);
export const useAgent = () => useContext(AgentCtx);

/* A document whose `source` starts with this was found by the scanner, not uploaded by hand.
   The backend strips the prefix in its own payloads; the documents list still sees the raw value. */
export const AGENT_SOURCE_PREFIX = "Agent · ";
export const isAgentFound = (doc) => (doc?.source || "").startsWith(AGENT_SOURCE_PREFIX);
export const agentSourceName = (doc) => (doc?.source || "").slice(AGENT_SOURCE_PREFIX.length);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* The Latin America expansion list — countries the agent could be pointed at next.
   UI-only for now (Watch countries, below): toggling here doesn't touch the backend source
   registry yet, it's a preview of where coverage is headed. Brazil ships with a full resource
   graph (ResourceGraph.jsx); the rest are toggleable placeholders until that research lands. */
export const COUNTRY_GROUPS = [
  { region: "South America", countries: [
    { code: "AR", name: "Argentina" }, { code: "BR", name: "Brazil" }, { code: "BO", name: "Bolivia" },
    { code: "CL", name: "Chile" }, { code: "CO", name: "Colombia" }, { code: "EC", name: "Ecuador" },
    { code: "PY", name: "Paraguay" }, { code: "PE", name: "Peru" }, { code: "UY", name: "Uruguay" },
    { code: "VE", name: "Venezuela" },
  ] },
  { region: "Mexico & Central America", countries: [
    { code: "MX", name: "Mexico" }, { code: "CR", name: "Costa Rica" }, { code: "SV", name: "El Salvador" },
    { code: "GT", name: "Guatemala" }, { code: "HN", name: "Honduras" },
  ] },
  { region: "The Caribbean", countries: [
    { code: "DO", name: "Dominican Republic" }, { code: "PR", name: "Puerto Rico" },
  ] },
];
const WATCH_COUNTRIES_KEY = "lt.agent.watchCountries";
const DEFAULT_WATCHED = ["BR"]; // Brazil ships with the full resource graph — on by default

function loadWatchedCountries() {
  try {
    const raw = JSON.parse(localStorage.getItem(WATCH_COUNTRIES_KEY));
    return Array.isArray(raw) ? raw : DEFAULT_WATCHED;
  } catch {
    return DEFAULT_WATCHED;
  }
}

/* ---- the agent's mark: a gradient badge that never sits still, plus a scan-time ping ring ---- */
export function AgentIcon({ size = 18, scanning = false }) {
  const ring = Math.round(size * 1.7);
  return (
    <span className="relative flex items-center justify-center shrink-0" style={{ width: ring, height: ring }}>
      <span className="absolute rounded-full" style={{
        width: ring, height: ring, background: T.signal, opacity: 0.14,
        animation: scanning ? "lt-ping 1.4s ease-out infinite" : "lt-breathe 3.2s ease-in-out infinite",
      }} />
      <span className="absolute rounded-full" style={{
        width: size, height: size,
        background: T.aiGradient, backgroundSize: "220% 220%",
        boxShadow: "0 0 0 3px rgba(124,108,246,0.10), 0 2px 6px rgba(30,151,247,0.25)",
        animation: "lt-gradient-shift 6s ease-in-out infinite, lt-breathe-strong 2.4s ease-in-out infinite",
      }} />
      <Sparkles size={Math.round(size * 0.52)} color="#fff" style={{ position: "relative" }} strokeWidth={2.25} />
    </span>
  );
}

/* The seven steps of agent-plan.md §Phase 2. `detail` is what the step does; `result` reads the scan
   report once the run gets there, so the walkthrough shows real numbers rather than a fake progress bar. */
const STAGES = [
  { key: "detect", label: "Detect", Icon: Globe2,
    detail: "Fetch each watched source · hash + version · new, or a renewal of something we track?",
    result: (r) => `${r.sources_checked} sources · ${r.candidates_seen} candidates` },
  { key: "triage", label: "Triage", Icon: Filter,
    detail: "Cheap pass: does this materially change time & pay rules, or is it noise?",
    result: (r) => `${r.triaged_out} triaged out · ${r.discovered.length} material` },
  { key: "digest", label: "Digest", Icon: Search,
    detail: "The Phase-1 loop, unchanged: extract cited clauses → map to the taxonomy → draft the change cards",
    result: (r) => `${r.discovered.reduce((n, d) => n + d.findings, 0)} findings, each with its clause` },
  { key: "affected", label: "Who's affected", Icon: Network,
    detail: "Enumerate the layers the change reaches through four-layer inheritance (a query, not the model)",
    result: (r) => `${r.discovered.reduce((n, d) => n + d.affected_layers, 0)} layers affected` },
  { key: "fanout", label: "Fan out", Icon: Share2,
    detail: "Diff the change against every affected layer in bulk via the Batch API",
    result: (r) => `${r.discovered.reduce((n, d) => n + d.affected_layers, 0)} diffs queued` },
  { key: "curate", label: "Legal review", Icon: UserCheck,
    detail: "Findings go to internal legal curation before any tenant sees them",
    result: (r) => `${r.discovered.reduce((n, d) => n + d.needs_action, 0)} cards need a decision` },
  { key: "flag", label: "Tenant flag", Icon: Flag,
    detail: "The affected tenant sees a flag, the cited draft diff, and the audit trail",
    result: (r) => (r.discovered.length ? `${r.discovered.length} document in the inbox` : "nothing new to flag") },
];

export function AgentProvider({ children, fireToast, onOpenDocument }) {
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [stage, setStage] = useState(-1);      // index into STAGES while a run walks them
  const [report, setReport] = useState(null);  // the last scan report
  const [foundTick, setFoundTick] = useState(0); // bumped when a scan lands a document
  const alive = useRef(true);

  // Reset on every (re)mount, not just declared once — otherwise React 18 StrictMode's dev-mode
  // double-invoke (mount → cleanup → mount) flips this false on the throwaway first mount and the
  // real one never sees a live ref, so `refresh()` silently drops every status update forever.
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  const refresh = useCallback(async () => {
    try {
      const s = await api.agentStatus();
      if (alive.current) setStatus(s);
    } catch {
      /* the scanner is ambient — a failed poll must never interrupt the review surface */
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const scan = useCallback(async () => {
    if (scanning) return;
    setScanning(true);
    setReport(null);
    setStage(0);
    const pending = api.runAgentScan();   // the real call runs while the walkthrough plays
    let result = null;
    try {
      for (let i = 0; i < STAGES.length; i++) {
        setStage(i);
        await sleep(i === 0 ? 700 : 620);
        if (i === 1) result = await pending;   // triage is where the report has to exist
        if (result) setReport(result);
      }
      setStage(STAGES.length);
      if (result?.discovered?.length) {
        setFoundTick((n) => n + 1);
        fireToast?.(result.message, "ready");
      } else {
        fireToast?.(result?.message || "Scan complete.");
      }
      await refresh();
    } catch (e) {
      fireToast?.(e.message, "error");
      setStage(-1);
    } finally {
      if (alive.current) setScanning(false);
    }
  }, [scanning, fireToast, refresh]);

  const value = useMemo(
    () => ({ status, open, setOpen, scan, scanning, stage, report, foundTick, refresh, onOpenDocument }),
    [status, open, scan, scanning, stage, report, foundTick, refresh, onOpenDocument],
  );

  return (
    <AgentCtx.Provider value={value}>
      {children}
      <AgentPanel />
    </AgentCtx.Provider>
  );
}

/* ---- relative time, the unit the scanner is read in ---- */
export function relTime(iso) {
  if (!iso) return "—";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.round(mins / 60);
  if (h < 48) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

/* ---- the chip: top-right status, "found in the last 48 hours" ---- */
export function AgentChip() {
  const { status, setOpen, scanning } = useAgent() || {};
  const found = status?.found_in_window ?? 0;
  const label = status
    ? `Day.io Agent · ${found} document${found === 1 ? "" : "s"} found in the last ${status.found_window_hours}h · ${status.source_count} sources watched`
    : "Day.io Agent";

  return (
    <button onClick={() => setOpen(true)} title={label}
      className="relative flex items-center gap-2 rounded-lg pl-2.5 pr-3 py-1.5 transition-colors"
      style={{ border: `1px solid ${T.line2}`, background: "#fff" }}>
      <AgentIcon size={18} scanning={scanning} />
      <span className="text-left leading-none">
        <span className="block text-xs font-semibold" style={{ color: T.ink }}>
          {scanning ? "Scanning…" : "Day.io Agent"}
        </span>
        <span className="block" style={{ fontSize: 10, color: T.faint, marginTop: 2 }}>
          {status ? `${found} found · 48h` : "…"}
        </span>
      </span>
      {found > 0 && (
        <span className="flex items-center justify-center rounded-full font-bold"
          style={{ minWidth: 18, height: 18, padding: "0 5px", fontSize: 10, background: T.signal, color: "#fff" }}>
          {found}
        </span>
      )}
    </button>
  );
}

/* ---- the strip: what the scanner is doing, above the inbox ---- */
export function AgentStrip() {
  const { status, setOpen, scan, scanning } = useAgent() || {};
  if (!status) return null;
  const stats = [
    { n: status.found_in_window, label: `found · last ${status.found_window_hours}h`, color: T.signal },
    { n: status.awaiting_review, label: "awaiting review", color: T.ink },
    { n: status.conflicts_open, label: "conflicts to triage", color: CLASS.conflict.dot },
  ];
  return (
    <div className="rounded-xl px-4 py-3 flex items-center gap-4 flex-wrap"
      style={{ background: "rgba(255,255,255,0.86)", border: `1px solid ${T.line}`, backdropFilter: "blur(6px)", boxShadow: "0 1px 3px rgba(35,40,56,0.05)" }}>
      <div className="flex items-center gap-2.5 min-w-0">
        <AgentIcon size={26} scanning={scanning} />
        <div className="min-w-0">
          <div className="text-sm font-semibold flex items-center gap-2" style={{ color: T.ink }}>
            {scanning ? "Day.io Agent scanning…" : "Day.io Agent"}
            <span className="uppercase tracking-wider rounded px-1.5 py-0.5" style={{ fontSize: 9, background: T.aiSoft, color: "#6d5bd0" }}>
              AI · Preview
            </span>
          </div>
          <div className="text-xs mt-0.5 truncate" style={{ color: T.muted }}>
            Watching {status.source_count} registries across {status.jurisdictions.length} jurisdictions ·
            last run {relTime(status.last_scan_at)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 ml-auto">
        {stats.map((s) => (
          <div key={s.label} className="text-right">
            <div className="text-lg font-semibold leading-none" style={{ color: s.color }}>{s.n}</div>
            <div style={{ fontSize: 10, color: T.faint, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
        <button onClick={scan} disabled={scanning}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-transform active:scale-95"
          style={{ background: scanning ? T.line2 : "#fff", border: `1px solid ${scanning ? T.line2 : T.signal}`, color: scanning ? T.muted : T.signal }}>
          {scanning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />} Run scan
        </button>
        <button onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-transform active:scale-95"
          style={{ background: T.ink }}>
          Open agent <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ---- the panel: watch list, run walkthrough, and the feed of finds ---- */
function AgentPanel() {
  const { status, open, setOpen, scan, scanning, stage, report, onOpenDocument } = useAgent() || {};
  const [showSources, setShowSources] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [watched, setWatched] = useState(loadWatchedCountries);
  const [graphCountry, setGraphCountry] = useState(null);

  useEffect(() => {
    localStorage.setItem(WATCH_COUNTRIES_KEY, JSON.stringify(watched));
  }, [watched]);

  const toggleCountry = (code) =>
    setWatched((w) => (w.includes(code) ? w.filter((c) => c !== code) : [...w, code]));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end" style={{ background: "rgba(20,24,36,0.32)" }}
      onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className="h-full overflow-y-auto"
        style={{ width: 520, maxWidth: "100vw", background: T.paper, boxShadow: "-16px 0 40px rgba(0,0,0,0.18)" }}>

        {/* header */}
        <div className="px-5 py-4 flex items-start justify-between gap-3 sticky top-0 z-10"
          style={{ background: T.panel, borderBottom: `1px solid ${T.line}` }}>
          <div className="flex items-start gap-2.5">
            <AgentIcon size={32} scanning={scanning} />
            <div>
              <div className="text-sm font-semibold flex items-center gap-2" style={{ color: T.ink }}>
                Day.io Agent
                <span className="uppercase tracking-wider rounded px-1.5 py-0.5" style={{ fontSize: 9, background: T.aiSoft, color: "#6d5bd0" }}>
                  AI · Preview
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: T.muted }}>
                Finds the documents, then reuses the Phase-1 digest for every one of them.
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 shrink-0" style={{ border: `1px solid ${T.line2}`, background: "#fff", color: T.ink2 }}>
            <X size={15} />
          </button>
        </div>

        {!status ? (
          <div className="px-5 py-10 flex items-center gap-2 text-sm" style={{ color: T.muted }}>
            <Loader2 size={15} className="animate-spin" /> Reading agent status…
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-3">
            {/* headline numbers */}
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <Stat n={status.found_in_window} label={`found · last ${status.found_window_hours}h`} color={T.signal} />
              <Stat n={status.awaiting_review} label="awaiting legal review" color={T.ink} />
              <Stat n={status.conflicts_open} label="open conflicts" color={CLASS.conflict.dot} />
              <Stat n={status.candidates_triaged} label="candidates triaged" color={T.ink2} />
            </div>

            {/* the run */}
            <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
              <div className="px-3.5 py-2.5 flex items-center justify-end gap-2" style={{ borderBottom: `1px solid ${T.line}` }}>
                <button onClick={scan} disabled={scanning}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-transform active:scale-95"
                  style={{ background: scanning ? T.line2 : T.signal, color: "#fff" }}>
                  {scanning ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                  {scanning ? "Running…" : "Run scan now"}
                </button>
              </div>
              <div className="p-2.5 flex flex-col gap-1">
                {STAGES.map((s, i) => {
                  const done = stage > i || (stage === -1 && report);
                  const active = scanning && stage === i;
                  const Icon = s.Icon;
                  const tone = active ? T.signal : done ? "#047857" : T.faint;
                  return (
                    <div key={s.key} className="flex items-start gap-2.5 rounded-lg px-2 py-1.5"
                      style={{ background: active ? T.signalSoft : "transparent" }}>
                      <span className="flex items-center justify-center shrink-0 rounded-md mt-0.5"
                        style={{ width: 22, height: 22, background: active ? "#fff" : "#f2f4f8", border: `1px solid ${active ? T.signal : T.line}` }}>
                        {active ? <Loader2 size={12} className="animate-spin" color={T.signal} />
                          : done ? <CheckCircle2 size={12} color="#047857" />
                          : <Icon size={12} color={T.faint} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint }}>{i + 1}</span>
                          <span className="text-xs font-semibold" style={{ color: done || active ? T.ink : T.muted }}>{s.label}</span>
                          {report && (done || active) && (
                            <span className="text-xs ml-auto shrink-0" style={{ color: tone }}>{s.result(report)}</span>
                          )}
                        </div>
                        <div className="text-xs mt-0.5 leading-snug" style={{ color: T.faint }}>{s.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {report && !scanning && (
                <div className="px-3.5 py-2.5 text-xs flex items-start gap-2"
                  style={{ borderTop: `1px solid ${T.line}`, background: report.discovered.length ? "#ecfdf5" : "#f7f9fc", color: report.discovered.length ? "#047857" : T.muted }}>
                  {report.discovered.length ? <CheckCircle2 size={14} className="shrink-0 mt-px" /> : <Clock size={14} className="shrink-0 mt-px" />}
                  <span>
                    {report.message}
                    {report.renewal_of?.length > 0 && (
                      <> — recognised as a renewal of <strong>{report.renewal_of[0]}</strong>, so the digest fans out to every layer under it.</>
                    )}
                    {report.pool_remaining === 0 && report.discovered.length > 0 && (
                      <> The prepared demo queue is now empty.</>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* the finds */}
            <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
              <div className="px-3.5 py-2.5 text-xs font-semibold flex items-center gap-1.5" style={{ borderBottom: `1px solid ${T.line}`, color: T.ink }}>
                <Radar size={12} color={T.signal} /> Found by the agent
                <span className="ml-auto font-normal" style={{ color: T.faint }}>{status.found_total} total</span>
              </div>
              {status.feed.length === 0 ? (
                <div className="px-3.5 py-6 text-xs text-center" style={{ color: T.faint }}>Nothing found yet.</div>
              ) : (
                status.feed.map((f) => (
                  <FeedRow key={f.id} f={f} onOpen={() => { setOpen(false); onOpenDocument?.(f.id); }} />
                ))
              )}
            </div>

            {/* the watch list */}
            <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
              <button onClick={() => setShowSources((v) => !v)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold flex items-center gap-1.5" style={{ color: T.ink }}>
                <Globe2 size={12} color={T.ink2} /> Watch list
                <span className="ml-auto font-normal flex items-center gap-1" style={{ color: T.faint }}>
                  {status.source_count} sources · {status.jurisdictions.join(" · ")}
                  {showSources ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
              </button>
              {showSources && (
                <div style={{ borderTop: `1px solid ${T.line}` }}>
                  {status.sources.map((s) => (
                    <div key={s.key} className="px-3.5 py-2 flex items-center gap-2.5" style={{ borderTop: `1px solid ${T.line}` }}>
                      <span style={{ fontSize: 13 }}>{countryFlag(s.jurisdiction)}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium truncate" style={{ color: T.ink }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: T.faint }}>{s.jurisdiction} · {s.kind} · every {s.cadence_hours}h</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div style={{ fontSize: 10, color: T.muted }}>checked {relTime(s.checked_at)}</div>
                        <div style={{ fontSize: 10, color: s.last_find_at ? T.signal : T.faint }}>
                          {s.last_find_at ? `found ${relTime(s.last_find_at)}` : "no finds"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* countries the agent could expand into next — a coverage preview, not wired to the backend */}
            <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
              <button onClick={() => setShowCountries((v) => !v)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold flex items-center gap-1.5" style={{ color: T.ink }}>
                <Waypoints size={12} color={T.ink2} /> Watch countries
                <span className="ml-auto font-normal flex items-center gap-1" style={{ color: T.faint }}>
                  {watched.length}/{COUNTRY_GROUPS.reduce((n, g) => n + g.countries.length, 0)} selected
                  {showCountries ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
              </button>
              {showCountries && (
                <div style={{ borderTop: `1px solid ${T.line}` }}>
                  <div className="px-3.5 pt-2.5 pb-1.5 text-xs leading-snug" style={{ color: T.faint }}>
                    Where the agent expands next. Flipping a country on adds it to the coverage roadmap — it's
                    a preview, not a live change to what's scanned today.
                  </div>
                  {COUNTRY_GROUPS.map((g) => (
                    <div key={g.region} className="px-3.5 py-2" style={{ borderTop: `1px solid ${T.line}` }}>
                      <div className="uppercase tracking-wider mb-1.5" style={{ fontSize: 9, color: T.faint }}>{g.region}</div>
                      <div className="flex flex-col gap-1">
                        {g.countries.map((c) => {
                          const on = watched.includes(c.code);
                          const hasGraph = c.code === "BR";
                          return (
                            <div key={c.code} className="flex items-center gap-2 rounded-lg px-1.5 py-1">
                              <span style={{ fontSize: 14 }}>{countryFlag(c.code)}</span>
                              <span className="text-xs flex-1 min-w-0 truncate" style={{ color: on ? T.ink : T.muted }}>{c.name}</span>
                              {hasGraph && on && (
                                <button onClick={() => setGraphCountry(c.code)}
                                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-transform active:scale-95 shrink-0"
                                  style={{ background: T.aiSoft, color: "#6d5bd0" }}>
                                  <Network size={10} /> Resource graph
                                </button>
                              )}
                              <CountryToggle on={on} onClick={() => toggleCountry(c.code)} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-1 pb-2 text-xs leading-relaxed" style={{ color: T.faint }}>
              <strong style={{ color: T.muted }}>What's real here:</strong> every document above is a real
              row with cited findings, reviewed through the same queue as an upload, and the affected-layer
              counts are live queries over the layer tree. Detection is the piece still ahead — a scan run
              surfaces a prepared document rather than fetching a gazette.
            </div>
          </div>
        )}
      </div>
      {graphCountry && <ResourceGraph jurisdiction={graphCountry} onClose={() => setGraphCountry(null)} />}
    </div>
  );
}

function CountryToggle({ on, onClick }) {
  return (
    <button onClick={onClick} className="relative shrink-0 rounded-full transition-colors" role="switch" aria-checked={on}
      style={{ width: 30, height: 17, background: on ? T.signal : T.line2 }}>
      <span className="absolute rounded-full transition-transform" style={{
        width: 13, height: 13, top: 2, left: 2, background: "#fff",
        transform: on ? "translateX(13px)" : "translateX(0)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
      }} />
    </button>
  );
}

function Stat({ n, label, color }) {
  return (
    <div className="rounded-xl px-3.5 py-2.5" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <div className="text-xl font-semibold leading-none" style={{ color }}>{n}</div>
      <div className="mt-1.5" style={{ fontSize: 10.5, color: T.faint }}>{label}</div>
    </div>
  );
}

function FeedRow({ f, onOpen }) {
  const openable = ["analyzed", "in_review", "reviewed", "complete"].includes(f.status);
  return (
    <div className="px-3.5 py-2.5 flex items-start gap-2.5" style={{ borderTop: `1px solid ${T.line}` }}>
      <span className="shrink-0" style={{ fontSize: 14, marginTop: 1 }}>{countryFlag(f.jurisdiction)}</span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold leading-snug" style={{ color: T.ink }}>{f.title}</div>
        <div className="mt-0.5 flex items-center gap-1.5 flex-wrap" style={{ fontSize: 10, color: T.faint }}>
          <span className="uppercase tracking-wide">{docTypeLabel(f.doc_type)}</span>
          <span>·</span><span>{f.source}</span>
          <span>·</span><span>{relTime(f.found_at)}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 flex-wrap" style={{ fontSize: 10 }}>
          <span className="rounded px-1.5 py-0.5" style={{ background: "#f2f4f8", color: T.ink2 }}>
            {f.findings} finding{f.findings === 1 ? "" : "s"}
          </span>
          {f.conflicts > 0 && (
            <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: CLASS.conflict.markBg, color: CLASS.conflict.dot }}>
              <AlertTriangle size={9} /> {f.conflicts} conflict{f.conflicts === 1 ? "" : "s"}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: T.signalSoft, color: "#0b6fbd" }}>
            <Network size={9} /> {f.affected_layers} layer{f.affected_layers === 1 ? "" : "s"} affected
          </span>
          {f.layer && (
            <span className="inline-flex items-center gap-1 truncate" style={{ color: T.faint, maxWidth: 190 }}>
              <FileText size={9} /> {f.layer}
            </span>
          )}
        </div>
      </div>
      {openable && (
        <button onClick={onOpen} className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold active:scale-95 transition-transform"
          style={{ background: "#fff", border: `1px solid ${T.line2}`, color: T.ink }}>
          Review
        </button>
      )}
    </div>
  );
}
