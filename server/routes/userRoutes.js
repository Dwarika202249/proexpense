const express = require("express");
const router = express.Router();
const { getMe, updateIncome } = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/me", verifyToken, getMe);
router.put("/income", verifyToken, updateIncome);

module.exports = router;
