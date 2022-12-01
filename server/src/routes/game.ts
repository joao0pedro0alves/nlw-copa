import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/games',
        { onRequest: [authenticate] },
        async (request) => {
            const getGamesParams = z.object({
                category: z.string().optional(),
            })

            const { category } = getGamesParams.parse(request.query)

            const games = await prisma.game.findMany({
                orderBy: {
                    date: 'asc'
                },
                where: {
                    category,
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
            
            const getPoolQueryParams = z.object({
                category: z.string().optional()
            })

            const { id } = getPoolParams.parse(request.params)
            const { category } = getPoolQueryParams.parse(request.query)

            const games = await prisma.game.findMany({
                orderBy: {
                    date: 'desc',
                },
                where: {
                    category
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

    fastify.post(
        '/games',
        { onRequest: [authenticate]},
        async (request, reply) => {
            
            const createGameParams = z.object({
                category: z.string(),
                date: z.string(),
                firstTeamCountryCode: z.string(),
                secondTeamCountryCode: z.string()
            })

            const { category, date, firstTeamCountryCode, secondTeamCountryCode } = createGameParams.parse(request.body)

            await prisma.game.create({
                data: {
                    category,
                    date: new Date(date),
                    firstTeamCountryCode,
                    secondTeamCountryCode
                }
            })

            return reply.status(201).send()
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
