
const DailyCode = require("../models/DailyCode");
const User = require("../models/User");

// Create daily code
const createDailyCode = async (req, res) => {
  try {
    const {
      text,
      category,
      author,
      status,
    } = req.body;

    if (!text || !category) {
      return res.status(400).json({
        success: false,
        message: "Code text and category are required",
      });
    }

    const dailyCode = await DailyCode.create({
      title: "Daily Wisdom",
      message: text,
      category,
      author: author || "Daily Codes",
      status: status || "Draft",
    });

    res.status(201).json({
      success: true,
      message: "Daily code created successfully",
      dailyCode,
    });
  } catch (error) {
    console.error(
      "Create daily code error:",
      error.message
    );

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
    console.error(
      "Get daily codes error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch daily codes",
    });
  }
};


// Update daily code
const updateDailyCode = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      text,
      message,
      category,
      author,
      status,
    } = req.body;

    const dailyCode = await DailyCode.findById(id);

    if (!dailyCode) {
      return res.status(404).json({
        success: false,
        message: "Daily code not found",
      });
    }

    // Update only provided fields
    if (text !== undefined) {
      dailyCode.message = text;
    } else if (message !== undefined) {
      dailyCode.message = message;
    }

    if (category !== undefined) {
      dailyCode.category = category;
    }

    if (author !== undefined) {
      dailyCode.author = author;
    }

    if (status !== undefined) {
      dailyCode.status = status;
    }

    await dailyCode.save();

    res.status(200).json({
      success: true,
      message: "Daily code updated successfully",
      dailyCode,
    });
  } catch (error) {
    console.error(
      "Update daily code error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update daily code",
    });
  }
};


// Delete daily code
const deleteDailyCode = async (req, res) => {
  try {
    const { id } = req.params;

    const dailyCode = await DailyCode.findByIdAndDelete(id);

    if (!dailyCode) {
      return res.status(404).json({
        success: false,
        message: "Daily code not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Daily code deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete daily code error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete daily code",
    });
  }
};


module.exports = {
  createDailyCode,
  getDailyCodes,
  updateDailyCode,
  deleteDailyCode,
};