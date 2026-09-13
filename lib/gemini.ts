import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const ai = new GoogleGenAI({ apiKey });

export const GEMINI_MODEL_TEXT = "gemini-1.5-flash";
export const GEMINI_MODEL_EMBEDDING = "gemini-embedding-001";

export async function generateEmbedding(text: string): Promise<number[]> {
  const sanitizedText = text.replace(/\n/g, " ").trim();
  
  const response: any = await ai.models.embedContent({
    model: GEMINI_MODEL_EMBEDDING,
    contents: sanitizedText,
    config: {
      outputDimensionality: 768,
    },
  });

  const values = response?.embedding?.values || response?.embeddings?.[0]?.values;
  if (!values) {
    throw new Error("Failed to generate embedding from Gemini API.");
  }

  return values as number[];
}