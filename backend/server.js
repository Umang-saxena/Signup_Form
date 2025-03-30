import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDb from "./connection/connectDB.js";
import {register,login,admin} from "./controllers/auth-controller.js";


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
app.post("/").get(admin);
app.post("/register").get(register);
app.post("/login").get(login);


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
