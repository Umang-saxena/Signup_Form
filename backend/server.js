import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./connection/connectDB.js";
import { User } from "./models/usersModel.js"; // Import the User model

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

// Register Route with JWT Token
app.post("/register", async (req, res) => {
    try {
        console.log("✅ Received Body:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered!" });
        }

        // Save user to MongoDB
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Generate JWT token
        const token = newUser.generateAuthToken();

        console.log("✅ User Registered:", newUser);
        res.json({ message: "User registered successfully!", user: newUser, token });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route with JWT Authentication
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        console.log("✅ User Logged In:", user);
        res.json({ message: "Login successful!", user, token });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
