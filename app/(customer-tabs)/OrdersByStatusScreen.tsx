
import OrderCard from '@/components/OrderCard';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import { Order } from '@/types/Order';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function OrdersByStatusScreen() {
    const { status, orders } = useLocalSearchParams();
    const router = useRouter();
    const { userId, role } = useAuth();

    const parsedOrders = orders ? JSON.parse(orders as string) : [];
    const filteredOrders = parsedOrders.sort(
        (a: Order, b: Order) =>
            new Date(b.payment.paymentDate).getTime() - new Date(a.payment.paymentDate).getTime()
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace(`/(tabs)/MyOrders`)} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{status || 'Orders'}</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16 }}>
                <View style={styles.listContainer}>
                    {filteredOrders.length === 0 ? (
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <Text style={{ color: Colors.light.text.secondary }}>No orders found in this status.</Text>
                        </View>
                    ) : (
                        filteredOrders.map((order: Order, index: number) => (
                            <TouchableOpacity key={index}
                                activeOpacity={0.9}
                                onPress={() => router.push({
                                    pathname: `/OrderDetailsScreen`,
                                    params: { order: JSON.stringify(order) },
                                })}
                                style={{ marginBottom: 16 }}
                            >
                                <OrderCard order={order} role={role || 'Buyer'} />
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
    },
    listContainer: {

    },
});