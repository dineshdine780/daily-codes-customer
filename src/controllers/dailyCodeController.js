const DailyCode = require("../models/DailyCode");
const User = require("../models/User");
// Create daily code
const createDailyCode = async (req, res) => {
  try {
    const { title, message, category, author } = req.body;

    if (!title || !message || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, message and category are required",
      });
    }

    const dailyCode = await DailyCode.create({
      title,
      message,
      category,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Daily code created successfully",
      dailyCode,
    });
  } catch (error) {
    console.error("Create daily code error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create daily code",
    });
  }
};

// Get all daily codes
const getDailyCodes = async (req, res) => {
  try {
    const dailyCodes = await DailyCode.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: dailyCodes.length,
      dailyCodes,
    });
  } catch (error) {
    console.error("Get daily codes error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch daily codes",
    });
  }
};

module.exports = {
  createDailyCode,
  getDailyCodes,
};