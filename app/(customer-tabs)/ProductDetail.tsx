import globalStyles from '@/assets/styles/GlobalStyle';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContent';
import useAddToCart from '@/hooks/useAddToCart';
import useEggProducts from '@/hooks/useEggProducts';
import useProductDetail from '@/hooks/useProductDetail';
import useStore from '@/hooks/useStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const { product, loading } = useProductDetail(Number(id));
    const { products: similarProducts, loading: similarProductsLoading } = useEggProducts();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isBuyNow, setIsBuyNow] = useState(false);
    const { store: storeData, loading: storeLoading } = useStore(product?.storeId || 2);
    const {userId}=useAuth();
    const Router = useRouter();
    const { addToCart, error, success } = useAddToCart();

    const handleChangeToShoppingCart = () => {
        Router.push('/ShoppingCart');
    }

    const handleAddToCart = () => {
        addToCart({
            eggId: Number(id)||1,   
            quantity: quantity,
            buyerId: userId||3 , 
        });
        setIsModalVisible(false);
    }

    const handleBuyNow = () => {
        setIsModalVisible(false);
        Router.push({
            pathname: '/TransactionInformationScreen',
            params: {
                selectedItems: JSON.stringify([product]),
                quantity: JSON.stringify([quantity]),
            }
        });
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                paddingBottom: 8,
                zIndex: 10,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="caret-back-outline" size={24} color="#006D5B" />
                </TouchableOpacity>
                <View style={styles.heartIcons}>
                    <TouchableOpacity style={styles.heartIcon} onPress={() => handleChangeToShoppingCart()}>
                        <Ionicons name="heart" size={20} color="white" />
                        <View style={styles.badge}><Text style={styles.badgeText}>12</Text></View>
                    </TouchableOpacity>
                    <View style={styles.heartIcon}>
                        <Ionicons name="chatbubble" size={20} color="white" />
                        <View style={styles.badge}><Text style={styles.badgeText}>12</Text></View>
                    </View>
                </View>
            </SafeAreaView>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Top image */}
                <View style={{ position: 'relative' }}>
                    <Image

                        // source={require('../../assets/images/logoNormal.png')}

                        source={{ uri: product.imageURL }}
                        style={{ width: '100%', height: 300, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                    />

                </View>

                {/* Product info */}
                <View style={{ padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#C22727', fontWeight: 'bold', fontSize: 22 }}>${product.price}</Text>
                        <Text style={{ marginLeft: 10, color: '#999', textDecorationLine: 'line-through' }}>${product.price * 22}</Text>
                        <Text style={{ marginLeft: 'auto', color: '#666' }}>Sold {product.soldCount}</Text>
                    </View>
                    <Text style={StyleSheet.flatten([{ marginTop: 8, fontSize: 18 }, globalStyles.p1Medium])}>{product.name}</Text>
                    <Divider />
                    {/* Delivery & Return */}
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#006D5B" />
                        <Text style={styles.infoText}>Receive from 16:00 tomorrow{"\n"}Free shipping</Text>
                    </View>
                    <Divider />
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="shield-check-outline" size={24} color="#006D5B" />
                        <Text style={styles.infoText}>Return after receipt - 100% genuine</Text>
                    </View>
                    {/* Shop info */}
                    <View style={styles.shopCard}>
                        <Image
                            source={require('../../assets/images/logoNormal.png')}
                            style={styles.shopAvatar}
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ fontWeight: 'bold' }}>{storeData?.storeName}</Text>
                            <Text style={{ color: '#666' }}>{storeData?.eggCount} products</Text>
                        </View>
                        <TouchableOpacity style={styles.visitBtn}>
                            <Text style={{ color: '#006D5B', fontWeight: 'bold' }}>Visit</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Description */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12 }}>Product description</Text>
                    <Text style={{ marginTop: 4, color: '#333' }}>
                        {product.description || 'No description available for this product.'}
                    </Text>

                    {/* Similar products (placeholder) */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 16 }}>Similar products</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingHorizontal: 12,
                    backgroundColor: '#F4F4F4',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: 15,
                    marginTop: 10,
                }}>
                    {similarProductsLoading ? (
                        <Text>Loading...</Text>) :
                        (similarProducts.map((product) => (
                            <ProductCard
                                key={product.eggId}
                                id={product.eggId}
                                sold={product.soldCount}
                                title={product.name}
                                oldPrice={product.price * 2}
                                newPrice={product.price}
                                image={product.imageURL}
                            />
                        ))
                        )}
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.circleBtn}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="#006D5B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleBtn} onPress={() => setIsModalVisible(true)}>
                    <Ionicons name="cart-outline" size={24} color="#006D5B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowBtn} onPress={() => { setIsModalVisible(true); setIsBuyNow(true) }}>
                    <Text style={styles.buyNowText}>Buy now{'\n'}<Text style={{ fontSize: 14 }}>$0.89</Text></Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Quantity Selection */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Quantity</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={(text) => setQuantity(Number(text))}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#ddd' }]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#006D5B' }]}
                                onPress={isBuyNow ? handleBuyNow : handleAddToCart}
                            >
                                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute', top: 20, left: 20, backgroundColor: '#fff', borderRadius: 20, padding: 6,
    },
    heartIcons: {
        position: 'absolute', top: 20, right: 20, flexDirection: 'row', gap: 10,
    },
    heartIcon: {
        backgroundColor: '#006D5B', borderRadius: 20, padding: 8, position: 'relative',
    },
    badge: {
        position: 'absolute', right: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5,
    },
    badgeText: { color: 'white', fontSize: 9 },
    infoRow: {
        flexDirection: 'row', alignItems: 'center', marginVertical: 5
    },
    infoText: {
        marginLeft: 10, color: '#333', lineHeight: 20,
    },
    shopCard: {
        flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 12,
        backgroundColor: '#F8F8F8', borderRadius: 12,
    },
    shopAvatar: { width: 48, height: 48, borderRadius: 24 },
    visitBtn: {
        borderWidth: 1, borderColor: '#006D5B', borderRadius: 8,
        paddingVertical: 4, paddingHorizontal: 12,
    },
    bottomBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 12, paddingVertical: 12, borderTopWidth: 1, borderColor: '#ddd',
    },
    circleBtn: {
        width: 42, height: 42, borderRadius: 21, borderWidth: 1,
        borderColor: '#006D5B', justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    buyNowBtn: {
        flex: 1, backgroundColor: '#C22727', borderRadius: 16, paddingVertical: 10,
        justifyContent: 'center', alignItems: 'center',
    },
    buyNowText: {
        color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const Divider = ({ color = '#ccc', thickness = 1, marginVertical = 5 }) => {
    return (
        <View style={{
            height: thickness,
            backgroundColor: color,
            marginVertical,
        }} />
    );
};