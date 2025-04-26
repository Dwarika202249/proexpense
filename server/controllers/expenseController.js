const mongoose = require("mongoose");
const Expense = require("../models/Expense");


// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    
    const { title, category, date } = req.body;
    const amount = Number(req.body.amount);
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
    res.status(500).json({ message: "Failed to add`, expense", error });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
exports.updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.findOne({ _id: expenseId, user: req.user.userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    expense.title = title;
    expense.amount = Number(amount);
    expense.category = category;
    expense.date = new Date(date);

    await expense.save();

    res.status(200).json({ message: "Expense updated successfully ✨", expense });
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense", error: err });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: req.user.userId,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.status(200).json({ message: "Expense deleted successfully 🗑️" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense", error: err });
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

// @desc    Get filtered expenses by category & date range
// @route   GET /api/expenses/filter
// @access  Private
exports.getFilteredExpenses = async (req, res) => {
  try {
    const { category, from, to } = req.query;

    let query = { user: req.user.userId };

    // Add category filter if present
    if (category) {
      query.category = category;
    }

    // Add date range if from & to are present
    if (from && to) {
      query.date = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch filtered expenses",
      error: error.message,
    });
  }
};

// @desc    Get summary for user (with optional month filter)
// @route   GET /api/expenses/summary?month=2024-04
// @access  Private
exports.getExpenseSummary = async (req, res) => {
  try {
    const { month } = req.query;

    const matchQuery = {
      user: new mongoose.Types.ObjectId(req.user.userId),
    };

    if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      matchQuery.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const summary = await Expense.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalSpent = summary.reduce((acc, cat) => acc + cat.totalAmount, 0);

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
      { $match: { user: new mongoose.Types.ObjectId(req.user.userId) } },
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



