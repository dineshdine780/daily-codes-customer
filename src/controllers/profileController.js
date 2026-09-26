const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const uploadProfileImage = async (req, res) => {
  try {
    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a profile image",
      });
    }

    // Check file type
    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "daily-codes/profile-images",
          public_id: `user-${user._id}`,
          overwrite: true,
          resource_type: "image",
          transformation: [
            {
              width: 400,
              height: 400,
              crop: "fill",
              gravity: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    // Save Cloudinary URL
    user.profileImage = uploadResult.secure_url;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Upload Profile Image Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload profile image",
    });
  }
};

module.exports = {
  uploadProfileImage,
};