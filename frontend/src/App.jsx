import React, { useCallback, useEffect, useState } from "react";
import { LogOut, Inbox, Library, Compass, MessagesSquare, ShieldCheck } from "lucide-react";
import { useAuth } from "./auth.jsx";
import { T, Toast } from "./shared.jsx";
import oitchauLogo from "./assets/oitchau-logo.svg";
import Login from "./Login.jsx";
import DocumentsScreen from "./DocumentsScreen.jsx";
import ReviewScreen from "./ReviewScreen.jsx";
import LayersScreen from "./LayersScreen.jsx";
import AdvisorScreen from "./AdvisorScreen.jsx";
import PayrollValidationScreen from "./PayrollValidationScreen.jsx";
import Tour from "./Tour.jsx";
import { AgentProvider, AgentChip } from "./AgentScanner.jsx";

export default function App() {
  const { user, ready, logout } = useAuth();
  const [screen, setScreen] = useState("documents"); // documents | review | layers | advisor | validation
  const [docId, setDocId] = useState(null);
  const [toast, setToast] = useState(null);
  const [tourOn, setTourOn] = useState(false);

  /* The tour opens on every sign-in, not once per browser — see Tour.jsx. Keyed on the username so
     it re-arms after a sign-out/sign-in cycle, which is the loop someone rehearsing a demo lives in. */
  useEffect(() => {
    if (user) setTourOn(true);
  }, [user?.username]);

  const fireToast = useCallback((msg, tone = "neutral") => {
    const id = Math.random();
    setToast({ msg, tone, id });
    setTimeout(() => setToast((cur) => (cur && cur.id === id ? null : cur)), 2600);
  }, []);

  const openReview = useCallback((id) => {
    setDocId(id);
    setScreen("review");
  }, []);

  if (!ready) {
    return <div className="min-h-screen" style={{ background: T.paper }} />;
  }
  // The scanner provider polls an authenticated endpoint, so it mounts only behind the login.
  if (!user) return <Login />;

  return (
    <AgentProvider fireToast={fireToast} onOpenDocument={openReview}>
      {screen === "review" && docId ? (
        <ReviewScreen docId={docId} onBack={() => setScreen("documents")} fireToast={fireToast} />
      ) : (
        <div className="min-h-screen" style={{ background: T.paper, color: T.ink }}>
          <TopNav user={user} screen={screen} setScreen={setScreen} logout={logout}
            onTour={() => { setScreen("documents"); setTourOn(true); }} />
          {screen === "documents" ? (
            <DocumentsScreen onOpen={openReview} fireToast={fireToast} />
          ) : screen === "advisor" ? (
            <AdvisorScreen fireToast={fireToast} />
          ) : screen === "validation" ? (
            <PayrollValidationScreen fireToast={fireToast} />
          ) : (
            <LayersScreen fireToast={fireToast} />
          )}
        </div>
      )}
      {/* The tour points at controls on the Documents screen, so it only runs while that's what's up. */}
      {tourOn && screen === "documents" && <Tour onClose={() => setTourOn(false)} />}
      <Toast toast={toast} />
    </AgentProvider>
  );
}

/* Deliberately the loudest control on screen: filled, dark, and the only one carrying a shield. It is
   also its own screen rather than a fourth nav pill — the nav pills are all *document* surfaces, and
   this one leaves that world entirely to read punch data. */
function ValidationButton({ on, onClick }) {
  return (
    <button onClick={onClick} title="Check your punches against the CCT"
      className="flex items-center gap-2 rounded-lg pl-2.5 pr-3 py-2 transition-transform active:scale-95"
      style={{
        background: on ? T.signal : T.ink, color: "#fff",
        boxShadow: on ? "0 0 0 3px rgba(30,151,247,0.20)" : "0 2px 8px rgba(35,40,56,0.22)",
      }}>
      <ShieldCheck size={16} />
      <span className="text-left leading-none">
        <span className="block text-xs font-bold tracking-tight">Payroll Validation</span>
        <span className="block" style={{ fontSize: 10, opacity: 0.72, marginTop: 2 }}>punches vs the CCT</span>
      </span>
    </button>
  );
}

function TopNav({ user, screen, setScreen, logout, onTour }) {
  const NavBtn = ({ id, Icon, label }) => {
    const on = screen === id;
    return (
      <button
        onClick={() => setScreen(id)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
        style={{ background: on ? "#fff" : "transparent", color: on ? T.signal : T.muted, boxShadow: on ? "0 1px 2px rgba(0,0,0,0.08)" : "none", border: on ? `1px solid ${T.line}` : "1px solid transparent" }}
      >
        <Icon size={15} /> {label}
      </button>
    );
  };
  return (
    /* `position: relative` + a z-index is load-bearing, not decoration. The Inbox draws
       AtlasBackdrop as `position: fixed; z-index: 0`, and a positioned element paints above static
       in-flow content in the same stacking context — so without this the backdrop's brand glow and
       dot screen were laid over the top bar, greying out the logo and the nav pills. */
    <div className="px-6 py-3 flex items-center justify-between relative"
      style={{ borderBottom: `1px solid ${T.line}`, background: T.panel, zIndex: 10 }}>
      <div className="flex items-center gap-3">
        <img src={oitchauLogo} alt="Oitchau" style={{ height: 20, width: "auto" }} />
        <div className="self-stretch" style={{ width: 1, background: T.line }} />
        <div>
          <div className="text-sm font-semibold tracking-tight" style={{ color: T.ink }}>LawTrack AI</div>
          <div className="text-xs" style={{ color: T.muted }}>cited draft for expert review</div>
        </div>
        <div className="ml-4 flex items-center gap-1.5 rounded-lg p-0.5" style={{ background: "#eef1f6", border: `1px solid ${T.line}` }}>
          {/* The screen ids stay `documents`/`layers` — they're wired through props, the tour's
              anchors and the review round-trip. Only what the user reads changed. */}
          <NavBtn id="documents" Icon={Inbox} label="Inbox" />
          <NavBtn id="layers" Icon={Library} label="Knowledge Hub" />
          <NavBtn id="advisor" Icon={MessagesSquare} label="Ask" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* replay the walkthrough — the tour auto-runs on sign-in, this is for picking it up mid-session */}
        <button onClick={onTour} title="Take the tour again"
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
          style={{ border: `1px solid ${T.line2}`, background: "#fff", color: T.muted }}>
          <Compass size={13} /> Take the tour
        </button>
        {/* Payroll Validation — the one solid-filled control in the bar, because it is the only one that
            answers a question about the customer's *own* data rather than about a document. It sits
            beside the Agent chip: the Agent finds the rules, this checks the punches against them. */}
        <ValidationButton on={screen === "validation"} onClick={() => setScreen("validation")} />
        {/* the scanner: how many documents it found in the past 24 hours, and the way into its panel */}
        <AgentChip />
        <div className="self-stretch" style={{ width: 1, background: T.line }} />
        <div className="text-xs text-right">
          <div className="font-medium" style={{ color: T.ink }}>{user.display_name || user.username}</div>
          <div style={{ color: T.faint }}>@{user.username}</div>
        </div>
        <button
          onClick={logout}
          title="Sign out"
          className="flex items-center justify-center rounded-lg active:scale-95 transition-transform"
          style={{ width: 34, height: 34, border: `1px solid ${T.line2}`, background: "#fff", color: T.ink2 }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}
