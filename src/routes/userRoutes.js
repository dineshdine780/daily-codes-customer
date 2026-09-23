const express = require("express");

const {
  getUsers,
  updateAdminProfile,
  changeAdminPassword,
} = require("../controllers/userController");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


router.get(
  "/",
  ...adminMiddleware,
  getUsers
);


router.put(
  "/profile",
  ...adminMiddleware,
  updateAdminProfile
);


router.put(
  "/change-password",
  ...adminMiddleware,
  changeAdminPassword
);

module.exports = router;