import { prisma } from "../lib/prisma.js";
import { validationResult } from "express-validator";
import { validatePost, validatePostUpdate } from "../utils/validations.js";
import CustomError from "../utils/CustomError.js"

export const listPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
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
                comments: {
                    select: {
                        id: true,
                        content: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                            }
                        },
                        updated_at: true
                    }
                }
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
        if(!errors.isEmpty()) return res.status(400).json(errors)
        const { title, content, visibility } = req.body
        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    visibility,
                    author: { connect: { id: req.user.id } }
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    author_id: false,
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            author: {
                                select: {
                                    id: true,
                                    username: true,
                                }
                            },
                            updated_at: true
                        }
                    }
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

export const getPost = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                author_id: false,
                comments: {
                    select: {
                        id: true,
                        content: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                            }
                        },
                        updated_at: true
                    }
                }
            }
        })
        if(!post) return next(new CustomError("Post Not Found", 404))
        res.json(post)
    } catch (error) {
        next(error)
    }
}

export const updatePost = [
    validatePostUpdate,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json(errors)
        const { id } = req.params
        const { title, content, visibility } = req.body
        try {
            const post = await prisma.post.findUnique({ where: { id } })
            if(!post) return next(new CustomError("Post Not Found", 404))
            if(post.author_id !== req.user.id) return next(new CustomError("Invalid Session", 401))
            const modifiedPost = await prisma.post.update({
                where: { id },
                data: {
                    title,
                    content,
                    visibility
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    author_id: false,
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            author: {
                                select: {
                                    id: true,
                                    username: true,
                                }
                            },
                            updated_at: true
                        }
                    }
                }
            })
            res.json({
                message: "Post updated successfully",
                data: modifiedPost
            })
        } catch (error) {
            next(error)
        }
    }
]

export const deletePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await prisma.post.findUnique({ where: { id } })
        if(!post) return next(new CustomError("Post Not Found", 404))
        if(post.author_id !== req.user.id) return next("Invalid Session", 401)
        await prisma.post.delete({ where: { id } })
        res.json({ message: "Post deleted successfully" })
    } catch (error) {
        next(error)
    }
}
