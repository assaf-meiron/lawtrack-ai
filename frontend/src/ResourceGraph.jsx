import React, { useMemo, useRef, useState } from "react";
import { X, Search, ZoomIn, ZoomOut, Maximize2, Network } from "lucide-react";
import { countryFlag } from "./shared.jsx";
import brazilResources from "./data/brazilResources.js";

/* An interactive force-directed map of every source the agent would watch for a mature
   jurisdiction — Brazil is the one built out with real, individually-named resources (see
   data/brazilResources.js). A real n-body simulation (repulsion + spring edges + weak center
   gravity), not a fixed hub-and-spoke layout — cross-links between resources (mostly within a
   category, some across) are what give it the dense, organic "hairball" look instead of eight
   clean stars. Dark canvas on purpose: it's what makes a few hundred thin colored edges read as
   a web instead of noise. Pan (drag) and zoom (scroll) are hand-rolled — no charting library. */

const DATA_BY_JURISDICTION = { BR: brazilResources };

export const CATEGORY_META = {
  clt_federal: { label: "CLT & federal statutes", color: "#5b8cff", cadence: "Daily · Diário Oficial da União" },
  tst_case_law: { label: "TST case law", color: "#b18cff", cadence: "Weekly · TST jurisprudence index" },
  gov_portal: { label: "Gov portals & systems", color: "#3ad6e0", cadence: "Daily · portal diff" },
  trt: { label: "Regional labor courts (TRT)", color: "#3ddc97", cadence: "Daily · court publications" },
  state_diario: { label: "State gazettes", color: "#ffb454", cadence: "Daily · state Diário Oficial" },
  cct_act: { label: "CCTs / union agreements", color: "#ff6b6b", cadence: "Weekly · union bulletin + MTE registration" },
  confederation: { label: "Confederations & federations", color: "#ff7ec8", cadence: "Weekly · federation bulletins" },
  legal_research: { label: "Legal research & press", color: "#b8c0cc", cadence: "Daily · legal news aggregation" },
};
const catMeta = (key) => CATEGORY_META[key] || { label: key, color: "#8891a3", cadence: "—" };

const WIDTH = 1120, HEIGHT = 780;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

// A real force simulation: category "root" nodes sit fixed on a ring (a cluster this size would
// otherwise drag its root wherever the member centroid goes — with 72 CCT members pulling via a
// hub spring, that easily overpowers anything short of a rigid anchor), while every resource
// scatters, repels, and cross-links freely around them. Cross-links (mostly same-category, some
// cross-category) are what create the hairball density — a pure hub-and-spoke graph never looks
// like the reference.
function buildGraph(resources) {
  const categories = [...new Set(resources.map((r) => r.category))];
  const ringR = Math.min(WIDTH, HEIGHT) * 0.44;
  const roots = categories.map((cat, i) => {
    const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
    const x = CENTER.x + ringR * Math.cos(angle), y = CENTER.y + ringR * Math.sin(angle);
    return { id: `root:${cat}`, isRoot: true, category: cat, x, y };
  });
  const rootByCat = Object.fromEntries(roots.map((r) => [r.category, r]));

  const nodes = resources.map((r, i) => {
    const root = rootByCat[r.category];
    const angle = Math.random() * Math.PI * 2;
    const radius = 10 + Math.random() * 45;
    return { ...r, id: i, isRoot: false, x: root.x + radius * Math.cos(angle), y: root.y + radius * Math.sin(angle), vx: 0, vy: 0 };
  });
  const byCategoryNodes = {};
  nodes.forEach((n) => (byCategoryNodes[n.category] = byCategoryNodes[n.category] || []).push(n));

  const all = [...roots, ...nodes];

  const edges = [];
  nodes.forEach((n) => edges.push({ a: n, b: rootByCat[n.category], kind: "hub", category: n.category }));
  nodes.forEach((n) => {
    const linkCount = 2 + Math.floor(Math.random() * 3); // 2-4 cross-links per node
    for (let k = 0; k < linkCount; k++) {
      const sameCategory = Math.random() < 0.6;
      const pool = sameCategory ? byCategoryNodes[n.category] : nodes;
      const other = pool[Math.floor(Math.random() * pool.length)];
      if (other && other !== n) edges.push({ a: n, b: other, kind: "cross", category: n.category });
    }
  });
  // Roots are fixed anchors: they exert repulsion and hub-spring pull on members but never move
  // themselves, so `push(a, fx, fy)` below is a no-op for a root.
  const push = (n, fx, fy) => { if (!n.isRoot) { n.vx += fx; n.vy += fy; } };

  const TICKS = 160;
  for (let t = 0; t < TICKS; t++) {
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const distSq = dx * dx + dy * dy || 0.01;
        if (distSq < 9000) {
          const dist = Math.sqrt(distSq);
          const force = 260 / distSq;
          const fx = (dx / dist) * force, fy = (dy / dist) * force;
          push(a, fx, fy);
          push(b, -fx, -fy);
        }
      }
    }
    edges.forEach((e) => {
      const rest = e.kind === "hub" ? 28 : 65;
      const k = e.kind === "hub" ? 0.015 : 0.012;
      const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const f = (dist - rest) * k;
      const fx = (dx / dist) * f, fy = (dy / dist) * f;
      push(e.a, fx, fy);
      push(e.b, -fx, -fy);
    });
    nodes.forEach((n) => {
      n.vx += (CENTER.x - n.x) * 0.0005;
      n.vy += (CENTER.y - n.y) * 0.0005;
      n.vx *= 0.83; n.vy *= 0.83;
      n.x += n.vx; n.y += n.vy;
    });
  }

  return { nodes, roots, rootByCat, edges, categories };
}

const JURISDICTION_NAME = { BR: "Brazil" };

export default function ResourceGraph({ jurisdiction, onClose }) {
  const resources = DATA_BY_JURISDICTION[jurisdiction] || [];
  const { nodes, roots, rootByCat, edges, categories } = useMemo(() => buildGraph(resources), [resources]);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState("");
  const [hiddenCats, setHiddenCats] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const svgRef = useRef(null);
  const dragRef = useRef(null);

  const q = query.trim().toLowerCase();
  const visible = (n) => !hiddenCats.has(n.category) && (!q || n.name.toLowerCase().includes(q));
  const nodeOn = (n) => (n.isRoot ? !hiddenCats.has(n.category) : visible(n));
  const edgeOpacity = (e, base) => (nodeOn(e.a) && nodeOn(e.b) ? base : base * 0.1);

  function clampZoom(z) { return Math.min(3.5, Math.max(0.55, z)); }

  function zoomBy(factor, anchor) {
    const a = anchor || CENTER;
    setZoom((z) => {
      const nz = clampZoom(z * factor);
      setPan((p) => ({ x: a.x - nz * ((a.x - p.x) / z), y: a.y - nz * ((a.y - p.y) / z) }));
      return nz;
    });
  }

  function onWheel(e) { zoomBy(1 - e.deltaY * 0.0014); }

  function onPointerDownBg(e) {
    // Only start a pan-drag when the pointerdown's direct target is the svg background itself.
    // This handler is bound to the <svg>, so it also fires for every pointerdown that bubbles up
    // from a node/root circle — without this check, capturing the pointer here hijacks the click
    // that was meant for the circle (the browser retargets the subsequent click to whatever
    // element holds pointer capture), so no node was ever clickable.
    if (e.target !== e.currentTarget) return;
    dragRef.current = { startClient: { x: e.clientX, y: e.clientY }, startPan: pan };
    svgRef.current.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scale = rect.width / WIDTH;
    const dx = (e.clientX - dragRef.current.startClient.x) / scale;
    const dy = (e.clientY - dragRef.current.startClient.y) / scale;
    setPan({ x: dragRef.current.startPan.x + dx, y: dragRef.current.startPan.y + dy });
  }
  function onPointerUp() { dragRef.current = null; }

  function focusHub(cat) {
    const root = rootByCat[cat];
    if (!root) return;
    const nz = 1.9;
    setZoom(nz);
    setPan({ x: WIDTH / 2 - nz * root.x, y: HEIGHT / 2 - nz * root.y });
  }

  const counts = {};
  resources.forEach((r) => { counts[r.category] = (counts[r.category] || 0) + 1; });

  const dark = {
    modal: "#0b0d13", chrome: "#11141c", border: "rgba(255,255,255,0.09)",
    text: "#e8eaf0", muted: "#8891a3", faint: "#5b6272", input: "#161a24",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col overflow-hidden rounded-2xl"
        style={{ width: "min(1080px, 96vw)", height: "min(760px, 92vh)", background: dark.modal, boxShadow: "0 24px 64px rgba(0,0,0,0.55)", border: `1px solid ${dark.border}` }}>

        {/* header */}
        <div className="px-5 py-3.5 flex items-center gap-3 shrink-0" style={{ background: dark.chrome, borderBottom: `1px solid ${dark.border}` }}>
          <span style={{ fontSize: 20 }}>{countryFlag(jurisdiction)}</span>
          <div className="min-w-0">
            <div className="text-sm font-semibold flex items-center gap-2" style={{ color: dark.text }}>
              {JURISDICTION_NAME[jurisdiction] || jurisdiction} — resource graph
              <span className="uppercase tracking-wider rounded px-1.5 py-0.5" style={{ fontSize: 9, background: "rgba(124,108,246,0.18)", color: "#c2b4ff" }}>
                <Network size={9} className="inline -mt-px mr-1" />{resources.length} sources
              </span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: dark.muted }}>
              Every registry, court, gazette and union agreement the agent would watch for changes to time & pay rules.
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search size={13} color={dark.faint} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a resource…"
                className="rounded-lg pl-7 pr-2.5 py-1.5 text-xs outline-none" style={{ width: 180, border: `1px solid ${dark.border}`, color: dark.text, background: dark.input }} />
            </div>
            <button onClick={() => zoomBy(1.3)} className="rounded-lg p-1.5" style={{ border: `1px solid ${dark.border}`, background: dark.input, color: dark.muted }} title="Zoom in"><ZoomIn size={14} /></button>
            <button onClick={() => zoomBy(1 / 1.3)} className="rounded-lg p-1.5" style={{ border: `1px solid ${dark.border}`, background: dark.input, color: dark.muted }} title="Zoom out"><ZoomOut size={14} /></button>
            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="rounded-lg p-1.5" style={{ border: `1px solid ${dark.border}`, background: dark.input, color: dark.muted }} title="Reset view"><Maximize2 size={14} /></button>
            <button onClick={onClose} className="rounded-lg p-1.5" style={{ border: `1px solid ${dark.border}`, background: dark.input, color: dark.muted }}><X size={15} /></button>
          </div>
        </div>

        {/* legend */}
        <div className="px-5 py-2 flex items-center gap-1.5 flex-wrap shrink-0" style={{ background: dark.chrome, borderBottom: `1px solid ${dark.border}` }}>
          {categories.map((cat) => {
            const meta = catMeta(cat);
            const off = hiddenCats.has(cat);
            return (
              <button key={cat}
                onClick={() => setHiddenCats((s) => { const n = new Set(s); n.has(cat) ? n.delete(cat) : n.add(cat); return n; })}
                onDoubleClick={() => focusHub(cat)}
                title="Click to toggle · double-click to focus"
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity"
                style={{ border: `1px solid ${dark.border}`, background: off ? "transparent" : dark.input, opacity: off ? 0.45 : 1, color: dark.text }}>
                <span className="rounded-full shrink-0" style={{ width: 8, height: 8, background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
                {meta.label} <span style={{ color: dark.faint }}>{counts[cat] || 0}</span>
              </button>
            );
          })}
        </div>

        {/* graph canvas */}
        <div className="relative flex-1 min-h-0" style={{ background: "radial-gradient(ellipse at 50% 42%, #181d2b 0%, #0a0c12 62%, #050609 100%)" }}>
          <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%"
            style={{ cursor: dragRef.current ? "grabbing" : "grab", touchAction: "none" }}
            onWheel={onWheel} onPointerDown={onPointerDownBg} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
              {edges.map((e, i) => {
                const base = e.kind === "hub" ? 0.22 : e.kind === "cross" ? 0.12 : 0.16;
                const color = e.category ? catMeta(e.category).color : "#4b5468";
                return (
                  <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y}
                    stroke={color} strokeWidth={e.kind === "root" ? 0.8 : 0.5} opacity={edgeOpacity(e, base)} />
                );
              })}
              {roots.map((r) => {
                const off = hiddenCats.has(r.category);
                const color = catMeta(r.category).color;
                return (
                  <g key={r.id} transform={`translate(${r.x},${r.y})`} style={{ cursor: "pointer" }}
                    onClick={() => setHiddenCats((s) => { const n = new Set(s); n.has(r.category) ? n.delete(r.category) : n.add(r.category); return n; })}
                    onDoubleClick={() => focusHub(r.category)}>
                    <circle r={17} fill={color} opacity={off ? 0.05 : 0.14} />
                    <circle r={17} fill="none" stroke={color} strokeWidth={1.6} opacity={off ? 0.3 : 0.9} />
                    <circle r={5} fill={color} opacity={off ? 0.35 : 1} />
                    <text y={-24} textAnchor="middle" fontSize={11} fontWeight={600} fill="#c9d1e0" opacity={off ? 0.35 : 0.9}
                      style={{ paintOrder: "stroke", stroke: "#05060a", strokeWidth: 3 }}>
                      {catMeta(r.category).label}
                    </text>
                  </g>
                );
              })}
              {nodes.map((n) => {
                const on = visible(n);
                const isSel = selected?.id === n.id;
                return (
                  <circle key={n.id} cx={n.x} cy={n.y} r={isSel ? 5.5 : 2.4}
                    fill={catMeta(n.category).color} opacity={on ? (isSel ? 1 : 0.9) : 0.06}
                    stroke={isSel ? "#fff" : "none"} strokeWidth={isSel ? 1.4 : 0}
                    style={{ cursor: on ? "pointer" : "default", pointerEvents: on ? "auto" : "none" }}
                    onClick={(e) => { e.stopPropagation(); setSelected(n); }}>
                    <title>{n.name}</title>
                  </circle>
                );
              })}
            </g>
          </svg>

          {/* detail card */}
          {selected && (
            <div className="absolute rounded-xl p-3.5" style={{
              right: 16, bottom: 16, width: 300, background: dark.chrome, border: `1px solid ${dark.border}`,
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}>
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-semibold leading-snug" style={{ color: dark.text }}>{selected.name}</div>
                <button onClick={() => setSelected(null)} className="shrink-0" style={{ color: dark.faint }}><X size={14} /></button>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                <span className="rounded px-1.5 py-0.5 text-xs font-medium" style={{ background: catMeta(selected.category).color + "22", color: catMeta(selected.category).color }}>
                  {catMeta(selected.category).label}
                </span>
                <span className="rounded px-1.5 py-0.5 text-xs uppercase tracking-wide" style={{ background: "rgba(255,255,255,0.06)", color: dark.muted, fontSize: 9 }}>
                  {selected.jurisdiction_level}
                </span>
              </div>
              {selected.note && <div className="text-xs mt-2 leading-relaxed" style={{ color: "#c3c9d4" }}>{selected.note}</div>}
              <div className="text-xs mt-2 pt-2" style={{ color: dark.faint, borderTop: `1px solid ${dark.border}` }}>
                Monitoring cadence: <span style={{ color: dark.muted }}>{catMeta(selected.category).cadence}</span>
              </div>
            </div>
          )}

          {!selected && (
            <div className="absolute left-4 bottom-4 text-xs rounded-lg px-2.5 py-1.5" style={{ background: "rgba(255,255,255,0.06)", color: dark.muted, border: `1px solid ${dark.border}` }}>
              Drag to pan · scroll to zoom · click a node for details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
