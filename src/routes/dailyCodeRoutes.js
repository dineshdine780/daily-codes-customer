const express = require("express");

const {
  createDailyCode,
  getDailyCodes,
  updateDailyCode,
  deleteDailyCode,
} = require("../controllers/dailyCodeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createDailyCode);

router.get("/", authMiddleware, getDailyCodes);

router.put("/:id", authMiddleware, updateDailyCode);

router.delete("/:id", authMiddleware, deleteDailyCode);

module.exports = router;