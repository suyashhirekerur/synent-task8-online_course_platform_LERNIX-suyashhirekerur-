import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./database/db.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import courseRoutes from "./routes/course.js";

dotenv.config();

const app = express();

// using middlewares
app.use(express.json());

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