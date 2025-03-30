
const register= async (req, res) => {
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
    }}


const login = async (req, res) => {
    try {
        console.log("✅ Received Body:", req.body);

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }

        // Check if user exists
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password!" });
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

        // Fetch all users
        const users = await User.find();
        console.log("✅ Users Fetched:", users);
        res.json({ message: "Admin access granted!", users });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }   
}
    
export { register,login,admin };