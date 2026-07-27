import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, Upload, X } from "lucide-react";
import { T } from "./shared.jsx";
import { AgentIcon } from "./AgentScanner.jsx";

/* The first-run guided tour.

   It runs on every sign-in rather than once-per-browser: this is a demo instrument, and the person
   driving needs the same four beats to land the same way every time they log back in. There is no
   "seen it" flag to clear — Skip ends the run, and the top bar keeps a "Take the tour" button to
   start it again mid-session.

   The tour narrates the product's one claim: staying continuously compliant, by two routes — the
   documents you receive (Upload PDF) and the ones the agent finds for you. Each step points at a real
   control by `data-tour` attribute rather than at coordinates, so the layout can move without
   breaking the walkthrough; a step whose anchor isn't on screen yet waits for it (the inbox is still
   fetching on the first paint) and is skipped if it never arrives. */

const STEPS = [
  {
    key: "welcome",
    // No anchor: the opening beat is the thesis, and pointing at a button while making it would
    // shrink the claim to whatever that button does. Rendered wide, with the two routes as tiles —
    // the two ways *are* the product, so they should be the picture, not two lines of prose.
    anchor: null,
    hero: true,
    eyebrow: "LawTrack AI",
    title: "Never miss a rule change.",
    body: "Labour rules move constantly. We watch them so you don't.",
    tiles: [
      { Icon: Upload, kicker: "You upload", text: "Any CCT, award or law that lands on your desk." },
      { Icon: Sparkles, kicker: "We find", text: "2,640 sources watched around the clock." },
    ],
  },
  {
    key: "inbox",
    anchor: '[data-tour="inbox"]',
    eyebrow: "Your compliance inbox",
    title: "Everything that affects time & attendance, in one place.",
    body: "Every document that touches working hours, overtime, premiums or rest lands here, grouped by country. Five open reviews, not five hundred — the agent triages the noise out before anything reaches this page.",
    // The cards column is taller than the viewport, so there is no "above" or "below" it to sit in.
    placement: "center",
  },
  {
    key: "upload",
    anchor: '[data-tour="upload"]',
    eyebrow: "Way one",
    title: "Upload what you receive.",
    body: "Drop in the PDF your works council, union or law firm just sent. LawTrack AI reads it, pulls out the clauses that change time and pay, and drafts the exact configuration change — with the clause quoted next to every recommendation.",
    placement: "bottom",
  },
  {
    key: "agent",
    anchor: '[data-tour="agent-open"]',
    fallbackAnchor: '[data-tour="agent-strip"]',
    eyebrow: "Way two",
    title: "Let the Agent find it first.",
    body: "The Day.io Agent watches 2,640 sources — national gazettes, state registers, union archives, collective-agreement registries — and tells you what it found in the past 24 hours. Open it to see the countries under watch and run a scan on the spot.",
    placement: "bottom",
  },
  {
    key: "review",
    anchor: '[data-tour="review"]',
    eyebrow: "Nothing is applied automatically",
    title: "You accept, edit, or reject every line.",
    body: "Open a document and you get the clause on one side, the proposed configuration change on the other. Every recommendation is traced to the text that justifies it, and your decision is what gets recorded — a cited draft for expert review, never auto-configuration.",
    placement: "top",
  },
];

/* The tour speaks in a dark surface, and the product is light.

   It used to be a white panel with a light-grey footer — which is exactly what a document card is, so
   on the Inbox step (where the cutout leaves the cards at full brightness) the narrator became
   indistinguishable from the content it was narrating. Colour is doing the work a drop shadow
   couldn't: nothing else in LawTrack is dark, so a dark panel can only be the tour talking. */
const TOUR = {
  surface: "linear-gradient(155deg, #2b3143 0%, #1b2030 100%)",
  ring: "0 0 0 1px rgba(255,255,255,0.11)",
  shadow: "0 28px 70px rgba(8,12,22,0.55)",
  accent: "#6cbcff",          // brand blue, lifted for contrast on dark
  accentSoft: "rgba(30,151,247,0.18)",
  title: "#ffffff",
  body: "rgba(255,255,255,0.68)",
  tile: "rgba(255,255,255,0.055)",
  tileLine: "rgba(255,255,255,0.10)",
  chip: "rgba(255,255,255,0.09)",
  chipLine: "rgba(255,255,255,0.15)",
  footer: "rgba(0,0,0,0.20)",
  footerLine: "rgba(255,255,255,0.08)",
  dim: "rgba(255,255,255,0.24)",
  quiet: "rgba(255,255,255,0.45)",
};

const PAD = 10;         // breathing room between the highlighted control and its ring
const CARD_W = 396;
const HERO_W = 660;   // the opening beat is a statement, not a tooltip — it gets room
const CARD_GAP = 16;    // between the ring and the tooltip
const ANCHOR_WAIT_MS = 4000;
const ANCHOR_POLL_MS = 80;

export default function Tour({ onClose }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);     // the anchor's viewport box, or null for a centered step
  const [ready, setReady] = useState(true);   // the current step has resolved its anchor (or has none)
  const cardRef = useRef(null);

  const step = STEPS[i];
  const last = i === STEPS.length - 1;
  const next = useCallback(() => setI((n) => Math.min(n + 1, STEPS.length - 1)), []);
  const back = useCallback(() => setI((n) => Math.max(n - 1, 0)), []);

  const findAnchor = useCallback(() => (
    step.anchor
      ? document.querySelector(step.anchor) ||
        (step.fallbackAnchor ? document.querySelector(step.fallbackAnchor) : null)
      : null
  ), [step]);

  /* Resolve the step's anchor. Almost always it's on screen already, so the common path is
     synchronous and the step paints in the same frame as the click. The inbox is the exception — it
     renders after its fetch resolves — so an absent anchor is retried on a timer, then given up on in
     favour of a centered card rather than stalling the tour on a target that never appeared.

     Timers, not requestAnimationFrame: rAF stops firing in a backgrounded tab, and someone
     presenting will switch to Slack or a browser tab mid-run. A tour step that never resolves
     because the tab lost focus would leave a scrim over the product with no card on it. */
  useEffect(() => {
    if (!step.anchor) {
      setRect(null);
      setReady(true);
      return;
    }
    let timer = 0;
    let waited = 0;
    const settle = (el) => {
      // Only scroll when the control genuinely isn't on screen. A tall region (the cards column runs
      // well past the fold) starts in view already, and centering it would push the top bar off
      // screen — losing the agent chip the very next step points at.
      const r = el.getBoundingClientRect();
      if (!(r.top >= 0 && r.top < window.innerHeight * 0.6)) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      setRect(el.getBoundingClientRect());
      setReady(true);
    };

    const first = findAnchor();
    if (first) {
      settle(first);
    } else {
      setReady(false);
      setRect(null);
      timer = setInterval(() => {
        const el = findAnchor();
        if (el) { clearInterval(timer); settle(el); return; }
        waited += ANCHOR_POLL_MS;
        if (waited >= ANCHOR_WAIT_MS) { clearInterval(timer); setReady(true); }
      }, ANCHOR_POLL_MS);
    }
    return () => clearInterval(timer);
  }, [step, findAnchor]);

  /* Keep the ring on the control while the page settles under it: `scrollIntoView` above animates,
     images and cards can reflow, and the window can be resized mid-demo — each would otherwise leave
     the ring behind. A few timed snapshots rather than a frame loop, for the same backgrounded-tab
     reason as above, plus a live resize handler. */
  useLayoutEffect(() => {
    if (!step.anchor || !ready) return;
    const sync = () => {
      const el = findAnchor();
      if (el) setRect(el.getBoundingClientRect());
    };
    const timers = [60, 180, 360, 620].map((ms) => setTimeout(sync, ms));
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync);
    };
  }, [step, ready, findAnchor]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "Enter") { if (last) onClose(); else next(); }
      else if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, back, last]);

  if (!ready) return null;

  /* The cutout, clamped into the viewport. An anchor taller than the window would otherwise put its
     ring off both ends of the screen and leave the scrim with nothing left to dim — so the highlight
     stops at the fold and reads as "this region", which is what the step is claiming anyway. */
  const box = rect && rect.width ? (() => {
    const top = Math.max(rect.top - PAD, 8);
    const bottom = Math.min(rect.bottom + PAD, window.innerHeight - 8);
    return {
      top, left: Math.max(rect.left - PAD, 8),
      width: Math.min(rect.width + PAD * 2, window.innerWidth - 16),
      height: Math.max(bottom - top, 24),
    };
  })() : null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 60 }}>
      {/* The scrim is four panes around the cutout rather than one box with a hole: it keeps the
          highlighted control at full contrast and, because the panes don't cover it, the user can
          still click the real thing mid-tour.

          Clicking the scrim deliberately does nothing. The usual modal reflex is to dismiss on
          outside-click, but this runs in front of an audience — one stray click while gesturing at
          the screen would drop the walkthrough mid-sentence. Skip and Esc are the ways out. */}
      {box ? <CutoutScrim box={box} /> : (
        <div className="absolute inset-0" style={{ background: "rgba(16,20,32,0.62)" }} />
      )}

      {box && (
        <div className="absolute lt-tour-ring pointer-events-none" style={{
          top: box.top, left: box.left, width: box.width, height: box.height,
          borderRadius: 12,
        }} />
      )}

      {/* Placement lives on a wrapper, never on the card. The card's entrance animates `transform`,
          and a running CSS animation outranks an inline style — so centring the card with
          `translate(-50%,-50%)` on the card itself gets silently overwritten the moment the
          animation's own transform lands, dropping it a half-width down and to the right. The
          wrapper positions, the card animates, and the two can't collide. */}
      <CardFrame placement={cardPlacement(step, box)}>
        <TourCard
          ref={cardRef} step={step} index={i} total={STEPS.length}
          onNext={last ? onClose : next} onBack={back} onClose={onClose} last={last}
        />
      </CardFrame>
    </div>
  );
}

/* Four panes around the cutout. Each is positioned so their union is the whole viewport minus `box`. */
function CutoutScrim({ box }) {
  const shade = { position: "absolute", background: "rgba(16,20,32,0.62)" };
  return (
    <>
      <div style={{ ...shade, top: 0, left: 0, right: 0, height: Math.max(box.top, 0) }} />
      <div style={{ ...shade, top: box.top + box.height, left: 0, right: 0, bottom: 0 }} />
      <div style={{ ...shade, top: box.top, left: 0, width: Math.max(box.left, 0), height: box.height }} />
      <div style={{ ...shade, top: box.top, left: box.left + box.width, right: 0, height: box.height }} />
    </>
  );
}

/* Positions the card without touching its transform. Centered steps get a full-inset flex box (which
   also keeps a tall card inside the viewport instead of running off the bottom); anchored steps get an
   absolutely-placed box at the computed offset. */
function CardFrame({ placement, children }) {
  if (placement.centered) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto" style={{ maxHeight: "100%", overflowY: "auto" }}>{children}</div>
      </div>
    );
  }
  return <div className="absolute" style={{ top: placement.top, left: placement.left }}>{children}</div>;
}

const TourCard = React.forwardRef(function TourCard({ step, index, total, onNext, onBack, onClose, last }, ref) {
  const hero = !!step.hero;
  return (
    <div ref={ref} className="lt-tour-card" style={{
      width: hero ? HERO_W : CARD_W, maxWidth: "calc(100vw - 32px)",
      background: TOUR.surface, borderRadius: hero ? 20 : 16,
      boxShadow: `${TOUR.shadow}, ${TOUR.ring}`,
    }}>
      <div className={hero ? "px-8 pt-7 pb-7" : "px-5 pt-4 pb-4"}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {step.key === "agent" ? <AgentIcon size={16} /> : (
              <span className="flex items-center justify-center rounded-md shrink-0"
                style={{ width: hero ? 24 : 20, height: hero ? 24 : 20, background: TOUR.accentSoft }}>
                <Sparkles size={hero ? 13 : 11} color={TOUR.accent} strokeWidth={2.4} />
              </span>
            )}
            <span className="uppercase tracking-wider truncate"
              style={{ fontSize: hero ? 11 : 9.5, color: TOUR.accent, fontWeight: 700, letterSpacing: hero ? "0.14em" : "0.08em" }}>
              {step.eyebrow}
            </span>
          </div>
          <button onClick={onClose} title="Skip the tour" className="rounded-md p-1 shrink-0 transition-colors"
            style={{ color: TOUR.quiet }}>
            <X size={hero ? 16 : 14} />
          </button>
        </div>

        <div className={hero ? "mt-4 font-semibold tracking-tight" : "mt-2.5 text-base font-semibold leading-snug tracking-tight"}
          style={hero ? { color: TOUR.title, fontSize: 34, lineHeight: 1.12, letterSpacing: "-0.02em" } : { color: TOUR.title }}>
          {step.title}
        </div>
        <div className={hero ? "mt-2.5" : "mt-1.5 text-xs leading-relaxed"}
          style={hero ? { color: TOUR.body, fontSize: 16, lineHeight: 1.5 } : { color: TOUR.body }}>
          {step.body}
        </div>

        {step.tiles && (
          <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {step.tiles.map((t) => {
              const Icon = t.Icon;
              return (
                <div key={t.kicker} className="rounded-xl px-4 py-4"
                  style={{ background: TOUR.tile, border: `1px solid ${TOUR.tileLine}` }}>
                  <span className="flex items-center justify-center rounded-lg"
                    style={{ width: 34, height: 34, background: TOUR.chip, border: `1px solid ${TOUR.chipLine}` }}>
                    <Icon size={17} color={TOUR.accent} />
                  </span>
                  <div className="mt-3 font-semibold" style={{ color: TOUR.title, fontSize: 16 }}>{t.kicker}</div>
                  <div className="mt-1 leading-snug" style={{ color: TOUR.body, fontSize: 13 }}>{t.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={`flex items-center justify-between gap-3 ${hero ? "px-8 py-4" : "px-5 py-3"}`}
        style={{ borderTop: `1px solid ${TOUR.footerLine}`, background: TOUR.footer, borderRadius: hero ? "0 0 20px 20px" : "0 0 16px 16px" }}>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }, (_, n) => (
            <span key={n} className="rounded-full transition-all" style={{
              width: n === index ? 16 : 6, height: 6,
              background: n === index ? TOUR.accent : TOUR.dim,
            }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {index > 0 && (
            <button onClick={onBack}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-transform active:scale-95"
              style={{ background: TOUR.chip, border: `1px solid ${TOUR.chipLine}`, color: "rgba(255,255,255,0.86)" }}>
              <ArrowLeft size={12} /> Back
            </button>
          )}
          <button onClick={onNext} autoFocus
            className={`flex items-center gap-1.5 rounded-lg font-semibold text-white transition-transform active:scale-95 ${hero ? "px-5 py-2.5 text-sm" : "px-3.5 py-1.5 text-xs"}`}
            style={{ background: T.signal, boxShadow: "0 2px 12px rgba(30,151,247,0.45)" }}>
            {last ? <><Check size={hero ? 14 : 12} /> Start reviewing</> : <>{hero ? "Show me" : "Next"} <ArrowRight size={hero ? 14 : 12} /></>}
          </button>
        </div>
      </div>
    </div>
  );
});

/* Where the tooltip sits. Below the control by default, above it when the step says so or when there
   isn't room underneath, and clamped inside the viewport so nothing ever lands half off-screen. */
function cardPlacement(step, box) {
  if (!box || step.placement === "center") {
    return { centered: true };
  }
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const estH = 230;

  const below = box.top + box.height + CARD_GAP;
  const above = box.top - CARD_GAP - estH;
  const wantAbove = step.placement === "top";
  let top = wantAbove && above > 12 ? above : below;
  if (top + estH > vh - 12) top = Math.max(12, above > 12 ? above : vh - estH - 12);

  // Horizontally centered on the control, then pulled back inside the frame.
  let left = box.left + box.width / 2 - CARD_W / 2;
  left = Math.min(Math.max(left, 12), vw - CARD_W - 12);
  return { top, left };
}
