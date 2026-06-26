import express from "express";
import { register } from "../controllers/index.js";

const router = express.Router();

router.get("/user/register", register);

export default router;
