import {SvgProps} from 'react-native-svg'
import {Platform} from 'react-native'
import {Text} from 'native-base'

import LogoSvg from '../assets/logo.svg'

export function Logo(props: SvgProps) {
    return Platform.OS !== 'web' ? (
        <LogoSvg {...props} />
    ) : (
        <Text fontFamily="body" color="red.500">
            Logo indisponível na web
        </Text>
    )
}
