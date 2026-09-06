import { Router } from "express";
import {
    createUser,
    getUser,
    listUsers
} from "../controllers/userController.js";

const userRouter = Router()

userRouter.get("/", listUsers)
userRouter.post("/", createUser)
userRouter.get("/:id", getUser)

export { userRouter }
