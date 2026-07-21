# LawTrack AI — Pain Points

> **PM step 1 of 3** (pain points → [document types](document-types.md) → [agent plan](agent-plan.md) →
> [PRD](prd.md)). Grounded in the [spec](spec.md), the deep-dive (#2·#3), and the validated Boticário run.
>
> **Status: first draft, internal.** Severity anchored to real numbers where we have them (Boticário,
> TST litigation, US posting changes), flagged as hypotheses otherwise — quantify in
> [`market-research.md`](market-research.md).

## Who has the pain

1. **day.io implementation team** — during onboarding, *we* import and read the customer's relevant
   instruments (CBAs, state law, …) and hand-configure the pay policy. This reading + mapping is
   day.io's cost and bottleneck.
2. **HR / compliance admin (customer)** — owns staying compliant as agreements renew and statutes
   change; carries the litigation risk when something is missed.
3. **Sales / pre-sales (day.io)** — needs to show a prospect "we support your agreements" during the deal.

## Pain points

### P1 — Reading CBAs is a massive, expensive task
Onboarding and ongoing. There are many instruments, each long, much of it irrelevant to T&A — yet
day.io reads the whole PDF, guesses which clauses matter, and hand-edits the policy. **High (anchor):**
it gates onboarding and burns our most expensive people.

### P2 — It recurs every renewal — never one-and-done
Brazilian CCTs renegotiate **annually**; France (~98% coverage), Germany, most of Western Europe run
60–80%+ sectoral coverage — and retail/logistics (day.io's core verticals) are the multi-instrument
segments. Every renewal means re-finding *what changed* and re-touching the policy, from scratch.
**High (anchor):** the cost is annual, not one-time.

### P3 — Finding "what changed" on renewal is manual and error-prone
A renewed CCT is a fresh long PDF; the deltas (a band 70%→75%, a new micro-rest) are buried. Miss one
and the policy silently drifts out of compliance. Today: eyeball two PDFs side by side, or trust that
nothing big changed. **High (hyp.).**

### P4 — A missed change silently misconfigures every affected tenant at once
For a *calculation* vendor, one missed band or statutory reform propagates wrong results across
**every affected tenant simultaneously** — correlated, systematic failure, not a one-off. Anchor:
**horas extras is the #1 subject of Brazilian labor litigation — 25.7% of claims in 2025, ~633,000
lawsuits (TST)**, much of it CCT-premium disputes (which band, which base, which stacking rule). A
misread instrument becomes tenant-wide underpayment. **Critical (anchor):** the failure mode that
makes the moat matter.

### P5 — "Which tenants are affected?" is unanswerable today
When a change lands, nobody can quickly enumerate which policies/tenants it touches — the exact
question a generic compliance-news feed *cannot* answer, and the four-layer inheritance makes it
answerable **only** inside our system. **High (hyp.)** — and it's our structural advantage.

### P6 — Statutory churn is structural, not episodic
US alone: ~**600 state employment-law changes/yr**, 200+ mandatory posting changes/yr, minimum-wage
moves across dozens of jurisdictions every Jan 1 / Jul 1. **Every target market has a reform in flight**
— Brazil 6x1/40h, Mexico 48→40h (2026–2030), India Labour Codes, France/Germany 2026. The manual
"radar" today *is* `worldwide-calculations/`. **High (anchor):** continuous and unbounded.

### P7 — The expensive part is mapping, not reading
Extraction (pull the bands out) is near-commodity; the days go into **mapping** each rule to the right
policy field + drafting the config — expert judgment that turns "months of reading" into "days of
reviewing," scarce and non-scaling with deal volume. **High (hyp.):** the bottleneck *and* the
differentiated value.

### P8 — Pre-sales can't produce a support-matrix fast
"Do you support our agreements?" requires running the prospect's instruments through the same manual
reading — which doesn't fit a sales cycle. A same-day support-matrix would be a deal-closer.
**Medium–High (hyp.):** a growth lever, not just a cost.

## Who hurts most (provisional)

1. **day.io + the customer jointly on P4** — the correlated, tenant-wide miss; highest severity.
2. **day.io implementation on P1/P2/P7** — the recurring, expensive reading + mapping tax.
3. **Sales on P8** — the growth upside.

## What we need to learn (feeds step 2 + research)

- Is the acute pain the **onboarding tax** (P1/P7), the **renewal churn** (P2/P3), or the
  **missed-change liability** (P4)? The deep-dive suggests P4 is the strategic wedge and P1/P7 the
  volume pain — validate.
- Which document types actually arrive, in what languages and quality? → [`document-types.md`](document-types.md).
- What accuracy bar makes a "cited draft" trustworthy enough to save time without false confidence?
  (False positives kill it.)
- Where is the human-judgment line customers will *not* let AI cross (effective dates, derogation)?
