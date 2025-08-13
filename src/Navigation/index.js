import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen'; 

const stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
                <stack.Screen name="Home" component={HomeScreen} />
                <stack.Screen name="Welcome" component={WelcomeScreen} />
            </stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;
