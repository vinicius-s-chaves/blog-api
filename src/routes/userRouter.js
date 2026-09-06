import { Router } from "express";
import {
    createUser,
    getUser,
    listUsers,
    updateUser
} from "../controllers/userController.js";

const userRouter = Router()

userRouter.get("/", listUsers)
userRouter.post("/", createUser)
userRouter.get("/:id", getUser)
userRouter.put("/:id", updateUser)

export { userRouter }
