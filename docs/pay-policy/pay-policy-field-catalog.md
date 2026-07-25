# Pay Policy — flat field catalog (mapping vocabulary)

> **Purpose.** A flat, pickable list of the configuration fields a labor-agreement clause can
> translate into — the shared vocabulary for three things: the **answer keys** in the golden set,
> the **mapping prompt** (so the model picks a field instead of inventing free text), and the
> **eval judge** (so predicted→expected alignment is on a fixed identifier, not fuzzy wording).
>
> **Derived from** `pay-policy-configuration.md` (current-state reference, 2026-07-08 screens +
> 2024 API). This catalog is the *distilled* view: only the settings a CBA/statute clause would
> drive, each given a stable `key`. When the two disagree, `pay-policy-configuration.md` wins —
> this is a projection of it, not a second source of truth.
>
> **DRAFT for review.** Keys, groupings, and the current/target split need Assaf's sign-off before
> the golden set or the mapping prompt consume it.

## How to read this

Each field carries:

- **`key`** — stable slug; the machine identifier used in answer keys + the judge. Never rephrase a
  key once labels depend on it (add a new one + deprecate instead).
- **Field** — human display name (matches the "Setting" wording in `pay-policy-configuration.md`).
- **Value shape** — what a well-formed `value` looks like, so answer-key values are consistent.
- **Tag** — `C` current (configurable today) · `T` target (not in the UI today) · `BR?`
  Brazil-specific, UI-presence unconfirmed · `BR` Brazil, confirmed in data.
- **Notes** — the local/CLT term a clause is likely to use, and any nuance.

**Value-shape vocabulary:** `percentage` (e.g. `70%`) · `multiplier` (e.g. `1.5×`) · `tiered-rate`
(e.g. `70% first 2h, then 100%`) · `hours` (e.g. `44h`) · `duration` (minutes/time, e.g. `10 min`,
`11h`) · `time-window` (e.g. `22:00–05:00`) · `toggle` (on/off) · `enum {…}` · `count` (integer).

> **A blank value = the flag case.** If a clause is genuinely ambiguous (can't derive a value), the
> answer-key row still names the `field` but leaves `value` blank — that's how you assert "the
> pipeline *should* flag this," not force a number.
>
> **Value and engine-home are separate axes.** The `value` is *whatever the clause states* — we always
> capture it, even for a field the engine can't configure today. The `C`/`T` tag is a **second,
> independent axis**: does a configuration home exist for this field *today*? So a target (`T`) field
> can still carry a value (e.g. "split-shift premium 50%") — the value is real, only the engine home
> is missing. (This is why #4 below matters: which fields truly have no home is a product call, not
> mine — schedule scales already flipped `T`→`C` on Assaf's word.)

---

## Section 1 — Current configurable fields (`C`) — the `adjust` vocabulary

These are the fields the engine supports **today**. A clause mapping to one of these should produce a
confident `{field, value}` (an `adjust`).

### A · Paid Overtime — regular hours & OT onset

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `regular_hours_daily` | Regular hours target (daily) | `hours` | `C` | *jornada diária* (e.g. 8h). Current per the 2026-07-23 owner correction. |
| `regular_hours_weekly` | Regular hours target (weekly) | `hours` | `C` | *jornada semanal* (e.g. 44h). |
| `ot_threshold_daily` | Daily OT threshold | `hours` | `C` | Hours beyond which OT begins, per day. |
| `ot_threshold_weekly` | Weekly OT threshold | `hours` | `C` | Accumulated over a configurable week window. Committed-in-delivery (Assaf 2026-07-18); treat as supported. |
| `ot_onset_early_late_only` | Consider only early arrivals / late leaves as OT | `toggle` | `C` | Checked → OT is only the spill outside planned boundaries; shortfall becomes a debit. |
| `ot_onset_include_breaks` | Include breaks in the early/late-only calc | `toggle` | `C` `?` | Modifier of the above; no calc-flow counterpart (finding #25). |
| `ot_nonplanned_after_x` | On non-planned days, start OT after X hours | `hours` (or off) | `C` | Hours up to X are regular on non-planned days; surplus is OT. |
| `ot_split_days_by` | Split OT days by | `enum {calendar, shifts}` | `C` | Only matters when OT crosses midnight (which day's rate applies). |

### A · Paid Overtime — rates

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `ot_rate_split_basis` | Split rates by | `enum {specific-days, planned/non-planned}` | `C` | Selects the OT-rate-window basis; drives the Days-group options. |
| `ot_rate_unit` | Calculate compensation rates by | `enum {percentage, multiplier}` | `C` | Crediting/labeling axis (% vs ×). |

**OT rate per day-group** *(per decision — granular, one key per day-group a CBA distinguishes, not a
single `ot_rate` line).* Each is a `tiered-rate`: a rate that may step by hour limit (e.g. `+70% first
2h, then +100%`). All are rows of the one UI rates table (§3.4), but a CBA states them separately, so
each scores independently.

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `ot_rate_weekday` | Weekday daily-OT rate | `tiered-rate` | `C` | *hora extra* on ordinary weekdays; the tiered case (+70% first 2h / +100% after) lives in the value. |
| `ot_rate_saturday` | Saturday worked rate | `tiered-rate` | `C` | Day-group "Saturday". |
| `ot_rate_sunday` | Sunday worked rate | `tiered-rate` | `C` | Day-group "Sunday". |
| `ot_rate_holiday` | Holiday worked rate | `tiered-rate` | `C` | Day-group "Holidays". |
| `ot_rate_sunday_holiday` | Sunday & holiday worked rate (combined) | `tiered-rate` | `C` | The "Sunday & Holidays" day-group — the *dobra* +100% case when a CBA states them together. |
| `ot_rate_rest_day` | Rest-day / DSR worked rate | `tiered-rate` | `C` | Day-group "DSR & Rest days". |
| `ot_rate_daynight_split` | Day/night split on a rate row | `toggle` + two rates | `C` | Splits any rate row into a Day rate and a Night rate at the night boundary (§4). |
| `ot_rate_limit_chain` | Rate tier limit (switch rate after N hours) | `hours → rate` | `C` | The tiering mechanism itself (50% for first 2h, then 60%); the `tiered-rate` values above are built from it. |
| `ot_overall_limit` | Overall extra-hours cap (per period) | `hours / period` | `C` | Cap on total OT over a period (e.g. 40h/month); independent of per-row chaining. |

> **Sub-question for review:** the daily *tier* (+70% first 2h vs +100% after) currently lives inside a
> single day-group value (`tiered-rate`). If you want tiers scored independently too, we'd split e.g.
> `ot_rate_weekday` → `ot_rate_weekday_t1` / `_t2`. My default: keep tiers in the value unless you say
> otherwise — day-group granularity is the main win.

### A · Paid Overtime — banked hours (*banco de horas*)

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `bank_active` | Activate banked hours | `toggle` | `C` | Off → OT pays as cash (EH). On → OT can accrue as a time-credit (BH). |
| `bank_cycle_duration` | Bank cycle duration | `count` (1–18 months) | `C` | Compensation window length. |
| `bank_reset_cyclical` | Reset hours bank cyclically | `toggle` | `C` | Carry balances across cycles vs single reset. |
| `bank_cycles_before_reset` | Cycles before reset | `count` | `C` | Past cycles retained before the oldest expires. |
| `bank_missing_days` | Missing-day disposition | `enum {reduce+set, set-only, reduce-only}` | `C` | What a missing day does to the balance. |
| `bank_positive_expiry` | Positive-balance disposition at cycle close | `enum {keep-expired, →EH×mult, →EH-original}` | `C` | Disposition of a positive bank at expiry. |
| `bank_negative_expiry` | Negative-balance disposition at cycle close | `enum {keep-expired, →missing-hours}` | `C` | Disposition of a negative bank at expiry. |
| `bank_eh_split` | BH↔EH split (per rate) | `percentage` | `C` | What portion of a rate's OT banks vs cashes. |
| `bank_limit` | Hours-bank cap (per period) | `hours / period` | `C` | Caps the bank; over-limit converts to EH. |

### A · Paid Overtime — cross-shift interval (*interjornada*)

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `interjornada_min_rest` | Minimum inter-shift rest interval | `duration` | `C` `?` | *interjornada*; 660 min = 11h. Below it the next shift is reshaped/flagged. Confirmed in the API payload; UI tab not identified in 2026 screens. |

### B · Hours Distribution — night (*adicional noturno*)

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `night_active` | Activate night shift | `toggle` | `C` | Enables the night premium band. |
| `night_window` | Night window (start / end) | `time-window` | `C` | e.g. 22:00–05:00. |
| `night_premium_pct` | Night premium % | `percentage` | `C` | *adicional noturno* on in-window worked hours. |
| `night_extend_full_range` | Shift starting in the night window paid entirely as night | `toggle` | `C` | *prorrogação* (Sum. 60 II). Brazil confirmed. |
| `night_add_nonworking_breaks` | Add non-working breaks to night duration | `toggle` | `BR?` | Adds non-working break time to night-shift duration for the premium. |
| `night_reduced_hour` | Night reduced hour (duration compression) | `toggle` / `duration` | `BR?` | *hora noturna reduzida* — a night hour pays 60′ though ~52′30″ elapse. Compresses worked-time duration before OT onset. |

### B · Hours Distribution — DSR

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `dsr_missing_minutes_discount` | DSR missing-minutes discount | `duration` limit + `toggle` | `BR` | Dock DSR when worked minutes fall short, up to a limit (e.g. 30 min). Confirmed in the API payload. |

### C · Tolerance (*tolerância / minutos residuais*)

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `tolerance_active` | Tolerance on/off | `toggle` | `C` | |
| `tolerance_limit` | Tolerance limit | `duration` | `C` | Deviation forgiven before it becomes missing/OT; all-or-nothing above the limit. |
| `tolerance_period` | Tolerance period | `enum {per-punch, per-day}` | `C` | Per-day allows end-of-day netting. |
| `tolerance_include_breaks` | Consider the break registers too | `toggle` | `C` | Extends tolerance scope to break punches. |
| `tolerance_early_late` | Consider early entry & late exit too | `toggle` | `C` | Extends scope beyond late-in / early-out. (Newer than the 2024 API sample.) |

### D · On Call (*sobreaviso / prontidão*)

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `oncall_compensation` | On-call compensation | `enum {none, follow-pay-policies}` | `C` | Availability and activation are paid separately. |

### E · Breaks & rest (*intervalo intrajornada*)

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `break_intrajornada` | Intrajornada / meal-break rule | *(fields pending)* | `C` | **Supported per the 2026-07-23 owner correction** ("Break rules are configurable, not merely a Reconcile-time measurement") — but the exact controls are **not yet elaborated in `pay-policy-configuration.md`**. Placeholder key; value shape to be defined once Assaf specs the fields. Covers netting, reduce-to-30′, 15′ *lanche*. |

### F · Special Rules

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `bonus_hours` | Bonus hours (per working day) | `toggle` + `hours` | `C` `?` | Grant a set number of hours per working day; daily amount set on the employee profile. No dedicated calc mechanic (finding #24). |

### G · Schedule / scale

Recurring shift patterns. **Confirmed current (`adjust`) per Assaf** — the engine's schedule layer can
express these; they likely live at the schedule level of the binding stack (below the pay policy), not
inside a pay-policy tab, but they are engine-expressible so a clause mapping here is an `adjust`.

| key | Field | Value shape | Tag | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `schedule_12x36` | Escala 12×36 | `toggle` / pattern | `C` | 12h worked / 36h rest alternating scale. |
| `schedule_semana_espanhola` | Semana espanhola | `toggle` / pattern | `C` | Alternating 44h/48h weeks (Saturday-suppression pattern). |
| `schedule_scale_other` | Other fixed shift scale | free pattern | `C` | Any other recurring scale a CBA defines (e.g. 4×2, 6×1). |

---

## Section 2 — Target / not-yet-configurable (`T`) — the `gap` vocabulary

These calc types **appear in labor agreements** and §10 of `pay-policy-configuration.md` lists them as
**not configurable in the UI today**. A clause mapping here is a candidate **gap** (no engine home) —
distinct from an `adjust` (a home exists but is unset). We still capture the clause's `value`; the
"gap" call is only about the missing home.

> **⚠ This list is a claim to verify, not settled.** Every row below is "no home *per §10*" — but §10
> is a snapshot, and you've already flipped schedule scales `T`→`C`. **Please confirm each row**: does
> the engine actually have a home today? Any you confirm as supported move up to Section 1 as `adjust`.

| key | Field | Value shape | Engine home? | Notes |
| :-- | :-- | :-- | :-- | :-- |
| `premium_composition_mode` | Premium composition mode | `enum {additive, multiplicative, winner-take-all}` | none per §10 — confirm? | for stacked premiums. |
| `rate_base_composition` | Rate-base composition | list of additions | none per §10 — confirm? | which habitual additions fold into the OT base rate. |
| `sleep_time` | Sleep time / two working-hour types | `duration` / `toggle` | none per §10 — confirm? | paid-but-not-OT-counting hours. |
| `spread_of_hours` | Spread-of-hours premium | `percentage` + threshold | none per §10 — confirm? | premium when first-in→last-out spread exceeds a threshold (e.g. NY > 10h). |
| `consecutive_days` | Consecutive-working-days rule | rule spec | none per §10 — confirm? | earned day-off / all-OT after N days. Covers *N-consecutive-Sundays folga* / rest-day rotation. |
| `min_guaranteed_hours` | Minimum guaranteed hours | `hours` | none per §10 — confirm? | reporting / call-in pay floor. |
| `split_shift_premium` | Split-shift premium | `percentage` | none per §10 — confirm? | premium for a split shift. |
| `holiday_comp_model` | Holiday-compensation model + reference-period averaging | rule spec | none per §10 — confirm? | worked-holiday matrix / premium-or-substitute-day; trailing-window averaging. |
| `meal_break_premium` | Meal-break obligation premium | `percentage` | none per §10 — confirm? | premium if a required meal break isn't provided. |
| `ot_averaging` | OT averaging / reference period | window spec | none per §10 — confirm? | annualised-hours schemes. |
| `unused_break_disposition` | Unused / incomplete break disposition | `enum {no-comp, →EH, →EH-separate, follow-policy}` | none per §10 — confirm? | the `unusedBreak` mechanic. |

---

## Section 3 — Excluded (not a clause-mapping target)

Deliberately left out of the vocabulary, with the reason. Surfaced so you can pull any back in.

| Setting | Why excluded |
| :-- | :-- |
| Policy name · Status · Default flag · Start date · External ID · Entity scope | Admin / identity / binding — not driven by a labor-agreement clause. |
| BH limit alert · EH defined limit · OT-start alert | Supervisor notifications — alert-only, no calc effect. |
| Hide banked-hours summary from the app | Visibility only, no calc effect. |
| Hours-distribution labeling rules (§4.2) | Reporting/monitoring buckets — labels worked time, doesn't drive an hours/pay outcome. *(Reconsider if a CBA ever mandates a specific report bucket.)* |
| DSR report labeling / hours-accounting | Reporting flags (`showDsrInReports`, `countDsrInHours`), not a pay calc. |
| Employee assignment (§8) | The binding itself, not a rule value. |
| Exceptions (§9) | A date-range employee override mechanism, not a pay-policy field a clause sets. |

---

## Resolved (this pass)

- **Schedule scales** → **current (`adjust`)**, moved to Section 1 group G (`schedule_12x36`,
  `schedule_semana_espanhola`, `schedule_scale_other`).
- **OT rate granularity** → **split by day-group** (`ot_rate_weekday` / `_saturday` / `_sunday` /
  `_holiday` / `_sunday_holiday` / `_rest_day`), each scored independently.
- **Value vs engine-home** → made two independent axes; the `value` is always captured, `C`/`T` only
  says whether a config home exists. Target fields now carry value shapes.

## Still open — need your input

1. **Break fields (`break_intrajornada`) — the main blocker.** The product's break-config surface
   isn't documented anywhere I can reach (the config doc punts: "Assaf to elaborate"). **Can you give
   me the actual fields** (e.g. min intrajornada duration, reduce-to-30 allowed, break premium if not
   granted)? Until then it stays a single placeholder — I won't invent fields.
2. **Verify the Section 2 target list.** Each row is "no engine home *per §10*" — a claim to confirm,
   since schedule scales already flipped. Which of those 11 are actually supported today?
3. **OT rate tiers — split further?** The daily tier (+70% first 2h vs +100% after) currently lives
   inside a day-group's `tiered-rate` value. Split into `_t1`/`_t2` keys, or keep in the value? (My
   default: keep in the value.)
