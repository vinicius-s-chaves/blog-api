import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    listUsers,
    updateUser
} from "../controllers/userController.js";

const userRouter = Router()

userRouter.get("/", listUsers)
userRouter.post("/", createUser)
userRouter.get("/:id", getUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export { userRouter }
