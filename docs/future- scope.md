# Reel Spark — Future Scope

## 3 Months: Strengthen the core product
- **Downloadable PDF report** of the full analysis (score, suggestions,
  consistency, rewritten content) using a client-side library like
  `jsPDF` — keeps the app fully static, no backend needed.
- **Rate limiting on the Cloudflare Worker** (using Cloudflare KV, still
  free-tier) to protect the shared Gemini quota from being exhausted
  if the live link gets shared widely.
- **Basic automated tests** for the two highest-risk functions:
  `handleFile()` (PDF/DOCX parsing) and the JSON-parsing logic inside
  `callGeminiAPI()`, since these are where silent breakage is most
  likely and hardest to notice manually.
- **Multi-resume comparison** — let a user analyze two resume drafts
  side by side to see which version scores better.

## 6 Months: Add persistence without breaking the "no login" promise
- **Optional, anonymous local history** using `localStorage` — a user
  can see their last 3-5 analyses on the same device/browser, with no
  account required, preserving the zero-friction v1.0 experience for
  anyone who doesn't want it.
- **Resume template suggestions** — after scoring, offer 2-3 concrete
  before/after resume bullet rewrites (not just LinkedIn content),
  extending the AI prompt to cover resume-specific rewriting.
- **Shareable results link** — generate a short-lived, anonymized
  results summary link a user could send to a mentor for feedback,
  without storing personal resume content server-side.
- **Support for more file types** — plain `.txt` paste-in as an
  alternative to file upload, for users without a formatted resume yet.

## 12 Months: Consider whether this becomes a real product
- **User accounts (opt-in only)**, to track resume/LinkedIn improvement
  over time across multiple job search cycles — this is the point
  where a lightweight backend (e.g. Supabase free tier) would first
  become justified.
- **Industry-specific prompt tuning** — different scoring rubrics for
  tech, business, and creative roles, since a generic prompt treats
  all resumes the same way today.
- **A/B test the AI prompt itself** against real user outcomes (did
  the suggested rewrite actually help someone get more interview
  callbacks?) — the kind of validation that would justify further
  investment.
- **Revisit hosting/architecture** only if traffic genuinely requires
  it — GitHub Pages + a Cloudflare Worker has scaled fine for a
  demo/portfolio project and shouldn't be changed without a concrete
  reason.
