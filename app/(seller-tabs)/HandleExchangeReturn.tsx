import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const mockExchanges = Array(4).fill({
//     id: 'afdfg23dw',
//     orderDate: '12/24/2025',
//     status: 'Processing',
//     type: 'Exchange',
//     customer: {
//         name: 'NGUYEN KHOA QUAN',
//         phone: '0XXX-XXX-XXX',
//     },
//     reasons: '3 on 10 were broken',
//     description: 'During transportation, 3 out of the 10 eggs in my order were broken. The product no longer meets the promised quantity and quality. I would like to request a replacement to ensure my consumer rights and product satisfaction.',
//     payment: 'PNPay',
//     products: [
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//         { name: '10 of Chicken eggs 1 month left', quantity: 2 },
//     ],
//     total: 23.09,
// });
import { useAuth } from '@/contexts/AuthContent';
import useAccount from '@/hooks/useAccount';
import useOrdersBySeller from '@/hooks/useOrdersBySeller';
import useReturnRequestsBySeller from '@/hooks/useReturnRequestsBySeller';
const HandleExchangeReturn = () => {
    const router = useRouter();

    const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);
    const { userId } = useAuth();
    const { returnRequests, loading, error } = useReturnRequestsBySeller(userId || 7);
    const { orders, loading: ordersLoading, error: ordersError } = useOrdersBySeller(userId || 7);
        const [distributorId, setDistributorId] = useState<number | null>(null);
        const [buyerId, setBuyerId] = useState<number | null>(null);
        const { account, loading: accountLoading } = useAccount(distributorId || 6);
        const {account:cusAccount, loading: cusLoading} = useAccount(buyerId || 3);
        
    return (
        <View style={styles.bg}>
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
                <Text style={styles.title}>EXCHANGE/RETURN</Text>
                {returnRequests.map((item, idx) => {
                    const foundOrder = orders.find(order => order.orderId === item.orderId);

                    return (
                        <TouchableOpacity
                            key={idx}
                            style={styles.card}
                            onPress={() => {
                                setIsActiveIdx(idx === isActiveIdx ? null : idx);
                                setBuyerId(foundOrder?.buyerId || 3);
                                setDistributorId(foundOrder?.distributorId || 6);
                            }}
                        >
                            <View style={styles.row}>
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <Text style={styles.label}><Text style={styles.bold}>ID:</Text> {item.returnId}</Text>
                                    <Text style={styles.label}><Text style={styles.bold}>Order date:</Text> {foundOrder?.orderDate}</Text>
                                    <Text style={styles.label}><Text style={styles.bold}>Status:</Text> {item.status}</Text>

                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <Text style={styles.label}><Text style={styles.bold}>Customer Name:</Text> {cusAccount?.name}</Text>
                                    <Text style={styles.label}><Text style={styles.bold}>Phone Number:</Text> {cusAccount?.phone}</Text>
                                    <Text style={styles.label}><Text style={styles.bold}>Types:</Text> {foundOrder?.status}</Text>

                                </View>
                                <View style={styles.btnGroup}>
                                    <TouchableOpacity style={styles.confirmBtn}>
                                        <Text style={styles.confirmText}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.refuseBtn}>
                                        <Text style={styles.refuseText}>Refuse</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {isActiveIdx === idx && (
                                <View style={styles.productsRow}>
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Text style={styles.label}><Text style={styles.bold}>Reasons:</Text> {item.reason}</Text>
                                        <Text style={styles.label}><Text style={styles.bold}>Description:</Text> During transportation, 3 out of the 10 eggs in my order were broken. The product no longer meets the promised quantity and quality. I would like to request a replacement to ensure my consumer rights and product satisfaction.</Text>
                                        <Text style={styles.label}><Text style={styles.bold}>Payment method:</Text> {foundOrder?.payment.method}</Text>
                                        <View style={{ flexDirection: 'row', gap: 40 }}>
                                            <View style={{ width: '70%' }}>
                                                <Text style={styles.bold}>Products:</Text>
                                                {foundOrder?.orderDetails.map((p, i) => (
                                                    <View key={i} style={styles.inforProducts}>
                                                        <Text style={styles.productItem}>{p.eggName} </Text>
                                                        <Text style={styles.productQty}>x{p.quantity}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                            <View style={styles.totalCol}>
                                                <Text style={styles.bold}>Total price:</Text>
                                                <Text style={styles.totalPrice}>${foundOrder?.payment.amount.toFixed(2)}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            )}

                        </TouchableOpacity>
                    );
                })}
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
    card: {
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
    reasonText: {
        marginLeft: 12,
        color: '#222',
        fontSize: 15,
        marginBottom: 2,
    },
    descText: {
        marginLeft: 12,
        color: '#222',
        fontSize: 15,
        marginBottom: 2,
    },
    btnGroup: {
        flexDirection: 'column',
        gap: 10,
    },
    confirmBtn: {
        backgroundColor: '#1ca89c',
        borderRadius: 6,
        paddingVertical: 8,
        minWidth: 100,
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%',
        textAlign: 'center',
    },
    refuseBtn: {
        backgroundColor: '#a63a2b',
        borderRadius: 6,
        paddingVertical: 8,
        minWidth: 100,
    },
    refuseText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%',
        textAlign: 'center',
    },
    productsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        marginTop: 6,
        gap: 16,
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
});

export default HandleExchangeReturn;