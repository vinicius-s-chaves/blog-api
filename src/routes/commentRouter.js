import { Router } from "express";
import {
    createComment,
    listComments
} from "../controllers/commentController.js";

const commentRouter = Router()

commentRouter.get("/", listComments)
commentRouter.post("/", createComment)

export { commentRouter }
