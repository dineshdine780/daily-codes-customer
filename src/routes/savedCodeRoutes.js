const express = require("express");

const {
  saveDailyCode,
  getSavedCodes,
  removeSavedCode,
} = require("../controllers/savedCodeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveDailyCode);

router.get("/", authMiddleware, getSavedCodes);

router.delete("/:codeId", authMiddleware, removeSavedCode);

module.exports = router;