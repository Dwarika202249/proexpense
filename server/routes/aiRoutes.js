const express = require("express");
const { categorizeTitle, generateMonthlySummary, getBudgetAdvice } = require("../controllers/aiController.js");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/categorize", categorizeTitle);

router.post("/summary", verifyToken, generateMonthlySummary);

router.post("/budget-advice", verifyToken, getBudgetAdvice);

module.exports = router;
