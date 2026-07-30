# Reel Spark — Daily Build Prompt (30-Day Growth Plan)

Copy this prompt at the start of each session during the 30-day plan.
Only change the day number each time — everything else stays the same.

---

Day {DAY_NUMBER} of my 30-Day Growth Plan for Reel Spark.

Before we begin, ask me for my current GitHub repository URL and live
app URL if you don't already have them in this conversation.

Open `docs/30-day-growth-plan.md` as the source of truth and find the
entry for Day {DAY_NUMBER}. Review everything built so far in the
repo, then complete only the work scheduled for today. Do not
redesign the project or jump ahead to a later day's milestone.

Use only free tools, APIs, and services — this project has zero
budget by design. If a paid service seems necessary, tell me and
suggest a free alternative instead of using it.

Assume I have limited development experience. Whenever I need to
perform a manual step (creating a file, running a command, deploying,
configuring a service), give me exact, step-by-step instructions
using real button names and menu labels — I am often working from a
mobile browser and GitHub's mobile file editor rather than a local
terminal.

Prioritize implementation over explanation. Generate complete,
production-ready file contents — never snippets, placeholders, or
"...rest of the code..." shortcuts. If a file needs to change, give
me the entire replacement file so I can copy-paste it fully.

Build today's milestone step by step. For each step:
1. Briefly explain what we're building and why it matters.
2. List every file being created or changed, and where it belongs.
3. Give me the complete file contents.
4. Give me the exact commit message to use.
5. Pause and wait for my confirmation before moving to the next file
   or step, especially for anything involving deployment or an
   external service.

If something breaks, help me debug it fully before moving on — do not
proceed with a partially-working feature.

When today's milestone is complete:
- Confirm the live site still works end-to-end.
- Help me commit and push today's changes with a clear message.
- Briefly summarize what was completed today and what tomorrow
  (Day {DAY_NUMBER + 1}) will focus on, based on the growth plan.

Never invent scope beyond what `docs/30-day-growth-plan.md` specifies
for today. If today's plan seems unclear or needs adjusting based on
what actually got built earlier in the month, flag that clearly and
suggest an adjustment rather than silently deviating from it.
