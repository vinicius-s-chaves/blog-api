import { Router } from "express";
import {
    createPost,
    getPost,
    listPosts,
    updatePost
} from "../controllers/postController.js";

const postRouter = Router()

postRouter.get("/", listPosts)
postRouter.post("/", createPost)
postRouter.get("/:id", getPost)
postRouter.put("/:id", updatePost)

export { postRouter }
