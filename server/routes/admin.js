import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createCourse } from "../controllers/admin.js";
import { isAdmin } from "../middlewares/isAuth.js";
import { uploadFiles } from "../middlewares/multer.js";
import { addlecture } from "../controllers/admin.js";
import { deleteLecture } from "../controllers/admin.js";
import { deleteCourse } from "../controllers/admin.js"
import { getAllStats } from "../controllers/admin.js";
import { updateRole } from "../controllers/admin.js";
import { getAllUser } from "../controllers/admin.js";

const router = express.Router()

router.post('/courses/new', isAuth, isAdmin, uploadFiles, createCourse)
router.post('/courses/:id', isAuth, isAdmin, uploadFiles, addlecture)
router.delete('/course/:id', isAuth, isAdmin, deleteCourse)
router.delete('/lecture/:id', isAuth, isAdmin, deleteLecture)
router.get("/stats", isAuth, isAdmin, getAllStats)
router.put('/user/:id', isAuth, updateRole)
router.get("/users", isAuth, isAdmin, getAllUser)

export default router;
