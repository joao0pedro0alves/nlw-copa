import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/games',
        { onRequest: [authenticate] },
        async () => {

            const games = await prisma.game.findMany({
                orderBy: {
                    date: 'asc'
                },
                select: {
                    id: true,
                    date: true,
                    firstTeamCountryCode: true,
                    firstTeamGoals: true,
                    secondTeamCountryCode: true,
                    secondTeamGoals: true,
                    _count: true,
                }
            })

            return { games }
        }
    )

    fastify.get(
        '/pools/:id/games',
        { onRequest: [authenticate] },
        async (request) => {
            const getPoolParams = z.object({
                id: z.string(),
            })

            const { id } = getPoolParams.parse(request.params)

            const games = await prisma.game.findMany({
                orderBy: {
                    date: 'desc',
                },
                include: {
                    guesses: {
                        where: {
                            participant: {
                                userId: request.user.sub,
                                poolId: id,
                            },
                        },
                    },
                },
            })

            return {
                games: games.map((game) => {
                    return {
                        ...game,
                        guess: game.guesses.length > 0 ? game.guesses[0] : null,
                        guesses: undefined,
                    }
                }),
            }
        }
    )

    fastify.put(
        '/games/:id',
        { onRequest: [authenticate]},
        async (request, reply) => {

            const getPoolParams = z.object({
                id: z.string(),
            })

            const updateGameParams = z.object({
                firstTeamGoals: z.string(),
                secondTeamGoals: z.string()
            })

            const { id } = getPoolParams.parse(request.params)
            const { firstTeamGoals, secondTeamGoals } = updateGameParams.parse(request.body)

            await prisma.game.update({
                where: {
                    id
                },
                data: {
                    firstTeamGoals: Number(firstTeamGoals),
                    secondTeamGoals: Number(secondTeamGoals)
                }
            })
            
            return reply.status(200).send()
        }
    )
}
