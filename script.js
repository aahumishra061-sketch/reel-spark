async function callGeminiAPI(resumeText, headline, about) {
  const endpoint = "https://still-wind-844b.aahumishra061.workers.dev/";

  const prompt = `You are a career coach reviewing a fresher's resume and LinkedIn profile.

Return ONLY valid JSON matching exactly this shape, with no markdown formatting and no extra text outside the JSON:
{
  "resumeScore": <integer 0-100>,
  "resumeReason": "<one short sentence explaining the resume score>",
  "linkedinScore": <integer 0-100>,
  "linkedinReason": "<one short sentence explaining the LinkedIn score>",
  "suggestions": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"],
  "matches": ["<point where resume and LinkedIn agree>", "<another match>"],
  "mismatches": ["<point where resume and LinkedIn disagree or one is missing something>"],
  "suggestedHeadline": "<an improved LinkedIn headline, under 220 characters>",
  "suggestedAbout": "<an improved LinkedIn About section, 3-5 sentences>"
}

RESUME TEXT:
"""
${resumeText.slice(0, 6000)}
"""

CURRENT LINKEDIN HEADLINE:
"""
${headline}
"""

CURRENT LINKEDIN ABOUT SECTION:
"""
${about}
"""`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    throw new Error(`Gemini API error (${response.status}). ${errBody.slice(0, 200)}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini API returned an empty response.");
  }

  try {
    return JSON.parse(rawText);
  } catch (e) {
    throw new Error("Could not understand the AI response. Please try again.");
  }
}
