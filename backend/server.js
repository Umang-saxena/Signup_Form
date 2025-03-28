import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDb from "./connection/connectDB.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure request body is parsed correctly
app.use(express.urlencoded({ extended: true })); // For form data

connectDb();

// Define Schema & Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Route to Register User
app.post("/register", async (req, res) => {
    try {
        console.log("✅ Received Body:", req.body);

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }

        // Save to MongoDB
        const newUser = new User({ username, password });
        await newUser.save();

        console.log("✅ User Registered:", newUser);
        res.json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
