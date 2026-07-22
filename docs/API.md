# Reel Spark — API Design (AI Integration Contract)

**Version:** v1.0 · **Date:** Day 2 · **Status:** Approved

Reel Spark does **not** build or host its own REST API — there is no backend (per PRD §5.2). The only "API" in this project is the outbound call our frontend makes to the **Anthropic Claude API**. This document is the complete contract for that single integration point, so Day 6–8 implementation requires no design decisions — only wiring code.

---

## 1. Overview

| | |
|---|---|
| **Endpoint we call** | `https://api.anthropic.com/v1/messages` |
| **Called from** | `script.js`, via browser `fetch()` |
| **Called when** | User taps "Analyze My Profile" |
| **Number of calls per analysis** | **1** (single consolidated prompt — not 4 separate calls, to keep cost and complexity low) |
| **Authentication** | Anthropic API key (see §5 for safety notes) |

---

## 2. Request

**Method:** `POST`
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**
```
Content-Type: application/json
```
*(API key handling — see §5; exact header mechanics finalized on Day 6 alongside the safety discussion.)*

**Body:**
```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1000,
  "messages": [
    {
      "role": "user",
      "content": "<PROMPT_TEXT — see §3>"
    }
  ]
}
```

### Purpose
Send the extracted resume text and pasted LinkedIn text to Claude, and receive back a single structured JSON object containing every piece of data all four result tabs need.

---

## 3. Prompt Template (built in `script.js`)

```
You are a career coach for freshers and students applying for their first job.

Analyze the following resume and LinkedIn profile together. Return ONLY a valid
JSON object — no other text, no markdown code fences — with exactly these fields:

{
  "resume_score": <number 0-100>,
  "resume_score_reason": "<1-2 sentence explanation>",
  "linkedin_score": <number 0-100>,
  "linkedin_score_reason": "<1-2 sentence explanation>",
  "suggestions": ["<specific, actionable tip>", ...],
  "consistency_check": {
    "matches": ["<thing that aligns well>", ...],
    "mismatches": [
      {"issue": "<short label>", "explanation": "<specific example>"}
    ]
  },
  "rewritten_headline": "<one improved LinkedIn headline>",
  "rewritten_about": "<3-5 sentence improved About section>"
}

Rules:
- Be specific and reference actual content from the resume/LinkedIn text — never generic.
- Avoid clichés like "results-driven team player."
- If mismatches is empty, return an empty array (do not invent issues).

RESUME TEXT:
"""
<resumeState.extractedText>
"""

LINKEDIN HEADLINE:
"""
<linkedinState.headline>
"""

LINKEDIN ABOUT:
"""
<linkedinState.about>
"""
```

---

## 4. Response

**Success — HTTP 200:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "{ ...the JSON described in §3... }"
    }
  ]
}
```

**What `script.js` must do with it:**
1. Read `data.content[0].text`.
2. Strip any text before the first `{` and after the last `}` (defensive cleanup in case Claude adds stray words).
3. `JSON.parse()` the result inside a `try/catch`.
4. On success → store as `analysisResult` (see `SCHEMA.md` §2.3) → populate all 4 tabs.
5. On failure → set `appState.hasError = true` and show a friendly error message — never show a blank or broken tab.

---

## 5. Authentication & Key Safety

Since Reel Spark has no backend, the Anthropic API key is necessarily present in client-side code for v1.0. This is a **documented, accepted limitation** for a capstone demo, not an oversight:

- A **dedicated, low-limit key** will be created specifically for this project (Day 3).
- The limitation is disclosed transparently in the project `README.md`.
- Moving the call behind a Netlify serverless Function (so the key stays server-side) is listed as **optional Future Scope** — not required for v1.0, per PRD §5.2.

---

## 6. Validation (client-side, before the call is made)

| Check | Rule |
|---|---|
| Resume uploaded | `resumeState.isValid === true` |
| Resume text non-empty | `resumeState.extractedText.length > 0` |
| Headline filled | `linkedinState.headline.trim().length > 0` |
| About filled | `linkedinState.about.trim().length > 0` |

If any check fails, the "Analyze" button stays disabled (Day 9 work) and/or an inline message is shown — the API is never called with incomplete data.

---

## 7. Error Cases

| Case | Cause | Handling |
|---|---|---|
| Network failure | No internet / request timeout | Catch `fetch()` rejection → show "Couldn't connect. Please check your internet and try again." |
| Non-200 response | Invalid API key, rate limit, server error | Check `response.ok` → show "Something went wrong on our end. Please try again in a moment." |
| Malformed JSON in response | Claude didn't follow the format instruction | `JSON.parse()` throws → caught → show "We couldn't process that response. Please try again." |
| Empty/very short resume text | Scanned/image-only PDF | Not an API error — validation warning shown before the call is even made (see `resumeState.isValid`) |
| Missing expected field in parsed JSON | Unexpected AI output shape | Defensive fallback: missing fields render as "Not available" in their tab rather than crashing the whole UI |

---

## 8. Cost & Efficiency Notes

- **One call per analysis**, not four — all four tabs' data comes from a single request.
- `max_tokens: 1000` keeps responses tight and predictable.
- No retries-on-loop are built in for v1.0 — a failed call simply shows an error and lets the user manually tap "Analyze" again.

---

## 9. No Internal REST API

To be explicit: Reel Spark does **not** define endpoints like `/api/resume` or `/api/analyze` — there is no server for such routes to live on. All "processing" is either:
- **Local JS functions** (file parsing, validation, tab rendering) — not network calls at all, or
- **The single external call** documented above.

This section fully replaces what would otherwise be a REST API specification.
