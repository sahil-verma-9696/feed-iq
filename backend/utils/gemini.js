const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getLLMFeedbackAnalysis(text) {
    const prompt = `
    You are an expert event feedback analyst assisting the event organizer.
    
    Analyze the following feedback text and provide a JSON response containing:
    
    1. The overall sentiment expressed ("positive", "negative", or "neutral").
    2. A list of 3 to 5 important keywords or key phrases capturing the main points.
    3. One practical, specific, and actionable suggestion the event organizer can implement to improve future events.
    
    Respond ONLY with valid JSON in the exact format below, without any extra explanation or text:
    
    {
      "sentiment": "positive" | "negative" | "neutral",
      "keywords": [list of 3-5 important keywords or phrases],
      "suggestion": "One practical and specific suggestion for improvement"
    }
    
    Here is the feedback text:
    """${text}"""
    `;
    

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-1.5-pro"
      //   contents: [{ role: "user", parts: [{ text: prompt }] }],
      contents: prompt,
    });

    // console.log("response:", response);
    // console.log("response text:", response.text);

    const rawText = response.text; 
    // console.log("🔍 Raw Response:", rawText);

    // Extract JSON safely
    const jsonStart = response.text.indexOf("{");
    const jsonEnd = response.text.lastIndexOf("}");
    const jsonStr = response.text.slice(jsonStart, jsonEnd + 1);

    // console.log("🔍 JSON Response:", jsonStr);

    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("❌ LLM Error:", err.message);
    return {
      sentiment: "neutral",
      keywords: [],
      suggestion: "Thank you for your feedback.",
    };
  }
}

module.exports = { getLLMFeedbackAnalysis };
