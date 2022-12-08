import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CountryFlag from 'react-country-flag'

import clsx from 'clsx'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { Participant } from '../@types'
import { api } from '../lib/axios'

import { GameCategory } from './GamesHeader'
import { SoccerLoading } from './helper/SoccerLoading'

interface Guess {
    id: string
    firstTeamPoints: number
    secondTeamPoints: number
    participant: Participant
}

interface GameWithGuesses {
    id: string
    date: string
    firstTeamCountryCode: string
    secondTeamCountryCode: string
    firstTeamGoals: number | null
    secondTeamGoals: number | null
    category: GameCategory
    guesses: Guess[]
}

interface GuessesTableProps {
    poolId: string
}

type Result = 'draw' | 'firstTeamWinner' | 'secondTeamWinner'

function getResult(firstTeamPoints: number, secondTeamPoints: number): Result {
    if (firstTeamPoints === secondTeamPoints) return 'draw'
    else if (firstTeamPoints > secondTeamPoints) return 'firstTeamWinner'
    else return 'secondTeamWinner'
}


function distinct<T>(anyList: T[]): T[] {
    return anyList.filter((value, index) => {
        const _value = JSON.stringify(value)

        return (
            index ===
            anyList.findIndex((obj) => {
                return JSON.stringify(obj) === _value
            })
        )
    })
}

export function GuessesTable({ poolId }: GuessesTableProps) {
    const [games, setGames] = useState<GameWithGuesses[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function fetchGames() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${poolId}/games/guesses`)
            setGames(response.data.games)
        } catch (error) {
            toast.error('Não foi possivel carregar os jogos, tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (poolId) fetchGames()
    }, [poolId])

    const participants = distinct(
        games.flatMap((g) => g.guesses?.flatMap((g) => g.participant))
    ).sort((a, b) => b.amountPoints - a.amountPoints)

    const when = (date: string) => dayjs(date)
        .locale(ptBR)
        .format('DD/MM/YYYY')

    if (isLoading) {
        return <SoccerLoading loadingText="Montando tabela..." />
    }

    return (
        <table className="table-fixed w-full">
            <thead className='sticky top-0 bg-gray-900/80'>
                <tr>
                    <th className="border-r border-b border-gray-600 py-4">
                        <span className="text-gray-100">Jogos</span>
                    </th>
                    {participants.map((participant) => {
                        return (
                            <th
                                className="border-b border-gray-600 py-4"
                                key={participant.id}
                            >
                                <div className="flex flex-col items-center justify-center">
                                    {participant.user.avatarUrl ? (
                                        <img
                                            className="border-2 border-yellow-500 w-12 h-12 lg:w-16 lg:h-16 rounded-full"
                                            src={participant.user.avatarUrl}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="bg-gray-800 border-gray-600 border-2 flex items-center justify-center w-16 h-16 rounded-full">
                                            <span className="text-2xl text-gray-100 font-bold">
                                                {participant.user.name.charAt(
                                                    0
                                                )}
                                            </span>
                                        </div>
                                    )}

                                    <span className="text-gray-200 block mt-2">
                                        {participant.user.name}
                                    </span>

                                    <span className="font-normal text-xs text-gray-300">
                                        {participant.amountPoints} ponto(s)
                                    </span>
                                </div>
                            </th>
                        )
                    })}
                </tr>
            </thead>

            <tbody>
                {games.map((game) => {
                    return (
                        <tr className='hover:bg-yellow-500/10' key={game.id}>
                            {/* ==== GAME ==== */}
                            <td className="border-r border-b border-gray-600 py-4">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="flex gap-2 items-center">
                                        {game.firstTeamCountryCode.length ===
                                        2 ? (
                                            <CountryFlag
                                                countryCode={
                                                    game.firstTeamCountryCode
                                                }
                                                style={{
                                                    marginRight: 12,
                                                    fontSize: '2em',
                                                }}
                                            />
                                        ) : (
                                            <span className="text-gray-100 font-bold">
                                                {game.firstTeamCountryCode}
                                            </span>
                                        )}

                                        <span className="text-gray-300 text-sm">
                                            vs.
                                        </span>

                                        {game.secondTeamCountryCode.length ===
                                        2 ? (
                                            <CountryFlag
                                                countryCode={
                                                    game.secondTeamCountryCode
                                                }
                                                style={{
                                                    marginRight: 12,
                                                    fontSize: '2em',
                                                }}
                                            />
                                        ) : (
                                            <span className="text-gray-100 font-bold">
                                                {game.secondTeamCountryCode}
                                            </span>
                                        )}
                                    </div>

                                    <span className="font-bold text-xs text-gray-100">
                                        {game.firstTeamGoals} x{' '}
                                        {game.secondTeamGoals}
                                    </span>

                                    <span className='text-gray-300 text-xs'>
                                        {when(game.date)}
                                    </span>
                                </div>
                            </td>
                            {/* ==== GUESSES ==== */}
                            {participants.map((participant) => {

                                const guess = game.guesses.find(
                                    g => g.participant.id === participant.id
                                )

                                const guessResult = guess && getResult(guess?.firstTeamPoints, guess?.secondTeamPoints)
                                const gameResult = getResult(game.firstTeamGoals as number, game.secondTeamGoals as number)

                                const hitScore = 
                                    game?.firstTeamGoals === guess?.firstTeamPoints &&
                                    game?.secondTeamGoals === guess?.secondTeamPoints

                                const hitResult = guessResult === gameResult

                                return (
                                    <td align='center' key={participant.id}>
                                        <span className={clsx(
                                            "font-bold text-sm",
                                            {
                                                ['text-gray-100']: !hitScore && !hitResult,
                                                ['text-yellow-500']: hitResult && !hitScore,
                                                ['text-green-500']: hitScore,
                                            }

                                        )}>
                                            {guess?.firstTeamPoints} x{' '}
                                            {guess?.secondTeamPoints}
                                        </span>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
