import ProductCard from '@/components/ProductCard';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function PaymentSuccessfulScreen() {
    const router = useRouter();
    const navigation = useNavigation();
   const { products, loading } = useEggProducts();
   if (loading) {
    return <Text>Loading...</Text>;
   }
    const handleChangeToShoppingCart = () => {

        router.push('/ShoppingCart');
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView style={{
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                paddingBottom: 8,
                zIndex: 10,
            }}>
                <TouchableOpacity
                    onPress={() => router.replace('/HomeScreen')}
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

            <ScrollView>
                {/* Success Message */}
                <View style={styles.successMessage}>
                    <Text style={styles.successText}>Payment successful</Text>
                </View>

                {/* Similar Products */}
                <View style={styles.similarProducts}>
                    <Text style={styles.sectionTitle}>Similar products</Text>
                    {/* Grid product list */}
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        backgroundColor: '#F4F4F4',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 20,
                    }}>
                        {loading ? (
                            <Text>Loading...</Text>
                            ) : (
                            products.map((product) => (
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
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
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
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
    },
    successMessage: {
        backgroundColor: '#006D5B',
        color: '#fff',
        height: 320,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    similarProducts: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    productList: {
        paddingBottom: 20,
    },
    productRow: {
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '48%',
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#333',
    },
    productPrice: {
        color: '#C22727',
        fontWeight: 'bold',
        marginTop: 4,
    },
    productOldPrice: {
        color: '#999',
        textDecorationLine: 'line-through',
        fontSize: 12,
    },
    productSold: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
});
