import {Text} from 'native-base'

export function EmptyGameList() {
    return (
        <Text color="white" fontSize="sm" textAlign="center">
            Os jogos ainda não foram cadastrados, {'\n'}
            aguarde que uma notificação será enviada.
        </Text>
    )
}
