import { NativeBaseProvider, StatusBar } from "native-base"
import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
} from "@expo-google-fonts/roboto"

import { SignIn } from "./src/screens/SignIn"
import { Loading } from "./src/components/Loading"

import { THEME } from "./src/styles"

export default function App() {
    
    const [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
        Roboto_500Medium,
    })

    return (
        <NativeBaseProvider theme={THEME}>
            
            <StatusBar 
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />

            {fontsLoaded ? <SignIn /> : <Loading />}
        </NativeBaseProvider>
    )
}
