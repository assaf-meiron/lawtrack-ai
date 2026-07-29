import React, { useState } from "react";
import { Loader2, Move3d } from "lucide-react";
import { useAuth } from "./auth.jsx";
import { HOURS_DOMAIN, hoursColor } from "./globeData.js";
import InteractiveGlobe from "./InteractiveGlobe.jsx";
import oitchauLogo from "./assets/oitchau-logo.svg";

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

      {/* Sign-in panel — shares the page canvas; the Oitchau mark as a glowing emblem */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* glow behind the emblem */}
        <div
          className="pointer-events-none absolute"
          style={{
            right: "-10%", top: "50%", width: 720, height: 720, transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(30,151,247,0.28), transparent 60%)",
          }}
        />
        {/* big Oitchau emblem, bleeding off the right edge */}
        <OitchauMark
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
          Internal tool · Oitchau
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
          src={oitchauLogo}
          alt="Oitchau"
          style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.95 }}
        />
      </div>

      {/* headline — the pitch, not a caption for the globe. The globe reads on its own. */}
      <div className="relative px-12 pt-8">
        <h1 className="text-[1.9rem] leading-tight font-semibold tracking-tight">
          Every labour law on earth,
          <span
            style={{
              background: "linear-gradient(90deg, #7fd0ff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {" "}watched by AI.
          </span>
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed max-w-md" style={{ color: "rgba(234,241,251,0.62)" }}>
          Working-time rules change every day, in every jurisdiction you operate in.
          LawTrack AI puts <strong style={{ color: "rgba(234,241,251,0.9)", fontWeight: 600 }}>Agents</strong> on
          thousands of gazettes, registries and union archives — they read what changed, cite the exact
          clause, and hand your team the precise configuration change to approve. Compliance that keeps
          up with the world, instead of catching up to it.
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

/* Just the Oitchau mark (no wordmark), cropped to its bounds so it can be scaled up as a standalone
   emblem. Same path as assets/oitchau-logo.svg, with the fill dropped so it follows `color`. */
function OitchauMark({ className, style }) {
  return (
    <svg viewBox="0 0 32 42" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.54 30.311A7.999 7.999 0 1 1 6.07 26.24a7.999 7.999 0 0 1 15.47 4.072zm5.614 1.504A13.821 13.821 0 0 1 0 28.249v-10.9a4.369 4.369 0 0 1 4.361 4.347v6.553A9.453 9.453 0 0 0 22.98 30.69l4.296-15.905a2.182 2.182 0 1 1 4.218 1.124l-4.34 15.905zm-4.296-6.352l4.719-17.58a2.18 2.18 0 1 0-4.21-1.124l-3.782 14.014a9.46 9.46 0 0 1 3.259 4.69h.014zm-4.54-5.507l4.597-17.215a2.18 2.18 0 1 0-4.21-1.124L14.07 18.803c.727.022 1.448.13 2.149.323a9.76 9.76 0 0 1 2.084.83h.014zm-5.729-1.045l3.502-13.112a2.182 2.182 0 1 0-4.218-1.124L7.39 21.338a9.495 9.495 0 0 1 5.17-2.427h.029zm4.74 10.276a3.638 3.638 0 1 1-2.577-4.44 3.645 3.645 0 0 1 2.578 4.44z"
      />
    </svg>
  );
}
