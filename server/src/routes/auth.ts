import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate, createJwtToken } from '../plugins/authenticate'
import { createHash, compareHash } from '../plugins/bcrypt'

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/me',
        { onRequest: [authenticate] },
        async (request) => {
            return { user: request.user }
        }
    )

    fastify.post('/session', async (request, reply) => {
        const createTokenBody = z.object({
            email: z.string(),
            password: z.string(),
        })

        const { email, password } = createTokenBody.parse(request.body)

        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (user && user.password) {
            const isValid = await compareHash(fastify, password, user.password)

            if (isValid) {
                const token = createJwtToken(fastify, user)
                
                return { token }
            } else {
                return reply.status(401).send({
                    message: 'Sorry, your password is incorrect.',
                })
            }
        } else {
            return reply.status(401).send({
                message: 'Sorry, user unregistered.',
            })
        }
    })

    fastify.post('/users', async (request, reply) => {
        const createUserBody = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            avatar_url: z.string().optional(),
        })

        const { name, email, password, avatar_url } = createUserBody.parse(request.body)
        const passwordHash = await createHash(fastify, password)

        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    email, // Enviar email de confirmação
                    password: passwordHash, // Encripitar a senhas
                    avatarUrl: avatar_url
                },
            })

            const token = createJwtToken(fastify, user)

            return { token }
        } else {
            return reply.status(400).send({
                message: 'Email already is registered.',
            })
        }
    })

    fastify.post('/users/google-auth', async (request) => {
        const createUserBody = z.object({
            access_token: z.string(),
        })

        const { access_token } = createUserBody.parse(request.body)

        const userResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        )

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        })

        const userInfo = userInfoSchema.parse(userResponse.data)

        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id,
            },
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture,
                },
            })
        }

        const token = createJwtToken(fastify, user)

        return { token }
    })
}
