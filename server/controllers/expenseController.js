const Expense = require("../models/Expense");

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = new Expense({
      user: req.user.userId, // from JWT middleware
      title,
      amount,
      category,
      date
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully 💸", expense });
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense", error });
  }
};

// @desc    Get all expenses for user
// @route   GET /api/expenses
// @access  Private
exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error });
  }
};
