import React, { useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, Building2,
  CheckCircle2, ChevronDown, ChevronRight, Loader2,
  Scale, Copy, Check, Filter, Ban, Fingerprint, Wrench, Send, ListChecks, Users,
} from "lucide-react";
import * as api from "./api.js";
import { T } from "./shared.jsx";
import {
  SEV, CLEAR, sevMeta, runStatus, num, money, pct, ScoreDial, Tile,
} from "./validationShared.jsx";
import ValidationOverview from "./ValidationOverview.jsx";

/* Payroll Validation — the punches, checked against the agreements they were collected under.

   The review surface ends at a configuration change. This screen starts where that ends: the config is
   live, the month is closed, and the question is whether the punch data already collected obeys the
   agreements it was collected under.

   Screen 1 (ValidationOverview.jsx) is the org chart — four arms, sixteen departments, and no
   compliance claim anywhere on it until someone picks one. Screen 2, below, is the dashboard that
   answers for the department that was picked. Every number on it is computed from the punch stream by
   the backend engine (`app/validation.py`), and every rule row carries the article or clause that
   creates it, quoted. A finding a reviewer cannot trace back to a clause is not worth showing.

   **A department is not an agreement**, and this screen is where that stops being an abstraction. One
   department can be three populations under three CCTs, so a rule binds *some* of the headcount and
   the row has to say which: the meter is a share of the population the clause actually covers, the
   score spends the share of the whole department, and both denominators are on screen. */

export default function PayrollValidationScreen({ fireToast, onOpenLayers }) {
  const [catalog, setCatalog] = useState(null);
  /* Every department validated in this session, keyed by department. Owned *here* rather than by the
     overview, because the overview unmounts the moment a dashboard opens — parking the results there
     meant a run the user had just waited twelve seconds for was thrown away as soon as they clicked
     into it, and coming back showed "Not validated" on a department they had plainly just validated.
     The old prefetch hid this: it refilled the map on every mount, so nothing looked lost. */
  const [runs, setRuns] = useState({});
  // The department whose dashboard is open — a key, not a run, so `runs` stays the single source.
  const [open, setOpen] = useState(null);

  useEffect(() => {
    api.validationDepartments().then(setCatalog).catch((e) => fireToast(e.message, "error"));
  }, [fireToast]);

  if (open && runs[open]) {
    return <Dashboard run={runs[open]} onBack={() => { window.scrollTo({ top: 0 }); setOpen(null); }}
      fireToast={fireToast} onOpenLayers={onOpenLayers} />;
  }
  if (!catalog) {
    return (
      <div className="px-6 py-16 flex items-center gap-2 text-sm" style={{ color: T.muted }}>
        <Loader2 size={16} className="animate-spin" /> Loading the org chart…
      </div>
    );
  }
  return <ValidationOverview catalog={catalog} runs={runs} setRuns={setRuns}
    fireToast={fireToast} onOpenDashboard={setOpen} />;
}

/* ============================ the dashboard ============================ */

/* Which rule codes a breach is fixable by *changing a configured rate or threshold* — the night
   premium percentage, the punch-tolerance window, the Sunday premium, the weekly-overtime rate step —
   versus one fixable only by changing how people are actually rostered. This is what routes the call
   to action: a misconfigured percentage goes to whoever owns the pay policy; a missed rest day goes to
   whoever owns the schedule. There is no field on the run for this distinction, because it isn't a
   property of the rule — it's a property of what fixing it looks like, so it's kept here, next to the
   one place that decision gets made. */
const CONFIG_FIX_CODES = new Set(["br-tolerance-10m", "br-night-premium", "mx-ot-weekly-9h", "mx-sunday-prima"]);
const CONFIG_FIX_LABELS = {
  "br-tolerance-10m": "punch tolerance",
  "br-night-premium": "night premium",
  "mx-ot-weekly-9h": "weekly OT premium",
  "mx-sunday-prima": "Sunday premium",
};

function Dashboard({ run, onBack, fireToast, onOpenLayers }) {
  const { department: dept, totals, period, segments } = run;
  const [sevFilter, setSevFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [agFilter, setAgFilter] = useState("all");
  const [open, setOpen] = useState({});

  const breached = run.rules.filter((r) => r.status === "breach");
  const clear = run.rules.filter((r) => r.status === "clear");
  const shown = breached.filter((r) =>
    (sevFilter === "all" || r.severity === sevFilter) &&
    (siteFilter === "all" || r.sites.includes(siteFilter)) &&
    (agFilter === "all" || r.agreements.some((a) => a.key === agFilter)));

  return (
    <div className="mx-auto px-6 py-5" style={{ maxWidth: 1180 }}>
      {/* who and what — the population this score belongs to, restated so the number is never orphaned */}
      <div className="flex items-start gap-3 flex-wrap">
        <button onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold shrink-0 transition-transform active:scale-95"
          style={{ border: `1px solid ${T.line2}`, background: "#fff", color: T.ink2 }}>
          <ArrowLeft size={13} /> All departments
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span style={{ fontSize: 15 }}>{dept.flag}</span>
            <h1 className="text-lg font-semibold tracking-tight" style={{ color: T.ink }}>{dept.name}</h1>
            <span className="text-xs" style={{ color: T.muted }}>{dept.country_name}</span>
          </div>
          <div className="text-xs mt-1 leading-snug" style={{ color: T.faint }}>
            {dept.mandate} · {num(totals.employees)} employees under{" "}
            {totals.agreements} collective agreement{totals.agreements === 1 ? "" : "s"}
          </div>
        </div>
        <CopyReport run={run} fireToast={fireToast} />
      </div>

      {/* the one number the view leads with, and what it is made of */}
      <div className="mt-4 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
        <div className="px-5 py-5 flex items-center gap-6 flex-wrap">
          <ScoreDial score={run.score} grade={run.grade} tone={runStatus(run).tone} />
          <div className="min-w-0 flex-1" style={{ minWidth: 260 }}>
            <div className="text-sm font-semibold" style={{ color: T.ink }}>
              {totals.rules_breached === 0
                ? `All ${totals.rules_evaluated} rules clear.`
                : `${totals.rules_breached} of ${totals.rules_evaluated} rules breached · ${pct(totals.employees_in_breach / totals.employees)} of staff affected.`}
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
      </div>

      {breached.length > 0 && <ActionPanel run={run} onOpenLayers={onOpenLayers} fireToast={fireToast} />}

      {/* the headline counts — deliberately smaller than the score, and deliberately fewer than every
          number the run produces: the rest is one click into a rule row, not a tile on the landing view */}
      <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
        <Tile label="Employees in breach" value={num(totals.employees_in_breach)}
          sub={pct(totals.employees_in_breach / totals.employees) + ` of ${num(totals.employees)} checked`}
          tone={totals.employees_in_breach ? SEV.critical : CLEAR} />
        <Tile label="Rules breached" value={`${totals.rules_breached} / ${totals.rules_evaluated}`}
          sub={`${num(totals.violations)} occurrences`} />
        <Tile label="Estimated exposure" value={money(totals.exposure, totals.symbol)}
          sub={`${totals.currency} · indicative`} tone={totals.exposure ? SEV.high : CLEAR} />
      </div>

      <Agreements segments={segments} headcount={totals.employees} />

      {/* the rule map */}
      <div className="mt-6 flex items-center gap-2.5 flex-wrap">
        <h2 className="text-sm font-semibold" style={{ color: T.ink }}>
          Where the punches breach the agreements
        </h2>
        <span className="text-xs" style={{ color: T.faint }}>
          {shown.length === breached.length
            ? `${breached.length} rule${breached.length === 1 ? "" : "s"}, worst first`
            : `${shown.length} of ${breached.length} rules shown`}
        </span>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <Filter size={12} color={T.faint} />
          <Select value={sevFilter} onChange={setSevFilter}
            options={[["all", "Every severity"], ...["critical", "high", "medium"]
              .filter((s) => breached.some((r) => r.severity === s))
              .map((s) => [s, SEV[s].label])]} />
          {segments.length > 1 && (
            <Select value={agFilter} onChange={setAgFilter}
              options={[["all", "Every agreement"],
                ...segments.map((s) => [s.agreement.key, s.agreement.short])]} />
          )}
          <Select value={siteFilter} onChange={setSiteFilter}
            options={[["all", "Every site"], ...dept.sites.map((s) => [s, s])]} />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {shown.map((rule) => (
          <RuleRow key={rule.code} rule={rule} run={run} siteFilter={siteFilter} agFilter={agFilter}
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
            Every rule mapped to this department is clear for {period.label}.
          </div>
        )}
      </div>

      {clear.length > 0 && <ClearRules rules={clear} />}
      {dept.exclusions.length > 0 && <Exclusions exclusions={dept.exclusions} />}

      <div className="mt-5 rounded-xl px-4 py-2.5 text-xs leading-snug flex items-center gap-2"
        style={{ background: "#fbfcfe", border: `1px solid ${T.line}`, color: T.faint }}>
        <Fingerprint size={13} className="shrink-0" />
        <div>
          {run.punch_source} · {period.start} → {period.end}. Exposure is indicative, not a payroll calculation.
          Cited draft for expert review.
        </div>
      </div>
    </div>
  );
}

/* ============================ what the department is made of ============================ */

/* The department's populations, each with the agreement that governs it, named in full and by
   registration number. This used to be one line in the header, because a group *was* one CCT. It is a
   panel now because a department is several, and "Global operations" is not a compliance population —
   *drivers on CCT SP003912/2026, represented by SINDMOTORISTAS* is. The split is also the reason a
   rule below can bind 6,800 of 12,400 people, so a reader needs it before the rule map, not after. */
function Agreements({ segments, headcount }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <button onClick={() => setOpen((v) => !v)} className="w-full px-4 py-2.5 flex items-center gap-2 text-left">
        <Scale size={14} color={T.ink2} className="shrink-0" />
        <span className="text-sm font-semibold" style={{ color: T.ink }}>
          {segments.length} collective agreement{segments.length === 1 ? "" : "s"} across this department
        </span>
        <span className="text-xs truncate min-w-0" style={{ color: T.faint }}>
          {segments.map((s) => `${s.agreement.short} (${num(s.headcount)})`).join(" · ")}
        </span>
        <span className="ml-auto shrink-0">
          {open ? <ChevronDown size={15} color={T.faint} /> : <ChevronRight size={15} color={T.faint} />}
        </span>
      </button>
      {open && segments.map((s) => (
        <div key={s.agreement.key + s.label} className="px-4 py-3" style={{ borderTop: `1px solid ${T.line}` }}>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs font-semibold" style={{ color: T.ink }}>{s.label}</span>
            <span className="rounded px-1.5 py-0.5 font-semibold"
              style={{ background: "#eef2ff", color: "#4338ca", fontSize: 10 }}>
              {num(s.headcount)} · {pct(s.headcount / headcount)} of the department
            </span>
            <span style={{ fontSize: 10.5, color: T.faint }}>
              {s.agreement.rule_count} rules · {s.sites.length} site{s.sites.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="text-xs leading-relaxed mt-1.5" style={{ color: T.ink2 }}>{s.agreement.cct_official}</div>
          <div className="mt-1 grid gap-x-6 gap-y-0.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <Meta label={s.agreement.registry}>{s.agreement.cct_registration} · {s.agreement.cct_validity}</Meta>
            <Meta label="Category">{s.agreement.category}</Meta>
            <Meta label="Union">{s.agreement.union_official}</Meta>
            <Meta label="Employers' side">{s.agreement.employer_body}</Meta>
          </div>
        </div>
      ))}
    </div>
  );
}

function Meta({ label, children }) {
  return (
    <div style={{ fontSize: 10.5, color: T.faint }}>
      <span className="uppercase tracking-wider" style={{ fontWeight: 700 }}>{label}</span>{" "}
      <span style={{ color: T.muted }}>{children}</span>
    </div>
  );
}

/* ============================ the call to action ============================ */

/* What HR actually does with this list: split it by who can fix it. A misconfigured rate is a Payroll
   config change, made once, that clears every occurrence it created. A missed rest day or a broken
   rotation is a scheduling decision, made by whoever owns that roster, per site. Handing over one
   undifferentiated list of breached rules leaves that triage to the reader; doing it here is the
   difference between a dashboard and a next step. */
function ActionPanel({ run, onOpenLayers, fireToast }) {
  const breached = run.rules.filter((r) => r.status === "breach");
  const configRules = breached.filter((r) => CONFIG_FIX_CODES.has(r.code));
  const scheduleRules = breached.filter((r) => !CONFIG_FIX_CODES.has(r.code));

  const openLayers = () => {
    fireToast("Opening the Knowledge Hub.", "neutral");
    onOpenLayers?.();
  };
  const assignSchedule = () => {
    fireToast(`Queued for ${run.department.name} site managers.`, "ready");
  };

  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${T.line}` }}>
        <ListChecks size={14} color={T.ink2} />
        <span className="text-sm font-semibold" style={{ color: T.ink }}>What to do next</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: configRules.length && scheduleRules.length ? "1fr 1fr" : "1fr" }}>
        {configRules.length > 0 && (
          <ActionCard
            Icon={Wrench}
            title="Fix the pay-policy configuration"
            body={`${configRules.length} rule${configRules.length === 1 ? "" : "s"}: ${configRules.map((r) => CONFIG_FIX_LABELS[r.code] || r.title).join(", ")}. One config change clears it.`}
            exposure={configRules.reduce((n, r) => n + r.exposure, 0)}
            symbol={run.totals.symbol}
            ctaLabel="Open Knowledge Hub"
            onClick={openLayers}
            divider={scheduleRules.length > 0}
          />
        )}
        {scheduleRules.length > 0 && (
          <ActionCard
            Icon={Send}
            title="Assign to the scheduling owners"
            body={`${scheduleRules.length} rule${scheduleRules.length === 1 ? "" : "s"} need a per-site schedule change, not a config edit.`}
            exposure={scheduleRules.reduce((n, r) => n + r.exposure, 0)}
            symbol={run.totals.symbol}
            ctaLabel="Assign to site managers"
            onClick={assignSchedule}
          />
        )}
      </div>
    </div>
  );
}

function ActionCard({ Icon, title, body, exposure, symbol, ctaLabel, onClick, divider }) {
  return (
    <div className="px-4 py-3.5 flex flex-col gap-2.5" style={divider ? { borderRight: `1px solid ${T.line}` } : undefined}>
      <div className="flex items-start gap-2.5">
        <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 28, height: 28, background: "#eef2ff" }}>
          <Icon size={14} color="#4338ca" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold" style={{ color: T.ink }}>{title}</div>
          <div className="text-xs mt-1 leading-relaxed" style={{ color: T.muted }}>{body}</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 mt-auto pt-1">
        <button onClick={onClick}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-transform active:scale-95"
          style={{ background: T.ink, color: "#fff" }}>
          {ctaLabel} <ArrowRight size={12} />
        </button>
        <span className="text-xs" style={{ color: T.faint }}>{money(exposure, symbol)} of the exposure above</span>
      </div>
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

/* One rule: the limit, the clause that sets it, how much of the population it binds is past it, and —
   once opened — the employees and the punch cards that put them there. */
function RuleRow({ rule, run, siteFilter, agFilter, open, onToggle }) {
  const meta = sevMeta(rule);
  const { symbol, employees } = run.totals;
  const violations = rule.violations.filter((v) =>
    (siteFilter === "all" || v.site === siteFilter) &&
    (agFilter === "all" || v.agreement_key === agFilter));
  // A rule that binds only part of the department has to say so, or the meter's percentage is read
  // against the wrong headcount. Where it binds everyone, saying it would be noise.
  const partial = rule.population < employees;

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
          {partial && (
            <div className="text-xs mt-1.5 flex items-center gap-1.5 flex-wrap" style={{ color: T.faint }}>
              <Users size={11} className="shrink-0" />
              Binds {num(rule.population)} of {num(employees)} — only
              {" "}{rule.agreements.map((a) => a.short).join(" and ")}
            </div>
          )}
        </div>

        {/* The meter, then the counts it stands for. */}
        <div className="shrink-0 flex items-center gap-4" style={{ width: 290 }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2" style={{ fontSize: 10.5, color: T.faint }}>
              <span>{partial ? "Of those it binds" : "Employees in breach"}</span>
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
              <Caption className="mt-3">Where the breaches are</Caption>
              <p className="text-xs leading-relaxed mt-1" style={{ color: T.ink2 }}>
                {rule.segments.join(" · ")} — {pct(rule.org_share)} of the whole department, which is
                what the compliance score above spends on this rule.
              </p>
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
                None of the shown occurrences match those filters.
              </div>
            ) : violations.map((v, i) => (
              <ViolationRow key={`${v.matricula}-${v.date}-${i}`} v={v} meta={meta} symbol={symbol}
                showAgreement={rule.agreements.length > 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ViolationRow({ v, meta, symbol, showAgreement }) {
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
        {/* Which agreement this person sits under. Shown only where the rule spans more than one —
            otherwise it is the same string on every row and carries no information. */}
        {showAgreement && (
          <div className="truncate inline-flex items-center gap-1" style={{ fontSize: 10.5, color: T.faint }}
            title={v.agreement}>
            <Scale size={9} /> {v.agreement}
          </div>
        )}
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
              {rule.source} · {rule.limit_label} · binds {num(rule.population)}
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

/* Rules a *different* rule displaces, and which agreement's population they were displaced for.
   Stating them is the difference between "this does not apply" and "nobody looked" — and on a 12×36
   clinical team sitting inside an HR department, that distinction is the whole legal argument. */
function Exclusions({ exclusions }) {
  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: `1px solid ${T.line}` }}>
        <Ban size={13} color={T.faint} />
        <span className="text-sm font-semibold" style={{ color: T.ink }}>Not applied to part of this department</span>
        <span className="text-xs" style={{ color: T.faint }}>and why — an exclusion is not a pass</span>
      </div>
      {exclusions.map((x, i) => (
        <div key={`${x.agreement}-${x.rule}-${i}`} className="px-4 py-2.5" style={{ borderTop: `1px solid ${T.line}` }}>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs font-semibold" style={{ color: T.ink2 }}>{x.rule}</span>
            <span className="rounded px-1.5 py-0.5 font-semibold"
              style={{ background: "#eef2ff", color: "#4338ca", fontSize: 10 }}>{x.agreement}</span>
          </div>
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
  const { department: dept, totals, period, segments } = run;
  const lines = [
    `# Payroll validation — ${dept.name}`,
    "",
    `**Organizational arm:** ${dept.arm_name}`,
    `**Period:** ${period.label} (${period.start} → ${period.end})`,
    `**Population:** ${totals.employees} employees in ${dept.country_name}, across ` +
      `${totals.agreements} collective agreement${totals.agreements === 1 ? "" : "s"}`,
    `**Punch source:** ${run.punch_source}`,
    "",
    "## The populations validated",
    "",
  ];
  segments.forEach((s) => {
    lines.push(
      `### ${s.label} — ${s.headcount} employees`,
      "",
      `- **${s.agreement.instrument}:** ${s.agreement.cct_official}`,
      `- **${s.agreement.registry}:** ${s.agreement.cct_registration} (${s.agreement.cct_validity})`,
      `- **Category:** ${s.agreement.category}`,
      `- **Union:** ${s.agreement.union_official}`,
      `- **Employers' side:** ${s.agreement.employer_body}`,
      `- **Rules applied:** ${s.agreement.rule_count} · **breached:** ${s.rules_breached}`,
      "",
    );
  });
  lines.push(
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
  );
  run.rules.filter((r) => r.status === "breach").forEach((r) => {
    lines.push(
      `### [${SEV[r.severity].label}] ${r.title}`,
      "",
      `- **Limit:** ${r.limit_label}`,
      `- **Basis:** ${r.source}`,
      `- **Applies to:** ${r.agreements.map((a) => a.short).join(", ")} — ${r.population} of ${totals.employees} employees`,
      `- **Affected:** ${r.affected_employees} (${pct(r.affected_share)} of those it binds, ` +
        `${pct(r.org_share)} of the department), ${r.occurrences} occurrences`,
      `- **Found in:** ${r.segments.join(", ")}`,
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
  if (dept.exclusions.length) {
    lines.push("## Not applied to part of this department", "");
    dept.exclusions.forEach((x) => lines.push(`- **${x.rule}** (${x.agreement}) — ${x.why}`));
    lines.push("");
  }
  lines.push("---", "", "Generated by LawTrack AI · a cited draft for expert review, not legal advice.");
  return lines.join("\n");
}
