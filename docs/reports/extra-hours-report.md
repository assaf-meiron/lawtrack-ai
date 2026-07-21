# Extra Hours Report (`Extra Hours All`)

> **On-demand** — faithful rendering of the day.io **Extra Hours** report. A per-employee, whole-group
> **slice of the Summary** focused on overtime/extra-hours, unused-break, debit and on-call buckets.
> Column meanings: [`reports-knowledge.md`](reports-knowledge.md). Source:
> [`extra-hours-report.xlsx`](extra-hours-report.xlsx).

- **Internal title:** `Extra Hours All`
- **Grain:** one employee · **Scope:** whole group (`Meiron Family`) · final row = group totals
- **Period:** 01/06/2026 – 30/06/2026
- **Columns (11):** Name · 50% MON-FRI · 100% SUN, SAT, HOL · UB 50% MON-FRI · UB 100% SUN, SAT, HOL ·
  Total Worked Hours · Missing Hours · Total extra hours · Total Debit Hours · Total On Call Hours ·
  Total On Call Activated Hours

Shares its first six columns with the Hours Bank report; the two diverge in the tail (this one carries
extra-hours / debit / on-call; Hours Bank carries the bank balance + expiry).

## Sample data (Meiron Family, June 2026)

<div style="overflow-x:auto">

|Name|50% MON-FRI|100% SUN, SAT, HOL|UB 50% MON-FRI|UB 100% SUN, SAT, HOL|Total Worked Hours|Missing Hours|Total extra hours|Total Debit Hours|Total On Call Hours|Total On Call Activated Hours|
|---|---|---|---|---|---|---|---|---|---|---|
|Aviv N.|00:00|00:00|00:00|00:00|00:00|-144:00|00:00|00:00|00:00|00:00|
|Assaf Meiron|00:00|00:00|00:00|00:00|00:00|-192:40|00:00|00:00|00:00|00:00|
|Elon Musk|00:00|00:00|00:00|00:00|00:00|-99:00|00:00|00:00|00:00|00:00|
|Josh Williams|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|
|Tehila M|00:00|00:00|00:00|00:00|00:00|-96:20|00:00|00:00|00:00|00:00|
|Zani Meiron|00:00|00:00|00:00|00:00|00:00|-72:00|00:00|00:00|00:00|00:00|
|Aviv N.|00:00|00:00|00:00|00:00|00:00|-96:00|00:00|00:00|00:00|00:00|
|**Group total**|||||00:00|-700:00|||||

</div>

> No worked time in the sample month → every bucket is `00:00` and the report is all `Missing Hours`.
> `Total extra hours 00:00` group-wide because nobody worked past plan.
