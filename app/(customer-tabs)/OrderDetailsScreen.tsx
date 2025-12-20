
import OrderCard from '@/components/OrderCard';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetailsScreen() {
    const { order } = useLocalSearchParams(); // Get the order details from the route parameters
    const router = useRouter();
    const parsedOrder = order ? JSON.parse(order as string) : null; // Parse the order details
    const { role } = useAuth();

    if (!parsedOrder) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order Details</Text>
                </View>
                <View style={[styles.section, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
                    <Text style={{ color: Colors.light.text.secondary }}>Order not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Details</Text>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16, paddingTop: 16 }}
                style={styles.scroller}
                showsVerticalScrollIndicator={false}
            >
                <OrderCard order={parsedOrder} role={role || "Buyer"} />
            </ScrollView>
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
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
    },
    scroller: {
        flex: 1,
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 16,
    },
});
