const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ==========================================
// Get All Users - Admin Only
// ==========================================
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ==========================================
// Update Admin Profile
// ==========================================
const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      return res.status(400).json({
        success: false,
        message: "Name and email cannot be empty",
      });
    }

    // Validate email format
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Find the logged-in admin
    const user = await User.findById(req.user.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // Check whether another account uses this email
    const existingUser = await User.findOne({
      email: trimmedEmail,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already in use",
      });
    }

    // Update profile
    user.name = trimmedName;
    user.email = trimmedEmail;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Update Admin Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update admin profile",
    });
  }
};

// ==========================================
// Change Admin Password
// ==========================================
const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 8 characters",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(
      "Change Admin Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};


module.exports = {
  getUsers,
  updateAdminProfile,
  changeAdminPassword,
};