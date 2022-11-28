import { PrismaClient } from '@prisma/client'
import { games } from '../mock/games'

const prisma = new PrismaClient()

async function main() {

    // const user  = await prisma.user.create({
    //     data: {
    //         name: 'João Pedro Alves',
    //         email: 'joao.alves1032003@gmail.com',
    //         avatarUrl: 'https://github.com/joao0pedro0alves.png',
    //     }
    // })

    // await prisma.pool.create({
    //     data: {
    //         title: 'Bolão da Ecosis',
    //         code: 'ECOBOL',
    //         ownerId: user.id,

    //         participants: {
    //             create: {
    //                 userId: user.id
    //             }
    //         }
    //     }
    // })

    // Create Games

    const createManyGames = games.map(game => (
        prisma.game.create({
            data: game
        })
    ))

    await Promise.all(createManyGames)

    // await prisma.game.create({
    //     data: {
    //         date: '2022-11-26T12:00:00.989Z',
    //         firstTeamCountryCode: 'BR',
    //         secondTeamCountryCode: 'AR',

    //         guesses: {
    //             create: {
    //                 firstTeamPoints: 2,
    //                 secondTeamPoints: 1,

    //                 participant: {
    //                     connect: {
    //                         userId_poolId: {
    //                             userId: user.id,
    //                             poolId: pool.id
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
}

main()
