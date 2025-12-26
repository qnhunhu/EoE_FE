import globalStyles from '@/assets/styles/GlobalStyle';
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import useEggProducts from '@/hooks/useEggProducts';
import useStore from '@/hooks/useStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function StoreScreen() {
    const { storeId } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const { store, loading: storeLoading } = useStore(Number(storeId));
    const { products, loading: productsLoading } = useEggProducts();

    // Filter products by storeId
    const storeProducts = React.useMemo(() => {
        return products.filter(p => p.storeId === Number(storeId));
    }, [products, storeId]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (storeLoading) {
        return (
            <View style={[globalStyles.center, { flex: 1 }]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Store</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Store Info */}
                <View style={styles.storeInfoContainer}>
                    <View style={styles.storeAvatar}>
                        <Ionicons name="storefront" size={40} color="#fff" />
                    </View>
                    <Text style={styles.storeName}>{store?.storeName || 'Unknown Store'}</Text>
                    <Text style={styles.storeDescription}>
                        {store?.description || 'Quality eggs supplier'}
                    </Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{storeProducts.length}</Text>
                            <Text style={styles.statLabel}>Products</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>4.8</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>1k+</Text>
                            <Text style={styles.statLabel}>Sold</Text>
                        </View>
                    </View>
                </View>

                {/* Products Section */}
                <View style={styles.productsSection}>
                    <Text style={styles.sectionTitle}>Products</Text>
                    {productsLoading ? (
                        <ActivityIndicator size="small" color={Colors.light.primary} />
                    ) : storeProducts.length === 0 ? (
                        <Text style={styles.emptyText}>No products found</Text>
                    ) : (
                        <View style={styles.productsGrid}>
                            {storeProducts.map((item) => (
                                <ProductCard
                                    key={item.eggId}
                                    id={item.eggId}
                                    image={item.imageURL}
                                    title={item.name}
                                    oldPrice={item.price * 1.2}
                                    newPrice={item.price}
                                    sold={item.soldCount || 0}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
    },
    storeInfoContainer: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#F8F9FA',
    },
    storeAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    storeName: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.light.text.primary,
        marginBottom: 8,
    },
    storeDescription: {
        fontSize: 14,
        color: Colors.light.text.secondary,
        textAlign: 'center',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: Colors.light.border,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.light.text.secondary,
        marginTop: 4,
    },
    productsSection: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text.primary,
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: Colors.light.text.secondary,
        marginTop: 20,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
