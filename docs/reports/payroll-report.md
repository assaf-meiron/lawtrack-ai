# Payroll Report (`Detailed Report`)

> **On-demand** — faithful rendering of the day.io **Payroll** report. **Daily**, **one row per day**,
> a single employee (the finest grain — the daily record before rollup). Column meanings:
> [`reports-knowledge.md`](reports-knowledge.md). Source: [`payroll-report.xlsx`](payroll-report.xlsx).

- **Internal title:** `Detailed Report` (the user calls it "Payroll Report")
- **Grain:** one day · **Scope:** one employee
- **Employee:** Assaf Meiron · CPF 305750382 · Position: Manager · Department: Product
- **Period:** 01/06/2026 – 30/06/2026 (final row = month totals)
- **Columns (36):** Date · Schedule · Business Rules Group · Entry 1 · Break Start 1 · Break End 1 ·
  Exit 1 · Planned hours · Worked Hours · Break Hours · Night Shift 20% · Late Entry Hours · Early Leave
  Hours · EH 50% MON-FRI · EH 100% SUN, SAT, HOL · Extra hours · HB 50% MON-FRI · HB 100% SUN, SAT, HOL ·
  UB 50% MON-FRI · UB 100% SUN, SAT, HOL · Hours Bank · Missing Hours · Cumulative Hours Bank · Projected
  Expired Minutes · Projected Expiration Date · Cross Shifts Interval Diff Hours · Holiday · OBS · On Call
  Hours · On Call Activated Hours · On Call Reducing Activated Hours · Debit Hours · Unused Break Hours ·
  Adjustments · Reason · unlimited

This is the only report carrying **punch columns** (Entry/Break/Exit) and per-day **OBS** flags
(`Missed Day` in the sample). It makes the EH / HB / UB rate buckets **explicit** (unlike the Summary,
which leaves two of them unlabeled).

## Sample data (Assaf Meiron, June 2026)

The month has no worked time — every planned day is flagged `Missed Day`, so `Worked Hours = 00:00` and
`Missing Hours` mirrors the planned shortfall. Sundays plan `08:40` (DSR); Fri/Sat plan `00:00`.

<div style="overflow-x:auto">

|Date|Schedule|Business Rules Group|Entry 1|Break Start 1|Break End 1|Exit 1|Planned hours|Worked Hours|Break Hours|Night Shift 20%|Late Entry Hours|Early Leave Hours|EH 50% MON-FRI|EH 100% SUN, SAT, HOL|Extra hours|HB 50% MON-FRI|HB 100% SUN, SAT, HOL|UB 50% MON-FRI|UB 100% SUN, SAT, HOL|Hours Bank|Missing Hours|Cumulative Hours Bank|Projected Expired Minutes|Projected Expiration Date|Cross Shifts Interval Diff Hours|Holiday|OBS|On Call Hours|On Call Activated Hours|On Call Reducing Activated Hours|Debit Hours|Unused Break Hours|Adjustments|Reason|unlimited|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|Mon 01/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Tue 02/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|08:00|09:00|00:00||00:00|00:00|09:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Wed 03/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Thu 04/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Fri 05/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sat 06/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sun 07/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:40|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:40|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Mon 08/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Tue 09/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Wed 10/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Thu 11/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Fri 12/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sat 13/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sun 14/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:40|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:40|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Mon 15/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Tue 16/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Wed 17/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Thu 18/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Fri 19/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sat 20/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sun 21/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:40|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:40|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Mon 22/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Tue 23/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Wed 24/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Thu 25/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Fri 26/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sat 27/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|00:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|
|Sun 28/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|08:40|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-08:40|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Mon 29/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|Tue 30/06|Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|-|-|-|-|09:00|00:00||00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|-09:00|00:00|00:00||00:00||Missed Day|00:00|00:00|00:00|00:00|00:00|||00:00|
|**Totals**|||||||192:40|00:00||00:00|00:00|09:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00||-192:40||00:00||00:00|||00:00|00:00|00:00|00:00|00:00|||00:00|

</div>

> **Note the totals row:** `Missing Hours` totals **-192:40** here, whereas the Summary report's
> `Total Missed hours` for Assaf reads **-96:20** — a distinct metric (see the open note in
> `reports-knowledge.md`). The lone non-zero deviation is `Early Leave Hours 09:00` on Tue 02/06 (which
> has an `Exit 1` punch of `08:00` but no entry).
