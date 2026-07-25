import React, { useState } from "react";
import { Loader2, Move3d } from "lucide-react";
import { useAuth } from "./auth.jsx";
import { HOURS_DOMAIN, hoursColor } from "./globeData.js";
import InteractiveGlobe from "./InteractiveGlobe.jsx";
import dayioLogo from "./assets/dayio-logo.svg";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(username.trim(), password);
    } catch (e2) {
      setErr(e2.message || "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        color: "#eaf1fb",
        background:
          "radial-gradient(140% 120% at 12% 0%, #1e336d 0%, #111d40 46%, #0a1230 100%)",
      }}
    >
      <Hero />

      {/* Sign-in panel — shares the page canvas; day.io hand as a glowing emblem */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* glow behind the emblem */}
        <div
          className="pointer-events-none absolute"
          style={{
            right: "-10%", top: "50%", width: 720, height: 720, transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(30,151,247,0.28), transparent 60%)",
          }}
        />
        {/* big day.io hand emblem, bleeding off the right edge */}
        <DayioMark
          className="pointer-events-none absolute select-none"
          style={{
            right: "-12%", top: "50%", transform: "translateY(-50%)",
            height: "94%", width: "auto", color: "#4d8ff2", opacity: 0.16,
          }}
        />

        {/* content */}
        <div className="relative flex flex-col items-center text-center w-full" style={{ maxWidth: 400 }}>
          <h1
            className="font-semibold tracking-tight"
            style={{ fontSize: "2.9rem", lineHeight: 1.02 }}
          >
            <span style={{ color: "#f2f6ff" }}>LawTrack</span>{" "}
            <span
              style={{
                background: "linear-gradient(100deg, #7fd0ff, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI
            </span>
          </h1>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "rgba(234,241,251,0.72)", maxWidth: 300, textWrap: "balance" }}
          >
            Wherever people show up, the world moves forward.
          </p>

          {/* frosted sign-in card */}
          <form
            onSubmit={submit}
            className="rounded-2xl w-full relative mt-9 text-left"
            style={{
              maxWidth: 380,
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 30px 70px -24px rgba(0,0,0,0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="px-7 pt-6 pb-7 flex flex-col gap-3.5">
              <div className="text-xs font-medium text-center mb-1" style={{ color: "rgba(234,241,251,0.55)" }}>
                Sign in to your workspace
              </div>
              {["Username", "Password"].map((field) => {
                const isPw = field === "Password";
                return (
                  <label key={field} className="text-xs font-medium" style={{ color: "rgba(234,241,251,0.75)" }}>
                    {field}
                    <input
                      autoFocus={!isPw}
                      type={isPw ? "password" : "text"}
                      value={isPw ? password : username}
                      onChange={(e) => (isPw ? setPassword : setUsername)(e.target.value)}
                      className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(127,208,255,0.22)]"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.16)",
                        color: "#eaf1fb",
                      }}
                    />
                  </label>
                );
              })}
              {err && (
                <div
                  className="text-xs rounded-lg px-3 py-2"
                  style={{ background: "rgba(239,68,68,0.16)", color: "#fecaca", border: "1px solid rgba(239,68,68,0.35)" }}
                >
                  {err}
                </div>
              )}
              <button
                type="submit"
                disabled={busy || !username || !password}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed"
                style={{
                  background:
                    busy || !username || !password
                      ? "rgba(255,255,255,0.12)"
                      : "linear-gradient(135deg, #1e97f7 0%, #7d54f6 100%)",
                  color: busy || !username || !password ? "rgba(255,255,255,0.5)" : "#fff",
                  boxShadow:
                    busy || !username || !password
                      ? "none"
                      : "0 10px 26px -8px rgba(60,110,240,0.7)",
                }}
              >
                {busy && <Loader2 size={15} className="animate-spin" />} Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-5 text-xs" style={{ color: "rgba(234,241,251,0.5)" }}>
          Internal tool · day.io
        </div>
      </div>
    </div>
  );
}

/* Left hero: brand messaging + the interactive weekly-hours globe. */
function Hero() {
  const [dragged, setDragged] = useState(false);

  return (
    <div
      className="hidden lg:flex flex-col relative overflow-hidden"
      style={{ width: "52%", maxWidth: 760, color: "#eaf1fb" }}
    >
      {/* color blooms for depth */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%", right: "-10%", width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.20), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-20%", left: "-12%", width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 65%)",
        }}
      />

      {/* logo */}
      <div className="relative px-12 pt-10">
        <img
          src={dayioLogo}
          alt="day.io"
          style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.95 }}
        />
      </div>

      {/* headline */}
      <div className="relative px-12 pt-8">
        <h1 className="text-[1.9rem] leading-tight font-semibold tracking-tight">
          Working hours,
          <span
            style={{
              background: "linear-gradient(90deg, #7fd0ff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {" "}mapped to the world.
          </span>
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed max-w-md" style={{ color: "rgba(234,241,251,0.62)" }}>
          Standard weekly working hours by country — the threshold before overtime.
          Press and hold a country to read its number.
        </p>
      </div>

      {/* globe */}
      <div className="relative flex-1 flex items-center justify-center px-6 min-h-0">
        <InteractiveGlobe size={440} onFirstDrag={() => setDragged(true)} />
        {/* drag hint — fades out once the user spins the globe */}
        <div
          className="absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium pointer-events-none transition-opacity duration-500"
          style={{
            bottom: 6,
            background: "rgba(10,19,48,0.6)",
            border: "1px solid rgba(127,208,255,0.22)",
            color: "rgba(234,241,251,0.8)",
            opacity: dragged ? 0 : 1,
          }}
        >
          <Move3d size={13} /> Drag to rotate
        </div>
      </div>

      {/* legend — hours gradient */}
      <HoursLegend />
    </div>
  );
}

function HoursLegend() {
  const [lo, hi] = HOURS_DOMAIN;
  const gradient = `linear-gradient(90deg, ${hoursColor(lo)}, ${hoursColor((lo + hi) / 2)}, ${hoursColor(hi)})`;
  return (
    <div className="relative px-12 pb-10 flex items-center gap-3 text-xs" style={{ color: "rgba(234,241,251,0.7)" }}>
      <span>{lo}h</span>
      <span className="rounded-full" style={{ width: 160, height: 8, background: gradient }} />
      <span>{hi}h+</span>
      <span className="ml-3 inline-flex items-center gap-1.5">
        <span className="rounded-full" style={{ width: 9, height: 9, background: "#2a3557" }} />
        No data
      </span>
    </div>
  );
}

/* Just the day.io "hand" mark (no DAY.IO wordmark), cropped to its bounds so it
   can be scaled up as a standalone emblem. Fill follows `color` via currentColor. */
function DayioMark({ className, style }) {
  return (
    <svg viewBox="3.5 3.5 27 31" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.376 27.094a6.096 6.096 0 0 1-1.854 3.016 6.076 6.076 0 0 1-9.288-1.511 6.105 6.105 0 0 1 .436-6.765 6.069 6.069 0 0 1 6.406-2.177 6.083 6.083 0 0 1 3.68 2.83 6.106 6.106 0 0 1 .62 4.607zm4.269 1.146a10.529 10.529 0 0 1-4.318 5.997 10.49 10.49 0 0 1-13.701-1.803A10.543 10.543 0 0 1 4 25.523v-8.304c.877.001 1.718.35 2.34.97.62.621.971 1.463.976 2.342v4.992a7.211 7.211 0 0 0 1.75 4.814 7.175 7.175 0 0 0 9.476 1.245 7.202 7.202 0 0 0 2.929-4.199l3.266-12.117a1.663 1.663 0 0 1 2.031-1.179 1.66 1.66 0 0 1 1.176 2.035l-3.3 12.118zm-3.267-4.84 3.588-13.394a1.664 1.664 0 0 0-1.173-2.032 1.653 1.653 0 0 0-2.028 1.175L18.89 19.827a7.208 7.208 0 0 1 2.477 3.573h.011zm-3.451-4.195 3.495-13.116a1.663 1.663 0 0 0-1.174-2.033 1.654 1.654 0 0 0-2.027 1.176l-3.523 13.094c.552.017 1.1.1 1.633.246.55.15 1.083.361 1.585.633h.01zm-4.356-.797 2.662-9.99a1.666 1.666 0 0 0-1.176-2.035 1.656 1.656 0 0 0-2.03 1.179L9.619 20.258a7.212 7.212 0 0 1 3.93-1.85h.022zm3.604 7.83a2.772 2.772 0 0 1-2.304 2.041 2.76 2.76 0 0 1-2.762-1.355 2.776 2.776 0 0 1 1.5-4.015 2.76 2.76 0 0 1 3.281 1.233c.367.633.47 1.387.285 2.096z"
      />
    </svg>
  );
}
