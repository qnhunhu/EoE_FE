
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { useCreateOrder } from '@/hooks/useCreateOder';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ConfirmPaymentScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const { price, discount, totalPrice, buyerId, distributorId, paymentMethod, shippingAddress } = useLocalSearchParams();
    const [isLoading, setIsLoading] = React.useState(false);

    const { createOrder, loading: creatingOrder } = useCreateOrder();

    const getStringParam = (param: string | string[] | undefined | null): string | null =>
        Array.isArray(param) ? param[0] : param ?? null;

    const handleBuyNow = () => {
        setIsLoading(true);
        setTimeout(async () => {
            const method = getStringParam(paymentMethod) || 'Cash on Delivery';
            
            // Gọi API tạo đơn hàng
            const res: any = await createOrder({
                buyerId: buyerId ? Number(buyerId) : (distributorId) : 1,
                paymentMethod: method,
                shippingAddress: getStringParam(shippingAddress) || '123 Default St, City, Country',
            });
            
            setIsLoading(false);

            if (method === 'VietQR') {
                router.push({
                    pathname: '/(customer-tabs)/VietQRScreen',
                    params: { 
                        totalAmount: totalPrice, 
                        orderId: res?.orderId || Math.floor(Math.random() * 100000).toString() 
                    }
                });
            } else {
                router.push('/PaymentSuccessfulScreen');
            }
        }, 2000)
    };

    const formatPrice = (price: string | string[]) => {
        const p = Array.isArray(price) ? price[0] : price;
        if (!p) return '0 ₫';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(p));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm Payment</Text>
            </View>

            {/* Payment Details */}
            <View style={styles.content}>
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>PAYMENT BREAKDOWN</Text>
                    <View style={styles.row}>
                        <Text style={styles.textGray}>Subtotal</Text>
                        <Text style={styles.textBold}>{formatPrice(price as string)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textGray}>Discount</Text>
                        <Text style={[styles.textBold, { color: Colors.light.success }]}>
                            {Number(discount) > 0 ? `-${formatPrice(discount as string)}` : '0 ₫'}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textGray}>Shipping Fee</Text>
                        <Text style={[styles.textBold, { color: Colors.light.success }]}>Free</Text>
                    </View>
                    <View style={[styles.row, styles.divider]}>
                        <Text style={styles.textTotal}>Total Amount</Text>
                        <Text style={styles.textTotalValue}>{formatPrice(totalPrice as string)}</Text>
                    </View>
                </View>

                {/* Important Notice */}
                <View style={[styles.infoBox, globalStyles.shadow]}>
                    <Ionicons name="information-circle-outline" size={24} color={Colors.light.primary} />
                    <Text style={styles.infoText}>
                        By clicking "Confirm Payment", you agree to our Terms of Service and verify that all information is correct.
                    </Text>
                </View>
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.totalLabel}>Total Payment</Text>
                    <Text style={styles.totalValueBottom}>{formatPrice(totalPrice as string)}</Text>
                </View>
                <TouchableOpacity style={styles.confirmBtn}
                    onPress={handleBuyNow}
                >
                    <Text style={styles.confirmBtnText}>Confirm Payment</Text>
                </TouchableOpacity>
            </View>

            {/* Loading Overlay */}
            {isLoading && (
                <Modal transparent animationType="fade" visible={isLoading}>
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" color={Colors.light.primary} />
                            <Text style={{ marginTop: 10, color: Colors.light.text.secondary }}>Processing...</Text>
                        </View>
                    </View>
                </Modal>
            )}
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
    backBtn: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        color: Colors.light.text.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.light.text.secondary,
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
        marginTop: 4,
        alignItems: 'center',
    },
    textGray: {
        color: Colors.light.text.secondary,
        fontSize: 15,
    },
    textBold: {
        fontWeight: '600',
        color: Colors.light.text.primary,
        fontSize: 15,
    },
    textTotal: {
        fontWeight: 'bold',
        color: Colors.light.text.primary,
        fontSize: 16,
    },
    textTotalValue: {
        fontWeight: 'bold',
        color: Colors.light.primary,
        fontSize: 18,
    },
    infoBox: {
        backgroundColor: '#E0F2F1',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoText: {
        flex: 1,
        color: Colors.light.text.primary,
        fontSize: 13,
        lineHeight: 18,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: Colors.light.border,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 10 }
        })
    },
    totalLabel: {
        fontSize: 12,
        color: Colors.light.text.secondary,
    },
    totalValueBottom: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    confirmBtn: {
        backgroundColor: Colors.light.primary,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 2,
    },
    confirmBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBox: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
    }
});