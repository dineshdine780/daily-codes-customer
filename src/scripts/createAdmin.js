const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@dailycodes.com";
    const adminPassword = "Admin@12345";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists.");

      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      10
    );

    const admin = await User.create({
      name: "Daily Codes Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully.");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    process.exit(0);
  } catch (error) {
    console.error("Admin creation error:", error.message);

    process.exit(1);
  }
};

createAdmin();