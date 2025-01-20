# Social Media Content Analyzer

Social Media Content Analyzer is a web application designed to help users analyze and improve their social media posts by providing insights such as tone analysis, predicted likes, suggested hashtags, and engagement improvement tips. The project uses modern technologies such as Node.js, OpenAI, and Google Vision API to deliver powerful content analysis.

## 🛠 Features

- Analyze the tone of social media posts (Positive/Negative/Neutral).
- Predict the number of likes based on post content.
- Suggest hashtags and engagement improvement tips.
- Provide optimal posting time for better reach.
- Fully responsive frontend using HTML, CSS, and JavaScript.
- Backend powered by Node.js and OpenAI integration.

## 📂 Folder Structure

The project is structured as follows:

```
SOCIALMEDIAANALYZER/
├── backend/                   # Backend application
│   ├── controllers/           # Route handling logic
│   │   └── getSuggestions.js  # Logic for generating content suggestions
│   ├── middleware/            # Reusable middleware functions
│   ├── routers/               # Route definitions
│   ├── uploads/               # Temporary storage for uploaded files
│   ├── utils/                 # Utility functions and reusable modules
│   │   ├── ApiResponse.js     # Helper for standardized API responses
│   │   ├── clients.js         # Configuration for external clients (e.g., OpenAI)
│   │   ├── handleMulter.js    # File upload handling logic
│   │   └── index.js           # Additional utilities
│   ├── node_modules/          # Installed backend dependencies
│   ├── package.json           # Backend dependencies and scripts
│   └── package-lock.json      # Backend dependency lock file
├── frontend/                  # Frontend application
│   ├── assets/                # Static assets
│   │   ├── bg.jpg             # Background image
│   │   └── style.css          # CSS styles
│   ├── index.html             # Main HTML file for the application
│   ├── script.js              # JavaScript logic for the frontend
├── .env                       # Environment variables
├── .gitignore                 # Ignored files for Git
├── README.md                  # Project documentation
```

## 🚀 Technologies Used

### Frontend:
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend:
- Node.js
- Express.js
- OpenAI API
- Google Vision API (Optional for image processing)

## 🛠 Prerequisites

- Node.js installed on your system.
- OpenAI API Key.
- Google Cloud Vision API Key (Optional).

## 🔧 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Social-Media-Analyzer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SocialMediaAnalyzer
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies (if applicable):
   ```bash
   cd ../frontend
   npm install
   ```
5. Create a `.env` file in the `backend/` directory and add your keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_APPLICATION_CREDENTIALS=path_to_google_cloud_key.json
   ```
6. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
7. Open the `frontend/index.html` file in your browser.

## 🖼 Demo

![Demo Screenshot](frontend/assets/bg.jpg)

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify it for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.
