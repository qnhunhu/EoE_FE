import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

export default function SellerTabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#034C53',
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: { position: 'absolute' },
                    default: {},
                }),
            }}>
            <Tabs.Screen name="ProductManagement"
                options={{
                    title: 'Product Management',
                    tabBarIcon: ({ color }) => <Ionicons name="albums" size={24} color={color} />,
                }} />
            <Tabs.Screen name="OrderManagement"
                options={{
                    title: 'Order Management',
                    tabBarIcon: ({ color }) => <Ionicons name="reorder-three" size={24} color={color} />,
                }}></Tabs.Screen>
            <Tabs.Screen name="HandleExchangeReturn"
                options={{
                    title: 'Exchange & Return',
                    tabBarIcon: ({ color }) => <Ionicons name="return-up-back" size={24} color={color} />,
                }}></Tabs.Screen>
        </Tabs>
    )
}
