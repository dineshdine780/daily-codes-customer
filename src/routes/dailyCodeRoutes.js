const express = require("express");

const {
  createDailyCode,
  getDailyCodes,
} = require("../controllers/dailyCodeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createDailyCode);

router.get("/", authMiddleware, getDailyCodes);

module.exports = router;