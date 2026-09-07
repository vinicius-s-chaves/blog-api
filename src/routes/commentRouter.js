import { Router } from "express";
import {
    createComment,
    deleteComment,
    getComment,
    listComments,
    updateComment
} from "../controllers/commentController.js";

const commentRouter = Router()

commentRouter.get("/", listComments)
commentRouter.post("/", createComment)
commentRouter.get("/:id", getComment)
commentRouter.put("/:id", updateComment)
commentRouter.delete("/:id", deleteComment)

export { commentRouter }
