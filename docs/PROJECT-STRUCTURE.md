# Reel Spark — Project Structure

**Version:** v1.0 · **Date:** Day 2 · **Status:** Approved

---

## 1. Full Folder Structure

```
reel-spark/                        ← GitHub repository root
├── index.html                     ← Main (and only) HTML page — created Day 3
├── style.css                      ← All styling — created Day 3, built out Day 4-9
├── script.js                      ← All application logic — created Day 3, built out Day 4-8
├── README.md                      ← Project description, live link, screenshots, API key note
│
├── /docs                          ← Design & planning documents (this folder)
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   └── PROJECT-STRUCTURE.md
│
├── /assets                        ← Static assets (created Day 9, optional)
│   ├── favicon.ico
│   └── logo.png
│
└── .gitignore                     ← Already created by GitHub (Node template)
```

---

## 2. What Each Part Is Responsible For

| Path | Responsibility |
|---|---|
| `index.html` | Structure only: upload box, LinkedIn inputs, tab shells, button. No logic lives here — just markup and `<script>`/`<link>` tags pointing to `script.js` and `style.css`. |
| `style.css` | All visual design: colors, spacing, typography, tab styling, responsiveness (media queries added Day 9). |
| `script.js` | Everything that "thinks": file parsing (pdf.js/mammoth.js calls), building the AI prompt, calling the Claude API, parsing the response, switching tabs, validation, copy-to-clipboard. |
| `README.md` | The public-facing project summary — what a recruiter or visitor sees first on GitHub. Includes the live Netlify link, feature list, tech stack, screenshots, and the API key transparency note (per `API.md` §5). |
| `/docs` | All planning artifacts from Day 1–2 (PRD lives separately as a Word doc; these five are the living technical references used during implementation Days 3–10). |
| `/assets` | Any images/icons — only the favicon and optional logo, added during Day 9 polish. Kept minimal since this is a lightweight app, not asset-heavy. |

---

## 3. Where Future Code Will Live

Per the Implementation Blueprint, here's exactly which file each future day touches:

| Day | File(s) touched |
|---|---|
| Day 3 | `index.html`, `style.css`, `script.js` (skeleton/placeholder versions created) |
| Day 4 | `index.html` (upload section), `script.js` (parsing functions), `style.css` (upload box styling) |
| Day 5 | `index.html` (LinkedIn inputs + tab structure), `script.js` (tab switching), `style.css` (input/tab styling) |
| Day 6 | `script.js` (Claude API call, prompt builder, JSON parsing), `README.md` (API key note) |
| Day 7 | `script.js` (extended prompt + consistency tab logic), `style.css` (match/mismatch styling) |
| Day 8 | `script.js` (rewritten content logic + clipboard), `style.css` (before/after layout) |
| Day 9 | `style.css` (full polish pass), `script.js` (validation, loading messages), `index.html` (favicon, labels), `/assets` (optional logo) |
| Day 10 | `README.md` (final polish), targeted bugfixes across all three core files |

No new top-level folders are expected after Day 2 — this structure is final for v1.0.

---

## 4. Why This Structure

- **Flat and simple:** three core files at the root (`index.html`, `style.css`, `script.js`) — easy to find and edit via GitHub's mobile app/web editor, no nested build folders to navigate.
- **No `/src`, `/build`, `/dist` folders:** those exist for projects with a build step (webpack, bundlers). Reel Spark has none — what you edit is exactly what Netlify serves.
- **`/docs` separated from app code:** keeps planning documents easy to find for anyone reviewing the repo (including a future AI conversation continuing the build) without cluttering the root.
- **`/assets` kept minimal and optional:** avoids overengineering a folder for images the app barely uses.
- **Matches Ashu's proven pattern:** simple, self-contained, no-framework structure consistent with past ABTalks challenge projects — just split into 3 linked files instead of 1, since this project will be edited across many days and benefits from separation of concerns (structure vs. style vs. logic).
- 
