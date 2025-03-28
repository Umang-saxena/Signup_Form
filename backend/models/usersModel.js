import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

userSchema.methods.generateAuthToken = function () {
    // Logic to generate an authentication token
    const token=jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token; // Placeholder for actual token generation logic
};  

const User = mongoose.model("User", userSchema);


export {userSchema, User};