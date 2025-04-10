const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter an amount"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Food", "Transport", "Shopping", "Health", "Entertainment", "Other"], // Feel free to customize
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
