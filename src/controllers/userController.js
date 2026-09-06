import { prisma } from "../lib/prisma.js"
import { body, validationResult } from "express-validator"

const emptyErr = "is required"
const lengthErr = "must be between"
const typeErr = "must be of type"

const validateUser = [
    body()
        .notEmpty().withMessage(`Request body ${emptyErr}`),
    body("username")
        .trim()
        .notEmpty().withMessage(`Username ${emptyErr}`)
        .isLength({ min: 3, max: 100 }).withMessage(`Username ${lengthErr} 3 and 100 characters`),
    body("email")
        .trim()
        .notEmpty().withMessage(`Email ${emptyErr}`)
        .isEmail().withMessage(`Email ${typeErr} email`)
        .isLength({ min: 3, max: 100 }).withMessage(`Email ${lengthErr} 3 and 100 characters`),
    body("bio")
        .trim()
        .optional()
        .isLength({ min: 1, max: 100 }).withMessage(`Bio ${lengthErr} 1 and 255 characters`),
    body("password")
        .notEmpty().withMessage(`Password ${emptyErr}`)
        .isLength({ min: 8, max: 50 }).withMessage(`Password ${lengthErr} 8 and 50 characters`),
    body("confirmPassword")
        .notEmpty().withMessage(`Password confirmation ${emptyErr}`)
]

const validateUpdate = [
    body()
        .notEmpty().withMessage(`Request body ${emptyErr}`),
    body("username")
        .trim()
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage(`Username ${lengthErr} 3 and 100 characters`),
    body("email")
        .trim()
        .optional()
        .isEmail().withMessage(`Email ${typeErr} email`)
        .isLength({ min: 3, max: 100 }).withMessage(`Email ${lengthErr} 3 and 100 characters`),
    body("bio")
        .trim()
        .optional()
        .isLength({ min: 1, max: 100 }).withMessage(`Bio ${lengthErr} 1 and 255 characters`),
]

export const listUsers = async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const pageSize = 3
    const offset = (page - 1) * pageSize
    try {
        const users = await prisma.user.findMany({
            take: pageSize,
            skip: offset,
            include: { 
                password: false,
                posts: true,
                comments: true
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
        if(!errors.isEmpty()) return res.status(400).json({ errors })
        const { username, email, password, confirmPassword, bio } = req.body
        if(confirmPassword !== password) return res.status(400).json({ error: "Passwords do not match" })
        try {
            await prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                    bio
                }
            })
            res.status(201).json({ message: "Created user successfully" })
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
                posts: true,
                comments: true
            }
        })
        if(!user) return res.status(404).json({ message: "User Not Found" })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}

export const updateUser = [
    validateUpdate,
    async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(401).json({ errors })
        const { id } = req.params
        const { username, email, bio } = req.body
        try {
            const user = await prisma.user.findUnique({ where: { id } })
            if(!user) return res.status(404).json({ message: "User Not Found" })
            const modifiedUser = await prisma.user.update({
                where: { id },
                data: {
                    username,
                    email,
                    bio
                },
                include: { password: false }
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
        if(!user) return res.status(404).json({ message: "User Not Found" })
        await prisma.user.delete({ where: { id } })
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        next(error)
    }
}
