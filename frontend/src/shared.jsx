import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  SlidersHorizontal,
  Loader2,
  CheckCircle,
  Activity,
} from "lucide-react";

/* Neutral design tokens (from the prototype). */
export const T = {
  paper: "#f4f4f2", panel: "#ffffff", ink: "#191917", ink2: "#3a3833",
  muted: "#6f6d68", faint: "#9a978f", line: "#e7e6e2", line2: "#d9d7d1",
  signal: "#0e7490", signalSoft: "#ecfeff",
};

/* The only saturated color in the product — the change taxonomy, keyed by the
   backend `classification` enum (match | adjust | gap | conflict). */
export const CLASS = {
  match: {
    label: "Aligned", cardLabel: "Aligned — no action", Icon: CheckCircle2,
    dot: "#059669", chipBg: "bg-emerald-50", chipBorder: "border-emerald-200", text: "text-emerald-700",
    markBg: "#d1fae5", markLine: "#10b981", ring: "#10b981", pinBg: "#059669",
  },
  adjust: {
    label: "Config", cardLabel: "Configuration change", Icon: SlidersHorizontal,
    dot: "#d97706", chipBg: "bg-amber-50", chipBorder: "border-amber-200", text: "text-amber-700",
    markBg: "#fef3c7", markLine: "#f59e0b", ring: "#f59e0b", pinBg: "#d97706",
  },
  gap: {
    label: "Gap", cardLabel: "Engine capability gap", Icon: AlertCircle,
    dot: "#2563eb", chipBg: "bg-blue-50", chipBorder: "border-blue-200", text: "text-blue-700",
    markBg: "#dbeafe", markLine: "#3b82f6", ring: "#3b82f6", pinBg: "#2563eb",
  },
  conflict: {
    label: "Conflict", cardLabel: "Conflict — out of compliance", Icon: AlertTriangle,
    dot: "#dc2626", chipBg: "bg-red-50", chipBorder: "border-red-200", text: "text-red-700",
    markBg: "#fee2e2", markLine: "#ef4444", ring: "#ef4444", pinBg: "#dc2626",
  },
};
export const CLASS_ORDER = ["conflict", "gap", "adjust", "match"];

export function confidenceMeta(level) {
  if (level === "high") return { label: "High confidence", color: "#059669" };
  if (level === "medium") return { label: "Medium confidence", color: "#d97706" };
  return { label: "Low confidence — verify", color: "#dc2626" };
}

/* Count a document's findings by classification. */
export function counts(findings) {
  const c = { total: findings.length, conflict: 0, gap: 0, adjust: 0, match: 0 };
  findings.forEach((f) => (c[f.classification] += 1));
  c.action = c.conflict + c.gap + c.adjust;
  return c;
}

/* Whitespace-insensitive substring match, so a verbatim source_quote is found
   inside extracted paragraph text even if spacing differs. */
export const norm = (s) => (s || "").replace(/\s+/g, " ").trim();

export const flag = { BR: "🇧🇷", FR: "🇫🇷", MX: "🇲🇽", DE: "🇩🇪", US: "🇺🇸" };
export const countryFlag = (j) => flag[(j || "").slice(0, 2).toUpperCase()] || "🌐";

const STATUS = {
  new: { label: "New", bg: "#191917", color: "#fff" },
  analyzing: { label: "Analyzing", bg: "#fff7ed", color: "#c2410c", border: "#fed7aa", spin: true },
  analyzed: { label: "Ready", bg: "#ecfdf5", color: "#047857", border: "#a7f3d0" },
  in_review: { label: "In review", bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  reviewed: { label: "Reviewed", bg: "#f3f2ef", color: "#6f6d68", border: "#d9d7d1" },
  error: { label: "Error", bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
};

export function StatusPill({ status }) {
  const s = STATUS[status] || STATUS.new;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shrink-0"
      style={{ background: s.bg, color: s.color, border: s.border ? `1px solid ${s.border}` : "none" }}
    >
      {s.spin && <Loader2 size={11} className="animate-spin" />}
      {s.label}
    </span>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  const tone =
    toast.tone === "ready"
      ? { bg: "#059669", Icon: CheckCircle }
      : toast.tone === "error"
      ? { bg: "#dc2626", Icon: AlertTriangle }
      : { bg: "#191917", Icon: Activity };
  const Icon = tone.Icon;
  return (
    <div
      className="fixed z-50 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white"
      style={{ bottom: 20, left: "50%", transform: "translateX(-50%)", background: tone.bg, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
    >
      <Icon size={16} /> {toast.msg}
    </div>
  );
}
