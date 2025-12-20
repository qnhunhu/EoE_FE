import { useAuth } from '@/contexts/AuthContent';
import useAccount from '@/hooks/useAccount';
import useOrdersBySeller from '@/hooks/useOrdersBySeller';
import useUpdateOrderStatus from '@/hooks/useUpdateOrderStatus';
import { Order } from '@/types/Order';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// const mockOrders = Array(6).fill({
//     id: 'afdfg23dw',
//     orderDate: '12/24/2025',
//     status: 'Processing',
//     distributor: {
//         name: 'NGUYEN KHOA QUAN',
//         phone: '0XXX-XXX-XXX',
//         address: 'ABC/DEF.AD street',
//     },
//     customer: {
//         name: 'NGUYEN KHOA QUAN',
//         phone: '0XXX-XXX-XXX',
//     },
//     products: [
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//     ],
//     total: 23.09,
// });

const OrderManagement = () => {
    const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);
    const router = useRouter();
    const { userId } = useAuth();
    const { orders, loading, error,refetch } = useOrdersBySeller(userId || 7);
    const [distributorId, setDistributorId] = useState<number | null>(null);
    const [buyerId, setBuyerId] = useState<number | null>(null);
    const { account, loading: accountLoading } = useAccount(distributorId || 6);
    const { account: cusAccount, loading: cusLoading } = useAccount(buyerId || 3);
    const [orderId, setOrderId] = useState<number | null>(null);
    const { updateOrderStatus } = useUpdateOrderStatus();
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading orders: {error.message}</Text>;
    const renderOrderActions = (order: Order) => {
        if (order.status === 'ORDERED') {
          return (
            <>
              <TouchableOpacity style={{
                backgroundColor: '#176d6d',
                padding: 8,
                minWidth: 100,
                borderRadius: 8,
                alignItems: 'center',
                      marginTop: 12,
                
                  }}
                  onPress={async () => {
                    setOrderId(order.orderId);
                          updateOrderStatus({ orderId: order.orderId, newStatus: 1 });
                          await refetch();  }}>
                <Text style={styles.textInBtn}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                backgroundColor: '#d17878',
                padding: 8,
                minWidth: 100,
                alignItems: 'center',
                borderRadius: 8,
                marginTop: 12,
                  }}
                  onPress={async () => {
                    setOrderId(order.orderId);
                      updateOrderStatus({ orderId: order.orderId, newStatus: 2 });
                      await refetch();
                  }}>
                <Text style={styles.textInBtn}>Refuse</Text>
              </TouchableOpacity>
            </>
          );
        } else if (order.status === 'SELLER_CONFIRMED') {
          return (
            <TouchableOpacity style={{
              backgroundColor: '#176d6d',
              padding: 8,
              minWidth: 100,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 12,
              }}
              onPress={async () => {
                setOrderId(order.orderId);
                  updateOrderStatus({ orderId: order.orderId, newStatus: 3 });
                  await refetch();
              }}>
              <Text style={styles.textInBtn}>Ship</Text>
            </TouchableOpacity>
          );
        }
        // Add more cases as needed
        return null;
      };
    return (
        <View style={styles.bg}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>EggOEgg <Text style={styles.manager}>Manager</Text></Text>
                <View style={styles.navRow}>
                    <TouchableOpacity
                        style={styles.navBtn}
                        onPress={() => router.replace('/W_StartScreen')}
                    ><Text style={[styles.navText, { color: '#034C53' }]}>SIGNOUT</Text></TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.bg}>
                <Text style={styles.title}>YOUR ORDER</Text>
                {orders.map((order, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.orderCard}
                        onPress={() => {
                            setDistributorId(order.distributorId);
                            setIsActiveIdx(idx === isActiveIdx ? null : idx);
                            setBuyerId(order.buyerId);
                          }}>
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}><Text style={styles.bold}>ID:</Text> {order.orderId}</Text>
                                <Text style={styles.label}><Text style={styles.bold}>Order date:</Text> {order.orderDate}</Text>
                                <Text style={styles.label}><Text style={styles.bold}>Status:</Text> {order.status}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}><Text style={styles.bold}>Distributor Name:</Text> {account?.name}</Text>
                                <Text style={styles.label}><Text style={styles.bold}>Phone Number:</Text> {account?.phone}</Text>
                                <Text style={styles.label}><Text style={styles.bold}>Address:</Text> {account?.address}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}><Text style={styles.bold}>Customer Name:</Text> {cusAccount?.name}</Text>
                                <Text style={styles.label}><Text style={styles.bold}>Phone Number:</Text> {cusAccount?.phone}</Text>
                            </View>
                        </View>
                        {isActiveIdx === idx && (
                            <View style={styles.productsRow}>
                                <View style={{}}>
                                    <Text style={styles.bold}>Products:</Text>
                                    {order.orderDetails.map((p, i) => (
                                        <View key={i} style={styles.inforProducts}>
                                            <Text style={styles.productItem}>{p.eggName} </Text>
                                            <Text style={styles.productQty}>x{p.quantity}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.totalCol}>
                                    <Text style={styles.bold}>Total price:</Text>
                                    <Text style={styles.totalPrice}>${order.payment.amount.toFixed(2)}</Text>
                                </View>
                                <View style={styles.productsRow}>
                                    {renderOrderActions(order)}
                                </View>
                                
                            </View>
)}

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#ebebeb',
        padding: 12,
    },
    header: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#d17878',
    },
    manager: {
        fontSize: 12,
        color: '#b86d6d',
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navBtn: {
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 10,
    },
    navText: {
        fontWeight: 'bold',
        color: '#fa8888',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#176d6d',
        marginBottom: 18,
        marginTop: 8,
        marginLeft: 4,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 18,
        padding: 18,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 16,
    },
    label: {
        fontSize: 15,
        color: '#333',
        marginBottom: 2,
    },
    bold: {
        fontWeight: 'bold',
        color: '#222',
    },
    productsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        marginTop: 6,
        gap: 40,
    },
    inforProducts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productItem: {
        fontSize: 15,
        color: '#333',
        marginBottom: 2,
        marginLeft: 8,
        width: 500,
    },
    productQty: {
        fontWeight: 'bold',
        color: '#222',
    },
    totalCol: {
        minWidth: 140,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    totalPrice: {
        color: '#d17878',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 4,
    },
    textInBtn: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default OrderManagement;
