
import express from "express";
import multer from "multer";
import cors from "cors"; 
import mongoose from "mongoose";
import connectDb from "./connection/connectDB.js";

const app = express();
app.use(cors());

connectDb();
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    cv: String,
});

const User = mongoose.model("User", userSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

app.post("/register", upload.single("cv"), async (req, res) => {
    const { username, password } = req.body;
    const cvPath = req.file.path;

    const newUser = new User({ username, password, cv: cvPath });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
