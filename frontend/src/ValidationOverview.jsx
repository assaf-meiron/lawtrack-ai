import React, { useCallback, useEffect, useState } from "react";
import {
  ShieldCheck, Loader2, Users, MapPin, Clock, Fingerprint, ArrowRight, Check,
} from "lucide-react";
import * as api from "./api.js";
import { T } from "./shared.jsx";
import {
  SEV, CLEAR, runStatus, orgStatus, gradeFromScore, departmentName, num, pct, ScoreDial, Tile,
} from "./validationShared.jsx";

/* Payroll Validation — screen 1, the org chart.

   HR does not think in CCTs — it thinks in departments. Every "department" node below is still, under
   the hood, one employee category under one collective agreement (that's what makes a validation run
   legally meaningful), but the chart itself is organized the way the person using it actually scans a
   headcount: country, then department, then — one click away — exactly where the punches breach.

   The overview strip above the chart, and the status badge on every department node, both need a
   validation *result* per department before the chart can say anything about compliance. So this
   screen prefetches every department's run the moment the catalog loads — quietly, in parallel, in the
   background — rather than waiting for the user to ask one department at a time. Nothing here is new
   backend surface: it is the same per-group endpoint the click-through already called, just called
   once for everyone up front instead of once for whoever gets clicked. */

/* How long the full-screen "validating" takeover stays up once a department is picked. The result is
   almost always already sitting in `runs` by the time someone clicks — this is a presentation floor,
   not real latency, and it is held long enough (~12s, spread over 5-9 stages) to read as a real
   multi-stage pipeline rather than a spinner with a fake label. */
const RUN_MIN_MS = 12000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* The stage checklist for one run. Bucketed by capability so the count next to each stage is honest —
   "(3 rules)" means three of *this* department's actual rules, not a generic placeholder — while
   staying bounded to a handful of stages regardless of how many rules the department carries. */
const STAGE_BUCKETS = [
  { label: "Validating required rest periods — interjornada, intrajornada and 12×36 rest", caps: ["Inter", "Intra", "12x36"] },
  { label: "Validating working-hour limits — weekly ceiling and shift-length caps", caps: ["Jorn"] },
  { label: "Validating daily and weekly overtime caps", caps: ["OT/d", "OT wk/mo"] },
  { label: "Validating the hour-bank balance and settlement window", caps: ["BH"] },
  { label: "Validating weekly rest (DSR) and Sunday rotation", caps: ["Sun-rot"] },
  { label: "Validating premium pay — night work, Sundays and holidays", caps: ["Not", "Sun/Hol"] },
  { label: "Cross-checking punch tolerance against the agreement", caps: ["Tol"] },
];

function buildStages(group, run) {
  const intro = `Organizing punches — rebuilding shifts, breaks and rest gaps for ${num(group.headcount)} employees`;
  const reading = `Reading the register across ${group.sites.length} site${group.sites.length === 1 ? "" : "s"} under ${group.cct_instrument}`;
  let middle;
  if (run?.rules) {
    middle = STAGE_BUCKETS
      .map((b) => ({ ...b, count: run.rules.filter((r) => b.caps.includes(r.capability)).length }))
      .filter((b) => b.count > 0)
      .map((b) => `${b.label} (${b.count} rule${b.count === 1 ? "" : "s"})`);
  } else {
    middle = [`Applying ${group.rule_count} rules from ${group.cct_instrument} and statute`];
  }
  return [intro, reading, ...middle, "Pricing exposure for every confirmed breach",
    "Scoring compliance and ranking findings by severity"];
}

export default function ValidationOverview({ fireToast, onOpenDashboard }) {
  const [catalog, setCatalog] = useState(null);
  const [runs, setRuns] = useState({});
  const [validating, setValidating] = useState(null); // { group, stages }

  useEffect(() => {
    api.validationGroups().then(setCatalog).catch((e) => fireToast(e.message, "error"));
  }, [fireToast]);

  // Fire every department's run in parallel the moment the catalog is known, so the chart's badges
  // and the overview strip fill in on their own — nobody has to click a group to learn its status.
  useEffect(() => {
    if (!catalog) return;
    catalog.countries.flatMap((c) => c.groups).forEach((g) => {
      api.runValidation(g.key)
        .then((res) => setRuns((r) => (r[g.key] ? r : { ...r, [g.key]: res })))
        .catch(() => {});
    });
  }, [catalog]);

  const pick = useCallback(async (group) => {
    setValidating({ group, stages: buildStages(group, runs[group.key]) });
    const [result] = await Promise.all([
      runs[group.key]
        ? Promise.resolve(runs[group.key])
        : api.runValidation(group.key).then((r) => { setRuns((x) => ({ ...x, [group.key]: r })); return r; }),
      sleep(RUN_MIN_MS),
    ]).catch((e) => { fireToast(e.message, "error"); return [null]; });
    setValidating(null);
    if (result) {
      window.scrollTo({ top: 0 });
      onOpenDashboard(result);
    }
  }, [runs, fireToast, onOpenDashboard]);

  if (!catalog) {
    return (
      <div className="px-6 py-16 flex items-center gap-2 text-sm" style={{ color: T.muted }}>
        <Loader2 size={16} className="animate-spin" /> Loading the department chart…
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-6" style={{ maxWidth: 1180 }}>
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center rounded-xl shrink-0"
          style={{ width: 40, height: 40, background: T.ink }}>
          <ShieldCheck size={21} color="#fff" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight" style={{ color: T.ink }}>Payroll Validation</h1>
          <p className="text-sm mt-1" style={{ color: T.muted, maxWidth: 780 }}>
            Punches checked against each department's collective agreement. Pick one to see where they don't match.
          </p>
          <div className="mt-2.5 flex items-center gap-3 flex-wrap text-xs" style={{ color: T.faint }}>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> Period under validation: <strong style={{ color: T.ink2, fontWeight: 600 }}>
                {catalog.period.label}</strong> ({catalog.period.days} days, closed)
            </span>
            <span style={{ color: T.line2 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Fingerprint size={12} /> Source: the T&amp;A punch register
            </span>
          </div>
        </div>
      </div>

      <OverviewStrip catalog={catalog} runs={runs} />

      {catalog.countries.map((country) => (
        <CountryBranch key={country.code} country={country} runs={runs}
          busy={!!validating} onPick={pick} />
      ))}

      {validating && <ValidatingOverlay group={validating.group} stages={validating.stages} />}
    </div>
  );
}

/* ============================ the top-level status ============================ */

function OverviewStrip({ catalog, runs }) {
  const allGroups = catalog.countries.flatMap((c) => c.groups);
  const loadedRuns = allGroups.map((g) => runs[g.key]).filter(Boolean);
  const allLoaded = loadedRuns.length === allGroups.length;

  if (!allLoaded) {
    return (
      <div className="mt-4 rounded-xl px-5 py-6 flex items-center gap-2.5 text-sm"
        style={{ background: T.panel, border: `1px solid ${T.line}`, color: T.muted }}>
        <Loader2 size={16} className="animate-spin" />
        Computing the organization-wide snapshot — {loadedRuns.length} of {allGroups.length} departments checked…
      </div>
    );
  }

  const totalEmployees = loadedRuns.reduce((n, r) => n + r.totals.employees, 0);
  const totalInBreach = loadedRuns.reduce((n, r) => n + r.totals.employees_in_breach, 0);
  const totalRulesBreached = loadedRuns.reduce((n, r) => n + r.totals.rules_breached, 0);
  const totalRulesEvaluated = loadedRuns.reduce((n, r) => n + r.totals.rules_evaluated, 0);
  const orgScore = Math.round(loadedRuns.reduce((n, r) => n + r.score * r.totals.employees, 0) / totalEmployees);

  const byStatus = { critical: 0, attention: 0, clear: 0 };
  loadedRuns.forEach((r) => {
    const label = runStatus(r).label;
    if (label === "Clear") byStatus.clear += 1;
    else if (label === "Critical") byStatus.critical += 1;
    else byStatus.attention += 1;
  });

  return (
    <>
      <div className="mt-4 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
        <div className="px-5 py-5 flex items-center gap-6 flex-wrap">
          <ScoreDial score={orgScore} grade={gradeFromScore(orgScore)} tone={orgStatus(loadedRuns).tone}
            label="Organization compliance score" />
          <div className="min-w-0 flex-1" style={{ minWidth: 260 }}>
            <div className="text-sm font-semibold" style={{ color: T.ink }}>
              {totalRulesBreached === 0
                ? `All ${totalRulesEvaluated} rules clear across ${allGroups.length} departments.`
                : `${totalRulesBreached} of ${totalRulesEvaluated} rules breached across ${allGroups.length} departments.`}
            </div>
            <div className="text-xs mt-1.5" style={{ color: T.muted }}>
              {pct(totalInBreach / totalEmployees)} of staff affected · {catalog.period.label}
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              <StatusChip label="Critical" count={byStatus.critical} tone={SEV.critical} />
              <StatusChip label="Need attention" count={byStatus.attention} tone={SEV.high} />
              <StatusChip label="Clear" count={byStatus.clear} tone={CLEAR} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
        <Tile label="Departments" value={`${allGroups.length}`} sub={`${catalog.countries.length} countries`} />
        <Tile label="Employees in breach" value={num(totalInBreach)}
          sub={`${pct(totalInBreach / totalEmployees)} of ${num(totalEmployees)}`}
          tone={totalInBreach ? SEV.critical : CLEAR} />
        <Tile label="Need attention" value={`${byStatus.critical + byStatus.attention} / ${allGroups.length}`}
          tone={byStatus.critical ? SEV.critical : byStatus.attention ? SEV.high : CLEAR} />
        <Tile label="Rules breached" value={`${totalRulesBreached} / ${totalRulesEvaluated}`} />
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

function CountryBranch({ country, runs, busy, onPick }) {
  return (
    <section className="mt-7 flex flex-col items-center">
      <div className="rounded-xl px-4 py-2 flex items-center gap-2.5" style={{ background: T.ink }}>
        <span style={{ fontSize: 16 }}>{country.flag}</span>
        <span className="text-sm font-semibold" style={{ color: "#fff" }}>{country.name}</span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          {num(country.employees)} employees · {country.groups.length} departments
        </span>
      </div>
      <Stub />
      <div style={{ width: "100%" }}>
        <OrgRow>
          {country.groups.map((g) => (
            <DepartmentNode key={g.key} group={g} run={runs[g.key]} busy={busy} onPick={onPick} />
          ))}
        </OrgRow>
      </div>
    </section>
  );
}

function DepartmentNode({ group, run, busy, onPick }) {
  const loaded = !!run;
  const status = loaded ? runStatus(run) : null;
  const tone = status?.tone;
  return (
    <button
      onClick={() => !busy && onPick(group)}
      disabled={!!busy}
      title={group.category}
      className="text-left rounded-xl flex flex-col w-full transition-shadow"
      style={{
        background: T.panel,
        border: `1px solid ${loaded ? tone.line : T.line}`,
        boxShadow: "0 1px 3px rgba(35,40,56,0.05)",
        cursor: busy ? "default" : "pointer",
        opacity: busy ? 0.7 : 1,
      }}
    >
      <div className="px-3.5 pt-3.5 pb-3" style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="text-sm font-semibold leading-snug" style={{ color: T.ink }}>{departmentName(group)}</div>
        <div className="mt-1.5 flex items-center gap-2.5 flex-wrap" style={{ fontSize: 10.5, color: T.faint }}>
          <span className="inline-flex items-center gap-1"><Users size={11} /> {num(group.headcount)}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={11} /> {group.sites.length} sites</span>
        </div>
      </div>

      <div className="px-3.5 py-3 mt-auto">
        {!loaded ? (
          <div className="flex items-center gap-2 text-xs" style={{ color: T.faint }}>
            <Loader2 size={13} className="animate-spin" /> Checking…
          </div>
        ) : (
          <div className="rounded-lg px-2.5 py-1.5 flex items-center justify-between"
            style={{ background: tone.soft, border: `1px solid ${tone.line}` }}>
            <span className="inline-flex items-center gap-1.5" style={{ color: tone.ink, fontSize: 11, fontWeight: 700 }}>
              <tone.Icon size={12} /> {status.label}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: tone.ink }}>
              {run.totals.rules_breached === 0
                ? "no breaches"
                : `${run.totals.rules_breached} breach${run.totals.rules_breached === 1 ? "" : "es"}`}
            </span>
          </div>
        )}
        <div className="mt-2 flex items-center justify-end gap-1"
          style={{ fontSize: 10.5, fontWeight: 600, color: T.muted }}>
          Review <ArrowRight size={11} />
        </div>
      </div>
    </button>
  );
}

/* ============================ the validating takeover ============================ */

/* Deliberately a full-screen moment rather than the small inline checklist screen 1 used to show under
   a card: the run now takes ~12s on purpose, and something that's meant to read as significant needs
   the room a modal gives it, not a corner of a busy chart. */
function ValidatingOverlay({ group, stages }) {
  const [at, setAt] = useState(0);
  useEffect(() => {
    setAt(0);
    const id = setInterval(() => setAt((n) => Math.min(n + 1, stages.length - 1)), RUN_MIN_MS / stages.length);
    return () => clearInterval(id);
  }, [stages]);

  const donePct = Math.round(((at + 1) / stages.length) * 100);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="absolute inset-0" style={{ background: "rgba(16,20,32,0.62)" }} />
      <div className="relative rounded-2xl overflow-hidden" style={{ width: 560, maxWidth: "calc(100vw - 48px)", background: T.panel, boxShadow: "0 24px 64px rgba(16,20,32,0.35)" }}>
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" color={T.signal} />
            <span className="text-sm font-semibold" style={{ color: T.ink }}>Validating {departmentName(group)}</span>
          </div>
          <div className="text-xs mt-1" style={{ color: T.muted }}>
            {num(group.headcount)} employees
          </div>
          <div className="mt-3 rounded-full overflow-hidden" style={{ height: 5, background: T.line }}>
            <div style={{ width: `${donePct}%`, height: "100%", background: T.signal, transition: "width 400ms ease" }} />
          </div>
        </div>
        <div className="px-5 py-4 flex flex-col gap-2.5">
          {stages.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm"
              style={{ color: i < at ? T.ink2 : i === at ? T.ink : T.faint, opacity: i > at ? 0.55 : 1 }}>
              {i < at
                ? <Check size={15} color={CLEAR.ink} className="shrink-0" />
                : i === at
                  ? <Loader2 size={15} className="animate-spin shrink-0" color={T.signal} />
                  : <span className="shrink-0" style={{ width: 15 }} />}
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
