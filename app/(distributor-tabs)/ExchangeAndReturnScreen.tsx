import OrderCard from '@/components/OrderCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContent';
import useOrdersDistributor from '@/hooks/useOrderByDistributor';
import useReturnRequestsByDistributor from '@/hooks/useReturnRequestByDistributor';
// const data = [
//     {
//         id: 1,
//         status: 'RETURNED',
//         type: 'Exchange',
//         reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//         paymentMethod: 'VNPay',
//         items: [
//             {
//                 id: 1,
//                 name: '6 of Duck eggs',
//                 price: 0.89,
//                 oldPrice: 1.09,
//                 quantity: 5,
//                 image: require('../../assets/images/logoNormal.png'),
//             },
//             ...Array(3).fill(null).map((_, index) => ({
//                 id: `1-sub-${index + 1}`,
//                 name: `Sub-item ${index + 1} for Duck eggs`,
//                 price: 0.5,
//                 oldPrice: 0.7,
//                 quantity: 1,
//                 image: require('../../assets/images/logoNormal.png'),
//             })),
//         ],
//         customer: {
//             name: 'Nguyen Van A',
//             phone: '0123456789',
//             address: '123 Main St, City',
//         },
//         otherItemsCount: 3,
//     },
//     {
//         id: 2,
//         status: 'RETURNED',
//         type: 'Return',
//         reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//         paymentMethod: 'VNPay',
//         items: [
//             {
//                 id: 1,
//                 name: '6 of Duck eggs',
//                 price: 0.89,
//                 oldPrice: 1.09,
//                 quantity: 5,
//                 image: require('../../assets/images/logoNormal.png'),
//             },
//             ...Array(3).fill(null).map((_, index) => ({
//                 id: `1-sub-${index + 1}`,
//                 name: `Sub-item ${index + 1} for Duck eggs`,
//                 price: 0.5,
//                 oldPrice: 0.7,
//                 quantity: 1,
//                 image: require('../../assets/images/logoNormal.png'),
//             })),
//         ],
//         customer: {
//             name: 'Nguyen Van A',
//             phone: '0123456789',
//             address: '123 Main St, City',
//         },
//         otherItemsCount: 3,
//     },
// ];

export default function ExchangeAndReturnScreen() {
    const router = useRouter();
    const { userId } = useAuth();
    const { orders, loading } = useOrdersDistributor(userId || 6);
    const { returnRequests, loading: returnsLoading } = useReturnRequestsByDistributor(userId || 6);
    if (loading) return <Text>Loading...</Text>;


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="caret-back-outline" size={32} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    EXCHANGE/RETURN <Text>({orders.length})</Text>
                </Text>
            </View>
            <FlatList
                data={returnRequests}
                keyExtractor={(item) => item.returnId.toString()}
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                renderItem={({ item }) => {
                    const foundOrder = orders.find(order => order.orderId === item.orderId);

                    if (!foundOrder) return null; 

                    return (
                    <TouchableOpacity
                        onPress={() => router.push({
                        pathname: `/OrderDetailsScreen`,
                        params: { order: JSON.stringify({ ...foundOrder, returnStatus: item.status }) },
                        })}
                    >
                        <OrderCard
                        order={{
                            ...foundOrder,
                            orderDetails: foundOrder.orderDetails, 
                        }}
                        role="Distributor"
                        />
                    </TouchableOpacity>
                    );
                }}
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
    headerCount: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 24,
    },
    separator: {
        height: 1,
        backgroundColor: '#888',
        marginVertical: 16,
    },
});