// Reel Spark - Day 5: Tab switching, validation, simulated analyze flow
// (Real Claude API integration comes on Day 6 — this uses placeholder data for now)

// Configure pdf.js worker (required for pdf.js to function)
if (typeof pdfjsLib !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

// In-memory state (per SCHEMA.md)
let resumeState = {
  fileName: null,
  fileType: null,
  extractedText: "",
  isValid: false,
};

let linkedinState = {
  headline: "",
  about: "",
};

let appState = {
  currentTab: "score",
  isLoading: false,
  hasError: false,
};

// ---------- Grab elements ----------
const resumeInput = document.getElementById("resumeInput");
const uploadBox = document.getElementById("uploadBox");
const uploadText = document.getElementById("uploadText");
const uploadError = document.getElementById("uploadError");
const uploadSuccess = document.getElementById("uploadSuccess");

const headlineInput = document.getElementById("headlineInput");
const aboutInput = document.getElementById("aboutInput");

const analyzeBtn = document.getElementById("analyzeBtn");
const validationHint = document.getElementById("validationHint");

const loadingSection = document.getElementById("loadingSection");
const loadingText = document.getElementById("loadingText");
const resultsSection = document.getElementById("resultsSection");

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

const copyButtons = document.querySelectorAll(".copy-button");

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// ---------- Upload helpers (from Day 4) ----------
function showError(message) {
  uploadError.textContent = message;
  uploadError.hidden = false;
  uploadSuccess.hidden = true;
  resumeState.isValid = false;
  updateAnalyzeButtonState();
}

function showSuccess(message) {
  uploadSuccess.textContent = message;
  uploadSuccess.hidden = false;
  uploadError.hidden = true;
}

function clearMessages() {
  uploadError.hidden = true;
  uploadSuccess.hidden = true;
}

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n\n";
  }

  return fullText.trim();
}

async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
  return result.value.trim();
}

async function handleFileUpload(file) {
  clearMessages();

  if (!file) {
    return;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    showError("That file is too large. Please upload a resume under 5MB.");
    return;
  }

  const fileName = file.name.toLowerCase();
  let fileType = null;

  if (fileName.endsWith(".pdf")) {
    fileType = "pdf";
  } else if (fileName.endsWith(".docx")) {
    fileType = "docx";
  } else {
    showError("Please upload a .pdf or .docx file. Other formats aren't supported yet.");
    return;
  }

  uploadText.textContent = "Reading your resume...";

  try {
    let extractedText = "";

    if (fileType === "pdf") {
      extractedText = await extractTextFromPDF(file);
    } else if (fileType === "docx") {
      extractedText = await extractTextFromDOCX(file);
    }

    if (!extractedText || extractedText.length === 0) {
      showError(
        "We couldn't find any text in that file. If it's a scanned/image-only PDF, please try a text-based version instead."
      );
      uploadText.textContent = "Drag & drop your resume, or tap to browse";
      return;
    }

    resumeState = {
      fileName: file.name,
      fileType: fileType,
      extractedText: extractedText,
      isValid: true,
    };

    uploadText.textContent = "Drag & drop your resume, or tap to browse";
    showSuccess(`"${file.name}" uploaded and read successfully.`);
    updateAnalyzeButtonState();
  } catch (err) {
    console.error("Error parsing file:", err);
    showError("Something went wrong while reading that file. Please try again or use a different file.");
    uploadText.textContent = "Drag & drop your resume, or tap to browse";
  }
}

resumeInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  handleFileUpload(file);
});

uploadBox.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadBox.classList.add("drag-over");
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("drag-over");
});

uploadBox.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadBox.classList.remove("drag-over");
  const file = event.dataTransfer.files[0];
  handleFileUpload(file);
});

// ---------- LinkedIn inputs ----------
headlineInput.addEventListener("input", (event) => {
  linkedinState.headline = event.target.value.trim();
  updateAnalyzeButtonState();
});

aboutInput.addEventListener("input", (event) => {
  linkedinState.about = event.target.value.trim();
  updateAnalyzeButtonState();
});

// ---------- Validation: enable/disable Analyze button ----------
function updateAnalyzeButtonState() {
  const allFieldsFilled =
    resumeState.isValid &&
    linkedinState.headline.length > 0 &&
    linkedinState.about.length > 0;

  analyzeBtn.disabled = !allFieldsFilled;
  validationHint.hidden = allFieldsFilled;
}

// ---------- Tab switching ----------
function switchTab(tabName) {
  tabButtons.forEach((btn) => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  tabContents.forEach((content) => {
    if (content.id === `tab-${tabName}`) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });

  appState.currentTab = tabName;
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchTab(btn.dataset.tab);
  });
});

// ---------- Simulated "Analyze" flow (placeholder — real AI comes Day 6) ----------
const loadingMessages = [
  "Reading your resume...",
  "Comparing with LinkedIn...",
  "Polishing suggestions...",
];

function runSimulatedAnalysis() {
  appState.isLoading = true;
  loadingSection.hidden = false;
  resultsSection.hidden = true;
  analyzeBtn.disabled = true;

  let messageIndex = 0;
  loadingText.textContent = loadingMessages[0];

  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[messageIndex];
  }, 900);

  // Simulate network delay before showing (placeholder) results
  setTimeout(() => {
    clearInterval(messageInterval);
    appState.isLoading = false;
    loadingSection.hidden = true;
    resultsSection.hidden = false;
    analyzeBtn.disabled = false;
    switchTab("score");

    console.log("Simulated analysis complete. Real AI integration comes on Day 6.");
    console.log("Resume text length:", resumeState.extractedText.length);
    console.log("LinkedIn headline:", linkedinState.headline);
    console.log("LinkedIn about:", linkedinState.about);
  }, 2200);
}

analyzeBtn.addEventListener("click", () => {
  if (analyzeBtn.disabled) return;
  runSimulatedAnalysis();
});

// ---------- Copy to clipboard ----------
copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const rewriteBlock = button.closest(".rewrite-block");
    const textElement = rewriteBlock.querySelector(".rewrite-suggested");
    const textToCopy = textElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalLabel = button.textContent;
      button.textContent = "Copied!";
      button.classList.add("copied");

      setTimeout(() => {
        button.textContent = originalLabel;
        button.classList.remove("copied");
      }, 1500);
    }).catch((err) => {
      console.error("Copy failed:", err);
    });
  });
});

console.log("Reel Spark script loaded. Day 5 features ready: LinkedIn inputs, tabs, validation.");
