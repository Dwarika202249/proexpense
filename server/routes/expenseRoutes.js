const express = require("express");
const router = express.Router();
const {
  addExpense,
  getUserExpenses
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

module.exports = router;
