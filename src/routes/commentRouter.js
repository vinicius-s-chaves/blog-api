import { Router } from "express";
import { listComments } from "../controllers/commentController.js";

const commentRouter = Router()

commentRouter.get("/", listComments)

export { commentRouter }
