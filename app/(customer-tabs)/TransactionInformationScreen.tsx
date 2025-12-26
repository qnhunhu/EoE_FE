
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useAccount from '@/hooks/useAccount';
import useCart from '@/hooks/useCart';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function TransactionInformationScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const { userId } = useAuth();
    const { cart } = useCart(userId || 7);
    const { products } = useEggProducts();
    const [items, setItems] = useState<any[]>([]);
    const { account } = useAccount(userId || 7);

    useEffect(() => {
        if (cart && products) {
            const merged = cart.items.map((item) => {
                const product = products.find(p => p.eggId === item.eggId);
                return {
                    ...item,
                    ...(product || {}),
                    checked: true,
                };
            });
            setItems(merged);
        }
    }, [cart, products]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedEndow, setSelectedEndow] = useState<{ id: number; name: string; percent: number } | null>(null);
    const { selectedLocation } = useLocalSearchParams() || {};
    const [pickupLocation, setPickupLocation] = useState(
        selectedLocation ? JSON.parse(selectedLocation as string)
            : { name: 'KTX khu B - DHQG', address: 'Dong Hoa, Di An, Binh Duong', note: 'Near canteen' }
    )

    const { selectedItems, quantity } = useLocalSearchParams() || {};
    // Ensure selectedItems is parsed correctly if passed as string
    const itemsOverride = selectedItems ? JSON.parse(selectedItems as string) : items; // Fallback to all items if not passed
    const quantities = quantity ? JSON.parse(quantity as string) : [];

    // Use itemsOverride for calculation if available
    const displayItems = itemsOverride.length > 0 ? itemsOverride : items;

    const oldPrice = displayItems.reduce((total: number, item: any, index: number) => {
        // If coming from direct buy, quantity is passed in params. 
        // If from cart, it might be in item.quantity.
        const itemQuantity = quantities.length > index ? quantities[index] : (item.quantity || 1);
        return total + (item.price || 0) * itemQuantity;
    }, 0);

    const discount = selectedEndow ? (oldPrice * selectedEndow.percent) / 100 : 0;
    const totalPrice = oldPrice - discount;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction Information</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Contact Information */}
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.textBold}>{account?.name}</Text>
                            <Text style={styles.textGray}>{account?.phone}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pickup Location */}
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>PICKUP LOCATION</Text>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text style={styles.textBold}>{pickupLocation.name}</Text>
                            <Text style={styles.textGray}>{pickupLocation.address}</Text>
                            {pickupLocation.note && <Text style={styles.textGray}>Note: {pickupLocation.note}</Text>}
                        </View>
                        <TouchableOpacity
                            onPress={() => router.replace({
                                pathname: '/PickupLocationScreen',
                                params: {
                                    callbackKey: 'onSelectPickupLocation',
                                },
                            })}>
                            <Text style={styles.linkText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Delivery Time */}
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>DELIVERY</Text>
                    <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                        <MaterialCommunityIcons name="truck-fast-outline" size={24} color={Colors.light.primary} />
                        <Text style={[styles.textGray, { marginLeft: 8 }]}>Estimated: 16h, Tomorrow • <Text style={{ color: Colors.light.success, fontWeight: 'bold' }}>Free</Text></Text>
                    </View>
                </View>

                {/* Order Information */}
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
                    {displayItems.map((item: any, index: number) => (
                        <View key={`${item.eggId}-${index}`} style={styles.orderRow}>
                            <Image
                                source={{ uri: item.imageURL || 'https://via.placeholder.com/150' }}
                                style={styles.productImage}
                            />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                    <Text style={styles.textPrice}>{formatPrice(item.price)}</Text>
                                    <Text style={styles.textOldPrice}>{formatPrice(item.price * 1.5)}</Text>
                                </View>
                            </View>
                            <Text style={styles.textQuantity}>x{quantities.length > index ? quantities[index] : (item.quantity || 1)}</Text>
                        </View>
                    ))}
                </View>

                {/* Payment Method */}
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
                    <View style={styles.row}>
                        <Text style={selectedPaymentMethod ? styles.textBold : styles.textGray}>
                            {selectedPaymentMethod || 'Select a payment method'}
                        </Text>
                        <SelectPaymentMethod onSelect={(method) => setSelectedPaymentMethod(method)} />
                    </View>
                </View>

                {/* Endow */}
                <View style={[styles.section, globalStyles.shadow]}>
                    <Text style={styles.sectionTitle}>PROMOTION</Text>
                    <View style={styles.row}>
                        <Text style={selectedEndow ? styles.textBold : styles.textGray}>
                            {selectedEndow ? `${selectedEndow.name} (-${selectedEndow.percent}%)` : 'Select a voucher'}
                        </Text>
                        <SelectEndow onSelect={(endow) => setSelectedEndow(endow)} />
                    </View>
                </View>

                {/* Payment Details */}
                <View style={[styles.section, globalStyles.shadow, { marginBottom: 20 }]}>
                    <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Subtotal</Text>
                        <Text style={styles.detailValue}>{formatPrice(oldPrice)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Discount</Text>
                        <Text style={[styles.detailValue, { color: Colors.light.success }]}>-{formatPrice(discount)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Shipping Fee</Text>
                        <Text style={[styles.detailValue, { color: Colors.light.success }]}>Free</Text>
                    </View>
                    <View style={[styles.detailRow, { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8, marginTop: 8 }]}>
                        <Text style={styles.totalLabel}>Total Payment</Text>
                        <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.totalTextLabel}>Total Payment</Text>
                    <Text style={styles.bottomTotalValue}>{formatPrice(totalPrice)}</Text>
                </View>
                <TouchableOpacity style={styles.buyNowBtn}
                    onPress={() =>
                        router.push({
                            pathname: '/ConfirmPaymentScreen',
                            params: {
                                price: String(oldPrice.toFixed(0)),
                                discount: String(discount.toFixed(0)),
                                totalPrice: String(totalPrice.toFixed(0)),
                                buyerId: String(userId || 7),
                                distributorId: String(pickupLocation.userId || 10),
                                paymentMethod: selectedPaymentMethod ?? 'Cash on Delivery',
                                shippingAddress: account?.address ?? '123 Default St',
                            }
                        })
                    }>
                    <Text style={styles.buyNowText}>Place Order</Text>
                </TouchableOpacity>
            </View>
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
    section: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 12,
        marginHorizontal: 1, // To allow shadow to show
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.light.text.secondary,
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textBold: {
        fontWeight: '600',
        color: Colors.light.text.primary,
        fontSize: 14,
    },
    textGray: {
        color: Colors.light.text.secondary,
        fontSize: 14,
        marginTop: 2,
    },
    linkText: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    productName: {
        fontWeight: '600',
        color: Colors.light.text.primary,
        marginBottom: 4,
        fontSize: 14,
    },
    textPrice: {
        color: Colors.light.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    textOldPrice: {
        color: Colors.light.text.secondary,
        textDecorationLine: 'line-through',
        marginLeft: 8,
        fontSize: 12,
    },
    textQuantity: {
        fontWeight: 'bold',
        color: Colors.light.text.secondary,
        marginLeft: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        color: Colors.light.text.secondary,
        fontSize: 14,
    },
    detailValue: {
        color: Colors.light.text.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.light.text.primary,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.light.primary,
    },

    // Bottom Bar
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: Colors.light.border,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 8 }
        })
    },
    totalTextLabel: {
        fontSize: 12,
        color: Colors.light.text.secondary,
    },
    bottomTotalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    buyNowBtn: {
        backgroundColor: Colors.light.primary,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 2,
    },
    buyNowText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    option: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 16,
        color: Colors.light.text.primary,
    },
    closeButton: {
        marginTop: 16,
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    closeButtonText: {
        color: Colors.light.text.primary,
        fontWeight: '600',
    },
});

export function SelectEndow({ onSelect }: { onSelect: (endow: { id: number; name: string; percent: number }) => void }) {
    const [modalVisible, setModalVisible] = useState(false);
    const endows = [
        { id: 1, name: '10% Discount', percent: 10 },
        { id: 2, name: '20% Discount', percent: 20 },
        { id: 3, name: 'Buy 1 Get 1 Free', percent: 50 },
    ];

    const handleSelect = (endow: { id: number; name: string; percent: number }) => {
        onSelect(endow);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.linkText}>Select ›</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)} />
                    <View style={styles.modalContent}>
                        <Text style={[styles.sectionTitle, { fontSize: 16, color: Colors.light.text.primary }]}>Select Promotion</Text>
                        {endows.map((endow) => (
                            <TouchableOpacity
                                key={endow.id}
                                style={styles.option}
                                onPress={() => handleSelect(endow)}
                            >
                                <Text style={styles.optionText}>{endow.name} (-{endow.percent}%)</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export function SelectPaymentMethod({ onSelect }: { onSelect: (method: string) => void }) {
    const [modalVisible, setModalVisible] = useState(false);
    const paymentMethods = ['Credit Card', 'PayPal', 'Cash on Delivery', 'VietQR'];

    const handleSelect = (method: string) => {
        onSelect(method);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.linkText}>Action ›</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)} />
                    <View style={styles.modalContent}>
                        <Text style={[styles.sectionTitle, { fontSize: 16, color: Colors.light.text.primary }]}>Select Payment Method</Text>
                        {paymentMethods.map((method, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => handleSelect(method)}
                            >
                                <Text style={styles.optionText}>{method}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}
