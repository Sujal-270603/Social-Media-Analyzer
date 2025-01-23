const backButton = document.getElementById("backButton");
// const darkModeToggle = document.getElementById("darkModeToggle");
// Populate Results
const analysisResult = JSON.parse(sessionStorage.getItem("analysisResult"));
if (analysisResult) {
  document.getElementById("tone").textContent = analysisResult.tone;
  document.getElementById("predictedLikes").textContent = analysisResult.predicted_likes;
  document.getElementById("hashtags").textContent = analysisResult.suggested_hashtags.join(", ");
  
  const suggestionsList = document.getElementById("suggestions");
  analysisResult.engagement_improvement.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });

  document.getElementById("optimalTime").textContent = analysisResult.optimal_posting_time;
  document.getElementById("engagementScore").textContent = analysisResult.engagement_score;
  const imageSuggestionsList = document.getElementById("imageSuggestions");
  analysisResult.image_suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    imageSuggestionsList.appendChild(li);
  });

} 
else {
  alert("No analysis results found. Please return to the form and try again.");
  window.location.href = "index.html";
}
// Back Button Functionality
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
// Dark Mode Toggle
// Get references to the dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');

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
