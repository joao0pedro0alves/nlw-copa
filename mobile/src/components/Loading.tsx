import {Center, Spinner} from 'native-base'

export function Loading() {
    return (
        <Center flex={1} backgroundColor="gray.900">
            <Spinner color="yellow.500" />
        </Center>
    )
}
