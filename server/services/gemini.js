const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getSuggestedCategory = async (title) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an expense categorization assistant. Based on the following expense title, suggest the most suitable category from this list ONLY: 
["Food", "Transport", "Shopping", "Entertainment", "Bills", "Health", "Travel", "Utilities", "Education", "Other"].

Return ONLY the category label. No extra explanation.

Expense Title: "${title}"
Category:
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return text || "Other";
  } catch (err) {
    console.error("Gemini SDK error:", err.message);
    return "Other";
  }
};
