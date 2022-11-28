import { prisma } from '../lib/prisma'
import { Guess } from '@prisma/client'

type Result = 'draw' | 'firstTeamWinner' | 'secondTeamWinner'

function getResult(firstTeamPoints: number, secondTeamPoints: number): Result {
    if (firstTeamPoints === secondTeamPoints) return 'draw'
    else if (firstTeamPoints > secondTeamPoints) return 'firstTeamWinner'
    else return 'secondTeamWinner'
}

export async function calculatePoints(guesses: Guess[]) {
    let points = 0

    const games = await prisma.game.findMany({
        where: {
            firstTeamGoals: {
                not: null,
            },
            secondTeamGoals: {
                not: null,
            },
        },
    })

    for (let i = 0; i < guesses.length; i++) {
        const guess = guesses[i]
        const game = games.find((game) => game.id === guess.gameId)

        if (
            game &&
            game.firstTeamGoals !== null &&
            game.secondTeamGoals !== null
        ) {

            const guessResult = getResult(guess.firstTeamPoints, guess.secondTeamPoints)
            const gameResult = getResult(game.firstTeamGoals, game.secondTeamGoals)

            if (
                game?.firstTeamGoals === guess.firstTeamPoints &&
                game?.secondTeamGoals === guess.secondTeamPoints
            ) {
                points = points + 3
            } else if (guessResult === gameResult) {
                points = points + 1
            } else {
            }
        }
    }

    return points
}
