import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function AdminTabLayout() {
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
            <Tabs.Screen
                name="UserManagement"
                options={{
                    title: 'User Management',
                    tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="PolicyManagement"
                options={{
                    title: 'Policy Management',
                    tabBarIcon: ({ color }) => <MaterialIcons name="policy" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}