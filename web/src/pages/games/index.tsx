import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Game as IGame, } from '../../@types'
import { api } from '../../lib/axios'

import { PrivateRoute } from '../../components/helper/PrivateRoute'
import { Game } from '../../components/Game'
import Head from 'next/head'

export function Games() {
    const [games, setGames] = useState<IGame[]>([])

    async function fetchGames() {
        try {
            const response = await api.get('/games')
            setGames(response.data.games)

        } catch (error) {
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])

    async function handleSaveResult(gameId: string, firstTeamGoals: string, secondTeamGoals: string) {
        try {
            if (!firstTeamGoals.trim() || !secondTeamGoals.trim()) {
                toast.error('Informe o placar do jogo')
                return
            }

            await api.put(`/games/${gameId}`, {
                firstTeamGoals,
                secondTeamGoals
            })

            toast.success('Resultado salvo com sucesso')
            
        } catch (error) {
            toast.error('Não foi possível atualizar o resultado do jogo, tente novamente!')
        }
    }

    return (
        <main className="container mx-auto mt-28 py-10 px-4">
            <Head>
                <title>Jogos</title>
            </Head>

            <section className="bg-gray-900/20 rounded-lg p-4">
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
            </section>
        </main>
    )
}

export default PrivateRoute(Games)
