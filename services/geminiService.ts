
import { GoogleGenAI, Type } from "@google/genai";
import { PipelineResponse } from "../types";

export const processAppointmentRequest = async (
  input: string | { base64: string; mimeType: string },
  currentDate: string
): Promise<PipelineResponse> => {
  // Always use a named parameter for the API key and use process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are an expert AI Scheduler Assistant. Your task is to process appointment requests through a 4-step pipeline:
    
    1. OCR/Text Extraction: Convert input to clean, raw text.
    2. Entity Extraction: Identify 'date_phrase', 'time_phrase', and 'department'.
    3. Normalization: Map phrases to ISO 8601 'date' (YYYY-MM-DD) and 24-hour 'time' (HH:mm) for Asia/Kolkata.
    4. Guardrail: 
       - If date, time, and department are all reasonably clear, set status to 'ok'.
       - If critical information is missing or highly ambiguous, set status to 'needs_clarification' and provide a helpful message.
    
    Context:
    - Current System Date: ${currentDate}
    - Target Timezone: Asia/Kolkata
    
    Processing Rules:
    - "Next [Day]" refers to the upcoming occurrence of that day after today.
    - If the user says "Friday" and today is Friday, "Friday" means today, while "next Friday" means 7 days from now.
    - Departments should be normalized (e.g., "dentist" -> "Dentistry", "heart doctor" -> "Cardiology").
  `;

  const contents = typeof input === 'string' 
    ? { parts: [{ text: `User request: "${input}"` }] }
    : {
        parts: [
          {
            inlineData: {
              data: input.base64,
              mimeType: input.mimeType
            }
          },
          { text: "Extract the appointment details from this image." }
        ]
      };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          step1_ocr: {
            type: Type.OBJECT,
            properties: {
              raw_text: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ["raw_text", "confidence"]
          },
          step2_entities: {
            type: Type.OBJECT,
            properties: {
              date_phrase: { type: Type.STRING },
              time_phrase: { type: Type.STRING },
              department: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ["date_phrase", "time_phrase", "department", "confidence"]
          },
          step3_normalization: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING },
              time: { type: Type.STRING },
              tz: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ["date", "time", "tz", "confidence"]
          },
          step4_final: {
            type: Type.OBJECT,
            properties: {
              appointment: {
                type: Type.OBJECT,
                properties: {
                  department: { type: Type.STRING },
                  date: { type: Type.STRING },
                  time: { type: Type.STRING },
                  tz: { type: Type.STRING }
                },
                required: ["department", "date", "time", "tz"]
              },
              status: { type: Type.STRING, description: "Must be 'ok' or 'needs_clarification'" },
              message: { type: Type.STRING, description: "Clarification request or success message" }
            },
            required: ["status"]
          }
        },
        required: ["step1_ocr", "step2_entities", "step3_normalization", "step4_final"]
      }
    }
  });

  // Extract text output using the .text property as per guidelines.
  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr) as PipelineResponse;
};

export const encodeFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
