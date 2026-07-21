# Hours Bank Report (`Hours Bank All`)

> **On-demand** — faithful rendering of the day.io **Hours Bank** report. A per-employee, whole-group
> **slice of the Summary** focused on the banked-hours balance and its projected expiry. Column
> meanings: [`reports-knowledge.md`](reports-knowledge.md). Source:
> [`hours-bank-report.xlsx`](hours-bank-report.xlsx). Deep logic: [`../flow/cyclical-banked-hours.md`](../flow/cyclical-banked-hours.md).

- **Internal title:** `Hours Bank All`
- **Grain:** one employee · **Scope:** whole group (`Meiron Family`) · final row = group totals
- **Period:** 01/06/2026 – 30/06/2026
- **Columns (9):** Name · 50% MON-FRI · 100% SUN, SAT, HOL · UB 50% MON-FRI · UB 100% SUN, SAT, HOL ·
  Total Worked Hours · Cumulative Hours Bank · Total Projected Expired Minutes · Missing Hours

Shares its first six columns with the Extra Hours report; here the tail is the **bank balance**
(`Cumulative Hours Bank`) and **expiry** (`Total Projected Expired Minutes`) rather than
extra/debit/on-call. The `50%`/`100%` and `UB` columns here represent the **banked** portion at each
rate (vs. paid-out in the Extra Hours report).

## Sample data (Meiron Family, June 2026)

<div style="overflow-x:auto">

|Name|50% MON-FRI|100% SUN, SAT, HOL|UB 50% MON-FRI|UB 100% SUN, SAT, HOL|Total Worked Hours|Cumulative Hours Bank|Total Projected Expired Minutes|Missing Hours|
|---|---|---|---|---|---|---|---|---|
|Aviv N.|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-144:00|
|Assaf Meiron|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-192:40|
|Elon Musk|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-99:00|
|Josh Williams|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|
|Tehila M|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-96:20|
|Zani Meiron|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-72:00|
|Aviv N.|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-96:00|
|**Group total**|||||00:00||00:00|-700:00|

</div>

> No worked time in the sample month → `Cumulative Hours Bank 00:00` and no projected expiry for anyone;
> the only populated column is `Missing Hours`.
