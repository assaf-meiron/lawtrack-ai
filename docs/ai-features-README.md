# AI Features

Home for day.io's AI feature work: the **strategy** (idea catalog + priorities), the **capability
specs**, and the interactive **mockups** that make the promising ideas concrete and demoable.

> **Start with [`strategy/roadmap.md`](strategy/roadmap.md)** — the priority decisions from the VP
> Product review (2026-07-15): what we build first (LawTrack AI · Payroll Copilot · MCP), what's next
> (DIA), and what's still being scoped.

## Layout

| Folder | What it is |
| :-- | :-- |
| [`strategy/`](strategy/) | The **"why these"** layer — the roadmap/decisions, the 30-idea catalog, and the shortlist deep-dive. Start here. |
| [`lawtrack-ai/`](lawtrack-ai/) | **Committed-feature home** — spec + full PM track (pain points · document types · agent plan · production Claude API design · PRD · interview guide). |
| [`payroll-copilot/`](payroll-copilot/) | **Committed-feature home** — the spec + the full PM track (pain points · research · PRD · interview guide) in one place. |
| [`specs/`](specs/) | **Capability specs** — the build reference for shortlisted ideas that haven't graduated into their own feature home yet. |
| [`prototypes/`](prototypes/) | **Runnable mockups** — one standalone Vite app per feature, plus self-contained HTML exports. |

> **Committed features graduate into their own home folder** (spec + PM docs together), while
> exploratory ideas stay organized by artifact type (`strategy/` · `specs/` · `prototypes/`).
> `lawtrack-ai/` and `payroll-copilot/` are the first two.

## `strategy/`

| Path | What it is |
| :-- | :-- |
| [`strategy/roadmap.md`](strategy/roadmap.md) | **Roadmap & priority decisions** — outcome of the VP Product (Liran) review: the priority tiers, per-feature notes from the review (esp. Payroll Copilot + DIA), and open questions. **The decision record.** |
| [`strategy/ai-feature-ideas.md`](strategy/ai-feature-ideas.md) | The catalog — 30 AI feature ideas, each tagged with strategic lens, effort tier, impact, and defensibility angle. |
| [`strategy/ai-features-deep-dive.md`](strategy/ai-features-deep-dive.md) | **Deep dive on the shortlisted ideas** — for each: how big is the problem, how much the solution solves it, and a build-effort estimate. |

## `lawtrack-ai/` — committed feature (Idea #3)

Reads labor-rule sources (CBA/CCT, statutes), maps clauses to the engine's capability taxonomy, and
drafts the pay-policy config — a cited draft for expert review. **Start now** per the roadmap; built
**production-ready on the Claude API**.

| Path | What it is |
| :-- | :-- |
| [`lawtrack-ai/spec.md`](lawtrack-ai/spec.md) | **Capability spec.** Two modes (manual upload / auto-detect monitor), the 5-color classification + findings data model, the 17-capability mapping taxonomy, guided review, v1 scope, dependencies. |
| [`lawtrack-ai/pain-points.md`](lawtrack-ai/pain-points.md) | **PM step 1** — the reading tax, renewal churn, and the correlated missed-change liability (anchored to the Boticário run + TST litigation data). |
| [`lawtrack-ai/document-types.md`](lawtrack-ai/document-types.md) | **PM step 2** — the taxonomy of documents to digest (CCT/ACT, statutes, reforms, gazettes, registries) + what a real collective agreement looks like. |
| [`lawtrack-ai/agent-plan.md`](lawtrack-ai/agent-plan.md) | **PM step 3** — the agent's work, phased: **Phase 1** digest one uploaded PDF, then **Phase 2** the scanner (only after Phase 1 works). |
| [`lawtrack-ai/technical-design.md`](lawtrack-ai/technical-design.md) | **Production Claude API design** — PDF via Files API, extraction with citations, structured findings via strict tool use, prompt caching, Batch API, model-per-stage, the 72-instrument eval set, and the citations-vs-structured-output constraint. |
| [`lawtrack-ai/prd.md`](lawtrack-ai/prd.md) | **PRD** (scaffold; draft after research). |
| [`lawtrack-ai/market-research.md`](lawtrack-ai/market-research.md) | **Market & customer research** (scaffold). |
| [`lawtrack-ai/interview-guide.md`](lawtrack-ai/interview-guide.md) | Ready-to-run **customer discovery guide**. |
| [`lawtrack-ai/pipeline/`](lawtrack-ai/pipeline/) | **Phase-1 code scaffold** — a runnable reference implementation of the ingest → extract → map → draft loop on the Claude API (relocatable; may graduate to a dedicated engine repo). |

Runnable mockup: [`prototypes/lawtrack-ai/`](prototypes/lawtrack-ai/) (port 3000).

## `payroll-copilot/` — committed feature (Idea #7)

The first feature to graduate into a full PM track. **Start now** per the roadmap.

| Path | What it is |
| :-- | :-- |
| [`payroll-copilot/spec.md`](payroll-copilot/spec.md) | **Capability spec.** 12 building blocks (incl. the review-driven mobile close · higher-order reasoning · close-checklist capture), the T&A-close-not-gross-to-net scope line, the "converge-not-chase" reframe, v1 scope, dependencies. VP Product review notes folded in 2026-07-15. |
| [`payroll-copilot/pain-points.md`](payroll-copilot/pain-points.md) | **PM step 1 — pain points** (first draft; hypotheses to validate). The two-gauntlet close, errors that slip through, mobile burden, no readiness view, tacit checklists. |
| [`payroll-copilot/market-research.md`](payroll-copilot/market-research.md) | **PM step 2 — market & customer research** (scaffold; deferred). Research questions, source plan, competitor grid, synthesis of validated needs. |
| [`payroll-copilot/prd.md`](payroll-copilot/prd.md) | **PM step 3 — PRD** (scaffold; draft after research). Problem, users, scope, requirements, metrics, risks. |
| [`payroll-copilot/interview-guide.md`](payroll-copilot/interview-guide.md) | Ready-to-run **customer discovery guide** for validating the pain points. |

Runnable mockup: [`prototypes/payroll-close-copilot/`](prototypes/payroll-close-copilot/) (port 3006).

## `specs/`

Capability specs for shortlisted ideas that haven't graduated into a feature home yet.

| Path | What it is |
| :-- | :-- |
| [`specs/whatsapp-assistant.md`](specs/whatsapp-assistant.md) | **Capability spec for the Employee (WhatsApp) Assistant (Idea #19)** — one surface of **DIA**. Channel strategy, the 5 capability buckets, the requests-not-punches legal firebreak, reactive + proactive interaction model, identity tiers, v1 scope. |
| [`specs/recruiting-agent.md`](specs/recruiting-agent.md) | **Capability spec for the Recruiting Agent (Idea #31)** — a personal hiring chief-of-staff for one HR person. The "coordination, not judgment" firebreak, the four-capability loop, autonomy tiers, shift-roster availability edge, compliance surface, v1 scope. |

## `prototypes/`

Each mockup lives in its own subfolder as a standalone runnable Vite app, so it can be demoed
independently. They are **design artifacts** — hard-coded sample data, not real implementations —
built to communicate the feature. Self-contained HTML exports of each live in
[`prototypes/html-exports/`](prototypes/html-exports/).

```
ai-features/
├── strategy/    (roadmap · ideas catalog · deep-dive)
├── specs/       (capability specs)
└── prototypes/
    ├── html-exports/          (self-contained .html per mockup)
    └── <feature-slug>/
        ├── src/{app.jsx, main.jsx}
        ├── index.html
        ├── vite.config.js
        ├── package.json
        └── README.md
```

| Path | What it is |
| :-- | :-- |
| [`prototypes/lawtrack-ai/`](prototypes/lawtrack-ai/) | **Idea #3 — LawTrack AI** (merges the former #2 CBA/CCT Reader as its manual-upload mode). `cd prototypes/lawtrack-ai && npm install && npm run dev` → <http://localhost:3000>. |
| [`prototypes/whypay-copilot/`](prototypes/whypay-copilot/) | **Idea #6 — WhyPay Copilot** (formerly "Explain My Hours"). Two design takes in one app: a native-rendered payroll screen and a report-overlay version. Click a payroll cell to trace a value period → day → punches. `cd prototypes/whypay-copilot && npm install && npm run dev` → <http://localhost:3001>. |
| [`prototypes/whatsapp-assistant/`](prototypes/whatsapp-assistant/) | **Idea #19 — Employee WhatsApp Assistant** (one surface of **DIA**). A WhatsApp-style chat in a phone frame; type a question, get a grounded answer. Client-side intent engine over fake data — no live LLM, runs offline. `cd prototypes/whatsapp-assistant && npm install && npm run dev` → <http://localhost:3002>. |
| [`prototypes/payroll-close-copilot/`](prototypes/payroll-close-copilot/) | **Idea #7 — Payroll Copilot.** A payroll-admin readiness cockpit: readiness ring + priced exposure, per-department bars, and a priced blocker queue (click one → calculation-trace evidence, engine-inferred fix with confidence, employee self-verify, chase status). Embodies "converge, not chase". `cd prototypes/payroll-close-copilot && npm install && npm run dev` → <http://localhost:3006>. |
| [`prototypes/what-if-simulator/`](prototypes/what-if-simulator/) | **Idea #5 — Policy What-If Simulator** (pay-policy levers only; the committed feature is **broader** — see roadmap). Mark a group of employees, tweak pay-policy levers, and the "engine" re-prices the last 12 months live: cost delta, monthly shadow-run chart, winners/losers, per-jurisdiction compliance flags, narrated verdict, editable wage-assumptions panel. `cd prototypes/what-if-simulator && npm install && npm run dev` → <http://localhost:3007>. |
| [`prototypes/shift-fill-agent/`](prototypes/shift-fill-agent/) | **Idea #15 — Shift-Fill Agent.** One no-show covered end to end as a step-through storyboard with a trigger picker (text-in or missing-punch). The manager runs his whole side from a WhatsApp thread with quick-reply buttons; the engine decides who *can*, the manager decides what it *costs*. `cd prototypes/shift-fill-agent && npm install && npm run dev` → <http://localhost:3009>. |
| [`prototypes/recruiting-agent/`](prototypes/recruiting-agent/) | **Idea #31 — Recruiting Agent.** One candidate run end to end: books the phone screen over WhatsApp (with AI disclosure), captures a voice-note debrief into a scorecard, asks permission before pulling in the store manager (availability from the day.io shift roster), drafts the rejection Lisa approves with one tap. Embodies "coordination, not judgment". `cd prototypes/recruiting-agent && npm install && npm run dev` → <http://localhost:3008>. |
| [`prototypes/attrition-early-warning/`](prototypes/attrition-early-warning/) | **Idea #25 — Attrition Early-Warning.** An HR flight-risk cockpit over the punch stream: severity-tiered employees, each with an explainable score (punch-derived signal contribution bars, a "we control" tag), schedule-first interventions with projected score reduction, a "Does it work?" cohort-vs-control panel, and an honest model-ceiling card. `cd prototypes/attrition-early-warning && npm install && npm run dev` → <http://localhost:3025>. |
| [`prototypes/hours-bank-advisor/`](prototypes/hours-bank-advisor/) | **Idea #13 — Hours-Bank Advisor.** An HR triage cockpit for banked overtime about to expire: a severity-tiered, hours-first urgency queue (banked HH:MM expiring → HH:MM converting to paid Extra Hours at the premium), with an editable rough `≈$` driving only the ranking. Click a row → balance by cycle + premium type, deadline, compensate-vs-payout in hours. Action suite: per-manager emails, report export, joint time-off plan, work-list, escalate-Critical. `cd prototypes/hours-bank-advisor && npm install && npm run dev` → <http://localhost:3013>. |
| [`prototypes/html-exports/`](prototypes/html-exports/) | Self-contained single-file HTML export of each mockup (open in a browser, no build). |

New mockups slot in as sibling subfolders under `prototypes/` (named after the feature).
