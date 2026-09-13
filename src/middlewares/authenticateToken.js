import jwt from "jsonwebtoken"
import CustomError from "../utils/CustomError.js"

export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return next(new CustomError("Invalid session", 401))
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        next()
    } catch (error) {
        next(new CustomError("Invalid session", 403))
    }
}
