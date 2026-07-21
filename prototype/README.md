# LawTrack AI — mockup

Interactive UI mockup for **AI Feature Idea #3 — LawTrack AI** (see
[`../../strategy/ai-feature-ideas.md`](../../strategy/ai-feature-ideas.md)).

> The law changed, your policies are flagged. An agent tracks labor-law and CBA/CCT changes per
> jurisdiction, determines effective dates, **compares each change against your pay policy**, flags
> the clauses that fall out of alignment, and drafts the config update for one-click review.

> **One feature, two ingestion modes** — LawTrack AI absorbs the former "CBA/CCT Reader." *Auto-detect*
> monitors statutes and CCT/ACT renewals and compares each against the tenant's current configured
> policy (the agent already knows which policy applies). *Manual upload* lets a user drop a CBA/law PDF
> on demand — and **requires them to choose the pay-policy template** to compare it against.

This is a **design mockup**, not a real implementation — all documents, policies, and gap analyses
are hard-coded sample data. It exists to make the feature concrete and demoable.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## What it demonstrates

- **Radar dashboard** — detected CBAs/laws grouped by country or by CBA, each card showing the
  agent's reasoning, source, status (New / Analyzing / Ready / Reviewed), and a change summary.
- **Review screen** — split view: the **complete source document** rendered on the left (shown in
  full, never trimmed) with only the relevant clauses **marked in place**, and a gap map on the
  right comparing each change against the target policy — classified Aligned / Config / Gap /
  Conflict, with before→after, pipeline mapping, extraction confidence, and Accept / Flag controls.
  The marks and cards are cross-linked.
- **Manual upload** — the "Upload PDF" action drops a CBA/law document into the radar; the modal
  **requires picking a pay-policy template** to compare against before the Analyze action unlocks.
- **Sample jurisdictions** — Brazil (CCT Comércio SP, Boticário, Logística, PL 6x1), France
  (Syntec), Mexico (40h reform), Germany (Einzelhandel NRW).

## Stack

Vite + React 18 + Tailwind (via CDN) + lucide-react. Single-component app in
[`src/app.jsx`](src/app.jsx).
