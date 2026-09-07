import { Router } from "express";
import {
    createComment,
    getComment,
    listComments
} from "../controllers/commentController.js";

const commentRouter = Router()

commentRouter.get("/", listComments)
commentRouter.post("/", createComment)
commentRouter.get("/:id", getComment)

export { commentRouter }
