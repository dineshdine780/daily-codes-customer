
const mongoose = require("mongoose");

const dailyCodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      default: "Daily Codes",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DailyCode",
  dailyCodeSchema
);