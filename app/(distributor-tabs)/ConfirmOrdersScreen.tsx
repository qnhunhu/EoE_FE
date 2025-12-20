import OrderCard from '@/components/OrderCard';
import {
    useAuth
} from '@/contexts/AuthContent';
import useOrdersDistributor from '@/hooks/useOrderByDistributor';
import { Order, OrderStatus } from '@/types/Order';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// const orders = Array.from({ length: 8 }).map((_, i) => ({

//     id: i + 1,
//     status: 'DIS-DELIVERED',
//     items: [
//         {
//             id: 1,
//             name: '6 of Duck eggs',
//             price: 0.89,
//             oldPrice: 1.09,
//             quantity: 5,
//             image: require('../../assets/images/logoNormal.png'),
//         },
//         // Add sub-items if otherItemsCount > 0
//         ...Array(3).fill(null).map((_, index) => ({
//             id: `1-sub-${index + 1}`,
//             name: `Sub-item ${index + 1} for Duck eggs`,
//             price: 0.5,
//             oldPrice: 0.7,
//             quantity: 1,
//             image: require('../../assets/images/logoNormal.png'),
//         })),
//     ],
//     customer: {
//         name: 'Nguyen Van A',
//         phone: '0123456789',
//         address: '123 Main St, City',
//     },
//     otherItemsCount: 3,
//     paymentTime: 'Mon, Aug 12th 2025',
//     paymentMethod: 'VNPay',
//     total: 10.0,
// }));
export default function ConfirmOrdersScreen() {
const {userId} = useAuth();
const { orders, loading,refetch } = useOrdersDistributor(userId || 6);
  const groupedOrders = orders.reduce(
    (acc: Record<OrderStatus, Order[]>, order) => {
      if (!acc[order.status]) {
        acc[order.status] = [];
      }
      acc[order.status].push(order);
      return acc;
    },
    {} as Record<OrderStatus, Order[]>
  );


    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { router.replace('/(distributor-tabs)/DistributorMainScreen') }}>
                    <Ionicons name="caret-back-outline" size={32} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    CONFIRM ORDERS <Text style={styles.headerTitle}>({orders.length})</Text>
                </Text>
            </View>
            <FlatList
                data={orders}
                keyExtractor={item => item.orderId.toString()}
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => router.push({
                            pathname: `/(customer-tabs)/OrderDetailsScreen`,
                            params: { order: JSON.stringify(item) },
                        })}>
                        <OrderCard order={{ ...item, orderDetails: [item.orderDetails[0]] }} role="Distributor" onStatusUpdated={refetch}/>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#034C53',
        padding: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#888',
        marginVertical: 16,
    },
});