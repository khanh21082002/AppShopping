import React from "react";
import { Welcome , Login , Register , Messenger } from '../screens'
import Friends from "../screens/Friends/FriendScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import UITab from "./UITab"




const Stack = createNativeStackNavigator();
function App(props){
    return<NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="UITab" component={UITab} />
            <Stack.Screen name="Messenger" component={Messenger} />
            <Stack.Screen name="Friends" component={Friends} />
        </Stack.Navigator>
    </NavigationContainer>
}
export default App