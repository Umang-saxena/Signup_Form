import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: { type: String, default: 'user' }, // Add role field
    name: String,
    email: { type: String, unique: true },
    mobileNumber: String,
    password: String,
});

export const User = mongoose.model("User", userSchema);