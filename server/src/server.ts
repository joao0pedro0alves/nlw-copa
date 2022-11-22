import Fastify from 'fastify'
import bcrypt from 'fastify-bcrypt'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import * as dotenv from "dotenv"

import {authRoutes} from './routes/auth'
import {gameRoutes} from './routes/game'
import {guessRoutes} from './routes/guess'
import {poolRoutes} from './routes/pool'
import {userRoutes} from './routes/user'

dotenv.config()

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(jwt, {
        secret: process.env.JWT_ACCESS_SECRET,
    })
    
    await fastify.register(bcrypt, {
        saltWorkFactor: 12,
        prefix: process.env.JWT_ACCESS_SECRET
    })

    // Em produção isso precisa ser uma variavel de ambiente !!!

    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)

    await fastify.listen({
        port: 3333,
        host: '0.0.0.0',
    })
}

bootstrap()
