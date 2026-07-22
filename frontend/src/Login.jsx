import React, { useState } from "react";
import { Radar, Loader2 } from "lucide-react";
import { useAuth } from "./auth.jsx";
import { T } from "./shared.jsx";

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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: T.paper }}>
      <form
        onSubmit={submit}
        className="rounded-2xl w-full"
        style={{ maxWidth: 380, background: "#fff", border: `1px solid ${T.line}`, boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}
      >
        <div className="p-6 pb-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: T.ink }}>
            <Radar size={22} color="#fff" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight" style={{ color: T.ink }}>LawTrack AI</div>
            <div className="text-xs" style={{ color: T.muted }}>day.io · internal sign in</div>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <label className="text-xs font-medium" style={{ color: T.muted }}>
            Username
            <input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{ border: `1px solid ${T.line2}`, color: T.ink }}
            />
          </label>
          <label className="text-xs font-medium" style={{ color: T.muted }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{ border: `1px solid ${T.line2}`, color: T.ink }}
            />
          </label>
          {err && (
            <div className="text-xs rounded-lg px-3 py-2" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>
              {err}
            </div>
          )}
          <button
            type="submit"
            disabled={busy || !username || !password}
            className="mt-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
            style={{ background: T.ink, opacity: busy || !username || !password ? 0.6 : 1 }}
          >
            {busy && <Loader2 size={15} className="animate-spin" />} Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
