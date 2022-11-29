import {useState, useCallback} from 'react'
import {Icon, VStack, FlatList, useToast} from 'native-base'
import {Octicons} from '@expo/vector-icons'
import {useNavigation, useFocusEffect} from '@react-navigation/native'

import {api} from '../services/api'

import {Button} from '../components/Button'
import {Header} from '../components/Header'
import {Loading} from '../components/Loading'
import {PoolCard, PoolCardPros} from '../components/PoolCard'
import {EmptyPoolList} from '../components/EmptyPoolList'

export function Pools() {
    const [isLoading, setIsLoading] = useState(true)
    const [pools, setPools] = useState<PoolCardPros[]>([])

    const { navigate } = useNavigation()
    const toast = useToast()

    async function fetchPools() {
        try {
            setIsLoading(true)

            const response = await api.get('/pools')
            setPools(response.data.pools)
            
        } catch (error) {
            toast.show({
                title: 'Não foi possível carregar os bolões',
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchPools()
        }, [])
    )

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack
                mt={6}
                mx={5}
                pb={4}
                mb={4}
                borderBottomWidth={1}
                borderBottomColor="gray.600"
            >
                <Button
                    title="Buscar bolão por código"
                    leftIcon={
                        <Icon
                            as={Octicons}
                            name="search"
                            color="black"
                            size="md"
                        />
                    }
                    onPress={() => navigate('find')}
                />
            </VStack>

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={pools}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => ((
                        <PoolCard 
                            data={item}
                            onPress={() => navigate('details', { id: item.id })}
                        />
                    ))}
                    showsVerticalScrollIndicator={false}
                    px={5}
                    _contentContainerStyle={{pb: 10}}
                    ListEmptyComponent={() => <EmptyPoolList />}
                />
            )}
        </VStack>
    )
}
