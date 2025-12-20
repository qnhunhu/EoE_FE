import globalStyles from '@/assets/styles/GlobalStyle';
import { useAuth } from '@/contexts/AuthContent';
import useAccount from '@/hooks/useAccount';
import useCart from '@/hooks/useCart';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function TransactionInformationScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const { userId } = useAuth();
     const { cart, loading, error } = useCart(userId || 3);
    const { products } = useEggProducts();
    const [items, setItems] = useState<any[]>([]);
    const { account } = useAccount(userId||3);
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
            : { name: 'KTX khu B - DHQG', address: 'Note...' }
    )

    const { selectedItems, quantity } = useLocalSearchParams() || {};
    const quantities = quantity ? JSON.parse(quantity as string) : [];

    const oldPrice = items.reduce((total, item, index) => {
        const itemQuantity = quantities[index] || 0; // Get the corresponding quantity or default to 0
        return total + item.price * itemQuantity;
    }, 0);

    const discount = selectedEndow ? (oldPrice * selectedEndow.percent) / 100 : 0;
    const totalPrice = items.reduce(
        (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
        0
      )
    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="caret-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction information</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Contact Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
                    <View style={styles.row}>
                        <Text style={styles.textBold}>{account?.name} - { account?.phone}</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pickup Location */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PICKUP LOCATION</Text>
                    <View style={styles.row}>
                        <Text style={[styles.textBold, { color: 'red' }]}>Free</Text>
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
                    <Text style={globalStyles.p2Medium}>{pickupLocation.name}</Text>
                    <Text style={styles.textGray}>{pickupLocation.address}</Text>
                    <Text style={styles.textGray}>Note: {pickupLocation.note}</Text>
                </View>

                {/* Delivery Time */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#006D5B" />
                        <Text style={styles.textGray}>Delivery time: 16h, tomorrow</Text>
                    </View>
                </View>

                {/* Order Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ORDER INFORMATION</Text>
                    {items.map((item, index) => (
                             <View key={`${item.eggId}-${index}`} style={styles.orderRow}>
                            <Image
                                source={
                                    item.imageURL && typeof item.imageURL === 'string'
                                        ? { uri: item.imageURL }
                                        : require('../../assets/images/logoNormal.png') 
                                }
                                style={styles.productImage}
                            />
                                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.textBold}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.textPrice}>${item.price}</Text>
                                    <Text style={styles.textOldPrice}>${item.price*2}</Text>
                                </View>
                            </View>
                            <Text style={styles.textGray}>Quantity: {item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
                    {selectedPaymentMethod ? (
                        <Text style={styles.textGray}>Selected: {selectedPaymentMethod}</Text>
                    ) : null}
                    <SelectPaymentMethod onSelect={(method) => setSelectedPaymentMethod(method)} />
                </View>

                {/* Endow */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ENDOW</Text>
                    {selectedEndow ? (
                        <Text style={styles.textGray}>Selected: {selectedEndow.name} ({selectedEndow.percent}%)</Text>
                    ) : null}
                    <SelectEndow onSelect={(endow) => setSelectedEndow(endow)} />
                </View>

                {/* Payment Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
                    <View style={styles.row}>
                        <Text style={styles.textGray}>Initial Money:</Text>
                        <Text style={styles.textGray}>${totalPrice}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textGray}>Money is reduced:</Text>
                        <Text style={styles.textGray}>${discount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textGray}>Shipping fee:</Text>
                        <Text style={styles.textGray}>Free</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textBold}>Amount to be paid:</Text>
                        <Text style={[styles.textBold, { color: 'red' }]}>${totalPrice}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.totalText}>Total ${totalPrice}</Text>
                <TouchableOpacity style={styles.buyNowBtn}
                    onPress={() =>
                        router.push({
                            pathname: '/ConfirmPaymentScreen',
                            params: {
                                price: String(totalPrice.toFixed(2)),
                                discount: String(discount.toFixed(2)),
                                totalPrice: String(totalPrice.toFixed(2)),
                                buyerId: String(userId || 3),
                                distributorId: String(pickupLocation.userId),
                                paymentMethod: selectedPaymentMethod ?? 'Cash on Delivery',
                                shippingAddress: account?.address ?? '123 Default St, City, Country',
                              } // Pass total price as a parameter
                        })
                    }>
                    <Text style={styles.buyNowText}>Buy now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#006D5B',
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
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
        marginBottom: 10,
        display: 'flex',
        gap: 4,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#666',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    textBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    textGray: {
        color: '#666',
    },
    linkText: {
        color: '#006D5B',
        fontWeight: 'bold',
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    textPrice: {
        color: '#C22727',
        fontWeight: 'bold',
    },
    textOldPrice: {
        color: '#999',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
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

    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#006D5B',
        fontWeight: 'bold',
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
        onSelect(endow); // Pass the selected endow object
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.linkText}>Select endow...</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {endows.map((endow) => (
                            <TouchableOpacity
                                key={endow.id}
                                style={styles.option}
                                onPress={() => handleSelect(endow)}
                            >
                                <Text style={styles.optionText}>{endow.name}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export function SelectPaymentMethod({ onSelect }: { onSelect: (method: string) => void }) {
    const [modalVisible, setModalVisible] = useState(false);
    const paymentMethods = ['Credit Card', 'PayPal', 'Cash on Delivery'];

    const handleSelect = (method: string) => {
        onSelect(method);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.linkText}>Select payment method...</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {paymentMethods.map((method, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => handleSelect(method)}
                            >
                                <Text style={styles.optionText}>{method}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

