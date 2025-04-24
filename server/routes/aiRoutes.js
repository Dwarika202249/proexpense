const express = require("express");
const { categorizeTitle } = require("../controllers/aiController.js");

const router = express.Router();

router.post("/categorize", categorizeTitle);

module.exports = router;
