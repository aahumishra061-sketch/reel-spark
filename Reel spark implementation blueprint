# Reel Spark — Implementation Blueprint (Day 2 → Day 10)

**Project:** Reel Spark — AI-powered Resume + LinkedIn Optimization Tool for Freshers
**Owner:** Ashu (Astha Mishra)
**Format:** Single-file HTML app (HTML + CSS + vanilla JS), Claude API-powered, no login/backend database
**Pace:** 1–2 hours/day
**This document is the single source of truth for the rest of the capstone.** Every day below is written so a fresh AI conversation can pick it up with zero re-planning.

> **📌 Day 2 Update:** Confirmed mobile-only build (no laptop/computer). All local-machine steps (git clone, local file editing) are replaced with GitHub's mobile app/browser file editor throughout this document. The `reel-spark` GitHub repo was created early, on Day 2, to hold the technical design documents (`/docs` folder: `ARCHITECTURE.md`, `SCHEMA.md`, `API.md`, `UI-WIREFRAMES.md`, `PROJECT-STRUCTURE.md`). See those files for the finalized tech stack, architecture, data model, AI integration contract, and wireframes — Days 4–10 below assume that design is final and unchanged.

---

## 🧭 Project-Wide Reference (read this before every day)

### What v1.0 includes
1. Upload resume as **PDF or DOCX**
2. Paste **LinkedIn Headline** + **LinkedIn About section** (text fields)
3. Claude AI generates:
   - A **Resume Score** + **LinkedIn Score** with explanations
   - **Improvement suggestions** for both
   - A **Consistency/Match Check** between resume and LinkedIn (skills, job title, keywords that don't align)
   - **Rewritten Headline** and **Rewritten About Section**
4. Results shown in a **tabbed interface**: Score | Suggestions | Consistency Check | Rewritten Content
5. Fully client-side app (no backend server, no database), deployed as a live link

### What is intentionally OUT of v1.0 (Future Scope)
- Login / signup / saved history
- Payment or subscription
- Analyzing more than one resume version at a time
- Native LinkedIn scraping/API integration (not allowed by LinkedIn anyway)
- Mobile app version

### Fixed Tech Choices (do not re-decide these on any day)
- **Structure:** One primary `index.html` + `style.css` + `script.js` (kept as separate files for readability, linked from index.html — NOT one giant file, since Ashu will be editing this over multiple days)
- **Resume parsing:** `pdf.js` (PDF) + `mammoth.js` (DOCX), both loaded via CDN `<script>` tags — no npm/build step
- **AI:** Anthropic Claude API, called directly from the browser using `fetch()` for early days, then explained safely (API key exposure risk flagged and handled — see Day 6)
- **Hosting:** Netlify (free tier) — chosen because it supports drag-and-drop deploy AND simple serverless functions later if needed, no CLI required
- **Version control:** GitHub (free) — used for backup + Netlify auto-deploy
- **No frameworks** (no React, no Tailwind build step) — matches Ashu's proven no-code-experience-friendly pattern

### Project Folder Structure (created Day 3, evolves through Day 9)
```
reel-spark/
├── index.html
├── style.css
├── script.js
├── /assets
│   └── logo.png (optional, added Day 9)
└── README.md
```

### Standing Rules for Every Day
- Every manual step (installing something, clicking buttons, creating accounts) will be explained click-by-click.
- Wait for Ashu's confirmation + screenshot before moving to the next step.
- No paid tools/services will be suggested.
- Each day ends with a working, testable version of the app — never a broken half-state.

---

## 📅 DAY 2 — UX Design & Information Architecture

### 🎯 Objective
Design exactly what the app looks like and how it flows, on paper/text, before touching code. No coding today.

### 📖 What I'll learn
- How to turn a feature list into a simple user flow
- Basics of information architecture (what goes on screen, in what order)
- Why designing before coding saves time for non-coders especially

### 🛠 Features to build
None (design-only day). Deliverable: a written UX spec + simple wireframe description.

### 📝 Step-by-step implementation plan
1. Define the **user flow**: Landing screen → Upload resume → Paste LinkedIn text → Click "Analyze" → Loading state → Results (tabs).
2. Describe each screen in words (since no coding yet):
   - **Screen 1 (Landing/Input):** App name "Reel Spark", one-line tagline, resume upload box (drag-drop or click), two text areas (Headline, About), one button "Analyze My Profile".
   - **Screen 2 (Loading):** Simple spinner + message like "Analyzing your profile...".
   - **Screen 3 (Results):** Four tabs — Score, Suggestions, Consistency Check, Rewritten Content. Each tab shows its content when clicked.
3. List every piece of text/content that needs to appear on each screen (labels, button text, placeholder text).
4. Decide the **visual mood**: colors, tone (e.g., clean, encouraging, student-friendly — not corporate-cold). Pick 1 primary color + 1 accent color in words (exact hex codes will be chosen Day 3 when we set up CSS).
5. Write this all down in a `design-notes.md` file (I will generate this for you today).

### 📂 Files and folders to create or modify
- `design-notes.md` (new — generated by AI today, no folder needed yet)

### 🔗 APIs, libraries, services, or tools to integrate
None today.

### 🧪 Testing tasks
- Read through the flow out loud — does it make sense start to finish for a first-time user?

### 🐞 Common issues and debugging tips
- N/A (no code today)

### ✅ End-of-day checklist
- [ ] User flow written and makes sense
- [ ] All 3 screens described in words
- [ ] Primary + accent color mood decided
- [ ] `design-notes.md` saved

### 📸 Expected project state and screenshots to capture
- No app yet — capture a screenshot of the `design-notes.md` content only.

### ➡️ Handoff notes for Day 3
Design is locked. Day 3 will set up the actual project folder, GitHub, Netlify account, and Anthropic API key — no design decisions should be revisited unless something is truly broken.

---

## 📅 DAY 3 — Environment Setup (Netlify, API Key, Skeleton Files) — MOBILE-ONLY WORKFLOW

> **Updated on Day 2:** Ashu is building this entire capstone from a phone, with no laptop/computer access. The GitHub repo (`reel-spark`, public) was already created on Day 2, ahead of schedule, to hold the Day 2 design documents. There is no `git clone` step anywhere in this project — all file creation and editing happens through the **GitHub mobile app / github.com in a mobile browser**, using their built-in "Add file" and "Edit" (pencil icon) features. Netlify connects directly to the GitHub repo and redeploys automatically on every save — this replaces any local build/test step.

### 🎯 Objective
Get Netlify and the Anthropic API key ready, and create the skeleton project files directly on GitHub, so building can start smoothly from Day 4 onward.

### 📖 What I'll learn
- What an API key is and how to get one safely
- How GitHub's in-browser/app file editor works
- How connecting GitHub to Netlify gives an auto-updating live link with zero local setup

### 🛠 Features to build
None (infrastructure only).

### 📝 Step-by-step implementation plan
1. ~~Create GitHub account~~ ✅ already done. ~~Create repository~~ ✅ already done (`reel-spark`, public) on Day 2.
2. **Create a Netlify account** (free tier, sign up/log in with the GitHub account for simplicity) — guided step-by-step with screenshots, using the Netlify mobile site or app.
3. **Get an Anthropic API key**:
   - Go to console.anthropic.com (mobile browser)
   - Sign up / log in
   - Navigate to the API Keys section
   - Generate a new key, name it something like `reel-spark-key`
   - **Important safety note:** explained where to save this key temporarily (e.g., a private notes app) — it will only be pasted into `script.js` on Day 6, and the safety trade-off of a client-side key is documented in `API.md` §5.
4. **Create skeleton files directly on GitHub** using the mobile app/website's **"Add file → Create new file"** button (no local folder, no clone):
   - `index.html` — basic HTML boilerplate + `<title>Reel Spark</title>` + links to `style.css` and `script.js`
   - `style.css` — a short comment placeholder, linked from `index.html`
   - `script.js` — a short comment placeholder, linked from `index.html`
   - (`README.md` already exists from repo creation — will be filled in properly on Day 10)
   - I will provide the exact copy-paste-ready content for each file when we do this step.
5. **Connect the GitHub repo to Netlify**: Netlify dashboard → "Add new site" → "Import an existing project" → "Deploy with GitHub" → authorize → select `reel-spark` repo → deploy with default settings.
6. Confirm the first deploy works and shows the placeholder "Reel Spark" page on the live Netlify link, opened in the phone browser.

### 📂 Files and folders to create or modify
- `index.html` (skeleton: basic HTML boilerplate + title "Reel Spark")
- `style.css` (placeholder comment, linked from index.html)
- `script.js` (placeholder comment, linked from index.html)

### 🔗 APIs, libraries, services, or tools to integrate
- Netlify (account + first deploy, connected directly to GitHub — no CLI)
- Anthropic Console (API key generated — key itself not used in code yet)

### 🧪 Testing tasks
- Open the live Netlify link on the phone browser → confirm the placeholder "Reel Spark" page shows with no errors.

### 🐞 Common issues and debugging tips
- If Netlify shows a blank page: check that `index.html` is in the root of the repo, not inside a subfolder.
- If GitHub's "Create new file" seems to lose formatting: make sure to paste plain text (no autocorrect/smart-quotes from the phone keyboard — most mobile keyboards can be switched to a "plain text" or English(US) mode to avoid this).

### ✅ End-of-day checklist
- [ ] Netlify account created and connected to the `reel-spark` GitHub repo
- [ ] Live placeholder link working, opened successfully on phone browser
- [ ] Anthropic API key generated and saved somewhere safe (not yet in code)
- [ ] Skeleton `index.html`, `style.css`, `script.js` created on GitHub

### 📸 Expected project state and screenshots to capture
- Screenshot of GitHub repo showing all files (docs/ folder + the 3 skeleton files + README)
- Screenshot of Netlify showing "Published" with the live link
- Screenshot of the live placeholder page in the phone browser

### ➡️ Handoff notes for Day 4
Repo + hosting pipeline is live. **Workflow for every future day:** edit a file directly on GitHub (mobile app/browser "pencil" edit icon) → commit the change → Netlify auto-redeploys within ~1 minute → refresh the live link on the phone browser to test. Day 4 starts building the actual upload UI and resume parsing — the API key will only be used starting Day 6.

---

## 📅 DAY 4 — Resume Upload + Parsing (PDF & DOCX)

### 🎯 Objective
Build the working resume upload box that can read text out of both PDF and DOCX files.

### 📖 What I'll learn
- How to add a file upload element in HTML
- How third-party JS libraries (pdf.js, mammoth.js) are used via CDN without installing anything
- Basics of reading file content in the browser

### 🛠 Features to build
- File upload input (drag-and-drop + click-to-browse)
- PDF text extraction
- DOCX text extraction
- Display extracted text on screen (temporary, for verification)

### 📝 Step-by-step implementation plan
1. Add the upload box HTML to `index.html` (styled box with icon + "Drag & drop your resume, or click to browse" text, accepts `.pdf,.docx`).
2. Add `<script>` CDN links for `pdf.js` and `mammoth.js` in `index.html`.
3. In `script.js`, write a function `handleFileUpload(file)` that:
   - Detects file type (`.pdf` vs `.docx`) from the file extension/MIME type.
   - If PDF → uses `pdf.js` to extract all text page by page into one string.
   - If DOCX → uses `mammoth.js` `extractRawText()` to get plain text.
   - Stores extracted text in a variable `resumeText`.
4. Temporarily display `resumeText` in a `<pre>` block on the page so we can visually confirm parsing worked (this will be removed/hidden later once AI integration replaces it).
5. Add basic validation: reject files that aren't PDF/DOCX, reject files over ~5MB, show a friendly error message.

### 📂 Files and folders to create or modify
- `index.html` (add upload section)
- `script.js` (add file handling + parsing functions)
- `style.css` (style the upload box)

### 🔗 APIs, libraries, services, or tools to integrate
- `pdf.js` (via CDN: cdnjs pdf.js build)
- `mammoth.js` (via CDN: cdnjs or unpkg mammoth browser build)

### 🧪 Testing tasks
- Upload a real PDF resume → confirm extracted text appears correctly.
- Upload a real DOCX resume → confirm extracted text appears correctly.
- Upload a wrong file type (e.g., .jpg) → confirm friendly error shows, app doesn't break.
- Upload an empty/corrupt file → confirm graceful error handling.

### 🐞 Common issues and debugging tips
- **pdf.js "worker not found" error:** must also set `pdfjsLib.GlobalWorkerOptions.workerSrc` to the matching CDN worker file URL.
- **Scanned/image-only PDFs** will extract blank text — this is expected; note it as a known limitation, not a bug.
- **mammoth.js only works with `.docx`, not old `.doc`** — flag this to the user in the error message.

### ✅ End-of-day checklist
- [ ] Upload box visually working (drag-drop + click)
- [ ] PDF text extraction confirmed working on a real file
- [ ] DOCX text extraction confirmed working on a real file
- [ ] Error handling for wrong file types tested

### 📸 Expected project state and screenshots to capture
- Screenshot of upload box (empty state)
- Screenshot showing extracted resume text after upload
- Screenshot of an error message for wrong file type

### ➡️ Handoff notes for Day 5
`resumeText` variable now holds parsed resume content in memory. Day 5 adds the LinkedIn text inputs and builds the full tabbed results UI shell (without AI yet) so the whole interface is ready before AI is wired in on Day 6.

---

## 📅 DAY 5 — LinkedIn Input + Tabbed Results UI Shell

### 🎯 Objective
Build the LinkedIn text input fields and the full tabbed results interface (Score / Suggestions / Consistency Check / Rewritten Content) — using placeholder/dummy content for now.

### 📖 What I'll learn
- How to build a tabbed UI with plain HTML/CSS/JS (no library)
- How to structure a form with multiple inputs
- Good UX practice: showing/hiding content sections cleanly

### 🛠 Features to build
- LinkedIn Headline input (single line text)
- LinkedIn About input (multi-line textarea)
- "Analyze My Profile" button
- Tabbed results section with 4 tabs, each showing placeholder text
- Basic loading state (spinner) shown after clicking Analyze

### 📝 Step-by-step implementation plan
1. Add LinkedIn Headline `<input>` and About `<textarea>` below the resume upload box in `index.html`, each with a label and placeholder example text.
2. Add the "Analyze My Profile" `<button>`.
3. Build the tab navigation: 4 clickable tab buttons (Score, Suggestions, Consistency Check, Rewritten Content) and 4 corresponding content `<div>`s.
4. In `script.js`, write `switchTab(tabName)` function: hides all tab content divs, shows only the selected one, highlights the active tab button.
5. Add a loading spinner `<div>` (hidden by default) that shows when "Analyze" is clicked and hides once results are ready (for now, just simulate with `setTimeout` + placeholder text, since real AI comes Day 6).
6. Fill each of the 4 tabs with realistic **placeholder** content (e.g., "Score: 78/100 — Sample explanation here") so the layout can be visually judged before real data exists.
7. Style everything in `style.css`: clean card-based layout, consistent spacing, primary/accent colors from Day 2 design notes.

### 📂 Files and folders to create or modify
- `index.html` (add LinkedIn inputs, button, tab structure)
- `script.js` (add `switchTab()`, button click handler with simulated loading)
- `style.css` (style inputs, button, tabs, spinner)

### 🔗 APIs, libraries, services, or tools to integrate
None new today (still no live AI call).

### 🧪 Testing tasks
- Type in Headline + About fields → confirm text is captured correctly (console.log check).
- Click each tab → confirm correct content shows/hides, active tab is visually highlighted.
- Click "Analyze" → confirm spinner shows briefly, then placeholder results appear.
- Resize browser window → confirm layout doesn't break on smaller widths (basic responsiveness check).

### 🐞 Common issues and debugging tips
- **Tabs not switching:** usually a mismatch between tab button's `data-tab` attribute and the content div's `id` — keep naming identical.
- **Layout breaking on resize:** use `flex-wrap` or basic media queries; don't over-engineer.

### ✅ End-of-day checklist
- [ ] LinkedIn Headline + About inputs working
- [ ] All 4 tabs clickable and switching correctly
- [ ] Loading spinner shows/hides correctly
- [ ] Placeholder content displays cleanly in every tab

### 📸 Expected project state and screenshots to capture
- Screenshot of full input screen (resume + LinkedIn fields + button)
- Screenshot of each of the 4 tabs with placeholder content
- Screenshot of loading spinner state

### ➡️ Handoff notes for Day 6
The entire UI shell is complete and functional with placeholder data. Day 6 replaces the placeholder logic with a real Claude API call that returns the Score + Suggestions content. `resumeText`, LinkedIn headline, and About values are all available as JS variables at this point.

---

## 📅 DAY 6 — Claude API Integration: Score + Suggestions

### 🎯 Objective
Replace placeholder Score/Suggestions content with real AI-generated analysis using the Claude API.

### 📖 What I'll learn
- How to call the Claude API from JavaScript using `fetch()`
- How to write a good AI prompt that returns structured, predictable output
- Why API keys shouldn't be exposed in public frontend code, and the simple safe workaround for a capstone project

### 🛠 Features to build
- Real API call to Claude when "Analyze" is clicked
- Prompt that returns Resume Score, LinkedIn Score, and Suggestions in a structured (JSON) format
- Parsing the AI's JSON response and displaying it in the Score and Suggestions tabs

### 📝 Step-by-step implementation plan
1. **API key safety talk (important, guided):** Since this is a static frontend app with no backend, we cannot hide the API key perfectly. For this capstone, the safe approach is:
   - Use a **restricted/low-limit API key** dedicated only to this project.
   - Add a simple note in the README about this being a demo limitation.
   - (Optional stretch, only if time allows later): move the call behind a Netlify serverless Function so the key stays server-side. This is explained as an optional Day 9 stretch goal, not required for v1.0.
2. Write the AI prompt template in `script.js`, e.g.:
   - System instruction: "You are a career coach for freshers. Analyze this resume and LinkedIn profile and return ONLY valid JSON with these fields: resume_score, resume_score_reason, linkedin_score, linkedin_score_reason, suggestions (array of strings)."
   - Insert `resumeText`, `linkedinHeadline`, `linkedinAbout` into the prompt.
3. Write `callClaudeAPI(promptText)` function using `fetch()` to `https://api.anthropic.com/v1/messages`, model `claude-sonnet-4-6` (per Anthropic API artifact guidance), parse `data.content[0].text`.
4. Strip any accidental markdown/code fences from the response, then `JSON.parse()` it safely inside a try/catch.
5. Populate the Score tab with `resume_score`, `resume_score_reason`, `linkedin_score`, `linkedin_score_reason` (e.g., simple score bars or big numbers + explanation text).
6. Populate the Suggestions tab with the `suggestions` array as a clean bullet list.
7. Wire the loading spinner to show while waiting for the real API response, hide when done.
8. Add error handling: if API call fails or JSON parsing fails, show a friendly "Something went wrong, please try again" message instead of a blank/broken screen.

### 📂 Files and folders to create or modify
- `script.js` (add `callClaudeAPI()`, prompt builder, JSON parsing, tab population logic)
- `README.md` (add API key safety note)

### 🔗 APIs, libraries, services, or tools to integrate
- Anthropic Claude API (`/v1/messages`, model `claude-sonnet-4-6`)

### 🧪 Testing tasks
- Test with a real resume + LinkedIn text → confirm scores and suggestions are relevant and readable.
- Test with very short/incomplete resume text → confirm AI still responds sensibly, not crash.
- Test with API key temporarily wrong/missing → confirm error message shows properly.
- Check browser console for any JSON parsing errors.

### 🐞 Common issues and debugging tips
- **AI returns text before/after the JSON:** strengthen the prompt with "Return ONLY the JSON object, no other text" and still defensively strip anything outside the first `{` and last `}` before parsing.
- **CORS errors:** Anthropic API supports direct browser calls with proper headers — if blocked, double-check the `anthropic-dangerous-direct-browser-access` type header requirements and use the exact fetch pattern from the API reference.
- **Rate limit/cost worry:** keep `max_tokens` reasonable (e.g., 1000) as already configured by default.

### ✅ End-of-day checklist
- [ ] Real Claude API call working end-to-end
- [ ] Score tab shows real AI-generated scores + reasons
- [ ] Suggestions tab shows real AI-generated suggestions
- [ ] Errors handled gracefully (no blank screens/crashes)

### 📸 Expected project state and screenshots to capture
- Screenshot of Score tab with real AI data
- Screenshot of Suggestions tab with real AI data
- Screenshot of an error state (simulate by disconnecting internet briefly)

### ➡️ Handoff notes for Day 7
Core AI pipeline (`callClaudeAPI`) now works and returns structured JSON. Day 7 reuses this exact same pipeline/pattern to add the Consistency Check feature — just a different prompt and a new JSON field, populating the 3rd tab.

---

## 📅 DAY 7 — Consistency / Match Check Feature

### 🎯 Objective
Add the feature that compares resume content against LinkedIn content and flags mismatches.

### 📖 What I'll learn
- How to extend an existing AI prompt/pipeline for a new feature without rebuilding from scratch
- How to design AI prompts for comparison-style tasks (not just generation)

### 🛠 Features to build
- Consistency Check tab populated with real AI comparison output
- Highlighted mismatches (e.g., skills present in resume but missing from LinkedIn, or title mismatches)

### 📝 Step-by-step implementation plan
1. Extend the single existing prompt from Day 6 (do NOT create a second separate API call — keep it cost-efficient and simple) to also request a `consistency_check` field:
   - `consistency_check`: object with `matches` (array of things that align well) and `mismatches` (array of specific gaps, each with a short explanation).
2. Update the JSON parsing in `script.js` to also read `consistency_check`.
3. Populate the Consistency Check tab:
   - A "✅ What matches well" section listing `matches`.
   - A "⚠️ What doesn't match" section listing `mismatches`, each shown clearly (e.g., "Resume mentions 'Python' but LinkedIn profile doesn't mention it").
4. Style mismatches distinctly (e.g., warning-colored highlight) so they stand out as actionable items.

### 📂 Files and folders to create or modify
- `script.js` (extend prompt + JSON handling, populate 3rd tab)
- `style.css` (style match/mismatch sections)

### 🔗 APIs, libraries, services, or tools to integrate
- Same Claude API call from Day 6 (extended prompt only — no new integration)

### 🧪 Testing tasks
- Test with a resume/LinkedIn pair that has obvious mismatches (e.g., different job titles) → confirm AI catches it.
- Test with a resume/LinkedIn pair that's well-aligned → confirm AI correctly shows mostly matches, no false mismatches.
- Confirm tab displays cleanly even when `mismatches` array is empty.

### 🐞 Common issues and debugging tips
- **AI gives vague mismatches:** tighten the prompt to require specific, named examples (e.g., "quote the exact skill/keyword that's missing").
- **Empty array causes ugly blank section:** add a fallback message like "Great! No major mismatches found." when the array is empty.

### ✅ End-of-day checklist
- [ ] Consistency Check tab shows real matches + mismatches
- [ ] Mismatches are specific and actionable, not generic
- [ ] Empty-state handled gracefully

### 📸 Expected project state and screenshots to capture
- Screenshot of Consistency Check tab with a mismatch example
- Screenshot of Consistency Check tab with a "no mismatches" clean-state example (if testable)

### ➡️ Handoff notes for Day 8
3 of 4 tabs are now fully AI-powered. Day 8 adds the final feature — Rewritten Content — using the same extended-prompt pattern established in Day 6–7.

---

## 📅 DAY 8 — Rewritten Content Feature (Headline + About)

### 🎯 Objective
Add AI-generated rewritten LinkedIn Headline and About section — the "wow" feature of the app.

### 📖 What I'll learn
- How to prompt AI for creative, higher-quality rewritten text (not just analysis)
- How to let users compare "before vs after" content clearly in the UI
- Basic copy-to-clipboard functionality

### 🛠 Features to build
- Rewritten Content tab showing original vs AI-rewritten Headline and About section, side by side or stacked
- "Copy to clipboard" button for each rewritten piece

### 📝 Step-by-step implementation plan
1. Extend the same prompt once more to request:
   - `rewritten_headline`: a single improved headline (grounded in resume content, tailored for a fresher).
   - `rewritten_about`: a rewritten About section (3–5 sentences, professional but human tone, highlighting resume strengths).
2. Update JSON parsing to read these two new fields.
3. Build the Rewritten Content tab UI:
   - "Your Current Headline" (original, shown for reference) vs "✨ AI-Suggested Headline" (new, highlighted).
   - Same pattern for About section.
4. Add a "Copy" button next to each rewritten piece using the browser's `navigator.clipboard.writeText()` API, with a small "Copied!" confirmation message on click.
5. Do a final prompt-quality pass: test outputs for tone — should sound confident and human, not robotic or generic ("results-driven team player" clichés should be explicitly discouraged in the prompt).

### 📂 Files and folders to create or modify
- `script.js` (extend prompt + JSON handling, populate 4th tab, add copy-to-clipboard function)
- `style.css` (style before/after comparison layout, copy button)

### 🔗 APIs, libraries, services, or tools to integrate
- Same Claude API call (final extension of the single prompt)
- Browser Clipboard API (`navigator.clipboard`)

### 🧪 Testing tasks
- Confirm rewritten Headline and About are genuinely improved and specific to the uploaded resume (not generic).
- Test Copy button on both fields → confirm clipboard actually receives the correct text (paste somewhere to verify).
- Test with a very sparse/weak original resume → confirm AI still produces a reasonable, non-broken rewrite.

### 🐞 Common issues and debugging tips
- **Clipboard API blocked:** some browsers require HTTPS (Netlify serves HTTPS by default, so this should work fine) and a user-triggered event (already satisfied since it's a button click).
- **Generic-sounding rewrites:** strengthen the prompt with explicit instructions to use specific details from the resume and avoid buzzword clichés.

### ✅ End-of-day checklist
- [ ] All 4 tabs are now fully AI-powered end-to-end
- [ ] Rewritten Headline + About display clearly against originals
- [ ] Copy-to-clipboard works on both fields

### 📸 Expected project state and screenshots to capture
- Screenshot of Rewritten Content tab showing before/after
- Screenshot showing "Copied!" confirmation after clicking copy

### ➡️ Handoff notes for Day 9
**All core features are complete.** The app is fully functional end-to-end. Day 9 is entirely about polish: visual design, responsiveness, error states, empty states, and overall UX quality — no new features are added.

---

## 📅 DAY 9 — UI/UX Polish & Responsiveness

### 🎯 Objective
Take the fully-functional app and make it look and feel polished, professional, and portfolio-ready.

### 📖 What I'll learn
- Practical UI polish techniques (spacing, typography, color consistency)
- Basic responsive design for mobile/tablet screens
- How to handle edge cases gracefully (empty fields, long text, slow network)

### 🛠 Features to build
No new functional features — polish and hardening only:
- Refined visual design (spacing, typography, color consistency using Day 2's chosen palette)
- Mobile responsiveness
- Input validation messages (e.g., "Please upload a resume before analyzing")
- Better loading state (progress message or animated spinner instead of static text)
- Optional: simple logo/favicon for branding

### 📝 Step-by-step implementation plan
1. Do a full visual pass on `style.css`: consistent font sizes/weights, consistent spacing (8px/16px/24px rhythm), consistent button and card styling across all tabs.
2. Add responsive rules (`@media` queries) so the layout stacks nicely on mobile widths (~375–414px) — test using browser dev tools device toolbar.
3. Add input validation: disable/grey out the "Analyze" button until a resume is uploaded AND both LinkedIn fields have content; show a small inline message if user clicks while incomplete.
4. Improve the loading state: add a short rotating message list (e.g., "Reading your resume...", "Comparing with LinkedIn...", "Polishing suggestions...") that cycles every couple seconds while waiting — makes the wait feel shorter and more premium.
5. Add a simple favicon and app title in the browser tab.
6. (Optional, only if time allows) Explore moving the Claude API call behind a Netlify Function for better key safety — treat as a stretch goal, not required.
7. Do a full click-through of the entire app as if a stranger were using it for the first time — note any confusing moments and fix them.

### 📂 Files and folders to create or modify
- `style.css` (full polish pass, media queries)
- `script.js` (validation logic, cycling loading messages)
- `index.html` (favicon link, refined text/labels)
- `/assets/logo.png` or favicon file (optional)

### 🔗 APIs, libraries, services, or tools to integrate
None new (optional Netlify Functions exploration only if time allows).

### 🧪 Testing tasks
- Test on both desktop-width and mobile-width (dev tools) → confirm no broken layout.
- Try clicking "Analyze" with missing inputs → confirm validation message shows, no crash.
- Full end-to-end run-through as a first-time user → note friction points, fix them.
- Test on a slow network (dev tools "Slow 3G" throttle) → confirm loading state still feels acceptable.

### 🐞 Common issues and debugging tips
- **Mobile layout breaking:** usually fixed widths in CSS — switch fixed `px` widths to `%` or `max-width` + `width: 100%`.
- **Validation not resetting:** make sure the "Analyze" button re-enables once all required fields are filled, not just checked once on page load.

### ✅ End-of-day checklist
- [ ] App looks clean and consistent on desktop
- [ ] App looks clean and usable on mobile width
- [ ] Validation prevents incomplete submissions
- [ ] Loading state feels polished
- [ ] Full first-time-user run-through completed with no confusing moments

### 📸 Expected project state and screenshots to capture
- Screenshot of desktop view (full app)
- Screenshot of mobile-width view
- Screenshot of validation message
- Screenshot of improved loading state

### ➡️ Handoff notes for Day 10
The app is feature-complete and polished. Day 10 is final testing, deployment verification, README completion, and preparing the "Definition of Done" deliverables (live link + polished UI, confirmed working end-to-end).

---

## 📅 DAY 10 — Final Testing, Deployment & Launch

### 🎯 Objective
Confirm the live deployed app works flawlessly end-to-end and officially ship v1.0.

### 📖 What I'll learn
- How to do a structured QA pass before "launching" anything
- How to write a clear README for a portfolio project
- What a real "v1.0 ship" checklist looks like in professional software development

### 🛠 Features to build
None (testing + deployment + documentation day).

### 📝 Step-by-step implementation plan
1. **Full regression test** on the LIVE Netlify link (not local files) — test the entire flow at least 3 times with different resumes:
   - One strong/detailed resume
   - One sparse/weak resume (fresher with little experience)
   - One resume with an obvious LinkedIn mismatch
2. Test on at least 2 different browsers (e.g., Chrome + Edge/Firefox) and on mobile (open the Netlify link on your phone).
3. Fix any last-minute bugs found (small, targeted fixes only — no new features, per scope protection rules).
4. Finalize `README.md` with: project description, features list, tech stack used, live link, screenshots, and the honest note about API key/demo limitations.
5. Do a final commit + upload to GitHub, confirm Netlify shows latest deploy as "Published".
6. Fill in the **Definition of Done** checklist below and confirm every item.
7. Capture final screenshots for portfolio/LinkedIn use.

### 📂 Files and folders to create or modify
- `README.md` (final polish)
- Any small bugfixes across `index.html` / `style.css` / `script.js` found during testing

### 🔗 APIs, libraries, services, or tools to integrate
None new — final verification of GitHub + Netlify + Anthropic API all working together live.

### 🧪 Testing tasks
- 3x full end-to-end runs with different resume types (documented above)
- Cross-browser check
- Mobile check on live link
- Confirm no console errors on the live deployed version

### 🐞 Common issues and debugging tips
- **Works locally but not live:** almost always a file path issue (case-sensitivity or relative path) — check browser console Network tab for 404s on live site.
- **API works locally but fails live:** check for any domain-restrictions on the API key if one was set; otherwise should work identically.

### ✅ End-of-day checklist (Definition of Done)
- [ ] Live Netlify link works with zero errors
- [ ] All 4 tabs produce real, correct AI output on the live site
- [ ] Tested with 3+ different resumes successfully
- [ ] Works on both desktop and mobile browsers
- [ ] README complete with live link + screenshots
- [ ] UI is clean, consistent, and polished (per Day 9 work)
- [ ] No broken/incomplete features remain

### 📸 Expected project state and screenshots to capture
- Screenshot of final live app (input screen)
- Screenshot of final live app (each of the 4 result tabs)
- Screenshot of README on GitHub
- Screenshot of Netlify "Published" status

### ➡️ Handoff notes (post-capstone / Maintenance phase)
v1.0 is shipped. Future scope (login/history, downloadable PDF report, moving API calls to a secure backend function, multi-resume comparison) can be planned as a v1.1 roadmap — but is explicitly out of scope for this capstone and should not be attempted before Day 10 is fully confirmed done.

---

*End of Implementation Blueprint. This document, plus the PRD and Pitch Deck generated alongside it, are the complete reference set for Days 2–10 of the Reel Spark capstone.*
