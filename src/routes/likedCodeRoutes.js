const express = require("express");

const {
  toggleLikeCode,
  getLikedCodes,
} = require("../controllers/likedCodeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Like / Unlike code
router.post("/", authMiddleware, toggleLikeCode);

// Get liked codes
router.get("/", authMiddleware, getLikedCodes);

module.exports = router;