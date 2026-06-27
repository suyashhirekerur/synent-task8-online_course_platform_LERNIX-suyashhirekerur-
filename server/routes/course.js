import express from "express";
import { getAllCourses, getSingleCourses, fetchLectures, fetchLecture, getMyCourses, checkOut } from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";
import { paymentVerification } from "../controllers/course.js";

const router = express.Router()

router.get("/courses/all", getAllCourses);
router.get("/courses/:id", getSingleCourses);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/course/checkout/:id", isAuth, checkOut);
router.post("/verification/:id", isAuth, paymentVerification)


export default router;
