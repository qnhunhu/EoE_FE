import { useCreateOrder } from '@/hooks/useCreateOder';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfirmPaymentScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const { price, discount, totalPrice,buyerId,distributorId,paymentMethod,shippingAddress } = useLocalSearchParams(); // Get total price from params
    const [isLoading, setIsLoading] = React.useState(false);


    const { createOrder, loading: creatingOrder } = useCreateOrder();
    const getStringParam = (param: string | string[] | undefined | null): string | null =>
        Array.isArray(param) ? param[0] : param ?? null;
    const handleBuyNow = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            createOrder({
                buyerId: buyerId? Number(buyerId) : 3, // Default to 3 if buyerId is not provided
                distributorId: distributorId? Number(distributorId) : 1, // Default to 1 if distributorId is not provided
                paymentMethod: getStringParam(paymentMethod) || 'Cash on Delivery', // Default to 'Cash on Delivery' if paymentMethod is not provided
                shippingAddress: getStringParam(shippingAddress) || '123 Default St, City, Country', // Default address if not provided
            });
            router.push('/PaymentSuccessfulScreen');
        }, 2000)
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="caret-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm payment</Text>
            </View>

            {/* Payment Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
                <View style={styles.row}>
                    <Text style={styles.textGray}>Initial Money:</Text>
                    <Text style={styles.textBold}>${price}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textGray}>Money is reduced:</Text>
                    <Text style={styles.textBold}>${discount}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textGray}>Shipping fee:</Text>
                    <Text style={styles.textBold}>Free</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textGray}>Amount to be paid:</Text>
                    <Text style={[styles.textBold, { color: 'red' }]}>${totalPrice}</Text>
                </View>
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalText}>Total ${totalPrice}</Text>
                <TouchableOpacity style={styles.buyNowBtn}
                    onPress={() => handleBuyNow()}
                >
                    <Text style={styles.buyNowText}>Buy now</Text>
                </TouchableOpacity>
            </View>
            {/* Loading Overlay */}
            {isLoading && (
                <Modal transparent animationType="fade" visible={isLoading}>
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        backgroundColor: '#006D5B',
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    section: {
        backgroundColor: '#fff',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#666',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    textGray: {
        color: '#666',
    },
    textBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 120,
    },
    buyNowBtn: {
        backgroundColor: '#C22727', borderRadius: 16, paddingVertical: 10,
        justifyContent: 'center', alignItems: 'center',
        width: "60%", height: 60,
    },
    buyNowText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
});