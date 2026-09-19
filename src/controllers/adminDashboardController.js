const DailyCode = require("../models/DailyCode");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalCodes = await DailyCode.countDocuments();

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const users = await User.find({
      role: "user",
    }).select("likedCodes savedCodes");

    let totalLikes = 0;
    let totalSaves = 0;

    users.forEach((user) => {
      totalLikes += user.likedCodes?.length || 0;
      totalSaves += user.savedCodes?.length || 0;
    });

    const categoryStats = await DailyCode.aggregate([
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const recentCodes = await DailyCode.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const mostLikedResult = await DailyCode.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "likedCodes",
          as: "likedByUsers",
        },
      },
      {
        $addFields: {
          likeCount: {
            $size: "$likedByUsers",
          },
        },
      },
      {
        $sort: {
          likeCount: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          title: 1,
          message: 1,
          category: 1,
          author: 1,
          likeCount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalCodes,
        totalUsers,
        totalLikes,
        totalSaves,
      },
      categoryStats,
      mostLikedCode: mostLikedResult[0] || null,
      recentCodes,
    });
  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};