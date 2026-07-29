import React from "react";
import { AlertOctagon, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
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

/* The score's own colour, on the same three status steps — so a 62 and a "Critical" chip on the same
   screen are saying the same thing in the same language. Also what a department node's border color
   on the org chart is keyed to, so the chart and the dashboard read as one system. */
export function scoreTone(score) {
  if (score >= 85) return CLEAR;
  if (score >= 70) return SEV.high;
  return SEV.critical;
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
export const pct = (share) => `${Math.round((share ?? 0) * 100)}%`;

/* The hero figure: one per view, ≥48px, in the product's own sans. The ring is a meter — the fill
   carries the severity and the track is a lighter step of the same hue, so state reads across the
   whole arc rather than only where the fill stops. Used both for one department's score and for the
   organization-wide rollup, at two sizes. */
export function ScoreDial({ score, grade, size = 116, label = "Compliance score" }) {
  const tone = scoreTone(score);
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
