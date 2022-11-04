import {Text, HStack, Box} from 'native-base'
import {CaretLeft, Export} from 'phosphor-react-native'
import {useNavigation} from '@react-navigation/native'

import {AppRootParamList} from '../@types/navigation'

import {ButtonIcon} from './ButtonIcon'

interface Props {
    title: string
    showBackButton?: boolean
    showShareButton?: boolean
    backRoute?: keyof AppRootParamList
    onShare?: () => Promise<void>
}

export function Header({
    title,
    showBackButton = false,
    showShareButton = false,
    backRoute,
    onShare
}: Props) {
    const { navigate, goBack } = useNavigation()

    const EmptyBoxSpace = () => <Box w={6} h={6} />

    return (
        <HStack
            w="full"
            h={24}
            bgColor="gray.800"
            alignItems="flex-end"
            pb={5}
            px={5}
        >
            <HStack w="full" alignItems="center" justifyContent="space-between">
                {showBackButton ? (
                    <ButtonIcon icon={CaretLeft} onPress={() => backRoute ? navigate(backRoute) : goBack()} />
                ) : (
                    <EmptyBoxSpace />
                )}

                <Text
                    color="white"
                    fontFamily="medium"
                    fontSize="md"
                    textAlign="center"
                >
                    {title}
                </Text>

                {showShareButton ? (
                    <ButtonIcon onPress={onShare} icon={Export} />
                ) : (
                    <EmptyBoxSpace />
                )}
            </HStack>
        </HStack>
    )
}
