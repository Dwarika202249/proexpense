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
