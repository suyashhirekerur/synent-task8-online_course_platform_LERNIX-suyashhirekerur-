import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./database/db.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import courseRoutes from "./routes/course.js";
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
});

const app = express();

// using middlewares
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173", // Keep this for local development!
        // "https://your-live-frontend-url-goes-here.com", // Replace with your Vercel or Render frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


const port = process.env.PORT;

app.get("/", () => {
    console.log(`Server is running`);
    
});

app.use("/uploads", express.static("uploads"))

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", courseRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});
