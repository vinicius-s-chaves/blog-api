import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    listUsers,
    updateUser
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const userRouter = Router()

userRouter.get("/", listUsers)
userRouter.post("/", createUser)
userRouter.get("/:id", getUser)
userRouter.put("/:id", authenticateToken, updateUser)
userRouter.delete("/:id", authenticateToken, deleteUser)

export { userRouter }
