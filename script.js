// Reel Spark — Day 9: accessible tabs, keyboard support, empty-state fallbacks

if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const state = {
  resumeText: "",
  resumeFileName: "",
  isResumeValid: false,
  headline: "",
  about: "",
};

// DOM references
const resumeInput = document.getElementById("resumeInput");
const uploadBox = document.getElementById("uploadBox");
const uploadText = document.getElementById("uploadText");
const uploadError = document.getElementById("uploadError");
const uploadSuccess = document.getElementById("uploadSuccess");

const headlineInput = document.getElementById("headlineInput");
const aboutInput = document.getElementById("aboutInput");

const analyzeBtn = document.getElementById("analyzeBtn");
const validationHint = document.getElementById("validationHint");
const analysisError = document.getElementById("analysisError");

const loadingSection = document.getElementById("loadingSection");
const loadingText = document.getElementById("loadingText");
const resultsSection = document.getElementById("resultsSection");

const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const tabContents = document.querySelectorAll(".tab-content");
const copyButtons = document.querySelectorAll(".copy-button");

// ---------- File upload & parsing ----------

function showUploadError(message) {
  uploadError.hidden = false;
  uploadError.textContent = message;
}

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
}

async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function handleFile(file) {
  uploadError.hidden = true;
  uploadSuccess.hidden = true;
  state.isResumeValid = false;
  state.resumeText = "";
  updateAnalyzeButtonState();

  if (!file) return;

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  const isDocx = file.name.toLowerCase().endsWith(".docx");

  if (!isPdf && !isDocx) {
    showUploadError("Please upload a .pdf or .docx file.");
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    showUploadError("File is too large. Max size is 5MB.");
    return;
  }

  uploadText.textContent = "Reading file...";

  try {
    const text = isPdf ? await extractPdfText(file) : await extractDocxText(file);

    if (!text || text.trim().length < 20) {
      showUploadError("Could not read text from this file. Try a different file.");
      uploadText.textContent = "Drag & drop your resume, or tap to browse";
      return;
    }

    state.resumeText = text;
    state.resumeFileName = file.name;
    state.isResumeValid = true;
    uploadText.textContent = "Drag & drop your resume, or tap to browse";
    uploadSuccess.hidden = false;
    uploadSuccess.textContent = `"${file.name}" uploaded and read successfully.`;
  } catch (err) {
    console.error(err);
    showUploadError("Something went wrong reading this file. Please try again.");
    uploadText.textContent = "Drag & drop your resume, or tap to browse";
  }

  updateAnalyzeButtonState();
}

resumeInput.addEventListener("change", () => {
  handleFile(resumeInput.files[0]);
});

uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("drag-active");
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("drag-active");
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("drag-active");
  const file = e.dataTransfer.files[0];
  if (file) {
    resumeInput.files = e.dataTransfer.files;
    handleFile(file);
  }
});

// ---------- LinkedIn fields ----------

headlineInput.addEventListener("input", () => {
  state.headline = headlineInput.value;
  updateAnalyzeButtonState();
});

aboutInput.addEventListener("input", () => {
  state.about = aboutInput.value;
  updateAnalyzeButtonState();
});

function updateAnalyzeButtonState() {
  const allFilled =
    state.isResumeValid && state.headline.trim().length > 0 && state.about.trim().length > 0;
  analyzeBtn.disabled = !allFilled;
  validationHint.hidden = allFilled;
}

// ---------- Gemini API (via Cloudflare Worker) ----------

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

If there are genuinely no meaningful suggestions, matches, or mismatches, return an empty array for that field rather than inventing filler content.

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

function fillListOrFallback(listEl, items, fallbackText) {
  listEl.innerHTML = "";
  if (!items || items.length === 0) {
    const li = document.createElement("li");
    li.textContent = fallbackText;
    li.classList.add("empty-state-item");
    listEl.appendChild(li);
    return;
  }
  items.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    listEl.appendChild(li);
  });
}

function renderResults(result) {
  document.getElementById("resumeScoreValue").textContent = `${result.resumeScore} / 100`;
  document.getElementById("resumeScoreReason").textContent = result.resumeReason || "";
  document.getElementById("linkedinScoreValue").textContent = `${result.linkedinScore} / 100`;
  document.getElementById("linkedinScoreReason").textContent = result.linkedinReason || "";

  fillListOrFallback(
    document.getElementById("suggestionsList"),
    result.suggestions,
    "Great! No major suggestions — your profile already looks solid."
  );

  fillListOrFallback(
    document.getElementById("matchList"),
    result.matches,
    "No strong overlaps found yet between your resume and LinkedIn."
  );

  fillListOrFallback(
    document.getElementById("mismatchList"),
    result.mismatches,
    "No mismatches found — your resume and LinkedIn align well!"
  );

  document.getElementById("currentHeadlineText").textContent = state.headline;
  document.getElementById("suggestedHeadlineText").textContent = result.suggestedHeadline || "";
  document.getElementById("suggestedAboutText").textContent = result.suggestedAbout || "";
}

const loadingMessages = [
  "Reading your resume...",
  "Comparing it with your LinkedIn profile...",
  "Scoring your profile...",
  "Writing suggestions...",
  "Almost done...",
];

async function runAnalysis() {
  analysisError.hidden = true;
  resultsSection.hidden = true;
  loadingSection.hidden = false;

  let messageIndex = 0;
  loadingText.textContent = loadingMessages[0];
  const messageTimer = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[messageIndex];
  }, 1800);

  try {
    const result = await callGeminiAPI(state.resumeText, state.headline, state.about);
    renderResults(result);
    loadingSection.hidden = true;
    resultsSection.hidden = false;
    switchTab("score");
  } catch (err) {
    console.error(err);
    loadingSection.hidden = true;
    analysisError.hidden = false;
    analysisError.textContent = `Something went wrong: ${err.message}`;
  } finally {
    clearInterval(messageTimer);
  }
}

analyzeBtn.addEventListener("click", runAnalysis);

// ---------- Accessible tabs (roving tabindex + arrow key navigation) ----------

function switchTab(tabName) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
    btn.tabIndex = isActive ? 0 : -1;
  });
  tabContents.forEach((content) => {
    content.classList.toggle("active", content.id === `tab-${tabName}`);
  });
}

tabButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    switchTab(btn.dataset.tab);
    btn.focus();
  });

  btn.addEventListener("keydown", (e) => {
    let newIndex = null;
    if (e.key === "ArrowRight") newIndex = (index + 1) % tabButtons.length;
    if (e.key === "ArrowLeft") newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    if (e.key === "Home") newIndex = 0;
    if (e.key === "End") newIndex = tabButtons.length - 1;

    if (newIndex !== null) {
      e.preventDefault();
      const nextBtn = tabButtons[newIndex];
      switchTab(nextBtn.dataset.tab);
      nextBtn.focus();
    }
  });
});

// ---------- Copy buttons ----------

copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const block = btn.closest(".rewrite-block");
    const textEl = block.querySelector(".rewrite-suggested");
    if (!textEl || !textEl.textContent) return;

    navigator.clipboard.writeText(textEl.textContent).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 2000);
    });
  });
});
