// controllers/userController.js
const User = require("../models/User")

// @desc    Get current logged-in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user info", error });
    }
  };

// @desc    Update user income
// @route   PUT /api/users/income
// @access  Private
exports.updateIncome = async (req, res) => {
    try {
      const { income } = req.body;
  
      if (income < 0) {
        return res.status(400).json({ message: "Income cannot be negative" });
      }
  
      const user = await User.findById(req.user.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.income = income;
      await user.save();
  
      res.status(200).json({ message: "Income updated successfully", income: user.income });
    } catch (error) {
      res.status(500).json({ message: "Failed to update income", error });
    }
  };


  