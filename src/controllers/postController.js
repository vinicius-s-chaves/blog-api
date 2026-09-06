import { prisma } from "../lib/prisma.js";

export const listPosts = async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const pageSize = 3
    const offset = (page - 1) * pageSize
    try {
        const posts = await prisma.post.findMany({
            take: pageSize,
            skip: offset,
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
