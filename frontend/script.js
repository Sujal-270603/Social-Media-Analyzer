
const form = document.getElementById('analyzerForm');
const responseContainer = document.getElementById('responseContainer');
const toneEl = document.getElementById('tone');
const predictedLikesEl = document.getElementById('predictedLikes');
const hashtagsEl = document.getElementById('hashtags');
const suggestionsEl = document.getElementById('suggestions');
const optimalTimeEl = document.getElementById('optimalTime');
const engagementScoreEl = document.getElementById('engagementScore');
const imageSuggstionsEL = document.getElementById('imageSuggestions');
const darkModeToggle = document.getElementById('darkModeToggle');
const loadingOverlay = document.getElementById('loadingOverlay');
const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('image');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
let uploadedFiles = [];
// Dark mode toggle functionality
darkModeToggle.addEventListener('click', () => {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode';
});
// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  loadingOverlay.classList.remove('hidden');
  try {
    const formData = new FormData(form);
    uploadedFiles.forEach((file) => formData.append('images', file));

    const response = await fetch(`https://social-media-analyzer-production-d759.up.railway.app//analyze`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
    const result = await response.json();
    toneEl.textContent = `Tone: ${result.tone}`;
    predictedLikesEl.textContent = `Predicted Likes: ${result.predicted_likes}`;
    hashtagsEl.textContent = `Suggested Hashtags: ${result.suggested_hashtags.join(', ')}`;
    suggestionsEl.textContent = `Engagement Improvement: ${result.engagement_improvement.join(', ')}`;
    optimalTimeEl.textContent = `Optimal Posting Time: ${result.optimal_posting_time}`;
    engagementScoreEl.textContent = `Engagement Score: ${result.engagement_score}`;
    imageSuggstionsEL.textContent = `Suggestions about image: ${result.image_suggestions}`;
    responseContainer.classList.remove('d-none');
  } catch (error) {
    console.error(error);
    alert('Error: ' + error.message);
  } finally {
    loadingOverlay.classList.add('hidden');
  }
});

dropZone.addEventListener('click', () => imageInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  imageInput.addEventListener('change', () => handleFiles(imageInput.files));

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      //console.log(file);
      if (!uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name)) {
        uploadedFiles.push(file);
        addImageToPreview(file);
      }
    });
  }

  function addImageToPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-preview-wrapper';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'image-preview';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-image';
      removeBtn.innerHTML = '✖';
      removeBtn.addEventListener('click', () => {
        wrapper.remove();
        uploadedFiles = uploadedFiles.filter((f) => f.name !== file.name);
      });

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      imagePreviewContainer.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
}