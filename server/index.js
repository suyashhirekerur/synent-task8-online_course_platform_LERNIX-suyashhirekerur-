import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./database/db.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

// using middlewares
app.use(express.json());

const port = process.env.PORT;

app.get("/", () => {
    console.log(`Server is running`);
    
});


app.post("/api/user/register", userRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});