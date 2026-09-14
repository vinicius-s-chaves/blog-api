import { Router } from "express";
import {
    createPost,
    deletePost,
    getPost,
    listPosts,
    updatePost
} from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const postRouter = Router()

postRouter.get("/", listPosts)
postRouter.post("/", authenticateToken, createPost)
postRouter.get("/:id", getPost)
postRouter.put("/:id", authenticateToken, updatePost)
postRouter.delete("/:id", authenticateToken, deletePost)

export { postRouter }
