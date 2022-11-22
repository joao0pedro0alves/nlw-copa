import { FastifyInstance } from 'fastify'

export async function createHash(fastify: FastifyInstance, password: string) {
    return await fastify.bcrypt.hash(password)
}

export async function compareHash(
    fastify: FastifyInstance,
    password: string,
    hash: string
) {
    return await fastify.bcrypt.compare(password, hash)
}
