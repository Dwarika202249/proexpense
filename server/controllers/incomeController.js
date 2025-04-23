// backend/controllers/incomeController.js
const Income = require("../models/Income.js");

// GET income for specific month
exports.getMonthlyIncome = async (req, res) => {
  const userId = req.user.userId;
  const { month } = req.query;

  try {
    const income = await Income.findOne({ userId, month });
    res.status(200).json(income || { amount: 0 });
  } catch (err) {
    console.error("Error fetching monthly income:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE or UPDATE income for specific month
exports.upsertMonthlyIncome = async (req, res) => {
  const userId = req.user.userId;
  
  const { amount, month } = req.body;

  if (!amount || !month) {
    return res.status(400).json({ error: "Amount and month are required" });
  }

  try {
    const updated = await Income.findOneAndUpdate(
      { userId, month },
      { amount },
      { new: true, upsert: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error saving income:", err);
    res.status(500).json({ error: "Server error" });
  }
};
