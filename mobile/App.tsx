import {useEffect} from 'react'
import {Platform} from 'react-native'
import {NativeBaseProvider, StatusBar} from 'native-base'
import * as NavigationBar from 'expo-navigation-bar'

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
} from '@expo-google-fonts/roboto'

import {Routes} from './src/routes'
import {Loading} from './src/components/Loading'

import {THEME} from './src/styles'
import {AuthContextProvider} from './src/contexts/AuthContext'

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
        Roboto_500Medium,
    })

    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync(THEME.colors.gray[800])
        }
    }, [])

    return (
        <NativeBaseProvider theme={THEME}>
            <AuthContextProvider>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />

                {fontsLoaded ? <Routes /> : <Loading />}
            </AuthContextProvider>
        </NativeBaseProvider>
    )
}
