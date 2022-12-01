import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

import shortUniqueId from 'short-unique-id'
import { z } from 'zod'

import { authenticate } from '../plugins/authenticate'
import { calculatePoints } from '../utils/calculatePoints'

export async function poolRoutes(fastify: FastifyInstance) {
    fastify.post('/pools', async (request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(request.body)

        const generate = new shortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase()

        try {
            await request.jwtVerify()

            await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: request.user.sub,

                    participants: {
                        create: {
                            userId: request.user.sub,
                        },
                    },
                },
            })
        } catch (error) {
            await prisma.pool.create({
                data: {
                    title,
                    code,
                },
            })
        }

        return reply.status(201).send({ code })
    })

    fastify.delete(
        '/pools/:id/out',
        { onRequest: [authenticate] },
        async (request, reply) => {

            const getPoolParams = z.object({
                id: z.string(),
            })

            const { id } = getPoolParams.parse(request.params)

            const participant = await prisma.participant.findUnique({
                where: {
                    userId_poolId: {
                        poolId: id,
                        userId: request.user.sub
                    }
                }
            })

            if (participant) {

                await prisma.guess.deleteMany({
                    where: {
                        participantId: {
                            equals: participant.id,
                        },
                    },
                })

                await prisma.participant.delete({
                    where: {
                        userId_poolId: {
                            poolId: id,
                            userId: request.user.sub
                        }
                    }
                })

                return reply.status(200).send()

            } else {
                return reply.status(400).send({
                    message: 'You are not part of this pool',
                })
            }

        }
    )

    fastify.post(
        '/pools/:id/calculate/:participantUserId?',
        { onRequest: [authenticate] },
        async (request, reply) => {

            const getPoolParams = z.object({
                id: z.string(),
                participantUserId: z.string().optional(),
            })

            const { id, participantUserId } = getPoolParams.parse(request.params)

            const participant = await prisma.participant.findUnique({
                where: {
                    userId_poolId: {
                        poolId: id,
                        userId: participantUserId || request.user.sub
                    },
                },
                include: {
                    guesses: true
                }
            })

            if (participant) {
                const participantAmountPoints = await calculatePoints(participant.guesses)
    
                await prisma.participant.update({
                        where: {
                            userId_poolId: {
                                poolId: id,
                                userId: request.user.sub
                            }
                        },
                        data: {
                            amountPoints: participantAmountPoints
                        }
                    })
    
                return reply.status(200).send()
            }
        }
    )

    fastify.post(
        '/pools/join',
        { onRequest: [authenticate] },
        async (request, reply) => {
            const joinPoolBody = z.object({
                code: z.string(),
            })

            const { code } = joinPoolBody.parse(request.body)

            const pool = await prisma.pool.findUnique({
                where: {
                    code,
                },
                include: {
                    participants: {
                        where: {
                            userId: request.user.sub,
                        },
                    },
                },
            })

            if (!pool) {
                return reply.status(400).send({
                    message: 'Pool not found.',
                })
            }

            if (pool.participants.length > 0) {
                return reply.status(400).send({
                    message: 'You already joined this pool.',
                })
            }

            if (!pool.ownerId) {
                await prisma.pool.update({
                    where: {
                        id: pool.id,
                    },
                    data: {
                        ownerId: request.user.sub,
                    },
                })
            }

            await prisma.participant.create({
                data: {
                    poolId: pool.id,
                    userId: request.user.sub,
                },
            })

            return reply.status(201).send()
        }
    )

    fastify.get(
        '/pools',
        {
            onRequest: [authenticate],
        },
        async (request) => {
            const pools = await prisma.pool.findMany({
                where: {
                    participants: {
                        some: {
                            userId: request.user.sub,
                        },
                    },
                },
                include: {
                    _count: {
                        select: {
                            participants: true,
                        },
                    },
                    owner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    participants: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    name: true,
                                    avatarUrl: true,
                                },
                            },
                        },
                        take: 4,
                    },
                },
            })

            return { pools }
        }
    )

    fastify.get(
        '/pools/:id',
        { onRequest: [authenticate] },
        async (request) => {
            const getPoolParams = z.object({
                id: z.string(),
            })

            const { id } = getPoolParams.parse(request.params)

            const pool = await prisma.pool.findUnique({
                where: {
                    id,
                },
                include: {
                    _count: {
                        select: {
                            participants: true,
                        },
                    },
                    owner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    participants: {
                        select: {
                            id: true,
                            amountPoints: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    avatarUrl: true,
                                },
                            },
                        },
                        orderBy: {
                            amountPoints: 'desc'
                        }
                        // take: 4,
                    },
                },
            })

            return { pool }
        }
    )

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()

        return { count }
    })
}
