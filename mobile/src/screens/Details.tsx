import {useState, useEffect} from 'react'
import {Share} from 'react-native'
import {VStack, useToast, HStack} from 'native-base'
import {useRoute} from '@react-navigation/native'

import {api} from '../services/api'
import {examplePools} from '../utils/pools'

import {Header} from '../components/Header'
import {Loading} from '../components/Loading'
import {Option} from '../components/Option'
import {PoolHeader} from '../components/PoolHeader'
import {PoolCardPros as PoolDetails} from '../components/PoolCard'
import {EmptyMyPoolList} from '../components/EmptyMyPoolList'
import {Guesses} from '../components/Guesses'

interface RouteParams {
    id: string
}

export function Details() {
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
    const [isLoading, setIsLoading] = useState(true)
    const [poolDetails, setPoolDetails] = useState<PoolDetails>({} as PoolDetails)

    const route = useRoute()
    const toast = useToast()
    
    const { id } = route.params as RouteParams

    async function fetchPoolDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)
            
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

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code,            
        })
    }

    // function fetchExamplePoolDetails() {
    //     setIsLoading(false)
    //     setPoolDetails(examplePools[0])
    // }

    useEffect(() => {
        fetchPoolDetails()
        // fetchExamplePoolDetails()
    }, [id])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={poolDetails.title}
                backRoute="pools"
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />

            <VStack flex={1}>
                {poolDetails._count?.participants > 0 ? (
                    <VStack px={5}>
                        <PoolHeader data={poolDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option
                                title="Seus palpites"
                                isSelected={optionSelected === 'guesses'}
                                onPress={() => setOptionSelected('guesses')}
                            />
                            <Option
                                title="Ranking do grupo"
                                isSelected={optionSelected === 'ranking'}
                                onPress={() => setOptionSelected('ranking')}
                            />
                        </HStack>

                        <Guesses 
                            poolId={poolDetails.id}
                        />
                    </VStack>
                ) : (
                    <>
                        <VStack px={5}>
                            <PoolHeader data={poolDetails} />
                        </VStack>

                        <EmptyMyPoolList 
                            code={poolDetails.code}
                            onShare={handleCodeShare}
                        />
                    </>
                )}
            </VStack>
        </VStack>
    )
}
