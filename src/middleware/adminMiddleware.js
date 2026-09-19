const authMiddleware = require("./authMiddleware");

const adminMiddleware = [
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  },
];

module.exports = adminMiddleware;