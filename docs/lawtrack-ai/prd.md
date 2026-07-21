# LawTrack AI — PRD

> The sharpened definition of *what we build and why*, once research validates the pain.
>
> **Status: SCAFFOLD — draft after research.** The [spec](spec.md) holds the deep *how* (pipeline,
> classification, taxonomy, modes); [technical-design.md](technical-design.md) holds the Claude API
> architecture; [agent-plan.md](agent-plan.md) holds the phased workflow. This PRD is the
> product-decision layer above them — problem, users, requirements, success. Don't fill requirements
> until the pain is validated ([market-research.md](market-research.md)).

## 1. TL;DR
_One paragraph: what it is, for whom, why now. (Draft last.)_

## 2. Problem
_Pull the validated core pain from [pain-points.md](pain-points.md). Lead with the wedge (currently hyp.
P4 missed-change liability + P1/P7 reading tax)._

## 3. Goals & non-goals
- **Goals:** _measurable (e.g. cut CBA-analysis time X%; kill "we didn't know" / "who's affected" for covered jurisdictions)._
- **Non-goals:** legal interpretation (effective dates, derogation) stays human; auto-apply without sign-off (never); non-T&A clauses (spec §2).

## 4. Users & personas
_Implementation consultant · HR/compliance admin · sales/pre-sales — from [pain-points.md](pain-points.md)._

## 5. Jobs to be done
_"When a CBA arrives / renews, I want to ___ so that ___." One per persona._

## 6. Scope
- **v1** — manual-upload reader, Brazil CCT/ACT, 17-capability taxonomy, 5-color findings + confidence,
  guided review, cited draft, decision record, eval on the golden set (spec §9).
- **Later** — auto-detect monitor (Phase 2); France/Germany taxonomy families; post-review commit;
  scanned-PDF fidelity; learning from overrides.

## 7. Requirements
_Functional requirements per pipeline stage. Reference the [spec](spec.md)/[technical-design](technical-design.md)
rather than restating; record product decisions + priorities + acceptance criteria. **Fill after research.**_

## 8. UX & key flows
_The demoable loop (mockup: `../prototypes/lawtrack-ai/`, port 3000). Flows: upload → pick template →
guided card-by-card review → decision record. Bidirectional PDF↔card link; dim-don't-hide; confidence-with-cause._

## 9. Success metrics
_Candidates: CBA-analysis time saved, extraction recall, mapping precision, reviewer accept rate,
false-positive rate (the killer), time-to-support-matrix (pre-sales), "who's affected" latency._

## 10. Dependencies & sequencing
_From [spec §10](spec.md): taxonomy + golden set (✅), pay-policy schema (✅), statutory baselines (✅),
versioned 4-layer templates (⚠ Phase-2 gate), Claude API access. Phase 1 before Phase 2 ([agent-plan.md](agent-plan.md))._

## 11. Risks & open questions
_From [spec §11](spec.md): post-review commit; citations×structured-output; override learning; scanned
PDFs; monitor source coverage. Plus the accuracy-expectation risk (position as "cited draft," never "auto-config")._

## 12. Milestones
_Reader mode ≈ 8–10 eng-months (1 quarter to design partner, 2 to GA); monitor ≈ 12–15 em on top,
gated on templates (deep-dive #3)._
