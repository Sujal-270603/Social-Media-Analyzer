const form = document.getElementById("analyzerForm");
const loadingOverlay = document.getElementById("loadingOverlay");
const darkModeToggle = document.getElementById("darkModeToggle");
const dropZone = document.getElementById("dropZone");
const imageInput = document.getElementById("image");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
let uploadedFiles = [];

// Click on drop zone to trigger file input
dropZone.addEventListener("click", () => imageInput.click());

// Handle drag over event
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

// Handle drag leave event
dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

// Handle file drop
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  handleFiles(e.dataTransfer.files);
});

// Handle file input change
imageInput.addEventListener("change", () => handleFiles(imageInput.files));

// Function to handle uploaded files
function handleFiles(files) {
  Array.from(files).forEach((file) => {
    // Prevent duplicate uploads
    if (!uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name)) {
      uploadedFiles.push(file);
      addImageToPreview(file);
    }
  });
}

// Function to add image preview
function addImageToPreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const wrapper = document.createElement("div");
    wrapper.className = "image-preview-wrapper";

    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = file.name;
    img.className = "image-preview";

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-image";
    removeBtn.innerHTML = "✖";
    removeBtn.addEventListener("click", () => {
      wrapper.remove();
      uploadedFiles = uploadedFiles.filter((f) => f.name !== file.name);
    });

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    imagePreviewContainer.appendChild(wrapper);
  };
  reader.readAsDataURL(file);
}
// Dark mode toggle functionality
// Get references to the dark mode toggle button
// const darkModeToggle = document.getElementById('darkModeToggle');

// Check localStorage for the current dark mode state
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode class if it was enabled previously
if (isDarkMode) {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = 'Disable Dark Mode';
} else {
  darkModeToggle.textContent = 'Enable Dark Mode';
}

// Add event listener to the toggle button
darkModeToggle.addEventListener('click', () => {
  const isDarkModeEnabled = document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = isDarkModeEnabled
    ? 'Disable Dark Mode'
    : 'Enable Dark Mode';

  // Save the state in localStorage
  localStorage.setItem('darkMode', isDarkModeEnabled);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadingOverlay.classList.remove("hidden");
  const formData = new FormData(form);
  try {
    const response = await fetch("https://social-media-analyzer-production-d759.up.railway.app/analyze", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to fetch data.");
    const result = await response.json();
    sessionStorage.setItem("analysisResult", JSON.stringify(result));
    window.location.href = "response.html";
  } catch (err) {
    console.error(err.message);
    alert("An error occurred while analyzing the post.");
  } finally {
    loadingOverlay.classList.add("hidden");
  }
});