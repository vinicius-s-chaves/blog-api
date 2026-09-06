import { prisma } from "../lib/prisma.js";
import { body, validationResult } from "express-validator";

const emptyErr = "is required"
const lengthErr = "must be between"
const typeErr = "must be of type"

const validatePost = [
    body()
        .notEmpty().withMessage(`Post data ${emptyErr}`),
    body("title")
        .trim()
        .notEmpty().withMessage(`Title ${emptyErr}`)
        .isLength({ min: 3, max: 100 }).withMessage(`Title ${lengthErr} 3 and 100 characters`),
    body("content")
        .trim()
        .notEmpty().withMessage(`Content ${emptyErr}`)
        .isLength({ min: 3, max: 255 }).withMessage(`Content ${lengthErr} 3 and 255 characters`),
    body("visibility")
        .optional()
        .isIn(["PUBLIC", "PRIVATE"]).withMessage(`Visibility ${typeErr} PUBLIC or PRIVATE`),
    body("author_id")
        .notEmpty().withMessage(`Author ${emptyErr}`)
]

export const listPosts = async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const pageSize = 3
    const offset = (page - 1) * pageSize
    try {
        const posts = await prisma.post.findMany({
            take: pageSize,
            skip: offset,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                author_id: false,
                comments: true
            },
            orderBy: { id: "asc" }
        })
        res.json({
            page,
            data: posts
        })
    } catch (error) {
        next(error)
    }
}

export const createPost = [
    validatePost,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors })
        const { title, content, visibility, author_id } = req.body
        try {
            const author = await prisma.user.findUnique({ where: { id: author_id } })
            if(!author) return res.status(404).json({ message: "Author Not Found" })
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    visibility,
                    author: { connect: { id: author_id } }
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    comments: true,
                    author_id: false
                }
            })
            res.status(201).json({
                message: "Post created successfully",
                data: post
            })
        } catch (error) {
            next(error)
        }
    }
]
