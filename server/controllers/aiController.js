const Expense = require("../models/Expense.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const { getSuggestedCategory } = require("../services/gemini.js");

exports.categorizeTitle = async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const category = await getSuggestedCategory(title);
    res.json({ category });
  } catch (err) {
    console.error("Error in categorizeTitle:", err);
    res.status(500).json({ error: "Failed to predict category" });
  }
};

exports.generateMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Fetch expenses of this month
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startOfMonth },
    });

    if (!expenses.length) {
      return res
        .status(404)
        .json({ message: "No expenses found for this month." });
    }

    // Prepare data for Gemini prompt
    const expenseSummary = expenses
      .map((exp) => `${exp.title} (${exp.category}) - ₹${exp.amount}`)
      .join(", ");

    const prompt = `
You are a financial assistant. 
Summarize the user's spending pattern based on the following expenses for this month:
${expenseSummary}

Give insights like where most money is spent, any patterns noticed, and simple advice.
Respond in 3-5 lines maximum.
Use simple and friendly language.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.candidates[0]?.content?.parts[0]?.text;

    return res.json({ summary: text || "Could not generate summary." });
  } catch (error) {
    console.error("Summary generation error:", error.message);
    return res.status(500).json({ message: "Failed to generate summary." });
  }
};

exports.getBudgetAdvice = async (req, res) => {
  try {
    const { income, customPrompt } = req.body;

    if (!income) {
      return res.status(400).json({ message: "Income is required" });
    }

    const basePrompt = `
You are a financial advisor AI.

Based on a monthly income of ₹${income}, suggest an ideal budget allocation.
Cover categories like:
- Rent/Housing
- Food
- Transportation
- Savings
- Entertainment

Give percentages and rough ₹ amounts.
Keep it simple and human-readable.
Output in bullet points with emojis.
`;

    const finalPrompt = customPrompt && customPrompt.trim() !== ""
      ? `${basePrompt}\n\nAdditional Instructions: ${customPrompt}`
      : basePrompt;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;

    const advice = response.text();

    res.json({ advice });
  } catch (error) {
    console.error("Error generating budget advice:", error);
    res.status(500).json({ message: "Failed to generate budget advice" });
  }
};
