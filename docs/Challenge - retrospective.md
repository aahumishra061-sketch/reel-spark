# Reel Spark — Challenge Retrospective

## Timeline: Day 1 → Day 10

**Day 1-2 (Discovery & System Design):** Defined the project from
scratch through structured discovery — landed on an AI resume +
LinkedIn matching tool for freshers. Locked v1.0 scope explicitly
(AI scoring, consistency check, rewritten content, no login) before
any code existed. Finalized the tech stack: vanilla HTML/CSS/JS,
Claude API (the original plan), pdf.js + mammoth.js for parsing,
Netlify + GitHub for hosting. Designed the full system architecture,
data flow, and UI wireframes in writing — zero code by design.

**Day 3 (Foundation):** First real blocker — Netlify's free plan hit a
known operational-credits bug that paused deploys despite a full
credit balance. Migrated hosting to GitHub Pages mid-setup rather than
wait it out, keeping the mobile-only, no-local-machine workflow intact.

**Day 4-5 (Core Build):** Built resume upload with real PDF/DOCX
parsing, then the LinkedIn input fields and a full 4-tab results UI
shell using placeholder data — validating the entire interface before
any AI was wired in.

**Day 6 (Real AI Integration — the biggest pivot):** Discovered
Anthropic's Claude API has no free tier, which conflicted with the
project's zero-cost requirement. Switched the entire AI integration to
Google's Gemini API instead. Then hit a security incident: an API key
committed into `config.js` was auto-revoked by Google's secret
scanning within minutes of being pushed to the public repo. Resolved
it by building a Cloudflare Worker to proxy the AI calls, so the key
lives only in encrypted server-side storage and never touches the
public frontend code. Also had to swap a Gemini model name mid-build
after it was deprecated.

**Day 9 (UI/UX Polish):** Full visual and accessibility pass — spacing
scale, responsive breakpoints, ARIA-compliant keyboard-navigable
tabs, animated score bars, a "Start Over" reset flow. Found and fixed
a CSS bug where all four result tabs displayed simultaneously instead
of only the active one — caused by an unscoped media query.

**Day 10 (Production Hardening & Launch):** Senior-level QA pass:
added input safety truncation, removed dead code (`config.js`),
wrote a complete README, added an MIT license, SEO/social sharing
metadata, and a custom 404 page. Regression-tested three distinct
resume scenarios on the live site before calling it launch-ready.

## Major technical decisions and pivots
1. Claude API → Gemini API (cost/free-tier constraint)
2. Direct client-side API key → Cloudflare Worker proxy (security)
3. Netlify → GitHub Pages (reliability, mid-Day-3 pivot)

## Challenges solved / key debugging moments
- Netlify's credits bug (infrastructure-level, outside our control)
- The exposed API key incident (security, caught by Google automatically)
- A deprecated AI model name breaking live requests
- A CSS specificity bug causing all tabs to render at once
- Multiple mobile-editor mishaps where full-file edits accidentally
  deleted large chunks of `script.js`, requiring full-file
  re-pastes rather than partial patches

## Skills demonstrated
Product scoping and discipline, system design before code, real
third-party API integration, prompt engineering for structured JSON
output, client-side file parsing, serverless proxy architecture for
credential security, accessible UI implementation (ARIA, keyboard
nav), responsive CSS, structured manual QA, and technical
documentation — all executed entirely from a mobile phone.

## Final project summary
Reel Spark is a complete, secure, accessible, and publicly deployed
AI product: upload a resume, paste LinkedIn text, and get a real
AI-generated score, suggestions, consistency check, and rewritten
content — with no login, no stored data, and no cost to run.

## Lessons learned
- Scope decisions made on Day 1 (explicitly listing what's *out* of
  v1.0) saved real time on every later day.
- A public repo needs security discipline from the very first commit,
  not as a Day 9 afterthought — and automated scanning will catch
  mistakes fast, which is a feature, not just a scare.
- When editing files without a local diff tool, replacing the whole
  file is safer and less error-prone than trying to patch a section.
- Infrastructure will occasionally fail for reasons outside your
  control (Netlify's bug) — the skill is recognizing it quickly and
  rerouting, not debugging your own code forever.

## A note from your AI pair programmer
Astha — from the first message where we scoped this out to the last
commit fixing that stray closing brace in `style.css`, this build had
every texture of a real engineering project: a hosting provider that
failed you through no fault of your own, an API you had to swap for
cost reasons, a security incident you handled correctly and calmly,
and a UI bug that only showed up once real screenshots proved it. None
of that is "beginner" work — that's what shipping actually looks like.
You did all of it from a phone, without a local dev environment, which
is genuinely harder than doing it on a laptop, and you didn't cut
corners on security or accessibility to make it easier. Reel Spark is
yours, start to finish. Be proud of it.
