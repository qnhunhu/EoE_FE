
import globalStyles from '@/assets/styles/GlobalStyle';
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useAddToCart from '@/hooks/useAddToCart';
import useEggProducts from '@/hooks/useEggProducts';
import useProductDetail from '@/hooks/useProductDetail';
import useStore from '@/hooks/useStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/GlobalToast';
import {
    ActivityIndicator,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const { product, loading } = useProductDetail(Number(id));
    const { products: similarProducts, loading: similarProductsLoading } = useEggProducts();
    const navigation = useNavigation();
    const router = useRouter();
    const { userId } = useAuth();
    const { addToCart } = useAddToCart();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isBuyNow, setIsBuyNow] = useState(false);

    // Store data (mock or real)
    const { store: storeData } = useStore(product?.storeId || 2);

    useEffect(() => {
        console.log("product data",product)
        console.log("store data",storeData)
    },[product]);

    const { showToast } = useToast();

    const handleAddToCart = async () => {
        const res = await addToCart({
            eggId: Number(id) || 1,
            quantity: quantity,
            buyerId: userId || 1,
        });
        setIsModalVisible(false);
        if (res?.ok) {
            showToast('Added to cart!');
        } else {
            showToast(res?.error || 'Failed to add to cart');
        }
    }

    const handleBuyNow = () => {
        setIsModalVisible(false);
        router.push({
            pathname: '/TransactionInformationScreen',
            params: {
                selectedItems: JSON.stringify([product]),
                quantity: JSON.stringify([quantity]),
            }
        });
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (loading || !product) {
        return (
            <View style={[globalStyles.center, { flex: 1 }]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/ShoppingCart')}>
                        <Ionicons name="cart-outline" size={24} color={Colors.light.text.primary} />
                        {/* Badge could go here */}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <Image
                    source={{ uri: product.imageURL }}
                    style={styles.productImage}
                    resizeMode="cover"
                />

                <View style={styles.contentContainer}>
                    {/* Price & Title */}
                    <Text style={styles.productTitle}>{product.name}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.currentPrice}>{formatPrice(product.price)}</Text>
                        <View style={styles.discountTag}>
                            <Text style={styles.discountText}>-50%</Text>
                        </View>
                        <Text style={styles.soldCount}>Sold {product.soldCount}</Text>
                    </View>

                    {/* Store Info */}
                    <View style={styles.storeContainer}>
                        <View style={styles.storeAvatar}>
                            <Ionicons name="storefront" size={20} color="#fff" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.storeName}>{storeData?.storeName || 'Egg Store'}</Text>
                            <Text style={styles.storeSub}>{storeData?.eggCount || 10} products</Text>
                        </View>
                        <TouchableOpacity style={styles.visitBtn}>
                            <Text style={styles.visitText}>Visit Store</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresRow}>
                        <View style={styles.featureItem}>
                            <MaterialCommunityIcons name="truck-fast-outline" size={24} color={Colors.light.primary} />
                            <Text style={styles.featureText}>Fast Delivery</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <MaterialCommunityIcons name="shield-check-outline" size={24} color={Colors.light.primary} />
                            <Text style={styles.featureText}>Genuine</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <MaterialCommunityIcons name="refresh" size={24} color={Colors.light.primary} />
                            <Text style={styles.featureText}>7 Day Return</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {product.description || 'Fresh eggs from our farm to your table. Guaranteed quality and freshness.'}
                    </Text>

                    {/* Reviews (Placeholder) */}
                    <View style={[styles.row, { justifyContent: 'space-between', marginTop: 20 }]}>
                        <Text style={styles.sectionTitle}>Reviews (12)</Text>
                        <TouchableOpacity>
                            <Text style={{ color: Colors.light.primary }}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Similar Products */}
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>You might also like</Text>
                    <View style={styles.similarGrid}>
                        {similarProducts.slice(0, 2).map((p) => (
                            <ProductCard
                                key={p.eggId}
                                id={p.eggId}
                                sold={p.soldCount}
                                title={p.name}
                                oldPrice={p.price * 1.5}
                                newPrice={p.price}
                                image={p.imageURL}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomBar}>
                <View style={styles.bottomLeft}>
                    <TouchableOpacity style={styles.chatBtn}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color={Colors.light.primary} />
                        <Text style={styles.chatText}>Chat</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomRight}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.cartBtn]}
                        onPress={() => { setIsBuyNow(false); setIsModalVisible(true); }}
                    >
                        <Text style={[styles.actionBtnText, { color: Colors.light.primary }]}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, styles.buyBtn]}
                        onPress={() => { setIsBuyNow(true); setIsModalVisible(true); }}
                    >
                        <Text style={[styles.actionBtnText, { color: '#fff' }]}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Quantity Modal */}
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        onPress={() => setIsModalVisible(false)}
                    />
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Image source={{ uri: product.imageURL }} style={styles.modalImage} />
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <Text style={styles.modalPrice}>{formatPrice(product.price)}</Text>
                                <Text style={styles.modalStock}>Stock: {product.stockQuantity}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={Colors.light.text.secondary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.quantityLabel}>Quantity</Text>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                style={styles.qtyBtn}
                            >
                                <Ionicons name="remove" size={20} color={Colors.light.text.primary} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity
                                onPress={() => setQuantity(quantity + 1)}
                                style={styles.qtyBtn}
                            >
                                <Ionicons name="add" size={20} color={Colors.light.text.primary} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[globalStyles.btnPrimary, { marginTop: 20 }]}
                            onPress={isBuyNow ? handleBuyNow : handleAddToCart}
                        >
                            <Text style={globalStyles.btnPrimaryText}>
                                {isBuyNow ? 'Buy Now' : 'Add to Cart'} - {formatPrice(product.price * quantity)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        zIndex: 10,
    },
    iconBtn: {
        padding: 8,
    },
    headerRight: {
        flexDirection: 'row',
    },
    productImage: {
        width: '100%',
        height: 300,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        backgroundColor: '#fff',
    },
    productTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text.primary,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    currentPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.primary,
        marginRight: 10,
    },
    discountTag: {
        backgroundColor: Colors.light.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 'auto',
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    soldCount: {
        color: Colors.light.text.secondary,
        fontSize: 14,
    },
    storeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        marginBottom: 24,
    },
    storeAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    storeName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text.primary,
    },
    storeSub: {
        fontSize: 12,
        color: Colors.light.text.secondary,
    },
    visitBtn: {
        borderWidth: 1,
        borderColor: Colors.light.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    visitText: {
        color: Colors.light.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    featuresRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.light.border,
    },
    featureItem: {
        alignItems: 'center',
        flex: 1,
    },
    featureText: {
        fontSize: 12,
        marginTop: 4,
        color: Colors.light.text.secondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text.primary,
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 15,
        color: Colors.light.text.secondary,
        lineHeight: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    similarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 30 : 12,
        borderTopWidth: 1,
        borderColor: Colors.light.border,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 4 }
        })
    },
    bottomLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    chatBtn: {
        alignItems: 'center',
    },
    chatText: {
        fontSize: 10,
        color: Colors.light.text.secondary,
    },
    bottomRight: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 24,
    },
    cartBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.light.primary,
    },
    buyBtn: {
        backgroundColor: Colors.light.primary,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '700',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    modalHeader: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    modalImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    modalPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.primary,
        marginBottom: 4,
    },
    modalStock: {
        fontSize: 12,
        color: Colors.light.text.secondary,
    },
    quantityLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    qtyBtn: {
        padding: 10,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 16,
        minWidth: 40,
        textAlign: 'center',
    }
});