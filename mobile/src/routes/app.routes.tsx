import {Platform} from 'react-native'
import {useTheme} from 'native-base'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {PlusCircle, SoccerBall} from 'phosphor-react-native'

import {New} from '../screens/New'
import {Find} from '../screens/Find'
import {Pools} from '../screens/Pools'

const {Navigator, Screen} = createBottomTabNavigator()

export function AppRoutes() {
    const {colors, sizes} = useTheme()

    const size = sizes[6]

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelPosition: 'beside-icon',
                tabBarActiveTintColor: colors.yellow[500],
                tabBarInactiveTintColor: colors.gray[300],
                tabBarStyle: {
                    position: 'absolute',
                    height: sizes[22],
                    borderTopWidth: 0,
                    backgroundColor: colors.gray[800],
                },
                tabBarItemStyle: {
                    position: 'relative',
                    top: Platform.OS === 'android' ? -10 : 0,
                },
            }}
        >
            <Screen
                name="new"
                component={New}
                options={{
                    tabBarLabel: 'Novo bolão',
                    tabBarIcon: ({color}) => (
                        <PlusCircle color={color} size={size} />
                    ),
                }}
            />

            <Screen
                name="find"
                component={Find}
                options={{ tabBarButton: () => null }}
            />

            <Screen
                name="pools"
                component={Pools}
                options={{
                    tabBarLabel: 'Meus bolões',
                    tabBarIcon: ({color}) => (
                        <SoccerBall color={color} size={size} />
                    ),
                }}
            />
        </Navigator>
    )
}
