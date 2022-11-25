import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()

        return { count }
    })

    fastify.get('/users/popular', async () => {
        const users = await prisma.user.findMany({
            take: 4,
            select: {
                avatarUrl: true,
                name: true,
            },
            orderBy: {
                participatingAt: {
                    _count: 'desc',
                },
            },
        })

        return { users }
    })
}
