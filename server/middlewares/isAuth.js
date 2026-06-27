import jwt from "jsonwebtoken";
import { User } from "../models/User.js"

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token)
            return res.status(401).json({
                message: "Please login",
            });

        const decodedData = jwt.verify(token, process.env.Jwt_Sec);

        req.user = await User.findById(decodedData._id);

        if (!req.user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};