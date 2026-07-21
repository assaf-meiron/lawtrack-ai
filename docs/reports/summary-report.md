# Summary Report (`Summary All`)

> **On-demand** — faithful rendering of the day.io **Summary** report. Monthly roll-up, **one row per
> employee**, whole group. Column meanings: [`reports-knowledge.md`](reports-knowledge.md). Source:
> [`summary-report.xlsx`](summary-report.xlsx).

- **Internal title:** `Summary All`
- **Grain:** one employee · **Scope:** whole group (`Meiron Family`, 7 rows)
- **Period:** 01/06/2026 – 30/06/2026
- **Columns (33):** Name · ID · Matricula · PIS · Schedule Name · Business Rules Group · Supervisor ·
  Position · Department · Cost Center · Worked days · Absense days · Night Shift 20% · **50% MON-FRI** ·
  **100% SUN, SAT, HOL** · **50% MON-FRI** · **100% SUN, SAT, HOL** · Planned hours · Worked Hours ·
  Total cross shifts interval diff hours · Total early leave hours · Total early leaves · Early leaves
  without breaks · Total extra hours · Cumulative hours bank hours · Total Projected Expired Minutes ·
  Total Missed hours · Total Break hours · Total On Call Hours · Total On Call Activated Hours · Total On
  Call Reducing Activated Hours · Total Debit Hours · Total Unused Break Hours
  - The two `50% MON-FRI` / `100% SUN, SAT, HOL` pairs are read **EH** (cols 14–15) then **HB** (cols
    16–17) — see the mapping note in `reports-knowledge.md`.

## Sample data (Meiron Family, June 2026)

<div style="overflow-x:auto">

|Name|ID|Matricula|PIS|Schedule Name|Business Rules Group|Supervisor|Position|Department|Cost Center|Worked days|Absense days|Night Shift 20%|EH 50% MON-FRI|EH 100% SUN, SAT, HOL|HB 50% MON-FRI|HB 100% SUN, SAT, HOL|Planned hours|Worked Hours|Total cross shifts interval diff hours|Total early leave hours|Total early leaves|Early leaves without breaks|Total extra hours|Cumulative hours bank hours|Total Projected Expired Minutes|Total Missed hours|Total Break hours|Total On Call Hours|Total On Call Activated Hours|Total On Call Reducing Activated Hours|Total Debit Hours|Total Unused Break Hours|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|Aviv N.|401|||Rotative|CLT Overtime paid||Manager|||0.0|18.0|00:00|00:00|00:00|00:00|00:00|144:00|00:00|00:00|00:00|0.0|0.0|00:00|00:00|00:00|-144:00|00:00|00:00|00:00|00:00|00:00|00:00|
|Assaf Meiron|305750382|||Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid||Manager|Product||0.0|10.0|00:00|00:00|00:00|00:00|00:00|192:40|00:00|00:00|09:00|1.0|1.0|00:00|00:00|00:00|-96:20|00:00|00:00|00:00|00:00|00:00|00:00|
|Elon Musk|0001||170.33234.78-1|Mon.-Fri no breaks|CLT Overtime paid|||Product||0.0|11.0|00:00|00:00|00:00|00:00|00:00|198:00|00:00|00:00|00:00|0.0|0.0|00:00|00:00|00:00|-99:00|00:00|00:00|00:00|00:00|00:00|00:00|
|Josh Williams|12345678987||||CLT Overtime paid||Director||S&M|0.0|0.0|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|0.0|0.0|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|00:00|
|Tehila M||||Mon-Fri \|  9am-6pm \| 24min break|CLT Overtime paid|||||0.0|11.0|00:00|00:00|00:00|00:00|00:00|192:40|00:00|00:00|00:00|0.0|0.0|00:00|00:00|00:00|-96:20|00:00|00:00|00:00|00:00|00:00|00:00|
|Zani Meiron||||Rotative|CLT Overtime paid|||||0.0|9.0|00:00|00:00|00:00|00:00|00:00|144:00|00:00|00:00|00:00|0.0|0.0|00:00|00:00|00:00|-72:00|00:00|00:00|00:00|00:00|00:00|00:00|
|Aviv N.|401|||Rotative|CLT Overtime paid||Manager|||0.0|12.0|00:00|00:00|00:00|00:00|00:00|144:00|00:00|00:00|00:00|0.0|0.0|00:00|00:00|00:00|-96:00|00:00|00:00|00:00|00:00|00:00|00:00|

</div>

> Header labels 14–17 are shown here as `EH …`/`HB …` for clarity; the raw file labels both pairs
> identically (`50% MON-FRI` / `100% SUN, SAT, HOL`).
