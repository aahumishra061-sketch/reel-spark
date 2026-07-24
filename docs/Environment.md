# Reel Spark — Environment Reference

**Version:** v1.1 · **Date:** Day 4 (updated) · **Status:** Complete

> **Day 4 Update:** Netlify's free plan hit a known "operational credits" bug (confirmed on Netlify's own support forum, affecting many free-tier users the same week) that paused production deploys despite a full credit balance. To keep the project moving reliably, hosting was migrated to **GitHub Pages**. All references to Netlify below are superseded — GitHub Pages is now the project's live hosting.

---

## 1. Accounts & Services

| Service | Account Identifier | Purpose | Plan |
|---|---|---|---|
| GitHub | `aahumishra061-sketch` | Source control + live hosting (GitHub Pages) | Free |
| ~~Netlify~~ | *(discontinued Day 4)* | *(previously hosting — replaced due to a platform bug)* | Free tier |
| Anthropic Console | (personal account) | Issues the API key used for AI analysis | Pay-per-use |

---

## 2. Live Site

| | |
|---|---|
| **Production URL** | https://aahumishra061-sketch.github.io/reel-spark/ |
| **Deploys from** | GitHub repo `reel-spark`, branch `main`, root folder |
| **Deploy trigger** | Any commit pushed to `main` (automatic, via GitHub Pages) |
| **Build command** | None (static site, no build step) |
| **Enabled via** | Repository → Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / `(root)` |

---

## 3. Repository

| | |
|---|---|
| **URL** | github.com/aahumishra061-sketch/reel-spark |
| **Visibility** | Public |
| **Default branch** | `main` (only branch) |
| **Editing method** | GitHub mobile app / github.com in-browser file editor; occasional laptop access used for account-linking steps only |

---

## 4. Anthropic Claude API (used starting Day 6)

| Setting | Value |
|---|---|
| Endpoint | `https://api.anthropic.com/v1/messages` |
| Model | `claude-sonnet-4-6` |
| Max tokens per call | 1000 |
| Calls per analysis | 1 (single consolidated prompt — see `API.md`) |
| API key storage (v1.0) | Directly in `script.js`, client-side — a known, documented limitation (see `API.md` §5) |

**Status as of end of Day 4:** API key not yet generated/inserted. Happens on Day 6.

---

## 5. No Traditional Environment Variables

No `.env` file, no `process.env` — this remains a plain static site with no backend, per the PRD.

## 6. Local Development Tools

**None.** Entirely mobile-first, per the Day 2 discovery. All file editing happens via GitHub's own editor (mobile app or browser).
