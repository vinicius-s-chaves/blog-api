import { prisma } from "../lib/prisma.js";

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
