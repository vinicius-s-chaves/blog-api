import { Router } from "express";
import {
    createComment,
    deleteComment,
    getComment,
    listComments,
    updateComment
} from "../controllers/commentController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const commentRouter = Router()

commentRouter.get("/", listComments)
commentRouter.post("/", authenticateToken, createComment)
commentRouter.get("/:id", getComment)
commentRouter.put("/:id", authenticateToken, updateComment)
commentRouter.delete("/:id", authenticateToken, deleteComment)

export { commentRouter }
