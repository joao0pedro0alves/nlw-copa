import {useState} from 'react'
import {Heading, VStack, useToast} from 'native-base'
import {useNavigation} from '@react-navigation/native'

import {api} from '../services/api'

import {Header} from '../components/Header'
import {Input} from '../components/Input'
import {Button} from '../components/Button'

export function Find() {
    const [isLoading, setIsLoading] = useState(false)
    const [poolCode, setPoolCode] = useState('')

    const { navigate } = useNavigation()
    const toast = useToast()

    async function handleJoinPool() {
        try {
            if (!poolCode.trim()) {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            setIsLoading(true)

            await api.post('/pools/join', { code: poolCode })

            toast.show({
                title: 'Você entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

            navigate('pools')
            
        } catch (error) {
            let message = 'Não foi possível encontrar o bolão'

            if (error.response?.data?.message === 'Pool not found.') {
                message = 'Bolão não encontrado'
            }

            if (error.response?.data?.message === 'You already joined this pool.') {
                message = 'Você já está nesse bolão'
            }
            
            toast.show({
                title: message,
                placement: 'top',
                bgColor: 'red.500'
            })
            
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header
                title='Buscar por código'
                backRoute='pools'
                showBackButton
            />

            <VStack mt={8} mx={5} alignItems='center'>

                <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center'>
                    Encontre um bolão através de seu código único
                </Heading>

                <Input 
                    mb={2}
                    placeholder='Qual o nome do seu bolão?'
                    value={poolCode}
                    onChangeText={setPoolCode}
                    autoCapitalize='characters'
                />

                <Button
                    title='Buscar bolão'
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>

        </VStack>
    )
}
