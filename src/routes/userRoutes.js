const express = require("express");

const {
  getUsers,
  updateAdminProfile,
  changeAdminPassword,
} = require("../controllers/userController");

const { uploadProfileImage } = require("../controllers/profileController");

const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Admin - Get all users
router.get(
  "/",
  ...adminMiddleware,
  getUsers
);

// Admin - Update profile
router.put(
  "/profile",
  ...adminMiddleware,
  updateAdminProfile
);

// Admin - Change password
router.put(
  "/change-password",
  ...adminMiddleware,
  changeAdminPassword
);

// Customer - Upload profile image
router.put(
  "/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;