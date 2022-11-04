import {useState, useEffect} from 'react'
import {useToast, FlatList} from 'native-base'

import {api} from '../services/api'
// import {examplePoolGames} from '../utils/pool-games'

import {Loading} from './Loading'
import {Game, GameProps} from '../components/Game'
import {EmptyGameList} from './EmptyGameList'

interface Props {
    poolId: string
}

export function Guesses({poolId}: Props) {
    const [games, setGames] = useState<GameProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')

    const toast = useToast()

    async function fetchGames() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${poolId}/games`)
            setGames(response.data.games)
            
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível carregar os bolões',
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setIsLoading(false)
        }
    }

    async function handleGuessConfirm(gameId: string) {
        try {

            if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
                return toast.show({
                    title: 'Informe o placar do jogo',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            })

            toast.show({
                title: 'Palpite realizado com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

            fetchGames()
            
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível enviar o palpite',
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    // function fetchExampleGames() {
    //     setGames(examplePoolGames)
    //     setIsLoading(false)
    // }

    useEffect(() => {
        fetchGames()
        // fetchExampleGames()
    }, [poolId])

    if (isLoading) {
        return <Loading />
    }

    return (
        <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <Game 
                    data={item} 
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={handleGuessConfirm}
                />
            )}
            ListEmptyComponent={EmptyGameList}
        />
    )
}
