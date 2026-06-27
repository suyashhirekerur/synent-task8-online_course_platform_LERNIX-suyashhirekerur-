import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Database Connected:", mongoose.connection.name);
    } catch (error) {
        console.error("DB connection error:", error.message || error);
    }
};