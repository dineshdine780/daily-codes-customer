const express = require("express");

const {
  createDailyCode,
  getDailyCodes,
  updateDailyCode,
  deleteDailyCode,
} = require("../controllers/dailyCodeController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin-only routes
router.post("/", adminMiddleware, createDailyCode);

router.put("/:id", adminMiddleware, updateDailyCode);

router.delete("/:id", adminMiddleware, deleteDailyCode);


router.get("/", authMiddleware, getDailyCodes);

module.exports = router;