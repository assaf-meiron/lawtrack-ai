import React from "react";
import { AlertOctagon, AlertTriangle, AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import { T } from "./shared.jsx";

/* Shared between the org-chart overview and the per-department dashboard, so a "Critical" chip and a
   62 score mean the same thing, in the same color, wherever either screen puts them on the page. */

/* Severity is a *status* scale, not a series palette: four fixed steps, each shipped with an icon and
   a word so identity never rests on hue alone. The steps are checked for separation under deuteranopia
   and tritanopia as well as normal vision — amber sits at #ca8a04 rather than the more obvious #d97706
   because that lighter step is not reliably distinguishable from the critical red. */
export const SEV = {
  critical: { label: "Critical", Icon: AlertOctagon, ink: "#dc2626", soft: "#fef2f2", line: "#fecaca", track: "#fee2e2" },
  high: { label: "High", Icon: AlertTriangle, ink: "#ca8a04", soft: "#fefce8", line: "#fde68a", track: "#fef3c7" },
  medium: { label: "Medium", Icon: AlertCircle, ink: "#2563eb", soft: "#eff6ff", line: "#bfdbfe", track: "#dbeafe" },
};
export const CLEAR = { label: "Clear", Icon: CheckCircle2, ink: "#059669", soft: "#ecfdf5", line: "#a7f3d0", track: "#d1fae5" };
export const sevMeta = (rule) => (rule.status === "clear" ? CLEAR : SEV[rule.severity]);

/* "Status not supplied" — the fallback for a meter rendered without one. Grey deliberately: it is the
   one hue that cannot be mistaken for a verdict, where defaulting to CLEAR's green would quietly
   restate the bug this file exists to prevent. */
const NEUTRAL = { label: "—", Icon: AlertCircle, ink: T.muted, soft: "#f4f6f9", line: T.line, track: T.line };

/* A department nobody has validated yet. This is a *tone*, not a verdict, and it exists because the
   org chart's whole job before a run is to say "we have not looked". Grey, question mark, no meter —
   anything with a hue on it would be a compliance claim the product has not earned. */
export const UNKNOWN = { label: "Not validated", Icon: HelpCircle, ink: T.muted, soft: "#f4f6f9",
                        line: T.line2, track: T.line };

/* A department's status, and it is read off the *findings* — never off the score.

   Deriving it from the score was a lie the arithmetic told: a rule breached for two drivers out of 206
   costs a couple of points, the department lands in the 90s, and a score band then labels it "Clear"
   with a live violation listed underneath. No number in the 90s makes a breach disappear, so the only
   thing that earns "Clear" here is having found nothing at all.

   Escalation to Critical is about *materiality*, not the mere presence of a severe rule: one critical
   rule catching a single employee is a finding to fix, not a red department. It goes red when a critical
   rule reaches a tenth of the *department* — `org_share`, the same denominator the score spends, not
   the share of the one population the rule happens to bind — or when breaches pile up across five or
   more rules at once. */
export function runStatus(run) {
  const breached = run.totals.rules_breached;
  if (breached === 0) return { label: "Clear", tone: CLEAR };
  const material = run.rules.some(
    (r) => r.status === "breach" && r.severity === "critical" && r.org_share >= 0.1);
  if (material || breached >= 5) return { label: "Critical", tone: SEV.critical };
  return { label: "Needs attention", tone: SEV.high };
}

/* The same call across several departments: the worst status any one of them is in. Only ever handed
   the departments that have *actually been validated* — a rollup over a partially-analysed org is a
   statement about what was checked, and the caller has to label it that way. */
export function orgStatus(runs) {
  const statuses = runs.map(runStatus);
  if (statuses.some((s) => s.label === "Critical")) return { label: "Critical", tone: SEV.critical };
  if (statuses.some((s) => s.label === "Needs attention")) return { label: "Needs attention", tone: SEV.high };
  return { label: "Clear", tone: CLEAR };
}

/* Mirrors `grade()` in backend/app/validation.py exactly — needed here only for the org-wide aggregate
   score, which nothing on the backend computes (it is a client-side rollup across every department's
   already-scored run). */
export function gradeFromScore(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "E";
}

export const num = (n) => (n ?? 0).toLocaleString("en-US");
export const money = (n, symbol) => `${symbol}${Math.round(n ?? 0).toLocaleString("en-US")}`;
// Rounds to the nearest percent, except a genuinely nonzero share never reads as a flat "0%" — at
// org scale, 6 real people can be <1% of the workforce, and that is a different claim from zero.
export const pct = (share) => {
  const s = share ?? 0;
  if (s > 0 && s < 0.005) return "<1%";
  return `${Math.round(s * 100)}%`;
};

/* The hero figure: one per view, ≥48px, in the product's own sans. The ring is a meter — the fill
   carries the severity and the track is a lighter step of the same hue, so state reads across the
   whole arc rather than only where the fill stops. Used both for one department's score and for the
   organization-wide rollup, at two sizes.

   `tone` is passed in rather than derived from the score, because the ring is the loudest thing on the
   screen and a green one reads as "nothing to do here" — a claim only the findings can make, not the
   number. Callers hand it the status tone from `runStatus`/`orgStatus`. */
export function ScoreDial({ score, grade, tone = NEUTRAL, size = 116, label = "Compliance score" }) {
  const r = size / 2 - 12, c = 2 * Math.PI * r;
  const fontSize = Math.round(size * 0.38);
  return (
    <div className="flex items-center gap-4 shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone.track} strokeWidth="11" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone.ink} strokeWidth="11" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Proportional figures, not tabular: at this size tabular digits read loose. */}
          <div style={{ fontSize, fontWeight: 600, lineHeight: 1, color: T.ink, letterSpacing: "-0.02em" }}>
            {score}
          </div>
          <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, marginTop: 3 }}>
            of 100
          </div>
        </div>
      </div>
      <div>
        <div className="uppercase tracking-wider" style={{ fontSize: 9, color: T.faint, fontWeight: 700 }}>
          {label}
        </div>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-2xl font-semibold leading-none" style={{ color: tone.ink }}>{grade}</span>
          <span className="text-xs" style={{ color: T.muted }}>grade</span>
        </div>
      </div>
    </div>
  );
}

export function Tile({ label, value, sub, tone }) {
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
