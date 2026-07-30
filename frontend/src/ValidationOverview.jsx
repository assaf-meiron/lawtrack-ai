import React, { useCallback, useEffect, useState } from "react";
import {
  ShieldCheck, Loader2, Users, MapPin, Clock, Fingerprint, ArrowRight, ArrowDown, Check,
  Scale, Building2, MousePointerClick,
} from "lucide-react";
import * as api from "./api.js";
import { T } from "./shared.jsx";
import {
  SEV, CLEAR, UNKNOWN, runStatus, orgStatus, gradeFromScore, num, pct, ScoreDial, Tile,
} from "./validationShared.jsx";

/* Payroll Validation — screen 1, the org chart.

   **This screen does not know how compliant anything is, and that is the point.**

   It used to. It fired every department's validation the moment the catalog loaded, so the chart
   arrived carrying a status badge and a breach count on every node and an organization-wide score
   above them. That was a flow bug, not a feature: compliance is not a property of an org chart. It is
   what a run over the punch register *produces*, and a chart that reports "3 breaches" before anyone
   asked for a run is stating a number the product has not computed yet. Worse, it dissolved the whole
   reason to click — the answer was already on the card.

   So the load is now honest and cheap: the catalog, and nothing else. Every department reads "Not
   validated", the one loud element on the page is the instruction to pick one, and the numbers appear
   only where a run has actually been done. A department validated in this session keeps its result on
   its card, because by then we genuinely do know it.

   HR does not think in collective agreements either — it thinks in departments. But a department is
   *not* an agreement: Global operations is drivers under the transport CCT, warehouse staff under the
   commerce CCT and planners under the administrative CCT, all in one box. Each card says how many
   agreements it is made of, and the run splits the population across them. */

/* How long the full-screen "validating" takeover stays up once a department is picked. A department
   validates in well under three seconds on the backend, so this is a presentation floor, not real
   latency — held long enough (~12s over 6 stages, 2s each) to read as a real multi-stage pipeline
   rather than a spinner with a fake label. */
const RUN_MIN_MS = 12000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* The six stages of one run: a short label the room can read from the back, and one line of detail
   under whichever is currently running. Deliberately six and deliberately terse — the previous
   version put a full sentence on every row and nobody read past the second one. Every number in a
   detail line comes off the department the user actually picked. */
function buildStages(dept, period) {
  const agreements = dept.segments.length;
  return [
    { label: "Reading the punch register",
      detail: `${num(dept.headcount)} employees · ${dept.sites.length} sites · ${period.label}, closed` },
    { label: "Rebuilding shifts and rest gaps",
      detail: "Punch pairs back into shifts, breaks, interjornada windows and weekly totals" },
    { label: agreements === 1 ? "Loading the collective agreement"
                             : `Splitting the population across ${agreements} agreements`,
      detail: dept.segments.map((s) => s.agreement.short).join(" · ") },
    { label: `Testing ${dept.rule_count} rules against the clock`,
      detail: "Statute and CCT clause alike — every finding traced back to the text that creates it" },
    { label: "Pricing the exposure",
      detail: `Indicative, in ${dept.currency} — not a payroll calculation` },
    { label: "Scoring and ranking findings",
      detail: "Worst first, with the population each rule actually binds" },
  ];
}

/* `catalog` and `runs` are owned by PayrollValidationScreen, not here: this component unmounts every
   time a dashboard opens, and the accumulated results have to outlive that. */
export default function ValidationOverview({ catalog, runs, setRuns, fireToast, onOpenDashboard }) {
  const [validating, setValidating] = useState(null); // { dept, stages }

  const pick = useCallback(async (dept) => {
    // Already validated in this session: open it. Replaying the twelve-second pipeline over a result
    // we are holding would be theatre — the card says "Open findings", so it opens findings.
    if (runs[dept.key]) {
      window.scrollTo({ top: 0 });
      return onOpenDashboard(dept.key);
    }
    setValidating({ dept, stages: buildStages(dept, catalog.period) });
    const [result] = await Promise.all([
      api.runValidation(dept.key),
      sleep(RUN_MIN_MS),
    ]).catch((e) => { fireToast(e.message, "error"); return [null]; });
    // The result lands in `runs` only now, after the floor has elapsed — never when the fetch
    // resolves. The backend answers a 12,400-employee department in about two seconds, so committing
    // it early painted "Critical · 6 breaches" onto the card *behind* the still-running overlay: the
    // verdict arrived before the thing that was supposed to be producing it had finished saying so.
    setValidating(null);
    if (result) {
      setRuns((x) => ({ ...x, [dept.key]: result }));
      window.scrollTo({ top: 0 });
      onOpenDashboard(dept.key);
    }
  }, [catalog, runs, setRuns, fireToast, onOpenDashboard]);

  const { organization: org, period } = catalog;
  const done = Object.values(runs);

  return (
    <div className="mx-auto px-6 py-6" style={{ maxWidth: 1280 }}>
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center rounded-xl shrink-0"
          style={{ width: 40, height: 40, background: T.ink }}>
          <ShieldCheck size={21} color="#fff" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight" style={{ color: T.ink }}>Payroll Validation</h1>
          <p className="text-sm mt-1" style={{ color: T.muted, maxWidth: 820 }}>
            {org.name} — {num(org.employees)} employees in {org.departments} departments across{" "}
            {org.arms} organizational arms, under {org.agreements} collective agreements in{" "}
            {org.countries.join(" and ")}.
          </p>
          <div className="mt-2.5 flex items-center gap-3 flex-wrap text-xs" style={{ color: T.faint }}>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> Period available: <strong style={{ color: T.ink2, fontWeight: 600 }}>
                {period.label}</strong> ({period.days} days, closed)
            </span>
            <span style={{ color: T.line2 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Fingerprint size={12} /> Source: the T&amp;A punch register
            </span>
          </div>
        </div>
      </div>

      {done.length === 0
        ? <PickPrompt total={org.departments} />
        : <ProgressStrip catalog={catalog} runs={runs} />}

      {catalog.arms.map((arm) => (
        <ArmBranch key={arm.key} arm={arm} runs={runs} busy={!!validating} onPick={pick} />
      ))}

      {validating && <ValidatingOverlay dept={validating.dept} stages={validating.stages} period={period} />}
    </div>
  );
}

/* ============================ before anything has been run ============================ */

/* The whole pre-run state of the screen, and it says exactly one thing. It replaces what used to be
   an organization-wide compliance score computed from sixteen background runs nobody asked for —
   which looked authoritative and was, at that moment, unearned. */
function PickPrompt({ total }) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden"
      style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <div className="px-6 py-6 flex items-start gap-4 flex-wrap">
        <div className="flex items-center justify-center rounded-xl shrink-0"
          style={{ width: 44, height: 44, background: T.signalSoft, border: `1px solid #bfe2ff` }}>
          <MousePointerClick size={22} color={T.signal} />
        </div>
        <div className="min-w-0 flex-1" style={{ minWidth: 300 }}>
          <h2 className="font-semibold tracking-tight" style={{ color: T.ink, fontSize: 19 }}>
            Pick a department to validate.
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted, maxWidth: 720 }}>
            Nothing on this chart has been analysed yet — so nothing on it claims to be compliant.
            Compliance is not something an org chart knows; it is what reading a month of punches
            against each population's agreement produces. Choose one of the {total} departments below
            and the agent goes and does that.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0 self-center">
          <span className="text-xs font-semibold" style={{ color: T.signal }}>Choose below</span>
          <ArrowDown size={20} color={T.signal} className="lt-nudge" />
        </div>
      </div>
    </div>
  );
}

/* ============================ once some runs exist ============================ */

/* The rollup, scoped out loud to what has actually been validated. An average over 3 of 16
   departments is a real number about those 3 and says nothing about the other 13, so the label
   carries the denominator rather than calling itself an organization score. */
function ProgressStrip({ catalog, runs }) {
  const all = catalog.arms.flatMap((a) => a.departments);
  const done = all.map((d) => runs[d.key]).filter(Boolean);

  const employees = done.reduce((n, r) => n + r.totals.employees, 0);
  const inBreach = done.reduce((n, r) => n + r.totals.employees_in_breach, 0);
  const rulesBreached = done.reduce((n, r) => n + r.totals.rules_breached, 0);
  const rulesEvaluated = done.reduce((n, r) => n + r.totals.rules_evaluated, 0);
  const score = Math.round(done.reduce((n, r) => n + r.score * r.totals.employees, 0) / employees);

  const byStatus = { critical: 0, attention: 0, clear: 0 };
  done.forEach((r) => {
    const { label } = runStatus(r);
    if (label === "Clear") byStatus.clear += 1;
    else if (label === "Critical") byStatus.critical += 1;
    else byStatus.attention += 1;
  });

  const remaining = all.length - done.length;

  return (
    <>
      <div className="mt-4 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
        <div className="px-5 py-5 flex items-center gap-6 flex-wrap">
          <ScoreDial score={score} grade={gradeFromScore(score)} tone={orgStatus(done).tone}
            label={`Across the ${done.length} department${done.length === 1 ? "" : "s"} validated`} />
          <div className="min-w-0 flex-1" style={{ minWidth: 280 }}>
            <div className="text-sm font-semibold" style={{ color: T.ink }}>
              {rulesBreached === 0
                ? `All ${rulesEvaluated} rules clear across ${done.length} of ${all.length} departments.`
                : `${rulesBreached} of ${rulesEvaluated} rules breached across ${done.length} of ${all.length} departments.`}
            </div>
            <div className="text-xs mt-1.5" style={{ color: T.muted }}>
              {pct(inBreach / employees)} of the {num(employees)} employees checked · {catalog.period.label}
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              <StatusChip label="Critical" count={byStatus.critical} tone={SEV.critical} />
              <StatusChip label="Need attention" count={byStatus.attention} tone={SEV.high} />
              <StatusChip label="Clear" count={byStatus.clear} tone={CLEAR} />
            </div>
          </div>
        </div>
        {remaining > 0 && (
          <div className="px-5 py-2.5 text-xs leading-snug flex items-center gap-2"
            style={{ borderTop: `1px solid ${T.line}`, background: "#fbfcfe", color: T.faint }}>
            <MousePointerClick size={13} className="shrink-0" color={T.signal} />
            <div>
              {remaining} department{remaining === 1 ? " has" : "s have"} not been validated — nothing above
              describes {remaining === 1 ? "it" : "them"}. Pick {remaining === 1 ? "it" : "another"} to find out.
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
        <Tile label="Departments validated" value={`${done.length} / ${all.length}`}
          sub={`${num(employees)} of ${num(catalog.organization.employees)} employees`} />
        <Tile label="Employees in breach" value={num(inBreach)}
          sub={`${pct(inBreach / employees)} of those checked`}
          tone={inBreach ? SEV.critical : CLEAR} />
        <Tile label="Need attention" value={`${byStatus.critical + byStatus.attention} / ${done.length}`}
          sub="of the departments validated"
          tone={byStatus.critical ? SEV.critical : byStatus.attention ? SEV.high : CLEAR} />
        <Tile label="Rules breached" value={`${rulesBreached} / ${rulesEvaluated}`} sub="across those runs" />
      </div>
    </>
  );
}

function StatusChip({ label, count, tone }) {
  if (!count) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{ background: tone.soft, border: `1px solid ${tone.line}`, fontSize: 11, fontWeight: 600, color: tone.ink }}>
      <tone.Icon size={11} /> {count} {label.toLowerCase()}
    </span>
  );
}

/* ============================ the chart ============================ */

/* A row of sibling nodes with the connecting lines above them. Each column contributes exactly half
   its own width to the horizontal line (hidden on the outer edge of the first and last column), so the
   line always spans from the first child's center to the last child's — and the parent's own stub,
   centered over the row, lands exactly on that line's midpoint — regardless of how many columns there
   are or how wide each one is. */
function ConnectorRail({ index, count }) {
  const isFirst = index === 0;
  const isLast = index === count - 1;
  return (
    <div style={{ position: "relative", width: "100%", height: 18 }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "50%", borderTop: isFirst ? "none" : `1px solid ${T.line2}` }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", borderTop: isLast ? "none" : `1px solid ${T.line2}` }} />
      <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: T.line2 }} />
    </div>
  );
}

function Stub({ height = 18 }) {
  return <div style={{ width: 1, height, background: T.line2 }} />;
}

function OrgRow({ children }) {
  const count = React.Children.count(children);
  return (
    <div className="flex items-stretch" style={{ gap: 14 }}>
      {React.Children.map(children, (child, i) => (
        <div key={i} className="flex flex-col items-stretch" style={{ flex: "1 1 0", minWidth: 0 }}>
          <ConnectorRail index={i} count={count} />
          {child}
        </div>
      ))}
    </div>
  );
}

function ArmBranch({ arm, runs, busy, onPick }) {
  return (
    <section className="mt-7 flex flex-col items-center">
      <div className="rounded-xl px-4 py-2.5 flex items-baseline gap-3 flex-wrap justify-center"
        style={{ background: T.ink, maxWidth: 780 }}>
        <span className="text-sm font-semibold" style={{ color: "#fff" }}>{arm.name}</span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.62)" }}>{arm.blurb}</span>
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
          {num(arm.employees)} · {arm.departments.length} departments
        </span>
      </div>
      <Stub />
      <div style={{ width: "100%" }}>
        <OrgRow>
          {arm.departments.map((d) => (
            <DepartmentNode key={d.key} dept={d} run={runs[d.key]} busy={busy} onPick={onPick} />
          ))}
        </OrgRow>
      </div>
    </section>
  );
}

/* One department. Before a run: what it is made of, and an invitation. After a run: the verdict.
   There is no third state where the card guesses. */
function DepartmentNode({ dept, run, busy, onPick }) {
  const [hover, setHover] = useState(false);
  const tone = run ? runStatus(run).tone : UNKNOWN;
  const label = run ? runStatus(run).label : UNKNOWN.label;

  return (
    <button
      onClick={() => !busy && onPick(dept)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={!!busy}
      title={dept.mandate}
      className="text-left rounded-xl flex flex-col w-full"
      style={{
        background: T.panel,
        border: `1px solid ${run ? tone.line : hover && !busy ? T.signal : T.line}`,
        boxShadow: hover && !busy ? "0 6px 18px rgba(35,40,56,0.10)" : "0 1px 3px rgba(35,40,56,0.05)",
        transform: hover && !busy ? "translateY(-2px)" : "none",
        transition: "transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
        cursor: busy ? "default" : "pointer",
        opacity: busy ? 0.65 : 1,
      }}
    >
      <div className="px-3.5 pt-3 pb-3" style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-1.5" style={{ fontSize: 10.5, color: T.faint }}>
          <span style={{ fontSize: 12 }}>{dept.flag}</span> {dept.country_name}
        </div>
        <div className="text-sm font-semibold leading-snug mt-1" style={{ color: T.ink }}>{dept.name}</div>
        {/* Two lines, clamped: the mandate is what tells a reader why Global operations and Commercial
            are different populations rather than two names for the same shop floor. */}
        <div className="mt-1 leading-snug" style={{
          fontSize: 10.5, color: T.muted, display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {dept.mandate}
        </div>
        <div className="mt-2 flex items-center gap-2 flex-wrap" style={{ fontSize: 10.5, color: T.faint }}>
          <span className="inline-flex items-center gap-1"><Users size={11} /> {num(dept.headcount)}</span>
          <span className="inline-flex items-center gap-1" title={dept.segments.map((s) => s.agreement.short).join(" · ")}>
            <Scale size={11} /> {dept.segments.length} CCT{dept.segments.length === 1 ? "" : "s"}
          </span>
          <span className="inline-flex items-center gap-1"><MapPin size={11} /> {dept.sites.length}</span>
        </div>
      </div>

      <div className="px-3.5 py-3 mt-auto">
        <div className="rounded-lg px-2.5 py-1.5 flex items-center justify-between"
          style={{ background: tone.soft, border: `1px solid ${tone.line}` }}>
          <span className="inline-flex items-center gap-1.5" style={{ color: tone.ink, fontSize: 11, fontWeight: 700 }}>
            <tone.Icon size={12} /> {label}
          </span>
          {run && (
            <span style={{ fontSize: 11, fontWeight: 600, color: tone.ink }}>
              {run.totals.rules_breached === 0
                ? "no breaches"
                : `${run.totals.rules_breached} breach${run.totals.rules_breached === 1 ? "" : "es"}`}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-end gap-1"
          style={{ fontSize: 10.5, fontWeight: 700, color: run ? T.muted : T.signal }}>
          {run ? "Open findings" : "Validate payroll"} <ArrowRight size={11} />
        </div>
      </div>
    </button>
  );
}

/* ============================ the validating takeover ============================ */

/* Six stages, one short label each, and the detail line only on the one that is running. The earlier
   version put a full sentence on every row simultaneously — seven of them, all live, none read. What
   makes this legible from across a room is that exactly one thing is large and moving at a time. */
function ValidatingOverlay({ dept, stages, period }) {
  const [at, setAt] = useState(0);
  useEffect(() => {
    setAt(0);
    const id = setInterval(() => setAt((n) => Math.min(n + 1, stages.length - 1)), RUN_MIN_MS / stages.length);
    return () => clearInterval(id);
  }, [stages]);

  const donePct = Math.round(((at + 1) / stages.length) * 100);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="absolute inset-0" style={{ background: "rgba(16,20,32,0.66)" }} />
      <div className="relative rounded-2xl overflow-hidden"
        style={{ width: 620, maxWidth: "calc(100vw - 48px)", background: T.panel,
          boxShadow: "0 24px 64px rgba(16,20,32,0.35)" }}>
        <div className="px-6 pt-6 pb-5" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="uppercase tracking-wider flex items-center gap-2"
            style={{ fontSize: 10, fontWeight: 700, color: T.faint }}>
            <Loader2 size={13} className="animate-spin" color={T.signal} />
            Validating payroll · {period.label}
          </div>
          <div className="font-semibold tracking-tight mt-2 flex items-center gap-2 flex-wrap"
            style={{ color: T.ink, fontSize: 24, letterSpacing: "-0.02em" }}>
            <span style={{ fontSize: 20 }}>{dept.flag}</span> {dept.name}
          </div>
          <div className="text-sm mt-1.5 flex items-center gap-2 flex-wrap" style={{ color: T.muted }}>
            <span className="inline-flex items-center gap-1.5"><Users size={13} /> {num(dept.headcount)} employees</span>
            <span style={{ color: T.line2 }}>·</span>
            <span className="inline-flex items-center gap-1.5"><Building2 size={13} /> {dept.sites.length} sites</span>
            <span style={{ color: T.line2 }}>·</span>
            <span className="inline-flex items-center gap-1.5"><Scale size={13} /> {dept.segments.length} agreements</span>
          </div>
          <div className="mt-4 rounded-full overflow-hidden" style={{ height: 6, background: T.line }}>
            <div style={{ width: `${donePct}%`, height: "100%", background: T.signal,
              transition: "width 500ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
          </div>
        </div>
        <div className="px-6 py-5 flex flex-col gap-3.5">
          {stages.map((s, i) => {
            const state = i < at ? "done" : i === at ? "now" : "next";
            return (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 flex items-center justify-center" style={{ width: 20, height: 24 }}>
                  {state === "done" ? <Check size={18} color={CLEAR.ink} />
                    : state === "now" ? <Loader2 size={18} className="animate-spin" color={T.signal} />
                    : <span style={{ width: 7, height: 7, borderRadius: 99, background: T.line2 }} />}
                </span>
                <div className="min-w-0">
                  <div style={{
                    fontSize: state === "now" ? 18 : 15,
                    fontWeight: state === "now" ? 600 : 500,
                    lineHeight: 1.3,
                    letterSpacing: state === "now" ? "-0.01em" : 0,
                    color: state === "next" ? T.faint : state === "done" ? T.ink2 : T.ink,
                    transition: "font-size 300ms ease, color 300ms ease",
                  }}>
                    {s.label}
                  </div>
                  {state === "now" && (
                    <div className="text-xs mt-1 leading-snug" style={{ color: T.muted }}>{s.detail}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
