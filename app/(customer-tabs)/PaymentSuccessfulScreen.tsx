
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PaymentSuccessfulScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const { products, loading } = useEggProducts();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleBackToHome = () => {
        router.replace('/(tabs)/HomeScreen');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.light.primary} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Success Message Banner */}
                <View style={styles.successBanner}>
                    <SafeAreaView>
                        <Animated.View style={[styles.successContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="checkmark" size={60} color={Colors.light.primary} />
                            </View>
                            <Text style={styles.successTitle}>Payment Successful!</Text>
                            <Text style={styles.successSubtitle}>Thank you for your purchase.</Text>
                            <Text style={styles.successSubtitle}>Your order is getting ready.</Text>

                            <TouchableOpacity style={styles.homeBtn} onPress={handleBackToHome}>
                                <Text style={styles.homeBtnText}>Continue Shopping</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </SafeAreaView>
                </View>

                {/* Similar Products */}
                <View style={styles.similarSection}>
                    <Text style={styles.sectionTitle}>You might also like</Text>
                    {loading ? (
                        <View style={{ padding: 20 }}>
                            <ActivityIndicator size="small" color={Colors.light.primary} />
                        </View>
                    ) : (
                        <View style={styles.grid}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.eggId}
                                    id={product.eggId}
                                    image={product.imageURL}
                                    title={product.name}
                                    oldPrice={product.price * 1.5}
                                    newPrice={product.price}
                                    sold={product.soldCount}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    successBanner: {
        backgroundColor: Colors.light.primary,
        paddingBottom: 40,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: 'center',
        paddingTop: 60, // approximate status bar
    },
    successContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    successSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 4,
    },
    homeBtn: {
        marginTop: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    homeBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    similarSection: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
        marginBottom: 16,
        marginLeft: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
