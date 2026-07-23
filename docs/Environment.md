Reel Spark — Environment Reference
Version: v1.0 · Date: Day 3 · Status: Complete
This document lists every external tool, account, and configuration value Reel Spark depends on. There are no traditional "environment variables" in the Node.js/.env sense, since this is a static, client-side project — but the equivalent concept here is: which accounts exist, what they're for, and where secrets will eventually live in the code.
1. Accounts & Services
Service
Account Identifier
Purpose
Plan
GitHub
aahumishra061-sketch
Source control, hosts all project files
Free
Netlify
Connected via GitHub login
Hosts and auto-deploys the live site
Free tier
Anthropic Console
(personal account)
Issues the API key used for AI analysis
Pay-per-use
2. Live Site


Production URL
https://reel-spark.netlify.app
Deploys from
GitHub repo reel-spark, branch main
Deploy trigger
Any commit pushed to main (automatic)
Build command
None (static site, no build step)
Publish directory
Repository root (/)
3. Repository


URL
github.com/aahumishra061-sketch/reel-spark
Visibility
Public
Default branch
main (only branch — see PROJECT-STRUCTURE.md / Blueprint for branching rationale)
Editing method
GitHub mobile app / github.com in-browser file editor (no local clone, no git CLI — per the mobile-only workflow)
4. Anthropic Claude API (used starting Day 6)
Setting
Value
Endpoint
https://api.anthropic.com/v1/messages
Model
claude-sonnet-4-6
Max tokens per call
1000
Calls per analysis
1 (single consolidated prompt — see API.md)
API key storage (v1.0)
Directly in script.js, client-side — a known, documented limitation, not an oversight (see below)
Why the key lives in client-side code
Reel Spark has no backend server (an intentional PRD decision). This means the API key cannot be perfectly hidden in v1.0. The accepted mitigation:
A dedicated, low-limit API key will be created specifically for this project (not reused from any other project).
This limitation is disclosed transparently in README.md.
Moving the call behind a Netlify serverless Function is documented as optional Future Scope, not a v1.0 requirement (see PRD §5.2 and API.md §5).
Status as of end of Day 3: API key not yet generated/inserted into code. This happens on Day 6 when the AI integration is actually wired up, per the Implementation Blueprint.
5. No Traditional Environment Variables
Because there's no Node.js runtime, bundler, or backend, there is no .env file and no process.env usage anywhere in this project. Any value that would normally be an environment variable (like the API key) is instead a plain constant inside script.js, with the safety trade-off documented above.
6. Local Development Tools
None. Per the Day 2 discovery that this project is built entirely from a mobile phone:
No Node.js, npm, or yarn
No IDE (VS Code, etc.) — editing happens via GitHub's own editor
No local server (e.g., live-server) — testing happens directly on the live Netlify URL after each commit
This is intentional and matches the adapted, no-framework, mobile-first plan agreed upon on Day 2 and Day 3.
