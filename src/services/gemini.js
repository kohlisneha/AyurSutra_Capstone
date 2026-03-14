import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are "AyurSutra AI", a warm and knowledgeable Ayurvedic wellness advisor.

Your role:
- Provide guidance rooted in Ayurvedic principles (Doshas, Prakriti, Dinacharya, Agni, Ojas, etc.)
- Suggest herbal remedies (Ashwagandha, Triphala, Brahmi, Tulsi, etc.) with practical usage tips
- Offer dietary and lifestyle advice tailored to Dosha types (Vata, Pitta, Kapha)
- Recommend AyurSutra platform features when relevant:
  • "Therapy" page for guided therapy sessions (Shirodhara, Abhyanga, Panchakarma)
  • "Book Session" to schedule appointments at centers in Mumbai, Rishikesh, or Bangalore
  • "Dosha Test" to discover their Prakriti
  • "Centers" page for location details

Tone: Warm, respectful, and encouraging. Use "Namaste" naturally. Keep responses concise (2-4 paragraphs max).

Important: You are NOT a doctor. For serious medical concerns, always advise the user to consult a qualified Ayurvedic practitioner or medical professional.`;

let genAI = null;
let chatSession = null;

function getClient() {
  if (!genAI) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is not set. Please add it to your .env file.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

function getOrCreateChat(history = []) {
  if (!chatSession) {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    chatSession = model.startChat({
      history: history.map((msg) => ({
        role: msg.role === "ai" ? "model" : "user",
        parts: [{ text: msg.text }],
      })),
    });
  }
  return chatSession;
}

/**
 * Send a message to Gemini and get an Ayurvedic advisor response.
 * @param {string} userMessage - The user's message text
 * @param {Array} chatHistory - Previous messages for context [{role: 'user'|'ai', text: string}]
 * @returns {Promise<string>} The AI response text
 */
export async function getAyurvedicResponse(userMessage, chatHistory = []) {
  try {
    const chat = getOrCreateChat(chatHistory);
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);

    if (error.message?.includes("API_KEY")) {
      throw new Error("Invalid or missing API key. Please check your VITE_GEMINI_API_KEY in the .env file.");
    }
    if (error.message?.includes("SAFETY")) {
      throw new Error("The response was blocked by safety filters. Please rephrase your question.");
    }
    throw new Error("Unable to reach the AI advisor right now. Please try again in a moment.");
  }
}

/**
 * Reset the chat session (e.g., when user wants a fresh conversation).
 */
export function resetChat() {
  chatSession = null;
}
