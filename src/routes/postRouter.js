import { Router } from "express";
import {
    createPost,
    deletePost,
    getPost,
    listPosts,
    updatePost
} from "../controllers/postController.js";

const postRouter = Router()

postRouter.get("/", listPosts)
postRouter.post("/", createPost)
postRouter.get("/:id", getPost)
postRouter.put("/:id", updatePost)
postRouter.delete("/:id", deletePost)

export { postRouter }
