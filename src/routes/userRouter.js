import { Router } from "express";
import { listUsers } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get("/", listUsers)

export { userRouter }
