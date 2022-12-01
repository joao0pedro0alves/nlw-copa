import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Game as IGame } from '../@types'
import { api } from '../lib/axios'

import { GamesHeader, GameCategory } from './GamesHeader'
import Game from './Game'

interface GuessesProps {
    poolId: string
}

export function Guesses({ poolId }: GuessesProps) {
    const [games, setGames] = useState<IGame[]>([])
    const [category, setCategory] = useState<GameCategory>('G')

    async function fetchGames() {
        try {
            const response = await api.get(`/pools/${poolId}/games`, {
                params: {
                    category,
                },
            })
            setGames(response.data.games)
        } catch (error) {
            toast.error('Não foi possível carregar os bolões')
        }
    }

    async function handleGuessConfirm(
        gameId: string,
        firstTeamPoints: string,
        secondTeamPoints: string
    ) {
        try {
            if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
                toast.error('Informe o placar do jogo')
                return
            }

            await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            })

            toast.success('Palpite realizado com sucesso')
            fetchGames()
        } catch (error) {
            toast.error('Não foi possível enviar o palpite')
        }
    }

    useEffect(() => {
        if (poolId) {
            fetchGames()
        }
    }, [poolId, category])

    return (
        <div className="bg-gray-900/20 rounded-lg p-4 mt-4 md:mt-14 max-h-[600px] overflow-auto apply-custom-scrollbar">
            <GamesHeader 
                value={category} 
                onChange={setCategory} 
            />

            {games.length === 0 ? (
                <div className="text-center py-2">
                    <span className="text-gray-300">
                        Os jogos ainda não foram cadastrados, aguarde que uma
                        notificação será enviada.
                    </span>
                </div>
            ) : (
                <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {games.map((game) => {
                        return (
                            <Game
                                key={game.id}
                                data={game}
                                onGuessConfirm={handleGuessConfirm}
                            />
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
