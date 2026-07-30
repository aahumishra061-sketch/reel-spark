# Reel Spark — 30-Day Growth Plan

One achievable milestone per day, each building on the previous day's
work. Use `docs/daily-build-prompt.md` each day, replacing the day
number.

**Week 1 — Reliability & Safety**
- Day 1: Add a per-IP request counter to the Cloudflare Worker using
  Cloudflare KV (free tier), returning a friendly "please try again
  later" response past a daily limit.
- Day 2: Add a minimal test file (`tests/parsing.test.js` or similar,
  runnable in-browser or via a simple script) covering PDF and DOCX
  text extraction with sample files.
- Day 3: Add a similar test covering the Gemini response JSON parsing
  logic, including a malformed-response case.
- Day 4: Add input length validation with a clear inline message if a
  resume is extremely short (e.g. under 100 words) before sending it
  to the AI.
- Day 5: Review and tighten the Gemini prompt for consistency —
  run 5 varied resumes through it and check the tone/quality stays
  reliable.
- Day 6: Add a lightweight analytics-free "last analyzed" success
  counter stored in Worker KV, just to understand real usage (no
  personal data, just a count).
- Day 7: Write up findings from the week and adjust the plan if a
  bigger issue emerged.

**Week 2 — PDF Export Feature**
- Day 8: Research and add the `jsPDF` library via CDN; render a blank
  test PDF to confirm it works in the deployed environment.
- Day 9: Build a "Download Report" button that exports the Score tab
  content to PDF.
- Day 10: Extend the PDF export to include Suggestions.
- Day 11: Extend the PDF export to include Consistency Check.
- Day 12: Extend the PDF export to include Rewritten Content.
- Day 13: Style the PDF output (headings, spacing, Reel Spark
  branding) so it looks professional, not like a raw text dump.
- Day 14: Full regression test of the PDF export across 3 different
  resume analyses; fix any layout bugs found.

**Week 3 — Optional Local History**
- Day 15: Design the `localStorage` schema for saving past analyses
  (max 5, no account required).
- Day 16: Implement saving each completed analysis automatically to
  `localStorage`.
- Day 17: Build a "Past Analyses" panel showing saved results.
- Day 18: Add a "Clear History" button with a confirmation step.
- Day 19: Add a way to re-open a past analysis without re-running the
  AI call.
- Day 20: Handle edge cases — storage quota limits, corrupted saved
  data, private/incognito browsing.
- Day 21: Full regression test of the history feature; update the
  README to mention it as an optional, local-only feature.

**Week 4 — Multi-Resume Comparison & Polish**
- Day 22: Design the UI for comparing two resume analyses side by
  side (reuse the existing score-block/tab patterns).
- Day 23: Allow a second resume upload in a "Compare" mode.
- Day 24: Extend the Gemini prompt to also return a short comparative
  note when two resumes are being analyzed.
- Day 25: Build the comparison results view.
- Day 26: Add support for plain `.txt` paste-in as an alternative to
  file upload.
- Day 27: Full accessibility re-check on all new UI added this month
  (keyboard nav, ARIA labels, focus management).
- Day 28: Full regression test across all features, old and new.
- Day 29: Update README, screenshots, and the live demo script to
  reflect the new feature set.
- Day 30: Tag and publish a `v1.1.0` GitHub release summarizing the
  month's additions.
