
// Reel Spark - Day 4 Milestone 2
// Resume upload + PDF/DOCX parsing

// Configure pdf.js worker (required for pdf.js to function)
if (typeof pdfjsLib !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

// In-memory state (per SCHEMA.md resumeState model)
let resumeState = {
  fileName: null,
  fileType: null,
  extractedText: "",
  isValid: false,
};

// Grab elements
const resumeInput = document.getElementById("resumeInput");
const uploadBox = document.getElementById("uploadBox");
const uploadText = document.getElementById("uploadText");
const uploadError = document.getElementById("uploadError");
const uploadSuccess = document.getElementById("uploadSuccess");
const previewSection = document.getElementById("previewSection");
const resumeTextPreview = document.getElementById("resumeTextPreview");

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Helper: show error message, hide success
function showError(message) {
  uploadError.textContent = message;
  uploadError.hidden = false;
  uploadSuccess.hidden = true;
  previewSection.hidden = true;
  resumeState.isValid = false;
}

// Helper: show success message, hide error
function showSuccess(message) {
  uploadSuccess.textContent = message;
  uploadSuccess.hidden = false;
  uploadError.hidden = true;
}

// Helper: reset messages
function clearMessages() {
  uploadError.hidden = true;
  uploadSuccess.hidden = true;
}

// Extract text from a PDF file using pdf.js
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

// Extract text from a DOCX file using mammoth.js
async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
  return result.value.trim();
}

// Main handler: called whenever a file is selected/dropped
async function handleFileUpload(file) {
  clearMessages();

  if (!file) {
    return;
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showError("That file is too large. Please upload a resume under 5MB.");
    return;
  }

  // Determine file type from extension
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

    // Save to state
    resumeState = {
      fileName: file.name,
      fileType: fileType,
      extractedText: extractedText,
      isValid: true,
    };

    uploadText.textContent = "Drag & drop your resume, or tap to browse";
    showSuccess(`"${file.name}" uploaded and read successfully.`);

    // Temporary preview (will be replaced by tabs on Day 5)
    resumeTextPreview.textContent = extractedText;
    previewSection.hidden = false;

    console.log("Resume parsed successfully:", resumeState.fileName, "-", extractedText.length, "characters");
  } catch (err) {
    console.error("Error parsing file:", err);
    showError("Something went wrong while reading that file. Please try again or use a different file.");
    uploadText.textContent = "Drag & drop your resume, or tap to browse";
  }
}

// Event: file picked via click/tap
resumeInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  handleFileUpload(file);
});

// Events: drag & drop support
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

console.log("Reel Spark script loaded. Ready for resume upload.");
