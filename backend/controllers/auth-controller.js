import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobileNumber: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

const register = async (req, res) => {
    try {
        // console.log("✅ Received Body:", req.body);

        const { name, email, mobileNumber, password } = req.body;
        if (!name || !email || !mobileNumber || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save to MongoDB
        const newUser = new User({ name, email, mobileNumber, password: hashedPassword });
        await newUser.save();

        // console.log("✅ User Registered:", newUser);
        res.json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        console.log("✅ Received Body:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        console.log("✅ User Logged In:", user);
        res.json({ message: "User logged in successfully!", user });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const admin = async (req, res) => {
    try {
        console.log("✅ Admin Accessed");
        res.send("Admin Accessed");
        // Fetch all users
        const users = await User.find();
        console.log("✅ Users Fetched:", users);
        res.json({ message: "Admin access granted!", users });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }   
}
    
export { register, login, admin };
