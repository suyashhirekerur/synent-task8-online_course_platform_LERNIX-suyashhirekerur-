import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createCourse } from "../controllers/admin.js";
import { isAdmin } from "../middlewares/isAuth.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router()

router.post('/courses/new', isAuth, isAdmin, uploadFiles, createCourse)

export default router;
