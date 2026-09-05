import { prisma } from "../lib/prisma.js"

export const listUsers = async (req, res, next) => {
    const page = req.query.page || 1
    const pageSize = 3
    const offset = (Number(page) - 1) * pageSize
    try {
        const users = await prisma.user.findMany({
            take: pageSize,
            skip: offset
        })
        res.json({ users })
    } catch (error) {
        next(error)
    }
}