import { Router } from "express";
import {
    createPost,
    listPosts
} from "../controllers/postController.js";

const postRouter = Router()

postRouter.get("/", listPosts)
postRouter.post("/", createPost)

export { postRouter }
