import { prisma } from "../lib/prisma.js";
import { body, validationResult } from "express-validator";

const emptyErr = "is required"
const lengthErr = "must be between"

const validateComment = [
    body()
        .notEmpty().withMessage(`Comment data ${emptyErr}`),
        body("content")
        .trim()
        .notEmpty().withMessage(`Content ${emptyErr}`)
        .isLength({ min: 1, max: 255 }).withMessage(`Comment ${lengthErr} 1 and 255 characters`),
    body("author_id")
        .notEmpty().withMessage(`Author ${emptyErr}`),
    body("post_id")
        .notEmpty().withMessage(`Post ${emptyErr}`)
]

const validateUpdate = [
    body()
        .notEmpty().withMessage(`Comment data ${emptyErr}`),
    body("content")
        .trim()
        .optional()
        .isLength({ min: 1, max: 255 }).withMessage(`Comment ${lengthErr} 1 and 255 characters`),
    body("author_id")
        .optional(),
    body("post_id")
        .optional()
]

export const listComments = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = 3
    const offset = (page - 1) * pageSize
    try {
        const comments = await prisma.comment.findMany({
            take: pageSize,
            skip: offset,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                author_id: false,
                post_id: false
            }
        })
        res.json({
            page,
            data: comments
        })
    } catch (error) {
        next(error)
    }
}

export const createComment = [
    validateComment,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors })
        const { content, author_id, post_id } = req.body
        try {
            const author = await prisma.user.findUnique({ where: { id: author_id } })
            if(!author) return res.status(404).json({ message: "Author Not Found" })
            const post = await prisma.post.findUnique({ where: { id: post_id } })
            if(!post) return res.status(404).json({ message: "Post Not Found" })
            const comment = await prisma.comment.create({
                data: {
                    content,
                    author: { connect: { id: author_id } },
                    post: { connect: { id: post_id } }
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    post: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    author_id: false,
                    post_id: false
                }
            })
            res.status(201).json({
                message: "Comment created successfully",
                data: comment
            })
        } catch (error) {
            next(error)
        }
    }
]

export const getComment = async (req, res, next) => {
    const { id } = req.params
    try {
        const comment = await prisma.comment.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                author_id: false,
                post_id: false
            }
        })
        if(!comment) return res.status(404).json({ message: "Comment Not Found" })
        res.json(comment)
    } catch (error) {
        next(error)
    }
}

export const updateComment = [
    validateUpdate,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors })
        const { id } = req.params
        const { content } = req.body
        try {
            const comment = await prisma.comment.findUnique({ where: { id } })
            if(!comment) return res.status(404).json({ message: "User Not Found" })
            const modifiedComment = await prisma.comment.update({
                where: { id },
                data: {
                    content
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    post: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    author_id: false,
                    post_id: false
                }
            })
            res.json({
                message: "Comment updated successfully",
                data: modifiedComment
            })
        } catch (error) {
            next(error)
        }
    }
]
