import globalStyles from '@/assets/styles/GlobalStyle';
import { useAuth } from '@/contexts/AuthContent';
import useCart from '@/hooks/useCart';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Checkbox } from 'react-native-paper';

const ShoppingCart = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const { userId } = useAuth();
    const { cart, loading, error } = useCart(userId || 3);
    const { products} = useEggProducts();

    const [items, setItems] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState(false);

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
    

    if (loading || !products) return <Text>Loading...</Text>;
    if (error) return <Text>Failed to load cart</Text>;

    const checkedItems = items.filter(item => item.checked);
    const totalPrice = items.reduce(
        (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
        0
      );
      
      
    const handleChangeToTransactionInformation = () => {
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

    const handleRemoveItem = (index: number) => {
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
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='caret-back-outline' size={24} color='#fff' />
                    </TouchableOpacity>
                    <Text style={StyleSheet.flatten([globalStyles.h4, { color: '#fff' }])}>
                        Shopping cart ({items.length})
                    </Text>
                </View>
            </SafeAreaView>

            {/* Content */}
            <ScrollView style={styles.scrollContainer}>
                {/* Select all */}
                <View style={styles.selectAllRow}>
                    <Checkbox
                        status={selectAll ? 'checked' : 'unchecked'}
                        onPress={handleSelectAll}
                        color='#006D5B'
                    />
                    <Text>Select all</Text>
                </View>

                {/* Cart items */}
                {items.map((item, index) => (
                    <View key={item.cartItemId} style={styles.item}>
                        <Checkbox
                            status={item.checked ? 'checked' : 'unchecked'}
                            color='#006D5B'
                            onPress={() => handleCheckboxChange(index)}
                        />
                        <Image source={{ uri: item.imageURL }} style={styles.image} />
                        <View style={styles.details}>
                            <Text>{item.name}</Text>
                            <Text style={styles.price}>${(item.price ?? 0).toFixed(2)}</Text>
                            <Text style={styles.oldPrice}>${(item.price ?? 0).toFixed(2)}</Text>
                        </View>
                        <View style={styles.quantity}>
                            <TouchableOpacity onPress={() => handleQuantityChange(index, -1)}>
                                <Text style={styles.button}>-</Text>
                            </TouchableOpacity>
                            <Text>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(index, 1)}>
                                <Text style={styles.button}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                            <Ionicons name='trash-outline' size={24} color='#006D5B' />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.total}>Total ${(totalPrice??0).toFixed(2)}</Text>
                <TouchableOpacity style={styles.buyNowBtn} onPress={handleChangeToTransactionInformation}>
                    <Text style={styles.buyNowText}>Buy now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#006D5B',
        paddingVertical: 20,
        paddingHorizontal: 16,
        zIndex: 10,
        elevation: 10,
    },
    headerContent: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    scrollContainer: {
        paddingHorizontal: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    selectAllRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        gap: 8,
    },
    image: {
        width: 66,
        height: 66,
        borderRadius: 5,
    },
    details: {
        flex: 1,
    },
    price: {
        color: 'red',
    },
    oldPrice: {
        textDecorationLine: 'line-through',
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        fontSize: 24,
        paddingHorizontal: 8,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'space-between',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 120,
    },
    buyNowBtn: {
        backgroundColor: '#C22727',
        borderRadius: 16,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 60,
    },
    buyNowText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ShoppingCart;
