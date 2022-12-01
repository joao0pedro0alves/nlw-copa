import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'

import { Game as IGame } from '../../@types'
import { api } from '../../lib/axios'
import { useAuth } from '../../hooks/useAuth'

import { PrivateRoute } from '../../components/helper/PrivateRoute'
import { CreateGame } from '../../components/CreateGame'
import { GamesHeader, GameCategory } from '../../components/GamesHeader'
import { Game } from '../../components/Game'

export function Games() {
    const [games, setGames] = useState<IGame[]>([])
    const [category, setCategory] = useState<GameCategory>('G')

    const { user } = useAuth()

    async function fetchGames() {
        if (user.isAdmin) {
            try {
                const response = await api.get('/games', {
                    params: {
                        category,
                    },
                })
                setGames(response.data.games)
            } catch (error) {
                toast.error(
                    'Não foi possível buscar os jogos, tente novamente!'
                )
            }
        } else {
            toast.error(
                'Você não tem permissão de contabilizar os jogos, entre em contato com o administrador!',
                { toastId: 'fetch-games-error' }
            )
        }
    }

    useEffect(() => {
        fetchGames()
    }, [category])

    async function handleSaveResult(
        gameId: string,
        firstTeamGoals: string,
        secondTeamGoals: string
    ) {
        try {
            if (!firstTeamGoals.trim() || !secondTeamGoals.trim()) {
                toast.error('Informe o placar do jogo')
                return
            }

            await api.put(`/games/${gameId}`, {
                firstTeamGoals,
                secondTeamGoals,
            })

            toast.success('Resultado salvo com sucesso')
        } catch (error) {
            toast.error(
                'Não foi possível atualizar o resultado do jogo, tente novamente!'
            )
        }
    }

    return (
        <main className="container mx-auto mt-28 py-10 px-4">
            <Head>
                <title>Jogos</title>
            </Head>

            <section className="bg-gray-900/20 rounded-lg p-4">
                <Dialog.Root>
                    <GamesHeader 
                        value={category} 
                        onChange={setCategory}
                        showAddButton
                    />
                    <CreateGame 
                        onCreate={fetchGames}
                    />
                </Dialog.Root>

                {games.length === 0 ? (
                    <div className="text-center py-2">
                        <span className="text-gray-300">
                            Essa categoria ainda não possui jogos cadastrados
                        </span>
                    </div>
                ) : (
                    <ul className="gap-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {games.map((game) => {
                            return (
                                <Game
                                    key={game.id}
                                    data={game}
                                    onResultConfirm={handleSaveResult}
                                    isGuess={false}
                                />
                            )
                        })}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default PrivateRoute(Games)
