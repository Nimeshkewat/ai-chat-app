import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const generateResponse = async (messages: any[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    })),
  });
  if (!response.text) {
    throw new Error("Gemini returned no text response");
  }

  return response.text;
};
