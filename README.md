# AI Appointment Scheduler Assistant 🗓️

An intelligent, end-to-end pipeline that converts natural language requests and images into structured, normalized appointment data.

## 🚀 Overview
This project leverages the **Gemini 2.0 Flash** model to process scheduling requests through a 4-step neural pipeline:
1.  **OCR/Text Extraction**: Converts noisy image inputs or raw text into clean strings.
2.  **Entity Extraction**: Identifies key components like date phrases, time, and medical departments.
3.  **Temporal Normalization**: Maps relative terms (e.g., "next Friday") to ISO 8601 formats in the `Asia/Kolkata` timezone.
4.  **Structured Output**: Generates a professional, human-readable appointment slip with a final JSON payload.

## 🛠️ Features
- **Multi-Modal Input**: Supports both direct text descriptions and image uploads (OCR).
- **Intelligent Guardrails**: Detects ambiguity and requests clarification if critical details are missing.
- **Real-world UI**: Transforms raw data into a physical-style "Appointment Ticket."
- **Live Pipeline Visualizer**: Real-time monitoring of each processing stage.

## 💻 How to Host Locally (VS Code)

Follow these steps to get the project running on your local machine:

### 1. Prerequisites
- **VS Code**: [Download here](https://code.visualstudio.com/).
- **Live Server Extension**: Install the "Live Server" extension by Ritwick Dey from the VS Code Marketplace.

### 2. Clone the Project
Open your terminal and run:
```bash
git clone <your-repository-url>
cd <project-folder-name>
```

### 3. Open in VS Code
```bash
code .
```

### 4. Setup API Key
The application expects a Google Gemini API Key. Since the app uses `process.env.API_KEY`, for local development without a build tool, you can either:
- **Option A (Recommended for Dev)**: Open `services/geminiService.ts` and temporarily replace `process.env.API_KEY` with your actual key string (Note: Do not commit your key to GitHub!).
- **Option B (Environment Variables)**: Use a tool like `Vite` or `Webpack` if you plan to scale the project.

### 5. Launch the App
1.  Open `index.html`.
2.  Right-click anywhere in the file editor.
3.  Select **"Open with Live Server"**.
4.  The app will automatically launch in your default browser at `http://127.0.0.1:5500`.

## 📂 Project Structure
- `index.html`: Main entry point and dependency management via ESM.
- `index.tsx`: React mounting logic.
- `App.tsx`: Main dashboard and state management.
- `services/`: Contains `geminiService.ts` for AI logic.
- `components/`: Modular UI components (Input, Slip, Visualizer).
- `types.ts`: TypeScript interfaces for the pipeline data.

---
**Note**: This project was developed as part of an AI Engineering Internship focus area on OCR, Entity Extraction, and Data Normalization.
