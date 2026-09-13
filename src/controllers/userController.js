import { prisma } from "../lib/prisma.js"
import { validationResult } from "express-validator"
import { validateUser, validateUserUpdate } from "../utils/validations.js"
import CustomError from "../utils/CustomError.js"
import { hashPassword } from "../utils/hashPassword.js"

export const listUsers = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = 3
    const offset = (page - 1) * pageSize
    try {
        const users = await prisma.user.findMany({
            take: pageSize,
            skip: offset,
            include: { 
                password: false,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        visibility: true,
                        posted_at: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        post: {
                            select: {
                                id: true,
                                title: true
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
            data: users
        })
    } catch (error) {
        next(error)
    }
}

export const createUser = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json(errors)
        const { username, email, password, confirmPassword, bio } = req.body
        if(confirmPassword !== password) return res.status(400).json({ error: "Passwords do not match" })
        const hashedPassword = await hashPassword(password)
            try {
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    bio
                },
                include: {
                    password: false,
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            visibility: true,
                            posted_at: true
                        }
                    },
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            post: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            },
                            updated_at: true
                        }
                    }
                }
            })
            res.status(201).json({
                message: "User created successfully",
                data: user
            })
        } catch (error) {
            next(error)
        }
    }
]

export const getUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                password: false,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        visibility: true,
                        posted_at: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        post: {
                            select: {
                                id: true,
                                title: true
                            }
                        },
                        updated_at: true
                    }
                }
            }
        })
        if(!user) return next(new CustomError("User Not Found", 404))
        res.json(user)
    } catch (error) {
        next(error)
    }
}

export const updateUser = [
    validateUserUpdate,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json(errors)
        const { id } = req.params
        const { username, email, bio } = req.body
        try {
            const user = await prisma.user.findUnique({ where: { id } })
            if(!user) return next(new CustomError("User Not Found", 404))
            const modifiedUser = await prisma.user.update({
                where: { id },
                data: {
                    username,
                    email,
                    bio
                },
                include: {
                    password: false,
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            visibility: true,
                            posted_at: true
                        }
                    },
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            post: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            },
                            updated_at: true
                        }
                    }
                }
            })
            res.json({
                message: "User updated successfully",
                data: modifiedUser
            })
        } catch (error) {
            next(error)
        }
    }
]

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        if(!user) return next(new CustomError("User Not Found", 404))
        await prisma.user.delete({ where: { id } })
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        next(error)
    }
}
