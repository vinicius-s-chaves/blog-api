import { prisma } from "../lib/prisma.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import CustomError from "../utils/CustomError.js"

export const login = async(req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        if(!user) return next(new CustomError("Invalid Credentials", 400))
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword) return next(new CustomError("Invalid Credentials", 400))

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })
        res.json({
            message: "Authenticated",
            token
        })
    } catch (error) {
        next(error)
    }
}