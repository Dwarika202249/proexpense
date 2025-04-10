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
      date,
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
    const expenses = await Expense.find({ user: req.user.userId }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error });
  }
};

// @desc    Get summary for user
// @route   GET /api/expenses/summary
// @access  Private
exports.getExpenseSummary = async (req, res) => {
  try {
    console.log(req.user.userId);
    
    
    const summary = await Expense.aggregate([
      { $match: { user: req.user.userId } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // console.log(summary);
    // console.log(Expense.cat);
    
    

    const totalSpent = summary.reduce((acc, cat) => acc + cat.totalAmount, 0);

    // console.log(totalSpent);
    

    res.status(200).json({
      totalSpent,
      categoryBreakdown: summary,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get summary", error: err });
  }
};

// @desc    Get monthly expenses for user
// @route   GET /api/expenses/monthly
// @access  Private
exports.getMonthlyExpenseStats = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      { $match: { user: req.user.userId } },
      {
        $group: {
          _id: { $month: "$date" },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch monthly stats", error: err });
  }
};
