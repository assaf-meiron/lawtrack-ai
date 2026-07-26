import React, { useCallback, useState } from "react";
import { LogOut, LayoutGrid, Layers } from "lucide-react";
import { useAuth } from "./auth.jsx";
import { T, Toast } from "./shared.jsx";
import dayioLogo from "./assets/dayio-logo.svg";
import Login from "./Login.jsx";
import DocumentsScreen from "./DocumentsScreen.jsx";
import ReviewScreen from "./ReviewScreen.jsx";
import LayersScreen from "./LayersScreen.jsx";
import { AgentProvider, AgentChip } from "./AgentScanner.jsx";

export default function App() {
  const { user, ready, logout } = useAuth();
  const [screen, setScreen] = useState("documents"); // documents | review | layers
  const [docId, setDocId] = useState(null);
  const [toast, setToast] = useState(null);

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
          <TopNav user={user} screen={screen} setScreen={setScreen} logout={logout} />
          {screen === "documents" ? (
            <DocumentsScreen onOpen={openReview} fireToast={fireToast} />
          ) : (
            <LayersScreen fireToast={fireToast} />
          )}
        </div>
      )}
      <Toast toast={toast} />
    </AgentProvider>
  );
}

function TopNav({ user, screen, setScreen, logout }) {
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
    <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.line}`, background: T.panel }}>
      <div className="flex items-center gap-3">
        <img src={dayioLogo} alt="day.io" style={{ height: 20, width: "auto" }} />
        <div className="self-stretch" style={{ width: 1, background: T.line }} />
        <div>
          <div className="text-sm font-semibold tracking-tight" style={{ color: T.ink }}>LawTrack AI</div>
          <div className="text-xs" style={{ color: T.muted }}>cited draft for expert review</div>
        </div>
        <div className="ml-4 flex items-center gap-1.5 rounded-lg p-0.5" style={{ background: "#eef1f6", border: `1px solid ${T.line}` }}>
          <NavBtn id="documents" Icon={LayoutGrid} label="Documents" />
          <NavBtn id="layers" Icon={Layers} label="Layers" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* the scanner: how many documents it found in the last 48 hours, and the way into its panel */}
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
