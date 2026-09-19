const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", adminMiddleware, getDashboardStats);

module.exports = router;