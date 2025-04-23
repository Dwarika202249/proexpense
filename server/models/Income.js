const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String, // Format: "2025-04"
      required: true,
    },
  },
  { timestamps: true }
);

incomeSchema.index({ userId: 1, month: 1 }, { unique: true }); // Prevent duplicates for same user + month

module.exports = mongoose.model("Income", incomeSchema);
