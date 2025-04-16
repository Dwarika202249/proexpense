const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected ✅");
    app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    });
}).catch(err=>console.log("Mongo error: ", err));