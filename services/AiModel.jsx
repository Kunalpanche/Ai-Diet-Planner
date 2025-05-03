
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

  export const CalculateCaloriesAI = async(PROMPT) => await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: PROMPT,
  });
