import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      if (api.tokenStore.get()) {
        try {
          const u = await api.me();
          if (!cancelled) setUser(u);
        } catch {
          api.tokenStore.clear();
        }
      }
      if (!cancelled) setReady(true);
    }
    boot();
    const onUnauthorized = () => setUser(null);
    window.addEventListener("lawtrack:unauthorized", onUnauthorized);
    return () => {
      cancelled = true;
      window.removeEventListener("lawtrack:unauthorized", onUnauthorized);
    };
  }, []);

  async function login(username, password) {
    const res = await api.login(username, password);
    api.tokenStore.set(res.access_token);
    setUser({ username: res.username, display_name: res.display_name });
  }

  function logout() {
    api.tokenStore.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
