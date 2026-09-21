const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const dailyCodeRoutes = require("./routes/dailyCodeRoutes");
const savedCodeRoutes = require("./routes/savedCodeRoutes");
const likedCodeRoutes = require("./routes/likedCodeRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/daily-codes", dailyCodeRoutes);
app.use("/api/saved-codes", savedCodeRoutes);
app.use("/api/liked-codes", likedCodeRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Daily Codes Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});