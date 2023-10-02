import React from "react";
import { Setting, ProductGridView, FootList, Profile, Chat } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors, fontSizes } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.disabled,
    marginBottom: 10,

    tabBarActiveBackgroundColor: colors.primary,
    tabBarInactiveBackgroundColor: colors.primary,
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;
        const iconName =
            (screenName == 'FootList' ? 'home' :
                (screenName == 'ProductGridView' ? 'shopping-cart' :
                    (screenName == 'Setting' ? 'gear' :
                        (screenName == 'Profile' ? 'user' :
                            (screenName == 'Chat' ? 'comments' : '')))))
        return <Icon
            name={iconName}
            size={25}
            color={focused ? 'white' : colors.disabled} />
    }
})
function UITab(props) {
    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
            name="FootList"
            component={FootList}
            options={{
                tabBarLabel: 'FootList',
            }}
        />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen
            name="ProductGridView"
            component={ProductGridView}
            options={{
                tabBarLabel: 'Product',
            }}
        />
        <Tab.Screen name="Setting" component={Setting} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
}

export default UITab