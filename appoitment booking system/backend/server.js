// server.js

const express = require("express");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')
const cors = require("cors")

const connectDB = require("./config/db"); // Import DB connection function

// Import routes
const userRoute = require('./routes/userRoute')
const docRoute = require('./routes/doctorRoute')
const appointmentRoute = require('./routes/appointmentRoute')
const emergencyRoute = require('./routes/emergencyRoute')
const reviewRoute = require('./routes/reviewRoute')

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for JSON request body
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes
app.use("/api/doctors", docRoute);
app.use("/api/users", userRoute);
app.use("/api/emergency", emergencyRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/reviews", reviewRoute);

// Connect to MongoDB
connectDB();

app.post('/test', (req, res) => {
    console.log("Received Body:", req.body);
    res.json({ received: req.body });
});

// Sample Route
app.get("/", (req, res) => {
  res.send("hello there.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
