const express = require("express");
const router = express.Router();
const {
  addExpense,
  getUserExpenses,
  getFilteredExpenses,
  getExpenseSummary,
  getMonthlyExpenseStats
} = require("../controllers/expenseController");

  
const verifyToken = require("../middlewares/authMiddleware");
  


// @route   POST /api/expenses
// @desc    Add new expense
// @access  Private
router.post("/", verifyToken, addExpense);

// @route   GET /api/expenses
// @desc    Get user's expenses
// @access  Private
router.get("/", verifyToken, getUserExpenses);

// @route   GET /api/expenses/summary
// @desc    summmary
// @access  Private
router.get("/summary", verifyToken, getExpenseSummary);

// @route   GET /api/expenses/monthly
// @desc    Add new expense
// @access  Private
router.get("/monthly", verifyToken, getMonthlyExpenseStats);

// @route   GET /api/expenses/filter
// @desc    get filtered data
// @access  Private
router.get("/filter", verifyToken, getFilteredExpenses);

module.exports = router;
