const User = require("../models/User");
const DailyCode = require("../models/DailyCode");

// Like / Unlike code
const toggleLikeCode = async (req, res) => {
  try {
    const { codeId } = req.body;
    const userId = req.user.userId;

    if (!codeId) {
      return res.status(400).json({
        success: false,
        message: "Code ID is required",
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

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyLiked = user.likedCodes.some(
      (id) => id.toString() === codeId
    );

    if (alreadyLiked) {
      user.likedCodes = user.likedCodes.filter(
        (id) => id.toString() !== codeId
      );

      await user.save();

      return res.status(200).json({
        success: true,
        liked: false,
        message: "Code unliked successfully",
      });
    }

    user.likedCodes.push(codeId);

    await user.save();

    return res.status(200).json({
      success: true,
      liked: true,
      message: "Code liked successfully",
    });
  } catch (error) {
    console.error("Toggle like error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
  }
};

// Get liked codes
const getLikedCodes = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("likedCodes");

    return res.status(200).json({
      success: true,
      likedCodes: user?.likedCodes || [],
    });
  } catch (error) {
    console.error("Get liked codes error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch liked codes",
    });
  }
};

module.exports = {
  toggleLikeCode,
  getLikedCodes,
};

