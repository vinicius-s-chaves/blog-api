import { Router } from "express";
import {
    createPost,
    getPost,
    listPosts
} from "../controllers/postController.js";

const postRouter = Router()

postRouter.get("/", listPosts)
postRouter.post("/", createPost)
postRouter.get("/:id", getPost)

export { postRouter }
