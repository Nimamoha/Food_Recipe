<<<<<<< HEAD
import AppNavigation from "./src/Navigation";

export default function App() {
  return <AppNavigation />;
}
=======
import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';

const stack = createNativeStackNavigator();

function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignupScreen} />
                {/*<Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
>>>>>>> 2075151291adf1cb6a1684b5e4180c5998d72a7c
