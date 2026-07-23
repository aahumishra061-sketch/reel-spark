Reel Spark — Setup Guide

Version: v1.0 · Date: Day 3 · Status: Complete

This document explains everything needed to get Reel Spark running — for the project owner returning after a break, or a fresh AI conversation continuing the build. Reel Spark has an intentionally minimal setup: no local installs, no package manager, no build tool.

1. What's Actually Needed

Because Reel Spark is a plain HTML/CSS/JS static site (per ARCHITECTURE.md), the entire "environment" is just three free web accounts — nothing installed on any device.

Requirement	Purpose	Cost
GitHub account	Stores the code, tracks history	Free
Netlify account	Hosts the live site, auto-deploys on every GitHub change	Free
Anthropic Console account + API key	Powers the AI analysis (used starting Day 6)	Pay-per-use, kept minimal

There is no Node.js, no npm, no framework CLI, no IDE required — everything is created and edited directly through GitHub's built-in file editor (mobile app or browser), per the mobile-only workflow adopted on Day 2.

2. Accounts Set Up (Day 3)
✅ GitHub repository: reel-spark (public), created Day 2
✅ Netlify account created and connected to the reel-spark GitHub repository
✅ Netlify project deployed at: https://reel-spark.netlify.app
✅ Anthropic Console account — API key generation covered in this session (see ENVIRONMENT.md for how/where the key will be used)
3. How the Project "Runs"

There is no local server and no npm start. Instead:

A file is created or edited directly on GitHub (via the mobile app or github.com in a browser).
The change is committed directly to the main branch.
Netlify detects the GitHub change automatically and rebuilds/redeploys the site — usually within 30–60 seconds.
The updated site is viewed by opening the live link, https://reel-spark.netlify.app, in any phone or desktop browser.

This is the complete "run" cycle for every day of this project — edit on GitHub → auto-deploy on Netlify → verify on the live link.

4. Repository Structure at End of Day 3
reel-spark/
├── index.html       ← basic page skeleton (Day 3)
├── style.css        ← base styles (Day 3)
├── script.js        ← placeholder logic (Day 3)
├── README.md
├── .gitignore
└── /docs
    ├── ARCHITECTURE.md
    ├── SCHEMA.md
    ├── API.md
    ├── UI-WIREFRAMES.md
    ├── PROJECT-STRUCTURE.md
    ├── PROJECT-LOG.md
    ├── Reel Spark — Implementation Blueprint.md
    ├── SETUP.md              (this file, added end of Day 3)
    ├── ENVIRONMENT.md         (added end of Day 3)
    └── DAY3-SUMMARY.md        (added end of Day 3)
5. Verifying Everything Works

To confirm the foundation is solid before Day 4 begins:

Open https://reel-spark.netlify.app in a browser.
Confirm the page shows the "Reel Spark" heading and tagline (not a blank page or "Page not found").
Confirm the Netlify dashboard shows the latest deploy as "Published" (green), matching the latest GitHub commit.
Confirm the GitHub repo root contains exactly: index.html, style.css, script.js, README.md, .gitignore, and the docs/ folder — no stray duplicate files.

All four checks passed at the end of Day 3.

6. What Day 4 Will Need (Already in Place)
Live deploy pipeline: ✅ working
Skeleton files to build on top of: ✅ in place
No further environment setup required — Day 4 begins directly with the resume upload feature (per the Implementation Blueprint
