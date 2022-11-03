import {Center, Icon, Text} from 'native-base'
import {Fontisto} from '@expo/vector-icons'

import Logo from '../assets/logo.svg'

import {useAuth} from '../hooks/useAuth'
import {Button} from '../components/Button'

export function SignIn() {
    const {signIn} = useAuth()

    return (
        <Center backgroundColor="gray.900" flex={1} p={7}>
            <Logo width={212} height={40} />

            <Button
                onPress={signIn}
                type="SECONDARY"
                title="Entrar com o google"
                leftIcon={
                    <Icon as={Fontisto} name="google" color="white" size="md" />
                }
                mt={12}
            />

            <Text color="gray.200" textAlign='center' mt={4}>
                Não utilizamos nenhuma informação além {'\n'}
                do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    )
}
