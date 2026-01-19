# SchedulerAI 🗓️

A neural-powered appointment extractor that converts natural language and document images into verified scheduling data using Gemini 2.0 Flash.

## 🚀 Local Deployment (Host at 127.0.0.1:5500)

Because this project uses React and TypeScript (`.tsx`), a simple file server isn't enough. We use **Vite** for high-performance local development.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher) installed on your machine.

### 2. Installation
Open your terminal in the project folder and run:
```bash
npm install
```

### 3. Setup API Key
Create a file named `.env` in the root folder and add your key:
```env
VITE_API_KEY=your_gemini_api_key_here
```

### 4. Launch Project
Run the development server:
```bash
npm run dev
```
The app will automatically start at: **http://127.0.0.1:5500**

## 🏗️ Neural Pipeline
1. **OCR Stage**: Extracts raw strings from noisy image inputs.
2. **Extraction Stage**: Identifies named entities (Dept, Date, Time).
3. **Normalization Stage**: Converts relative phrases (e.g., "next week") to ISO 8601.
4. **Validation Stage**: Applied guardrails for temporal ambiguity.

---
Developed as a focus area for AI Engineering: Entity Extraction & Data Normalization.