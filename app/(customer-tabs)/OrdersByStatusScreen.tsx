
import OrderCard from '@/components/OrderCard';

import { Colors } from '@/constants/Colors';

import { useAuth } from '@/contexts/AuthContent';

import useOrdersByBuyer from '@/hooks/useOrderByBuyer';

import { Order } from '@/types/Order';

import { Ionicons } from '@expo/vector-icons';

import { useLocalSearchParams, useRouter } from 'expo-router';

import React from 'react';

import {

    ActivityIndicator,

    FlatList,

    SafeAreaView,

    StyleSheet,

    Text,

    TouchableOpacity,

    View

} from 'react-native';



export default function OrdersByStatusScreen() {

    const { status, orders: ordersParam } = useLocalSearchParams<{ status: string, orders?: string }>();

    const router = useRouter();

    const { userId, role } = useAuth();

    const { orders: fetchedOrders, loading, error } = useOrdersByBuyer(userId);



    const filteredOrders = React.useMemo(() => {
        // Ưu tiên sử dụng dữ liệu truyền qua params (bao gồm cả mock data từ MyOrders)
        if (ordersParam) {
            try {
                const parsed = JSON.parse(ordersParam);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                console.log("Error parsing orders param", e);
            }
        }

        if (!fetchedOrders || !status) return [];

        return fetchedOrders

            .filter(o => o.status === status)

            .sort((a: Order, b: Order) => {

                const dateA = a.payment?.paymentDate ? new Date(a.payment.paymentDate).getTime() : 0;

                const dateB = b.payment?.paymentDate ? new Date(b.payment.paymentDate).getTime() : 0;

                return dateB - dateA;

            });

    }, [fetchedOrders, status, ordersParam]);



    const renderItem = ({ item }: { item: Order }) => (

        <TouchableOpacity

            activeOpacity={0.9}

            onPress={() => router.push({

                pathname: `/OrderDetailsScreen`,

                params: { orderId: item.orderId },

            })}

            style={{ marginBottom: 16 }}

        >

            <OrderCard order={item} role={role || 'Buyer'} />

        </TouchableOpacity>

    );



    const renderContent = () => {

        if (loading && filteredOrders.length === 0) {

            return <ActivityIndicator size="large" color={Colors.light.primary} style={styles.centered} />;

        }



        if (error && filteredOrders.length === 0) {

            return <Text style={styles.centered}>Error fetching orders.</Text>;

        }



        return (

            <FlatList

                data={filteredOrders}

                renderItem={renderItem}

                keyExtractor={(item) => item.orderId.toString()}

                contentContainerStyle={{ padding: 16 }}

                ListEmptyComponent={

                    <View style={styles.centered}>

                        <Text style={{ color: Colors.light.text.secondary }}>No orders found in this status.</Text>

                    </View>

                }

            />

        );

    };



    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>

                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />

                </TouchableOpacity>

                <Text style={styles.headerTitle}>{status || 'Orders'}</Text>

                <View style={{ width: 24 }} />

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

        marginTop: 50,

    },

    header: {

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

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

});
