// Thin fetch wrapper: attaches the bearer token, surfaces API errors, and
// clears the session on 401 (an event the AuthProvider listens for).

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
const TOKEN_KEY = "lawtrack_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

function authHeader() {
  const t = tokenStore.get();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function handle(res) {
  if (res.status === 401) {
    tokenStore.clear();
    window.dispatchEvent(new Event("lawtrack:unauthorized"));
    throw new Error("Session expired — please sign in again.");
  }
  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.detail) detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { ...(opts.headers || {}), ...authHeader() },
  });
  return handle(res);
}

// --- auth ---
export async function login(username, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handle(res);
}
export const me = () => req("/api/auth/me");

// --- policies / layers ---
export const listPolicies = () => req("/api/policies");
export const getPolicy = (id) => req(`/api/policies/${id}`);
export const createPolicy = (body) =>
  req("/api/policies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
export const listUnsupported = () => req("/api/unsupported-calculations");

// --- documents ---
export const listDocuments = () => req("/api/documents");
export const getDocument = (id) => req(`/api/documents/${id}`);
export const analyzeDocument = (id) => req(`/api/documents/${id}/analyze`, { method: "POST" });
export const finalizeDocument = (id) => req(`/api/documents/${id}/finalize`, { method: "POST" });

export async function uploadDocument(form) {
  // form: FormData with file, jurisdiction, policy_id, doc_type, title, ...
  return req("/api/documents", { method: "POST", body: form });
}

// --- review ---
export const reviewFinding = (id, action) =>
  req(`/api/findings/${id}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action),
  });

// --- verified output ---
export const listRules = () => req("/api/rules");
export const listConfigValues = () => req("/api/config-values");
export const decisionRecord = (id) => req(`/api/documents/${id}/decision-record`);

// open a blob (e.g. the original PDF) in a new tab, with auth
export async function openFile(path) {
  const res = await fetch(`${BASE}${path}`, { headers: authHeader() });
  if (!res.ok) throw new Error(`could not open file: ${res.status}`);
  const url = URL.createObjectURL(await res.blob());
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

// --- downloads (blob, with auth) ---
export async function downloadFile(path, filename) {
  const res = await fetch(`${BASE}${path}`, { headers: authHeader() });
  if (!res.ok) throw new Error(`download failed: ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
