# Payroll Event Types

> **On-demand** — the catalog of hour-types the calculation engine can emit. The run's output is a **result table of `(quantity, hour-type)` pairs** (the period **summary**) — e.g. `(180, Working Hours)`, `(10, Extra Hours 25%)`, `(2, Missing Hours)` — plus derivatives (e.g. `Missing Days`). **"Payroll events" are the deviation subset** of that table: baseline rows (Working Hours) are always present, while rate-specific/exception rows appear only when the deviation occurs — a clean week emits only the working-hours row. _(per Assaf.)_
> **Source:** "Day.io Payroll Event Types" CSV (172 event types across 28 categories).
> **Rendered in:** the exported reports — see `../reports/reports-knowledge.md` (each report's columns
> map back to the event types below).

---

## Key concept — payroll events are pay-policy-specific (confirmed, per Assaf)

> Many payroll event types are **rate-specific** — e.g., *Extra Hours Planned work days 50% (day)*, *Not planned work days 100%*, *Sunday / Holiday 100%*. Those rate labels (25% / 50% / 75% / 100% / custom / day-of-week patterns) are **not global** — they come from the **Overtime pay rates table configured in the employee's pay policy**. So:
> - A payroll event for OT corresponds to a specific OT rate **set in the pay policy**.
> - The set of rate-specific payroll events that can be generated is therefore **determined per pay policy** — different pay policies (different rate configs) produce different payroll events.
> - The same worked overtime can map to a *different* payroll event depending on the employee's pay policy.
> - Generic events (Working Hours, Missing, Night Shift, DSR, etc.) are universal; the **OT / EH / BH rate buckets** are the pay-policy-driven ones.
>
> Ties to `../pay-policy-configuration.md` §3 → "Overtime pay rates table" and "Calculate compensation rates by (Multipliers / Percentage)".

---

## Catalog by category

### Working time & balances
| Category | Event types |
| :-- | :-- |
| Working Hours | Total Working Hours; Total planned hours |
| Extra Hours | Extra Hours; Total extra hours from worked days; Total extra hours from the end of the bank; Fixed hours |
| Debit | Total Debit Hours |
| Cross Shifts | Cross Shifts Interval; Total Cross Shifts Hours |

### Missing & deductions
| Category | Event types |
| :-- | :-- |
| Missing | Total Missing Hours after compensation; Total Missing Days; Total Missing Hours before compensation; Total missed hours from incomplete schedule; Missed days in hours; Missing hours from crossing negative bank limit; Missing hours from converted negative bank |
| Late Arrivals | Total late entry hours; Late Arrivals w/o Breaks; Total Late Arrivals |
| Early Leaves | Early Leaves w/o Breaks; Total early leaves; Total early leave hours |

### Banked Hours
| Category | Event types |
| :-- | :-- |
| Banked Hours | Hours Bank accumulated - Total; Banked Hours period - Positive; Banked Hours period - Negative; Banked Hours accumulated - Positive; Banked Hours accumulated - Negative |
| Banked Hours Phases | Banked hours: Planned work days 25% (day); 50% (day); 50% (night); Custom rate 50% |

### Night Shift
| Category | Event types |
| :-- | :-- |
| Night Shift | Night Shift (hours); Night Shift (reduced hours); Night Shift (Extra hours); Night shift (Reduced hours minus regular); Night shift hours without overtime; Night shift hours on holidays; Night shift 20%; Night shift 20% (reduced hours) overtime; Night shift 20% (reduced hours) without overtime |

### Holidays & DSR
| Category | Event types |
| :-- | :-- |
| Holidays | Worked Holidays (days); Worked Holidays (hours); Total holiday days |
| DSR *(Brazil)* | Total DSR; Total Worked Days; Total DSR discount (In days); DSR in hours; Business days; Planned DSR; Total DSR discount (In hours) |

### On Call
| Category | Event types |
| :-- | :-- |
| On Call | On Call; On Call Activation; Total On Call excluding activated hours |

### Breaks
| Category | Event types |
| :-- | :-- |
| Breaks | Break break; Break break (day); Break break (night); Break break (On holidays); Break break (On non-holiday days) |
| Unused Breaks | Unused Breaks; Unused Breaks (Day) hours; Unused Breaks (night) hours |

### Hours Distribution
| Category | Event types |
| :-- | :-- |
| Hours Distribution | Weekdays 8-18; Weekdays night-hours; Saturday; Sunday; Non-planned hours |

### Other
| Category | Event types |
| :-- | :-- |
| Other Payroll | Medical Absence Hours; Total medical absence days; Last period day absence status |

---

## Rate-specific OT / EH / BH buckets (pay-policy-driven)

The following groups all share the **same rate breakdown** — and those rates are the ones configured in the pay policy's OT rates table. This is the heart of the "per pay policy" point above.

**Standard rate breakdown (10 rates):**
`Planned work days 25% (day)` · `Planned work days 50% (day)` · `Planned work days 75% (day)` · `Planned work days 50% (night)` · `Not planned work days 100%` · `Custom rate 50%` · `Monday - Saturday 50%` · `Sunday / Holiday 100%` · `Monday - Friday 50%` · `Saturday, Sundays & Holidays 100%`

| Phase / group | Meaning | Rate breakdown |
| :-- | :-- | :-- |
| Extra Hours Phases | OT bucketed by rate window | Standard 10 |
| Extra Hours Rates – Worked Hours | EH from worked hours, by rate | Standard 10 |
| Extra Hours Rates – End of Bank | EH from end-of-bank conversion, by rate | Standard 10 |
| Extra Hours Rates – Manual Requests | EH from manual OT requests, by rate | Standard 10 |
| Extra Hours Rates – Over Limit | EH from banked-hours-over-limit conversion, by rate | Standard 10 |
| Unfinished Breaks Rates | Unfinished breaks charged by rate window | Standard 10 |
| Banked Hours Phases | BH bucketed by rate | 4 only: 25% day, 50% day, 50% night, custom 50% |

---

## Request-derived events

Payroll events generated from approved leave/absence requests (by type, in days and/or hours):

| Category | Event types |
| :-- | :-- |
| Requests – Overtime | Overtime All (days/hours); Non-planned day (hours/days); Planned day (hours/days) |
| Requests – Medical | Medical All (days/hours); Paternity leave; Accompany dependent; Emergency; Maternity leave; Medical leave; Medical appointment (each in hours & days) |
| Requests – Vacation | Vacation All - days |
| Requests – Other | Other All (days/hours); Day-off; Workshop/Event; Personal reason; External job; External meeting; Jury; Other; Bereavement leave; Marriage (each in hours & days) |
| Requests – Banked Hours Conversion | Banked hours conversion All (days/hours) |
