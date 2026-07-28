# Reel Spark

**AI-powered Resume + LinkedIn Optimization Tool for Freshers**

Reel Spark helps freshers and early-career job seekers understand how strong their resume and LinkedIn profile really are — and how well they align with each other. Upload a resume, paste your LinkedIn Headline and About section, and get real AI-generated scoring, suggestions, a consistency check, and rewritten content in seconds.

**🔗 Live app:** https://aahumishra061-sketch.github.io/reel-spark/

---

## Features

- **Resume upload** — drag-and-drop or tap-to-browse, supports PDF and DOCX (up to 5MB)
- **AI-powered analysis** using Google Gemini, covering:
  - **Resume Score** and **LinkedIn Score** (out of 100) with plain-English reasoning
  - **Improvement suggestions** tailored to the uploaded resume
  - **Consistency check** — what matches well between the resume and LinkedIn, and what's missing or mismatched
  - **Rewritten content** — an AI-suggested LinkedIn headline and About section, with one-tap copy to clipboard
- **Fully client-side** — no login, no signup, no database. Nothing you upload is stored anywhere.
- **Accessible** — full keyboard navigation on the results tabs, proper ARIA labeling, and respects reduced-motion preferences
- **Responsive** — works cleanly on mobile, tablet, and desktop screens

## Tech Stack

- **Frontend:** HTML, CSS, vanilla JavaScript — no frameworks, no build step
- **File parsing:** [pdf.js](https://mozilla.github.io/pdf.js/) (PDF) and [mammoth.js](https://github.com/mwilliamson/mammoth.js) (DOCX), both loaded via CDN
- **AI:** Google Gemini API (`gemini-3.6-flash`), called through a Cloudflare Worker proxy so the API key is never exposed in the browser
- **Hosting:** GitHub Pages (static site, auto-deploys on every commit to `main`)
- **Backend (minimal):** a single Cloudflare Worker (`reel-spark-proxy`) that forwards the AI request and injects the API key server-side from an encrypted secret

## How it works

1. You upload a resume and paste your LinkedIn Headline and About section — nothing leaves your browser until you click "Analyze."
2. Your browser sends the resume text and LinkedIn text to a small Cloudflare Worker.
3. The Worker attaches a securely-stored API key and forwards the request to Google's Gemini API.
4. Gemini returns a structured analysis, which is displayed across four tabs: Score, Suggestions, Consistency, and Rewritten.

This design keeps the entire app free to run and free to host, while keeping the AI API key out of the public source code.

## Known limitations (honest notes)

- This is a demo/portfolio project, not a production SaaS product — there's no rate limiting on the Cloudflare Worker, so heavy traffic could exhaust the free Gemini quota for the day.
- Scanned/image-only PDFs will extract no text (this is a known `pdf.js` limitation, not a bug) — the app will show a friendly error in that case.
- Only `.docx` is supported for Word files; the older `.doc` format is not.
- Analysis quality depends on Gemini's response — like any AI tool, treat suggestions as a helpful starting point, not gospel.

## Project structure
reel-spark/
├── index.html       — app markup
├── style.css         — all styling, responsive rules, accessibility
├── script.js         — file parsing, AI integration, UI logic
├── favicon.svg       — browser tab icon
├── docs/             — planning docs, daily build logs, architecture notes
└── README.md         — this file

## Credits

Built by Astha Mishra (Ashu) as part of the **AB Talks 60-Day Claude AI Challenge**, using [Claude](https://claude.ai) as an AI coding assistant throughout the entire build process — from planning to deployment.

---

*Built entirely from a mobile phone, no laptop required for most of the build.*
