# LawTrack AI — Behaviour & User Flow (the ground-truth model)

> **Status: design, agreed with Assaf this session.** This is the fundamental behaviour of LawTrack
> AI: it is not a document reader that produces an export — it is the **ongoing ground truth** for what
> each regulated *layer* currently mandates, versioned over time, with the original documents kept as
> evidence. Companion to [`spec.md`](spec.md) (the *what*) and
> [`technical-design.md`](technical-design.md) (the API *how*); this pins the product behaviour and the
> arrival→review→commit user flow, and the data model that makes LawTrack authoritative.

## 1. Principle — LawTrack is the system of record, not an export tool

The deliverable of a run is **not** a CSV a human then re-keys into a pay policy. The deliverable is a
**committed update to LawTrack's own store**. When a reviewer finishes a document, LawTrack durably
holds — for that layer — the original document, the current configuration *with values*, a version
table, the decision record (full provenance), and any rules it could not fulfil. Anyone can later ask
"what does São Paulo retail regulate today, and how did each value get there?" and LawTrack answers
from its own data. No manual export step; no drift.

## 2. Layers — the durable thing we track

Every document regulates one **layer**:

| Layer | Example | Notes |
|---|---|---|
| **Country** | Brazil CLT, Mexico LFT | Federal statutes/reforms |
| **State / region** | "Texas-US", São Paulo | Sub-national statute or gazette |
| **Company** | a specific employer's ACT | Company-level agreement |
| **CBA** | CCT Comércio Varejista SP | Union collective agreement |

Layers stack (the four-layer inheritance in the spec: country → state → company → CBA). **A layer is
codified as exactly one pay-policy template** — the template's config *is* what that layer regulates
("Texas-US" template = exactly Texas's rules). This 1:1 mapping is the normal case and the whole point:
the template is the authoritative current state, and a new document updates it.

## 3. Documents are editions of a layer

A **document** (a CCT PDF, a statute, a reform bill) is an **edition** in a layer's timeline:
the 2025 CCT, its 2026 renewal, a mid-year addendum. Documents never stand alone — each is attached to
a layer and produces (on finalize) a new version of that layer's config. The original file/text is
retained as the evidence behind every value.

## 4. Arrival & compare flow

When a document arrives (manual upload now; auto-detected monitor in Phase 2):

1. **Classify the layer type** — Country / State / Company / CBA (inferred from the document, reviewer
   can override).
2. **Look it up in the DB.** Do we already track this layer? If so: what is its **status**, and does it
   have a **mapped template** (current config)? Surface both.
3. **Suggest the match, reviewer confirms** — "This looks like *CCT Comércio Varejista SP* — its 2026
   edition" or "brand-new layer." (Matching decision: suggest-then-confirm.)
4. **Ask what to compare against:**
   - the layer's **current values** (the mapped template) — the normal renewal case: "what changed
     since the version you're running";
   - a **different template** — e.g. seed a new layer from a sibling;
   - **author mode** — no baseline; every relevant clause is net-new (a brand-new layer).
5. **Analyze** — the pipeline extracts cited clauses and maps each finding against the chosen baseline.

## 5. Review & the 5-colour classification

Guided, card-by-card review (Accept / Edit / Reject) against the chosen baseline
(spec §4 & §6). Classifications: 🟢 Match · 🟡 Adjust · 🔴 Gap · 🟣 Conflict (warn, never block).

**The Gap case is load-bearing here.** A 🔴 Gap means the rule has **no matching configuration
parameter** in the template — the engine can't express it yet. On finalize these are written to a
per-layer **"can't-be-fulfilled calculations" log** (part of the ground truth, also renderable as the
text file the Modular-calculation track consumes — `unsupported-calculations.md` /
`candidate-calculations.md`). LawTrack thus doubles as a live feeder of real capability gaps to the
Modular calculation solution; nothing is silently dropped.

## 6. Finalize = "Update" (commit + version), never export

When the reviewer is done (all findings decided), an explicit **Update** action:

1. Applies every **Accepted/Edited** finding to the layer's template config;
2. Snapshots the result as a **new template version** (the version table), stamped with the source
   document, approver, and time;
3. Writes 🔴 **Gaps** to the unsupported-calc log for the Modular track;
4. Marks the document **Complete** and links it to the version it produced.

Rejected findings are retained with their reason (not deleted). Because this is a commit into
LawTrack's own store — not an export — the layer's current values move forward automatically and the
next edition diffs against them.

## 7. What LawTrack stores (the ground-truth surfaces)

- **Original documents** — blob + rendered text, the evidence behind every value.
- **Layers** — the tracked regulated scopes and their status.
- **Current config, with values** — one template per layer (the authoritative current state).
- **Version table** — every committed version of a layer's config, with source document + approver + date.
- **Decision record** — per finding: classification, verbatim clause + page, rationale, confidence,
  the human decision and who/when (provenance: value → finding → document → clause).
- **Unsupported-calculations log** — 🔴 Gaps that need a new Modular calculation.

## 8. Statuses

- **Document:** `new` → `analyzing` → `analyzed` → `in_review` (some findings decided) →
  `complete` (finalized, produced a version) · `error`.
- **Layer:** `tracked` (has ≥1 committed version) vs `candidate` (seen, not yet codified); plus the
  status of its latest edition.

## 9. Data-model implications (mapping to the current backend)

| Concept | Today | Change |
|---|---|---|
| Layer / template | `PayPolicy` (generic compare target) | Add `layer_type` (country/state/company/cba); a `PayPolicy` **is** a tracked layer's current config. |
| Version history | — | New `PolicyVersion` (config snapshot + version no. + `source_document_id` + approver + date). |
| Document ↔ layer | `Document.policy_id` (compare target) | Becomes the layer the edition updates; add edition metadata + the compare-baseline choice. |
| Gaps | 🔴 findings only | New `UnsupportedCalculation` (finding + layer + document link), renderable to the text file. |
| Finalize | flips to `reviewed` on first accept, then export | Explicit **Update** → apply accepted → new `PolicyVersion` → Gaps to log → doc `complete`. |

## 10. Open decisions

- **Finalize granularity** — must every finding be decided before Update, or may we commit the accepted
  subset and leave the rest pending?
- **Unsupported-calc storage** — DB table (queryable, authoritative) that *also* renders the text file
  for the Modular track — vs. a text file only. (Leaning DB + generated file.)
- **Layer ↔ template cardinality** — enforce strict 1:1, or allow a layer to carry more than one
  template variant?
