import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async () => {
    try {
        const { email, name, password } = req.body

        let user = await User.findOne({email}) //finds the user with the email
        if (user) return res.status(400).json( {
            message: "User already exists",
        });

        const hashPassword = await bcrypt.hash(password, 10)

        //saving user credentials
        user = {
            name,
            email,
            password: hashPassword,
        }

        const otp = Math.floor(Math.random() * 1000000)

        const activationToken = jwt.sign({
            user,
            otp,
        }, process.env.Activation_Secret, {
            expiresIn: "5m",
        });

        const data = {
            name,
            otp,
        }

        await sendMail(
            email,
            "Lernix",
            data,
        )

        res.status(200).json({
            message: "OTP has been sent to your email.",
            activationToken,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    }
}