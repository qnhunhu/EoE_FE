
import OrderCard from '@/components/OrderCard';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useOrdersByBuyer from '@/hooks/useOrderByBuyer';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetailsScreen() {
    const { orderId, order: orderString } = useLocalSearchParams<{ orderId: string; order?: string }>();
    const router = useRouter();
    const { userId, role } = useAuth();
    
    // Fetch all orders and then find the specific one
    const { orders, loading, error } = useOrdersByBuyer(userId);

    const order = React.useMemo(() => {
        if (orderString) {
            try {
                return JSON.parse(orderString);
            } catch (e) {
                console.error("Error parsing order param", e);
            }
        }
        if (!orderId || orders.length === 0) return null;
        return orders.find(o => o.orderId.toString() === orderId);
    }, [orders, orderId, orderString]);

    const renderContent = () => {
        if (loading && !order) {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                </View>
            );
        }

        if (error || !order) {
            return (
                <View style={styles.centered}>
                    <Text style={{ color: Colors.light.text.secondary }}>
                        {error ? 'Error fetching order details.' : 'Order not found'}
                    </Text>
                </View>
            );
        }

        return (
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16 }}
                style={styles.scroller}
                showsVerticalScrollIndicator={false}
            >
                <OrderCard order={order} role={role || "Buyer"} />
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/MyOrders')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Details</Text>
            </View>
            {renderContent()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    scroller: {
        flex: 1,
    },
});
