import LoginScreen from '@/app/(auth)/LoginScreen';
import SignUpScreen from '@/app/(auth)/SignUpScreen';
import StartScreen from '@/app/StartScreen';
import { AuthProvider } from '@/contexts/AuthContent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

export type RootStackParamList = {
    StartScreen: undefined;
    LoginScreen: undefined;
    SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="StartScreen"
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name='StartScreen' component={StartScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
);

export default AppNavigator;