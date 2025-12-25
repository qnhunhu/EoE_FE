
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useCart from '@/hooks/useCart';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShoppingCart = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const { userId } = useAuth();
    const { cart, loading, error, refetch, removeFromCart } = useCart(userId || 3) as any;
    const { products } = useEggProducts();

    const [items, setItems] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    useFocusEffect(
        useCallback(() => {
            refetch?.();
        }, [])
    );

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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (loading || !products) return (
        <View style={globalStyles.center}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
    );

    if (error) return (
        <View style={globalStyles.center}>
            <Text style={{ color: Colors.light.text.secondary }}>Failed to load cart</Text>
        </View>
    );

    const checkedItems = items.filter(item => item.checked);
    const totalPrice = checkedItems.reduce(
        (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
        0
    );

    const handleChangeToTransactionInformation = () => {
        if (checkedItems.length === 0) return;
        router.push({
            pathname: '/TransactionInformationScreen',
            params: {
                selectedItems: JSON.stringify(checkedItems),
                quantity: JSON.stringify(checkedItems.map(item => item.quantity))
            }
        });
    };

    const handleQuantityChange = (index: number, change: number) => {
        const newItems = [...items];
        newItems[index].quantity += change;

        if (newItems[index].quantity <= 0) {
            handleRemoveItem(index);
        } else {
            setItems(newItems);
        }
    };

    const handleRemoveItem = async (index: number) => {
        const item = items[index];
        if (item && removeFromCart) {
            await removeFromCart(item.eggId);
            await refetch?.();
        }
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleCheckboxChange = (index: number) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    };

    const handleSelectAll = () => {
        const newCheckedState = !selectAll;
        const newItems = items.map(item => ({ ...item, checked: newCheckedState }));
        setItems(newItems);
        setSelectAll(newCheckedState);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name='arrow-back' size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    Shopping Cart ({items.length})
                </Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
                {items.length === 0 ? (
                    <View style={[globalStyles.center, { marginTop: 50 }]}>
                        <Ionicons name="cart-outline" size={64} color={Colors.light.text.light} />
                        <Text style={{ color: Colors.light.text.secondary, marginTop: 10 }}>Your cart is empty</Text>
                    </View>
                ) : (
                    <>
                        {/* Select all */}
                        <View style={styles.selectAllRow}>
                            <Checkbox.Android
                                status={selectAll ? 'checked' : 'unchecked'}
                                onPress={handleSelectAll}
                                color={Colors.light.primary}
                            />
                            <Text style={styles.selectAllText}>Select All ({items.length} items)</Text>
                        </View>

                        {/* Cart items */}
                        {items.map((item, index) => (
                            <View key={item.cartItemId || index} style={[styles.item, globalStyles.shadow]}>
                                <Checkbox.Android
                                    status={item.checked ? 'checked' : 'unchecked'}
                                    color={Colors.light.primary}
                                    onPress={() => handleCheckboxChange(index)}
                                />
                                <Image source={{ uri: item.imageURL }} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.price}>{formatPrice(item.price ?? 0)}</Text>
                                        {/* <Text style={styles.oldPrice}>{formatPrice((item.price ?? 0) * 1.2)}</Text> */}
                                    </View>
                                </View>

                                <View style={styles.actionsColumn}>
                                    <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.removeBtn}>
                                        <Ionicons name='trash-outline' size={20} color={Colors.light.error} />
                                    </TouchableOpacity>

                                    <View style={styles.quantity}>
                                        <TouchableOpacity onPress={() => handleQuantityChange(index, -1)} style={styles.qtyBtn}>
                                            <Text style={styles.qtyText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qtyValue}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => handleQuantityChange(index, 1)} style={styles.qtyBtn}>
                                            <Text style={styles.qtyText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.buyNowBtn, checkedItems.length === 0 && styles.disabledBtn]}
                    onPress={handleChangeToTransactionInformation}
                    disabled={checkedItems.length === 0}
                >
                    <Text style={styles.buyNowText}>Checkout ({checkedItems.length})</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

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
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    selectAllRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
    },
    selectAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text.primary,
        marginLeft: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 8,
    },
    details: {
        flex: 1,
        height: 70,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text.primary,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    price: {
        color: Colors.light.primary,
        fontWeight: 'bold',
        fontSize: 15,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: Colors.light.text.secondary,
        fontSize: 12,
    },
    actionsColumn: {
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    removeBtn: {
        padding: 4,
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text.primary,
    },
    qtyValue: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 4,
        minWidth: 16,
        textAlign: 'center',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: Colors.light.border,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 10 }
        })
    },
    totalInfo: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: Colors.light.text.secondary,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    buyNowBtn: {
        backgroundColor: Colors.light.primary,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        minWidth: 140,
    },
    disabledBtn: {
        backgroundColor: '#ccc',
    },
    buyNowText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default ShoppingCart;
