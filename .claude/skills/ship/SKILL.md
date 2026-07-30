⚡ **FAST, 0 THINKING.** Do not read diffs for context, do not summarize changes in prose, do not ask questions. Run the steps below and report the result.
1. **Trunk guard** — `git branch --show-current`; if it's one of the trunk names above, stop and report. Otherwise proceed.
2. **Stage & commit** — `git add -A`, then `git commit -m` with:
   - Message from `args` if provided
   - Else a one-line message generated straight from `git diff --stat --cached` (no deeper reading)
   - If nothing is staged, stop and report "nothing to commit"
3. **Push** — `git push -u origin <branch>` (first push) or `git push` (already upstream). If non-fast-forward, stop and report.
4. **PR** — `gh pr list --head <branch> --state open --json url`:
   - Exists → use that URL
   - Missing → `gh pr create --fill --base <base>` (base from `--base` arg or repo default) `[--draft]` if passed
5. **Report** — branch, commit SHA, PR URL. Done.