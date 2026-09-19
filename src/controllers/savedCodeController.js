const User = require("../models/User");
const DailyCode = require("../models/DailyCode");

const saveDailyCode = async (req, res) => {
  try {

    const { codeId } = req.body;
    const userId = req.user.userId;

    if (!codeId) {
      return res.status(400).json({
        success: false,
        message: "Daily code ID is required",
      });
    }

    const dailyCode = await DailyCode.findById(codeId);

    if (!dailyCode) {
      return res.status(404).json({
        success: false,
        message: "Daily code not found",
      });
    }

    const user = await User.findById(userId);

    if (user.savedCodes.includes(codeId)) {
      return res.status(400).json({
        success: false,
        message: "Daily code already saved",
      });
    }

    user.savedCodes.push(codeId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Daily code saved successfully",
    });
  } catch (error) {
    console.error("Save daily code error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save daily code",
    });
  }
};

const getSavedCodes = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("savedCodes");

    res.status(200).json({
      success: true,
      savedCodes: user.savedCodes,
    });
  } catch (error) {
    console.error("Get saved codes error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get saved codes",
    });
  }
};

const removeSavedCode = async (req, res) => {
  try {
    const { codeId } = req.params;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    user.savedCodes = user.savedCodes.filter(
      (savedCodeId) => savedCodeId.toString() !== codeId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Daily code removed from saved list",
    });
  } catch (error) {
    console.error("Remove saved code error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to remove saved daily code",
    });
  }
};

module.exports = {
  saveDailyCode,
  getSavedCodes,
  removeSavedCode,
};