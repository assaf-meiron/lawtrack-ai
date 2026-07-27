import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Globe2, Network, Sparkles, X, RefreshCw, Clock, CheckCircle2, Loader2,
  ChevronDown, ChevronRight, Play, Waypoints,
} from "lucide-react";
import * as api from "./api.js";
import { T, countryFlag } from "./shared.jsx";
import ResourceGraph from "./ResourceGraph.jsx";

/* The source scanner — Phase 2 of docs/lawtrack-ai/agent-plan.md, made visible.

   Phase 1 (digest one uploaded PDF) is the built product and the whole of the review surface. Phase 2
   *finds* the documents: watch per-jurisdiction registries, triage what materially changes time & pay,
   run the same digest, then work out which layers the change reaches and fan the diff out across them.

   This module is the operator's view of that loop, and it says two things: when the agent last ran, and
   how many documents it found in the past 24 hours. A chip carries them in the top bar, a strip above
   the inbox repeats them, and the panel adds the countries under watch and a way to run a scan now.
   Every find is an ordinary document with real cited findings, reviewed through the same Phase-1 queue
   as a manual upload — so a find needs no feed of its own, it just lands in the inbox behind the panel. */

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

/* ---- the agent's mark: a gradient badge that never sits still, plus a scan-time ping ring ----
   Timings are tuned for a projector rather than a desk: the badge is the one thing on screen that
   says the product is working while nobody is touching it, and anything slower than about a second
   per cycle reads as a static blue dot from the back of a room. */
export function AgentIcon({ size = 18, scanning = false }) {
  const ring = Math.round(size * 1.7);
  return (
    <span className="relative flex items-center justify-center shrink-0" style={{ width: ring, height: ring }}>
      <span className="absolute rounded-full" style={{
        width: ring, height: ring, background: T.signal, opacity: 0.14,
        animation: scanning ? "lt-ping 0.85s ease-out infinite" : "lt-breathe 1.5s ease-in-out infinite",
      }} />
      <span className="absolute rounded-full" style={{
        width: size, height: size,
        background: T.aiGradient, backgroundSize: "220% 220%",
        boxShadow: "0 0 0 3px rgba(124,108,246,0.10), 0 2px 6px rgba(30,151,247,0.25)",
        animation: "lt-gradient-shift 2.2s ease-in-out infinite, lt-breathe-strong 1.05s ease-in-out infinite",
      }} />
      <Sparkles size={Math.round(size * 0.52)} color="#fff" style={{ position: "relative" }} strokeWidth={2.25} />
    </span>
  );
}

/* How long a scan run is held on screen at minimum. The request itself returns in well under a
   second, which on a demo reads as "nothing happened" — the wait is there so the badge's ping and
   the "Scanning…" label register before the result replaces them. */
const SCAN_MIN_MS = 1700;

export function AgentProvider({ children, fireToast, onOpenDocument }) {
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
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
    try {
      // Both together, not in sequence: the floor is a presentation minimum, not added latency.
      const [result] = await Promise.all([api.runAgentScan(), sleep(SCAN_MIN_MS)]);
      if (!alive.current) return;
      setReport(result);
      if (result?.discovered?.length) {
        setFoundTick((n) => n + 1);
        fireToast?.(result.message, "ready");
      } else {
        fireToast?.(result?.message || "Scan complete.");
      }
      await refresh();
    } catch (e) {
      fireToast?.(e.message, "error");
    } finally {
      if (alive.current) setScanning(false);
    }
  }, [scanning, fireToast, refresh]);

  const value = useMemo(
    () => ({ status, open, setOpen, scan, scanning, report, foundTick, refresh, onOpenDocument }),
    [status, open, scan, scanning, report, foundTick, refresh, onOpenDocument],
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

/* Thousands separator. The watched-source count is the one number here big enough to need it, and
   "2640 sources" reads as a serial number where "2,640 sources" reads as coverage. */
const fmt = (n) => (n ?? 0).toLocaleString("en-US");

/* The two sentences the whole scanner surface is built out of — the chip, the strip and the panel all
   say the same thing at different sizes, so the number the tour points at is the number on screen. */
const foundLine = (status) => {
  const n = status?.found_in_window ?? 0;
  const h = status?.found_window_hours ?? 24;
  return `${n} document${n === 1 ? "" : "s"} found in the past ${h} hours`;
};
const watchLine = (status) => `Watching ${fmt(status?.source_count)} sources`;

/* ---- the chip: top-right status, "found in the past 24 hours" ---- */
export function AgentChip() {
  const { status, setOpen, scanning } = useAgent() || {};
  const found = status?.found_in_window ?? 0;
  const label = status
    ? `Day.io Agent · ${foundLine(status)} · ${watchLine(status).toLowerCase()}`
    : "Day.io Agent";

  return (
    <button onClick={() => setOpen(true)} title={label} data-tour="agent-chip"
      className="relative flex items-center gap-2 rounded-lg pl-2.5 pr-3 py-1.5 transition-colors"
      style={{ border: `1px solid ${T.line2}`, background: "#fff" }}>
      <AgentIcon size={18} scanning={scanning} />
      <span className="text-left leading-none">
        <span className="block text-xs font-semibold" style={{ color: T.ink }}>
          {scanning ? "Scanning…" : "Day.io Agent"}
        </span>
        <span className="block" style={{ fontSize: 10, color: T.faint, marginTop: 2 }}>
          {status ? `${found} found · past 24h` : "…"}
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

/* ---- the strip: what the scanner is doing, above the inbox ----
   Two facts only: when it last ran, and how many documents it found in the past 24 hours. The
   backlog counts it used to carry are the reviewer's job, and the inbox below already shows them. */
export function AgentStrip() {
  const { status, setOpen, scan, scanning } = useAgent() || {};
  if (!status) return null;
  const found = status.found_in_window ?? 0;
  return (
    <div className="rounded-xl px-4 py-3 flex items-center gap-4 flex-wrap" data-tour="agent-strip"
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
            Last ran {relTime(status.last_scan_at)} · {watchLine(status).toLowerCase()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold leading-none" style={{ color: found ? T.signal : T.faint }}>{found}</span>
          <span className="text-xs" style={{ color: T.muted }}>
            document{found === 1 ? "" : "s"} found<br />in the past {status.found_window_hours} hours
          </span>
        </div>
        <button onClick={scan} disabled={scanning}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-transform active:scale-95"
          style={{ background: scanning ? T.line2 : "#fff", border: `1px solid ${scanning ? T.line2 : T.signal}`, color: scanning ? T.muted : T.signal }}>
          {scanning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />} Run scan
        </button>
        <button onClick={() => setOpen(true)} data-tour="agent-open"
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-transform active:scale-95"
          style={{ background: T.ink }}>
          See what the Agent found <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ---- the panel: what the agent last did, and the countries it watches ----
   Deliberately two things. The seven-step Phase-2 walkthrough and the feed of finds both used to live
   here, and both were answering a question nobody in the room had asked: the finds land in the inbox
   behind this panel, which is a better place to see them than a list inside a drawer. */
function AgentPanel() {
  const { status, open, setOpen, scan, scanning, report } = useAgent() || {};
  const [showCountries, setShowCountries] = useState(true);
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
                Watches the registries that publish rule changes, and reads every one it finds.
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
            {/* what it last did — the two facts, plus the way to run it again */}
            <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
              <div className="px-4 pt-3.5 pb-3 flex items-end justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold leading-none" style={{ color: status.found_in_window ? T.signal : T.faint }}>
                      {status.found_in_window}
                    </span>
                    <span className="text-sm" style={{ color: T.ink2 }}>
                      document{status.found_in_window === 1 ? "" : "s"} found in the past {status.found_window_hours} hours
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 flex-wrap" style={{ fontSize: 11, color: T.muted }}>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={11} color={T.faint} /> Last ran {relTime(status.last_scan_at)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 size={11} color={T.faint} /> {watchLine(status)}
                    </span>
                  </div>
                </div>
                <button onClick={scan} disabled={scanning}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-transform active:scale-95 shrink-0"
                  style={{ background: scanning ? T.line2 : T.signal, color: "#fff" }}>
                  {scanning ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                  {scanning ? "Scanning…" : "Run scan now"}
                </button>
              </div>
              {report && !scanning && (
                <div className="px-4 py-2.5 text-xs flex items-start gap-2"
                  style={{ borderTop: `1px solid ${T.line}`, background: report.discovered.length ? "#ecfdf5" : "#f7f9fc", color: report.discovered.length ? "#047857" : T.muted }}>
                  {report.discovered.length ? <CheckCircle2 size={14} className="shrink-0 mt-px" /> : <Clock size={14} className="shrink-0 mt-px" />}
                  <span>
                    {report.discovered.length
                      ? <>Found <strong>{report.discovered[0].title}</strong> — digested with {report.discovered[0].findings} cited findings and waiting in the inbox.</>
                      : report.message}
                    {report.renewal_of?.length > 0 && (
                      <> Recognised as a renewal of <strong>{report.renewal_of[0]}</strong>, so the digest fans out to every layer under it.</>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* the countries under watch, and where coverage goes next */}
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
                          // Every country carries the Resource graph affordance, so coverage reads as
                          // uniform. Only Brazil has a mapped graph behind it (data/brazilResources.js);
                          // the rest are inert until that research lands per country.
                          const mapped = c.code === "BR";
                          return (
                            <div key={c.code} className="flex items-center gap-2 rounded-lg px-1.5 py-1">
                              <span style={{ fontSize: 14 }}>{countryFlag(c.code)}</span>
                              <span className="text-xs flex-1 min-w-0 truncate" style={{ color: on ? T.ink : T.muted }}>{c.name}</span>
                              <button onClick={mapped ? () => setGraphCountry(c.code) : undefined}
                                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-transform active:scale-95 shrink-0"
                                style={{ background: T.aiSoft, color: "#6d5bd0" }}>
                                <Network size={10} /> Resource graph
                              </button>
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
