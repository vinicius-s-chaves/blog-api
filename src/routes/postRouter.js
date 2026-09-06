import { Router } from "express";
import { listPosts } from "../controllers/postController.js";

const postRouter = Router()

postRouter.get("/", listPosts)

export { postRouter }
