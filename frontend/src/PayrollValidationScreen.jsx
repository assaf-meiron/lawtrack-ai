import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ShieldCheck, ArrowLeft, ArrowRight, Loader2, Users, FileText, Building2, MapPin,
  AlertOctagon, AlertTriangle, AlertCircle, CheckCircle2, ChevronDown, ChevronRight,
  Scale, Clock, Copy, Check, Filter, Ban, Fingerprint, Landmark,
} from "lucide-react";
import * as api from "./api.js";
import { T } from "./shared.jsx";

/* Payroll Validation — the punches, checked against the agreement they were collected under.

   The review surface ends at a configuration change. This screen starts where that ends: the config is
   live, the month is closed, and the question is whether the punch data already collected obeys the
   CCT it was collected under.

   Two screens, and the order is the argument. **First you choose a population**, because compliance is
   not a company-level fact — it is a fact about one employee category under one collective agreement,
   so the picker names the CCT and the union in full, by registration number. **Then the dashboard
   answers.** The score is deliberately not on the picker cards: revealing it there would answer the
   question before the user has said which population they are asking about.

   Every number on the dashboard is computed from the punch stream by the backend engine
   (`app/validation.py`), and every rule row carries the article or clause that creates it, quoted. A
   finding a reviewer cannot trace back to a clause is not worth showing. */

/* Severity is a *status* scale, not a series palette: four fixed steps, each shipped with an icon and
   a word so identity never rests on hue alone. The steps are checked for separation under deuteranopia
   and tritanopia as well as normal vision — amber sits at #ca8a04 rather than the more obvious #d97706
   because that lighter step is not reliably distinguishable from the critical red. */
const SEV = {
  critical: { label: "Critical", Icon: AlertOctagon, ink: "#dc2626", soft: "#fef2f2", line: "#fecaca", track: "#fee2e2" },
  high: { label: "High", Icon: AlertTriangle, ink: "#ca8a04", soft: "#fefce8", line: "#fde68a", track: "#fef3c7" },
  medium: { label: "Medium", Icon: AlertCircle, ink: "#2563eb", soft: "#eff6ff", line: "#bfdbfe", track: "#dbeafe" },
};
const CLEAR = { label: "Clear", Icon: CheckCircle2, ink: "#059669", soft: "#ecfdf5", line: "#a7f3d0", track: "#d1fae5" };
const sevMeta = (rule) => (rule.status === "clear" ? CLEAR : SEV[rule.severity]);

/* The score's own colour, on the same three status steps — so a 62 and a "Critical" chip on the same
   screen are saying the same thing in the same language. */
function scoreTone(score) {
  if (score >= 85) return CLEAR;
  if (score >= 70) return SEV.high;
  return SEV.critical;
}

const num = (n) => (n ?? 0).toLocaleString("en-US");
const money = (n, symbol) =>
  `${symbol}${Math.round(n ?? 0).toLocaleString("en-US")}`;
const pct = (share) => `${Math.round((share ?? 0) * 100)}%`;

/* How long the "validating" stage list is held on screen. The request itself returns in well under a
   second, which reads as "nothing happened" — the floor is there so the reader can see *what* was
   checked before the answer replaces it. It is a presentation minimum, not added latency: the fetch
   and the wait run together. */
const RUN_MIN_MS = 1900;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function PayrollValidationScreen({ fireToast }) {
  const [catalog, setCatalog] = useState(null);
  const [run, setRun] = useState(null);
  const [busy, setBusy] = useState(null);      // the group key being validated

  useEffect(() => {
    api.validationGroups().then(setCatalog).catch((e) => fireToast(e.message, "error"));
  }, [fireToast]);

  const validate = useCallback(async (group) => {
    setBusy(group.key);
    try {
      const [result] = await Promise.all([api.runValidation(group.key), sleep(RUN_MIN_MS)]);
      setRun(result);
      window.scrollTo({ top: 0 });
    } catch (e) {
      fireToast(e.message, "error");
    } finally {
      setBusy(null);
    }
  }, [fireToast]);

  if (!catalog) {
    return (
      <div className="px-6 py-16 flex items-center gap-2 text-sm" style={{ color: T.muted }}>
        <Loader2 size={16} className="animate-spin" /> Loading the business role groups…
      </div>
    );
  }
  if (run) return <Dashboard run={run} onBack={() => setRun(null)} fireToast={fireToast} />;
  return <Picker catalog={catalog} onPick={validate} busy={busy} />;
}

/* ============================ screen 1 — the population ============================ */

function Picker({ catalog, onPick, busy }) {
  const totalGroups = catalog.countries.reduce((n, c) => n + c.groups.length, 0);
  const totalPeople = catalog.countries.reduce((n, c) => n + c.employees, 0);

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
            Check the punches you already collected against the collective agreement they were collected
            under. Choose a business role group — {totalGroups} groups, {num(totalPeople)} employees across{" "}
            {catalog.countries.length} countries — and every rule in its CCT is run over the period's punch
            records, employee by employee.
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

      {catalog.countries.map((country) => (
        <section key={country.code} className="mt-7">
          <div className="flex items-baseline gap-2.5 flex-wrap pb-2.5" style={{ borderBottom: `1px solid ${T.line}` }}>
            <span style={{ fontSize: 19 }}>{country.flag}</span>
            <h2 className="text-base font-semibold tracking-tight" style={{ color: T.ink }}>{country.name}</h2>
            <span className="text-xs" style={{ color: T.muted }}>{country.law}</span>
            <span className="text-xs ml-auto" style={{ color: T.faint }}>
              {country.groups.length} groups · {num(country.employees)} employees ·{" "}
              {/* Same acronym, different instrument — worth saying once per country. */}
              agreements filed as <strong style={{ color: T.ink2, fontWeight: 600 }}>{country.instrument}</strong>{" "}
              with the {country.registry}
            </span>
          </div>
          <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))" }}>
            {country.groups.map((g) => (
              <GroupCard key={g.key} group={g} onPick={onPick} busy={busy} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* The four facts that make a group pickable: how many employees, what the group is, which CCT governs
   it, and which union signed that CCT. Everything else on the card is subordinate to those. */
function GroupCard({ group, onPick, busy }) {
  const running = busy === group.key;
  const blocked = busy && !running;
  return (
    <button
      onClick={() => !busy && onPick(group)}
      disabled={!!busy}
      className="text-left rounded-xl overflow-hidden flex flex-col transition-shadow"
      style={{
        background: T.panel, border: `1px solid ${running ? T.signal : T.line}`,
        boxShadow: running ? "0 0 0 3px rgba(30,151,247,0.12)" : "0 1px 3px rgba(35,40,56,0.05)",
        opacity: blocked ? 0.55 : 1, cursor: busy ? "default" : "pointer",
      }}
    >
      <div className="px-4 pt-3.5 pb-3 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-snug" style={{ color: T.ink }}>{group.name}</div>
          <div className="text-xs mt-1 leading-snug" style={{ color: T.muted }}>{group.category}</div>
        </div>
        {/* The headcount is the number that makes the group feel like a population rather than a label. */}
        <div className="text-right shrink-0">
          <div className="text-xl font-semibold leading-none" style={{ color: T.ink }}>{num(group.headcount)}</div>
          <div className="mt-0.5 inline-flex items-center gap-1" style={{ fontSize: 10, color: T.faint }}>
            <Users size={10} /> employees
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 flex flex-col gap-2.5" style={{ borderTop: `1px solid ${T.line}`, paddingTop: 10 }}>
        <Fact Icon={FileText} label={group.cct_instrument} value={group.cct_official}
          sub={`${group.cct_registration} · ${group.cct_validity}`} />
        <Fact Icon={Landmark} label="Union agreement — signatory" value={group.union_official}
          sub={`Employers' side: ${group.employer_body}`} />
      </div>

      <div className="px-4 py-2.5 mt-auto flex items-center gap-3 flex-wrap"
        style={{ borderTop: `1px solid ${T.line}`, background: "#fbfcfe" }}>
        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: T.muted }}>
          <Scale size={12} color={T.faint} /> {group.rule_count} rules mapped
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: T.muted }}>
          <MapPin size={12} color={T.faint} /> {group.sites.length} sites
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: running ? T.signal : T.ink }}>
          {running
            ? <><Loader2 size={13} className="animate-spin" /> Validating…</>
            : <>Validate punches <ArrowRight size={13} /></>}
        </span>
      </div>

      {running && <RunStages group={group} />}
    </button>
  );
}

function Fact({ Icon, label, value, sub }) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <Icon size={13} color={T.faint} className="shrink-0" style={{ marginTop: 2 }} />
      <div className="min-w-0">
        <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>{label}</div>
        <div className="text-xs leading-snug mt-0.5" style={{ color: T.ink2 }}>{value}</div>
        {sub && <div className="leading-snug mt-0.5" style={{ fontSize: 10.5, color: T.faint }}>{sub}</div>}
      </div>
    </div>
  );
}

/* What the run is doing, while it does it. The stages are the real pipeline in order, which is the
   point: a reader who watches this knows the score came from punch records and clauses, not a lookup. */
function RunStages({ group }) {
  const stages = useMemo(() => [
    `Reading the punch register for ${num(group.headcount)} employees`,
    "Rebuilding shifts, breaks and rest gaps from the raw punches",
    `Applying ${group.rule_count} rules from ${group.cct_instrument} + statute`,
    "Grouping breaches by clause and pricing the exposure",
  ], [group]);
  const [at, setAt] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAt((n) => Math.min(n + 1, stages.length - 1)), RUN_MIN_MS / stages.length);
    return () => clearInterval(id);
  }, [stages.length]);

  return (
    <div className="px-4 py-3 flex flex-col gap-1.5" style={{ borderTop: `1px solid ${T.line}`, background: "#fff" }}>
      {stages.map((s, i) => (
        <div key={s} className="flex items-center gap-2 text-xs"
          style={{ color: i < at ? T.muted : i === at ? T.ink : T.faint, opacity: i > at ? 0.5 : 1 }}>
          {i < at ? <Check size={12} color={CLEAR.ink} /> : i === at
            ? <Loader2 size={12} className="animate-spin" color={T.signal} />
            : <span style={{ width: 12 }} />}
          {s}
        </div>
      ))}
    </div>
  );
}

/* ============================ screen 2 — the dashboard ============================ */

function Dashboard({ run, onBack, fireToast }) {
  const { group, totals, period } = run;
  const [sevFilter, setSevFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [open, setOpen] = useState(() => {
    const worst = run.rules.find((r) => r.status === "breach");
    return worst ? { [worst.code]: true } : {};
  });

  const breached = run.rules.filter((r) => r.status === "breach");
  const clear = run.rules.filter((r) => r.status === "clear");
  const shown = breached.filter((r) =>
    (sevFilter === "all" || r.severity === sevFilter) &&
    (siteFilter === "all" || r.sites.includes(siteFilter)));

  return (
    <div className="mx-auto px-6 py-5" style={{ maxWidth: 1180 }}>
      {/* who and what — the population this score belongs to, restated so the number is never orphaned */}
      <div className="flex items-start gap-3 flex-wrap">
        <button onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold shrink-0 transition-transform active:scale-95"
          style={{ border: `1px solid ${T.line2}`, background: "#fff", color: T.ink2 }}>
          <ArrowLeft size={13} /> All groups
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span style={{ fontSize: 15 }}>{group.flag}</span>
            <h1 className="text-lg font-semibold tracking-tight" style={{ color: T.ink }}>{group.name}</h1>
            <span className="text-xs" style={{ color: T.muted }}>{group.category}</span>
          </div>
          <div className="text-xs mt-1 leading-snug" style={{ color: T.muted }}>
            {group.cct_official} <span style={{ color: T.line2 }}>·</span> {group.cct_registration}
          </div>
          <div className="text-xs mt-0.5 leading-snug" style={{ color: T.faint }}>
            {group.union_official} <span style={{ color: T.line2 }}>·</span> {group.employer_body}
          </div>
        </div>
        <CopyReport run={run} fireToast={fireToast} />
      </div>

      {/* the one number the view leads with, and what it is made of */}
      <div className="mt-4 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
        <div className="px-5 py-5 flex items-center gap-6 flex-wrap">
          <ScoreDial score={run.score} grade={run.grade} />
          <div className="min-w-0 flex-1" style={{ minWidth: 260 }}>
            <div className="text-sm font-semibold" style={{ color: T.ink }}>
              {totals.rules_breached === 0
                ? `All ${totals.rules_evaluated} rules clear for ${period.label}.`
                : `${totals.rules_breached} of ${totals.rules_evaluated} rules breached in ${period.label}.`}
            </div>
            <div className="text-xs mt-1.5 leading-relaxed" style={{ color: T.muted }}>
              {num(totals.employees_in_breach)} of {num(totals.employees)} employees
              ({pct(totals.employees_in_breach / totals.employees)}) appear in at least one breach, across{" "}
              {num(totals.violations)} occurrences found in {num(totals.punch_records)} punch records.
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              {["critical", "high", "medium"].map((sev) => {
                const meta = SEV[sev];
                const n = run.severity_counts[sev];
                return (
                  <span key={sev} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{ background: n ? meta.soft : "#f4f6f9", border: `1px solid ${n ? meta.line : T.line}`,
                      fontSize: 11, fontWeight: 600, color: n ? meta.ink : T.faint }}>
                    <meta.Icon size={11} /> {n} {meta.label.toLowerCase()}
                  </span>
                );
              })}
              {clear.length > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={{ background: CLEAR.soft, border: `1px solid ${CLEAR.line}`, fontSize: 11,
                    fontWeight: 600, color: CLEAR.ink }}>
                  <CheckCircle2 size={11} /> {clear.length} clear
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="px-5 py-2.5 text-xs leading-snug" style={{ borderTop: `1px solid ${T.line}`, background: "#fbfcfe", color: T.faint }}>
          <strong style={{ color: T.muted, fontWeight: 600 }}>How the score is built.</strong> {run.score_basis}
        </div>
      </div>

      {/* the headline counts — deliberately smaller than the score, which is the view's one hero figure */}
      <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <Tile label="Employees checked" value={num(totals.employees)} sub={`${group.sites.length} sites`} />
        <Tile label="Employees in breach" value={num(totals.employees_in_breach)}
          sub={pct(totals.employees_in_breach / totals.employees) + " of the group"}
          tone={totals.employees_in_breach ? SEV.critical : CLEAR} />
        <Tile label="Punch records analysed" value={num(totals.punch_records)}
          sub={`${num(totals.days_analyzed)} worked days`} />
        <Tile label="Rules breached" value={`${totals.rules_breached} / ${totals.rules_evaluated}`}
          sub={`${num(totals.violations)} occurrences`} />
        <Tile label="Estimated exposure" value={money(totals.exposure, totals.symbol)}
          sub={`${totals.currency} · indicative`} tone={totals.exposure ? SEV.high : CLEAR} />
      </div>

      {/* the rule map */}
      <div className="mt-6 flex items-center gap-2.5 flex-wrap">
        <h2 className="text-sm font-semibold" style={{ color: T.ink }}>
          Where the punches breach the agreement
        </h2>
        <span className="text-xs" style={{ color: T.faint }}>
          {shown.length === breached.length
            ? `${breached.length} rules, worst first`
            : `${shown.length} of ${breached.length} rules shown`}
        </span>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <Filter size={12} color={T.faint} />
          <Select value={sevFilter} onChange={setSevFilter}
            options={[["all", "Every severity"], ...["critical", "high", "medium"]
              .filter((s) => breached.some((r) => r.severity === s))
              .map((s) => [s, SEV[s].label])]} />
          <Select value={siteFilter} onChange={setSiteFilter}
            options={[["all", "Every site"], ...group.sites.map((s) => [s, s])]} />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {shown.map((rule) => (
          <RuleRow key={rule.code} rule={rule} run={run} siteFilter={siteFilter}
            open={!!open[rule.code]} onToggle={() => setOpen((o) => ({ ...o, [rule.code]: !o[rule.code] }))} />
        ))}
        {breached.length > 0 && shown.length === 0 && (
          <div className="rounded-xl px-4 py-8 text-center text-sm"
            style={{ border: `1px dashed ${T.line2}`, color: T.faint }}>
            No breached rule matches those filters.
          </div>
        )}
        {breached.length === 0 && (
          <div className="rounded-xl px-4 py-8 text-center text-sm"
            style={{ border: `1px solid ${CLEAR.line}`, background: CLEAR.soft, color: CLEAR.ink }}>
            <CheckCircle2 size={20} className="mx-auto mb-2" />
            Every rule mapped to this group is clear for {period.label}.
          </div>
        )}
      </div>

      {clear.length > 0 && <ClearRules rules={clear} />}
      {group.exclusions.length > 0 && <Exclusions exclusions={group.exclusions} />}

      <div className="mt-5 rounded-xl px-4 py-3 text-xs leading-relaxed"
        style={{ background: "#fbfcfe", border: `1px solid ${T.line}`, color: T.faint }}>
        <div className="flex items-start gap-2">
          <Fingerprint size={13} className="shrink-0" style={{ marginTop: 1 }} />
          <div>
            Punches read from <strong style={{ color: T.muted, fontWeight: 600 }}>{run.punch_source}</strong> for{" "}
            {period.start} → {period.end}.{" "}
            <strong style={{ color: T.muted, fontWeight: 600 }}>Exposure is an indicative estimate</strong> — the
            suppressed time at its statutory premium plus the reflex effects that ride along, per occurrence. It
            is a triage number for deciding what to fix first, not a payroll calculation and not a provision.
            Findings are a cited draft for expert review.
          </div>
        </div>
      </div>
    </div>
  );
}

/* The hero figure: one per view, ≥48px, in the product's own sans. The ring is a meter — the fill
   carries the severity and the track is a lighter step of the same hue, so state reads across the
   whole arc rather than only where the fill stops. */
function ScoreDial({ score, grade }) {
  const tone = scoreTone(score);
  const r = 46, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4 shrink-0">
      <div className="relative" style={{ width: 116, height: 116 }}>
        <svg width="116" height="116" viewBox="0 0 116 116" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="58" cy="58" r={r} fill="none" stroke={tone.track} strokeWidth="11" />
          <circle cx="58" cy="58" r={r} fill="none" stroke={tone.ink} strokeWidth="11" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Proportional figures, not tabular: at this size tabular digits read loose. */}
          <div style={{ fontSize: 44, fontWeight: 600, lineHeight: 1, color: T.ink, letterSpacing: "-0.02em" }}>
            {score}
          </div>
          <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, marginTop: 3 }}>
            of 100
          </div>
        </div>
      </div>
      <div>
        <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>
          Compliance score
        </div>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-2xl font-semibold leading-none" style={{ color: tone.ink }}>{grade}</span>
          <span className="text-xs" style={{ color: T.muted }}>grade</span>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, tone }) {
  return (
    <div className="rounded-xl px-3.5 py-3" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <div className="text-xs" style={{ color: T.muted }}>{label}</div>
      <div className="mt-1 text-xl font-semibold leading-none" style={{ color: tone ? tone.ink : T.ink }}>
        {value}
      </div>
      {sub && <div className="mt-1.5" style={{ fontSize: 10.5, color: T.faint }}>{sub}</div>}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="rounded-lg px-2 py-1.5 text-xs outline-none"
      style={{ border: `1px solid ${T.line2}`, background: "#fff", color: T.ink2, maxWidth: 190 }}>
      {options.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
    </select>
  );
}

/* One rule: the limit, the clause that sets it, how much of the group is past it, and — once opened —
   the employees and the punch cards that put them there. */
function RuleRow({ rule, run, siteFilter, open, onToggle }) {
  const meta = sevMeta(rule);
  const { symbol } = run.totals;
  const violations = siteFilter === "all"
    ? rule.violations
    : rule.violations.filter((v) => v.site === siteFilter);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <button onClick={onToggle} className="w-full text-left px-4 py-3 flex items-start gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 shrink-0"
          style={{ background: meta.soft, border: `1px solid ${meta.line}`, color: meta.ink, fontSize: 10, fontWeight: 700 }}>
          <meta.Icon size={11} /> {meta.label}
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-snug" style={{ color: T.ink }}>{rule.title}</div>
          <div className="text-xs mt-1 flex items-center gap-2 flex-wrap" style={{ color: T.muted }}>
            <span className="rounded px-1.5 py-0.5 font-semibold"
              style={{ background: "#eef2ff", color: "#4338ca", fontSize: 10 }}>{rule.limit_label}</span>
            <span className="inline-flex items-center gap-1">
              <Scale size={11} color={T.faint} /> {rule.source}
            </span>
            {rule.source_kind === "cct" && (
              <span className="uppercase tracking-wider rounded px-1.5 py-0.5"
                style={{ fontSize: 9, background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" }}>
                CCT clause
              </span>
            )}
          </div>
        </div>

        {/* The meter, then the counts it stands for. */}
        <div className="shrink-0 flex items-center gap-4" style={{ width: 290 }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2" style={{ fontSize: 10.5, color: T.faint }}>
              <span>Employees in breach</span>
              <span style={{ fontVariantNumeric: "tabular-nums", color: T.ink2, fontWeight: 600 }}>
                {num(rule.affected_employees)} · {pct(rule.affected_share)}
              </span>
            </div>
            <div className="mt-1.5 rounded-full overflow-hidden" style={{ height: 7, background: meta.track }}>
              <div style={{ width: `${Math.max(2, rule.affected_share * 100)}%`, height: "100%",
                background: meta.ink, borderRadius: 99 }} />
            </div>
            <div className="mt-1.5 flex items-center gap-2" style={{ fontSize: 10.5, color: T.faint }}>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{num(rule.occurrences)} occurrences</span>
              <span style={{ color: T.line2 }}>·</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{money(rule.exposure, symbol)}</span>
            </div>
          </div>
          {open ? <ChevronDown size={16} color={T.faint} /> : <ChevronRight size={16} color={T.faint} />}
        </div>
      </button>

      {open && (
        <div style={{ borderTop: `1px solid ${T.line}` }}>
          <div className="px-4 py-3 grid gap-3" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", background: "#fbfcfe" }}>
            <div>
              <Caption>What the rule requires</Caption>
              <p className="text-xs leading-relaxed mt-1" style={{ color: T.ink2 }}>{rule.requirement}</p>
              <Caption className="mt-3">Why a breach matters</Caption>
              <p className="text-xs leading-relaxed mt-1" style={{ color: T.ink2 }}>{rule.consequence}</p>
            </div>
            <div>
              <Caption>{rule.source} — as written</Caption>
              {/* The clause verbatim, in the language of the instrument. A finding a reviewer cannot
                  trace to the text is not a finding. */}
              <blockquote className="text-xs leading-relaxed mt-1 rounded-lg px-3 py-2.5"
                style={{ background: "#fff", borderLeft: `3px solid ${T.line2}`, color: T.ink2, fontStyle: "italic" }}>
                {rule.quote}
              </blockquote>
              <div className="mt-2 flex items-center gap-1.5" style={{ fontSize: 10.5, color: T.faint }}>
                Maps to pay-policy capability
                <span className="rounded px-1.5 py-0.5 font-semibold"
                  style={{ background: "#eef2ff", color: "#4338ca", fontSize: 10 }}>{rule.capability}</span>
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 flex items-center gap-2 flex-wrap"
            style={{ borderTop: `1px solid ${T.line}` }}>
            <span className="text-xs font-semibold" style={{ color: T.ink }}>Employees in breach of this rule</span>
            <span className="text-xs" style={{ color: T.faint }}>
              {/* Never a silent cap: what was dropped is said out loud. */}
              {rule.occurrences > rule.violations_shown
                ? `${num(rule.occurrences)} occurrences · showing the ${rule.violations_shown} largest`
                : `${num(rule.occurrences)} occurrences`}
              {siteFilter !== "all" && ` · filtered to ${siteFilter}`}
            </span>
          </div>
          <div className="flex flex-col">
            {violations.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs" style={{ color: T.faint }}>
                None of the shown occurrences are at {siteFilter}.
              </div>
            ) : violations.map((v, i) => (
              <ViolationRow key={`${v.matricula}-${v.date}-${i}`} v={v} meta={meta} symbol={symbol} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ViolationRow({ v, meta, symbol }) {
  return (
    <div className="px-4 py-2.5 flex items-start gap-3 flex-wrap" style={{ borderTop: `1px solid ${T.line}` }}>
      <div style={{ width: 190 }} className="min-w-0">
        <div className="text-xs font-semibold truncate" style={{ color: T.ink }}>{v.employee}</div>
        <div className="truncate" style={{ fontSize: 10.5, color: T.faint }}>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{v.matricula}</span> · {v.role}
        </div>
        <div className="truncate inline-flex items-center gap-1" style={{ fontSize: 10.5, color: T.faint }}>
          <Building2 size={9} /> {v.site}
        </div>
      </div>
      <div className="min-w-0 flex-1" style={{ minWidth: 240 }}>
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontSize: 10.5, color: T.faint, fontVariantNumeric: "tabular-nums" }}>{v.date}</span>
          <span className="rounded px-1.5 py-0.5 font-semibold"
            style={{ background: meta.soft, color: meta.ink, fontSize: 10, border: `1px solid ${meta.line}` }}>
            {v.observed}
          </span>
        </div>
        <div className="text-xs leading-snug mt-1" style={{ color: T.ink2 }}>{v.detail}</div>
      </div>
      <div style={{ width: 200 }} className="min-w-0">
        <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>
          As punched
        </div>
        <div className="mt-0.5 flex flex-col" style={{ fontSize: 10.5, color: T.ink2, fontVariantNumeric: "tabular-nums" }}>
          {v.punches.map((p, i) => <span key={i}>{p}</span>)}
        </div>
      </div>
      <div style={{ width: 84 }} className="text-right shrink-0">
        <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>Est.</div>
        <div className="text-xs font-semibold" style={{ color: T.ink2, fontVariantNumeric: "tabular-nums" }}>
          {money(v.exposure, symbol)}
        </div>
      </div>
    </div>
  );
}

function Caption({ children, className = "" }) {
  return (
    <div className={`uppercase tracking-wider ${className}`} style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>
      {children}
    </div>
  );
}

/* A rule that passed and a rule that had nothing to test are not the same claim, so the clear list
   carries the engine's own note on which of the two it was. */
function ClearRules({ rules }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <button onClick={() => setOpen((v) => !v)} className="w-full px-4 py-2.5 flex items-center gap-2 text-left">
        <CheckCircle2 size={13} color={CLEAR.ink} />
        <span className="text-sm font-semibold" style={{ color: T.ink }}>
          {rules.length} rule{rules.length === 1 ? "" : "s"} clear
        </span>
        <span className="text-xs" style={{ color: T.faint }}>checked over the same punch records, nothing found</span>
        <span className="ml-auto">{open ? <ChevronDown size={15} color={T.faint} /> : <ChevronRight size={15} color={T.faint} />}</span>
      </button>
      {open && rules.map((rule) => (
        <div key={rule.code} className="px-4 py-2.5 flex items-start gap-3" style={{ borderTop: `1px solid ${T.line}` }}>
          <CheckCircle2 size={13} color={CLEAR.ink} className="shrink-0" style={{ marginTop: 2 }} />
          <div className="min-w-0">
            <div className="text-xs font-semibold" style={{ color: T.ink2 }}>{rule.title}</div>
            <div className="text-xs mt-0.5" style={{ color: T.faint }}>
              {rule.source} · {rule.limit_label}
            </div>
            {rule.clear_note && (
              <div className="text-xs leading-snug mt-1 rounded-lg px-2.5 py-1.5"
                style={{ background: "#fbfcfe", border: `1px solid ${T.line}`, color: T.muted }}>
                {rule.clear_note}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Rules a *different* rule displaces. Stating them is the difference between "this does not apply" and
   "nobody looked" — and on a 12×36 roster that distinction is the whole legal argument. */
function Exclusions({ exclusions }) {
  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${T.line}` }}>
        <Ban size={13} color={T.faint} />
        <span className="text-sm font-semibold" style={{ color: T.ink }}>Not applied to this group</span>
        <span className="text-xs" style={{ color: T.faint }}>and why — an exclusion is not a pass</span>
      </div>
      {exclusions.map((x) => (
        <div key={x.rule} className="px-4 py-2.5" style={{ borderTop: `1px solid ${T.line}` }}>
          <div className="text-xs font-semibold" style={{ color: T.ink2 }}>{x.rule}</div>
          <div className="text-xs leading-relaxed mt-0.5" style={{ color: T.muted }}>{x.why}</div>
        </div>
      ))}
    </div>
  );
}

/* The run has to be able to leave the room: a validation nobody can paste into a memo is worth very
   little to the person who has to act on it. */
function CopyReport({ run, fireToast }) {
  const [done, setDone] = useState(false);
  async function copy() {
    const md = reportMarkdown(run);
    try {
      await navigator.clipboard.writeText(md);
    } catch {
      // The clipboard API needs a secure context and the demo runs over plain http.
      const ta = document.createElement("textarea");
      ta.value = md;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (!ok) return fireToast("Could not access the clipboard.", "error");
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
    fireToast("Validation report copied as markdown.", "ready");
  }
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold shrink-0 transition-transform active:scale-95"
      style={{ background: T.ink, color: "#fff" }}>
      {done ? <Check size={13} /> : <Copy size={13} />} {done ? "Copied" : "Copy report"}
    </button>
  );
}

function reportMarkdown(run) {
  const { group, totals, period } = run;
  const lines = [
    `# Payroll validation — ${group.name}`,
    "",
    `**Period:** ${period.label} (${period.start} → ${period.end})`,
    `**Population:** ${totals.employees} employees · ${group.category}`,
    `**${group.cct_instrument}:** ${group.cct_official} (${group.cct_registration}, ${group.cct_validity})`,
    `**Union:** ${group.union_official}`,
    `**Employers' side:** ${group.employer_body}`,
    `**Punch source:** ${run.punch_source}`,
    "",
    `## Compliance score: ${run.score}/100 (grade ${run.grade})`,
    "",
    `${run.score_basis}`,
    "",
    `- Rules breached: ${totals.rules_breached} of ${totals.rules_evaluated}`,
    `- Employees in breach: ${totals.employees_in_breach} of ${totals.employees}`,
    `- Occurrences: ${totals.violations} across ${totals.punch_records} punch records (${totals.days_analyzed} worked days)`,
    `- Estimated exposure: ${money(totals.exposure, totals.symbol)} ${totals.currency} (indicative, not a payroll calculation)`,
    "",
    "## Breaches",
    "",
  ];
  run.rules.filter((r) => r.status === "breach").forEach((r) => {
    lines.push(
      `### [${SEV[r.severity].label}] ${r.title}`,
      "",
      `- **Limit:** ${r.limit_label}`,
      `- **Basis:** ${r.source}`,
      `- **Affected:** ${r.affected_employees} employees (${pct(r.affected_share)}), ${r.occurrences} occurrences`,
      `- **Estimated exposure:** ${money(r.exposure, totals.symbol)}`,
      `- **Capability:** ${r.capability}`,
      "",
      `> ${r.quote}`,
      "",
      `${r.consequence}`,
      "",
    );
    r.violations.slice(0, 10).forEach((v) => {
      lines.push(`  - ${v.date} · ${v.employee} (${v.matricula}, ${v.site}) — ${v.observed}. ${v.detail}`);
    });
    if (r.occurrences > 10) lines.push(`  - …and ${r.occurrences - 10} further occurrences.`);
    lines.push("");
  });

  const clear = run.rules.filter((r) => r.status === "clear");
  if (clear.length) {
    lines.push("## Clear", "");
    clear.forEach((r) => lines.push(`- **${r.title}** (${r.source})${r.clear_note ? ` — ${r.clear_note}` : ""}`));
    lines.push("");
  }
  if (group.exclusions.length) {
    lines.push("## Not applied to this group", "");
    group.exclusions.forEach((x) => lines.push(`- **${x.rule}** — ${x.why}`));
    lines.push("");
  }
  lines.push("---", "", "Generated by LawTrack AI · a cited draft for expert review, not legal advice.");
  return lines.join("\n");
}
