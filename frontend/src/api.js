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
  // A string body is always JSON here, so default the content type rather than making every call
  // site remember it: fetch otherwise sends `text/plain` and FastAPI rejects the body with a 422
  // that looks nothing like a missing header. FormData bodies are left alone — the browser has to
  // set their multipart boundary itself.
  const jsonBody = typeof opts.body === "string";
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      ...(jsonBody ? { "Content-Type": "application/json" } : {}),
      ...(opts.headers || {}),
      ...authHeader(),
    },
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
// the six pay-policy tabs and their field labels — static, fetched once per Layers visit
export const payPolicySchema = () => req("/api/pay-policy-schema");
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
export const deleteDocument = (id, password) =>
  req(`/api/documents/${id}`, {
    method: "DELETE",
    headers: { "X-Delete-Password": password || "" },
  });

export async function uploadDocument(form) {
  // form: FormData with file, jurisdiction, policy_id, doc_type, title, ...
  return req("/api/documents", { method: "POST", body: form });
}

// rename a document (or set its subtitle) — marks the title as human-set
export const updateDocument = (id, body) =>
  req(`/api/documents/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// --- review ---
export const reviewFinding = (id, action) =>
  req(`/api/findings/${id}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action),
  });

// chat with the assistant about a specific finding; returns { reply, chat_messages, suggestion }
export const chatFinding = (id, message) =>
  req(`/api/findings/${id}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

// --- source scanner (Phase 2) ---
// status: the watch list, recent finds, and the review backlog they created.
// scan: run one cycle — reports what was checked/triaged and surfaces what it found.
// --- the T&A advisor (stateless: the transcript is posted back each turn) ---
export const advisorCoverage = () => req("/api/advisor/coverage");
export const advisorAsk = (jurisdiction, history, message) =>
  req("/api/advisor/ask", {
    method: "POST",
    body: JSON.stringify({ jurisdiction, history, message }),
  });
export const advisorSummary = (jurisdiction, history) =>
  req("/api/advisor/summary", {
    method: "POST",
    body: JSON.stringify({ jurisdiction, history }),
  });

export const agentStatus = () => req("/api/agent/status");
export const runAgentScan = () => req("/api/agent/scan", { method: "POST" });

// --- payroll validation (punches vs the CCT / statute) ---
// groups: the business role groups, by country. run: the whole validation for one group.
export const validationGroups = () => req("/api/validation/groups");
export const runValidation = (groupKey) => req(`/api/validation/groups/${groupKey}`);

// --- verified output ---
export const listRules = () => req("/api/rules");
export const listConfigValues = () => req("/api/config-values");
export const decisionRecord = (id) => req(`/api/documents/${id}/decision-record`);
// the pay policy + how this document changes it (current vs proposed config, per-field diff, gaps)
export const configDiff = (id) => req(`/api/documents/${id}/config-diff`);

// fetch a rasterized scanned-page image (auth'd) as an object URL for <img src>.
// Caller owns the URL and must URL.revokeObjectURL(...) it when done (e.g. on unmount).
export async function fetchPageImage(documentId, page) {
  const res = await fetch(`${BASE}/api/documents/${documentId}/pages/${page}/image`, { headers: authHeader() });
  if (!res.ok) throw new Error(`could not load page image: ${res.status}`);
  return URL.createObjectURL(await res.blob());
}

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
