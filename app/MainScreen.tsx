import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// IMPORT SCREEN 
import React from 'react';
import ProductScreen from '../app/(customer-tabs)/ProductDetail';
import ShoppingCart from '../app/(customer-tabs)/ShoppingCart';
import Tabs from './(tabs)/_layout';
import NotFoundScreen from './+not-found';
const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    RadioCanada: require('../assets/fonts/RadioCanada.ttf'),
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {/* Tab layout */}
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

        {/* Product detail screen */}
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          options={{ headerShown: false }} />
        {/* Not found fallback */}
        <Stack.Screen
          name="+not-found"
          component={NotFoundScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
