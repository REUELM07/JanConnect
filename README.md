# JanConnect AI 🇮🇳
### AI-Powered Citizen Assistance Platform

JanConnect AI is a smart digital citizen assistance platform designed to simplify access to government services. It uses AI to help citizens understand government procedures, explore public information, prepare applications, and draft civic complaints through a unified interface.

## 🔗 Live Demo & Repository

- **Live Website:** https://janconnect-3nt4.onrender.com/
- **GitHub Repository:** https://github.com/deepikachopra9501-ship-it/JanConnect.git

> Open the live website to explore JanConnect AI and its features.

## ✨ Key Features

### 1. Government Services Directory
Provides a centralised directory of useful government services and official portals, helping citizens find relevant services more easily.

### 2. AI-Powered Policy Search
Allows citizens to ask questions about government policies, procedures, eligibility requirements, and public services using natural language.

### 3. Civic Complaint Assistant
Helps citizens describe civic problems and uses AI to understand the issue and prepare structured complaint drafts.

### 4. Application Assistant
Guides citizens through application-related processes by explaining requirements and helping them prepare relevant information.

### 5. Document Analysis
Allows users to upload documents for AI-powered analysis and assistance.

### 6. Voice Input
Supports voice-based interaction using browser speech recognition and audio processing capabilities.

### 7. My Applications
Provides a section where users can access their saved application-related records within the platform.

### 8. User Authentication
Includes login and registration functionality to provide a personalised user experience.

### 9. Integrated Browser Workspace
Provides a workspace to help users navigate relevant online service resources.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Animations | Motion |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Programming Language | TypeScript |
| AI Integration | Google Gemini API |
| Voice Input | Web Speech API, MediaRecorder API |
| API Communication | REST APIs |
| Data Storage | JSON-based local file storage |
| Deployment | Render |
| Version Control | Git & GitHub |

## 🏗️ System Architecture

The platform follows a client-server architecture.

```text
             CITIZEN
                |
                v
       REACT FRONTEND
                |
                v
       EXPRESS BACKEND
                |
        +-------+-------+
        |               |
        v               v
   GEMINI API       JSON STORAGE
        |               |
        v               v
   AI RESPONSES    APPLICATION DATA
        |
        v
   USER INTERFACE
```

## 🚀 Getting Started

Follow these steps to run JanConnect AI on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (Node.js 18 or later recommended)
- npm (included with Node.js)
- Git
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/deepikachopra9501-ship-it/JanConnect.git
```

### 2. Navigate to the Project

```bash
cd JanConnect
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Get your API key from:

https://aistudio.google.com/apikey

**Important:** Never share your API key publicly or commit your `.env` file to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

### 6. Build for Production

```bash
npm run build
```

### 7. Start the Production Server

```bash
npm run start
```

## ☁️ Deployment

JanConnect AI is deployed using Render.

**Live URL:** https://janconnect-3nt4.onrender.com/

The application is deployed as a Node.js web service. The production build is generated and served through the Express backend.

## 🔐 AI Integration

JanConnect AI integrates Google's Gemini API to provide intelligent assistance.

Gemini supports features such as:

- Understanding citizen queries.
- Generating structured complaint drafts.
- Assisting with application-related questions.
- Analysing uploaded documents.
- Providing conversational assistance.

The Gemini API key is configured on the backend using environment variables.

## 🏛️ Government Data & Integration

JanConnect AI currently focuses on helping citizens access and understand publicly available government information.

The platform assists users in preparing applications and navigating relevant government services.

**Important:** Direct integration with government databases, live application-status retrieval, and automatic submission to portals such as Sarathi are not currently implemented. Actual submissions and official verification are handled through the relevant government portals.

Future development may include authorised government API integrations, subject to official approval and security requirements.

## 📌 Current Data Storage

The current implementation uses JSON-based local file storage for application data.

A managed database solution can be considered in future versions to support persistent cloud storage and larger-scale multi-user usage.

## 🔮 Future Enhancements

- Integration with authorised government APIs.
- Verified government information retrieval with source references.
- Persistent cloud database integration.
- Improved multilingual voice assistance.
- Enhanced document processing.
- Application status integration where officially supported.
- Stronger privacy and data protection controls.

## 🎯 Project Vision

Our vision is to make government services easier to understand and navigate by bringing AI-powered citizen assistance into one unified platform.

JanConnect AI aims to reduce complexity, improve accessibility, and help citizens interact with digital public services more confidently.

---

**Built with ❤️ by Team JanConnect AI**
