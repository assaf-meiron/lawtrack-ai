import React, { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoCentroid, geoDistance } from "d3-geo";
import { COUNTRIES, OCEAN, LAND, NO_DATA, hoursColor, weeklyFor } from "./globeData.js";

/* An interactive political globe for the sign-in hero.
   - Real Natural-Earth country territories on an orthographic sphere (canvas),
     shaded by standard weekly working hours (deeper = more hours).
   - Drag to rotate; the globe never moves on its own.
   - Press-and-hold a country to float its weekly-hours number above it; release
     clears it.
   Rotation lives in refs; we redraw a single frame on demand (no idle loop). */
export default function InteractiveGlobe({ size = 440, onFirstDrag }) {
  const canvasRef = useRef(null);
  const rot = useRef([12, -18, 0]); // [λ, φ, γ]
  const drag = useRef(null); // { x, y, rot } while pointer is down
  const active = useRef(null); // feature under cursor while pressed
  const raf = useRef(0);

  // React state only for the floating label — updated when the country changes.
  const [label, setLabel] = useState(null); // { name, hours, x, y }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const projection = geoOrthographic()
      .scale(size / 2 - 6)
      .translate([size / 2, size / 2])
      .clipAngle(90);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();

    function countryAt(px, py) {
      const geo = projection.invert([px, py]);
      if (!geo) return null;
      const [lng, lat] = geo;
      for (const f of COUNTRIES) {
        if (f.id && pointInFeature(f, lng, lat)) return f;
      }
      return null;
    }

    function draw() {
      raf.current = 0;
      ctx.clearRect(0, 0, size, size);
      projection.rotate(rot.current);

      // ocean sphere
      ctx.beginPath();
      path({ type: "Sphere" });
      const g = ctx.createRadialGradient(
        size * 0.4, size * 0.35, size * 0.05,
        size * 0.5, size * 0.5, size * 0.6
      );
      g.addColorStop(0, OCEAN[0]);
      g.addColorStop(0.7, OCEAN[1]);
      g.addColorStop(1, OCEAN[2]);
      ctx.fillStyle = g;
      ctx.fill();

      // graticule
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(127,208,255,0.10)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // land — uniform until a country is pressed; the active one reveals its
      // hours color (deeper = more hours) with a highlight glow.
      const activeId = active.current?.id;
      for (const f of COUNTRIES) {
        ctx.beginPath();
        path(f);
        if (f.id === activeId) {
          const entry = weeklyFor(f.id);
          ctx.save();
          ctx.shadowColor = "rgba(160,210,255,0.9)";
          ctx.shadowBlur = 24;
          ctx.fillStyle = entry ? hoursColor(entry.hours) : NO_DATA;
          ctx.fill();
          ctx.restore();
          ctx.lineWidth = 1.25;
          ctx.strokeStyle = "rgba(255,255,255,0.95)";
          ctx.stroke();
        } else {
          ctx.fillStyle = LAND;
          ctx.fill();
          ctx.lineWidth = 0.4;
          ctx.strokeStyle = "rgba(150,190,255,0.22)";
          ctx.stroke();
        }
      }

      // crisp rim
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(127,208,255,0.45)";
      ctx.stroke();
    }

    function requestDraw() {
      if (!raf.current) raf.current = requestAnimationFrame(draw);
    }
    requestDraw();

    // ── pointer handling ────────────────────────────────────────────────
    function toLocal(e) {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    // Screen position for the floating label: the country's centroid if it's on
    // the near hemisphere, else just above the cursor.
    function labelPos(f, px, py) {
      const c = geoCentroid(f);
      const center = [-rot.current[0], -rot.current[1]];
      if (geoDistance(c, center) < 1.45) {
        const p = projection(c);
        if (p) return [p[0], p[1]];
      }
      return [px, py];
    }
    function lightAt(px, py) {
      const f = countryAt(px, py);
      const prevId = active.current?.id;
      active.current = f;
      requestDraw();
      if ((f?.id ?? null) === (prevId ?? null)) {
        // same country — but if dragging, its label may need to follow
        if (f && label) {
          const [lx, ly] = labelPos(f, px, py);
          setLabel((cur) => (cur ? { ...cur, x: lx, y: ly } : cur));
        }
        return;
      }
      if (f) {
        const entry = weeklyFor(f.id);
        const [lx, ly] = labelPos(f, px, py);
        setLabel({ name: f.properties.name, hours: entry ? entry.hours : null, x: lx, y: ly });
      } else {
        setLabel(null);
      }
    }
    function onDown(e) {
      try { canvas.setPointerCapture?.(e.pointerId); } catch { /* synthetic events */ }
      const [px, py] = toLocal(e);
      drag.current = { x: e.clientX, y: e.clientY, rot: [...rot.current] };
      onFirstDrag?.();
      lightAt(px, py);
    }
    function onMove(e) {
      if (!drag.current) return;
      const k = 0.28; // deg per px
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      const [λ0, φ0] = drag.current.rot;
      rot.current = [λ0 + dx * k, Math.max(-90, Math.min(90, φ0 - dy * k)), 0];
      const [px, py] = toLocal(e);
      lightAt(px, py);
    }
    function onUp(e) {
      try { canvas.releasePointerCapture?.(e.pointerId); } catch { /* */ }
      drag.current = null;
      active.current = null;
      requestDraw();
      setLabel(null);
    }
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0; // reset so a re-mount's requestDraw() can schedule again
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div className="relative select-none" style={{ width: size, height: size, maxWidth: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, cursor: "grab", touchAction: "none" }}
      />
      {label && (
        <div
          className="absolute flex flex-col items-center pointer-events-none"
          style={{ left: label.x, top: label.y, transform: "translate(-50%, calc(-100% - 14px))" }}
        >
          <div
            className="flex items-baseline gap-1.5 rounded-lg px-3 py-1.5 backdrop-blur whitespace-nowrap"
            style={{
              background: "rgba(10,19,48,0.82)",
              border: "1px solid rgba(127,208,255,0.3)",
              boxShadow: "0 10px 30px -8px rgba(0,0,0,0.6)",
            }}
          >
            {label.hours != null ? (
              <>
                <span className="text-lg font-semibold leading-none" style={{ color: "#eaf1fb" }}>
                  {label.hours}
                </span>
                <span className="text-[10px] font-medium" style={{ color: "rgba(234,241,251,0.6)" }}>
                  h / week
                </span>
              </>
            ) : (
              <span className="text-xs font-medium" style={{ color: "rgba(234,241,251,0.7)" }}>
                No data
              </span>
            )}
          </div>
          <div className="text-[11px] mt-1 font-medium" style={{ color: "rgba(234,241,251,0.85)" }}>
            {label.name}
          </div>
        </div>
      )}
    </div>
  );
}

/* Ray-cast point-in-polygon against a GeoJSON feature's rings (lng/lat space).
   Handles Polygon and MultiPolygon; honors holes. Good enough for country
   hit-testing at 110m resolution. */
function pointInFeature(feature, lng, lat) {
  const geom = feature.geometry;
  if (!geom) return false;
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.type === "MultiPolygon" ? geom.coordinates : [];
  for (const poly of polys) {
    if (poly.length && ringContains(poly[0], lng, lat)) {
      let inHole = false;
      for (let h = 1; h < poly.length; h++) {
        if (ringContains(poly[h], lng, lat)) { inHole = true; break; }
      }
      if (!inHole) return true;
    }
  }
  return false;
}

function ringContains(ring, x, y) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
