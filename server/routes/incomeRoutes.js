const express = require("express");
const {
  getMonthlyIncome,
  upsertMonthlyIncome,
} = require("../controllers/incomeController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", authMiddleware, getMonthlyIncome);      // GET /income?month=2025-04
router.post("/", authMiddleware, upsertMonthlyIncome);  // POST /income

module.exports = router;
