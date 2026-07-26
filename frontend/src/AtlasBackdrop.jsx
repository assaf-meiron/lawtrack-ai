import React, { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { COUNTRIES } from "./globeData.js";
import { T } from "./shared.jsx";

/* A stippled world map behind the documents inbox.

   The inbox is a list of labor-rule documents from a dozen jurisdictions, and the scanner above it
   watches sources country by country — so the backdrop is the actual map, drawn as a dot screen at low
   contrast, with a soft brand glow where the scanner strip sits. Real Natural-Earth geography (the
   same source as the sign-in globe), never any chrome the eye has to fight: fixed, non-interactive,
   and behind every content surface.

   Watched jurisdictions carry a faint marker that breathes while the scanner is live, so a scan run
   reads as activity on a map rather than a spinner. */

// The scanner's watch list, positioned. Country codes sit on the country; region codes on the region.
const WATCHED = [
  { code: "BR", lat: -10.3, lng: -52.0 },
  { code: "BR-SP", lat: -22.2, lng: -48.6 },
  { code: "MX", lat: 23.6, lng: -102.5 },
  { code: "US", lat: 39.5, lng: -98.4 },
  { code: "US-CA", lat: 37.2, lng: -119.7 },
  { code: "US-NY", lat: 43.0, lng: -75.5 },
  { code: "CA-ON", lat: 50.0, lng: -85.3 },
  { code: "CA-QC", lat: 52.9, lng: -71.9 },
  { code: "FR", lat: 46.6, lng: 2.4 },
  { code: "DE", lat: 51.2, lng: 10.4 },
  { code: "DE-NRW", lat: 51.5, lng: 7.5 },
  { code: "IN-KA", lat: 14.5, lng: 75.7 },
  { code: "AU", lat: -25.3, lng: 133.8 },
  { code: "AU-NSW", lat: -32.2, lng: 147.0 },
];

export default function AtlasBackdrop({ live = false }) {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Natural Earth 1 at a 2:1 box, scaled to the viewport. Recomputed only on resize — the country
  // paths are ~110m detail and cheap enough to stringify, but not per render.
  const { paths, markers, height } = useMemo(() => {
    const w = Math.max(width, 900);
    const h = w / 2.05;
    const projection = geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });
    const path = geoPath(projection);
    return {
      height: h,
      paths: COUNTRIES.map((f) => path(f)).filter(Boolean),
      markers: WATCHED.map((m) => {
        const p = projection([m.lng, m.lat]);
        return p ? { ...m, x: p[0], y: p[1] } : null;
      }).filter(Boolean),
    };
  }, [width]);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* brand glow behind the scanner strip, and a soft floor wash so the page doesn't read flat */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(1100px 420px at 50% -60px, ${T.signalSoft} 0%, rgba(233,245,255,0) 72%),` +
            `radial-gradient(900px 500px at 12% 100%, rgba(30,151,247,0.05) 0%, rgba(30,151,247,0) 70%)`,
        }}
      />
      <svg
        width="100%"
        viewBox={`0 0 ${Math.max(width, 900)} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", left: 0, top: 96, height, opacity: 0.68 }}
      >
        <defs>
          {/* the dot screen: land is a stipple, never a filled shape */}
          <pattern id="atlas-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.05" fill="#b9c4d6" />
          </pattern>
          <radialGradient id="atlas-fade" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* fades the map out at the edges so it never collides with the page frame */}
          <mask id="atlas-mask">
            <rect width="100%" height="100%" fill="url(#atlas-fade)" />
          </mask>
        </defs>

        <g mask="url(#atlas-mask)">
          {paths.map((d, i) => (
            <path key={i} d={d} fill="url(#atlas-dots)" />
          ))}
          {markers.map((m) => (
            <g key={m.code} transform={`translate(${m.x},${m.y})`}>
              <circle r={live ? 9 : 6} fill={T.signal} opacity={live ? 0.13 : 0.08}>
                {live && (
                  <animate attributeName="r" values="5;13;5" dur="2.6s" repeatCount="indefinite" />
                )}
              </circle>
              <circle r="2.1" fill={T.signal} opacity="0.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
