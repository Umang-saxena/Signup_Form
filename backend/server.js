import express from "express";
import cors from "cors";
import connectDb from "./connection/connectDB.js";
import {register,login,admin} from "./controllers/auth-controller.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure request body is parsed correctly
app.use(express.urlencoded({ extended: true })); // For form data

connectDb();

// Define Schema & Model


// Route to Register User
app.get("/admin", admin);
app.post("/register", register);
app.post("/login", login);



app.listen(5000, () => console.log("🚀 Server running on port 5000"));
