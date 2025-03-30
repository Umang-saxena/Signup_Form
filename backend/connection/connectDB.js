import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connection Instance: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("MOngo Db connection error: ", error);
        process.exit(1); // Function of node...can also use throw error
    }
};

export default connectDB;
