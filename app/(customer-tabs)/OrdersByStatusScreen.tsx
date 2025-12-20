import OrderCard from '@/components/OrderCard';
import { useAuth } from '@/contexts/AuthContent';
import { Order } from '@/types/Order';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrdersByStatusScreen() {
    const { status, orders } = useLocalSearchParams();


    const router = useRouter();
    const { userId,role } = useAuth(); // Assuming you have a useAuth hook to get the userId
    const parsedOrders = orders ? JSON.parse(orders as string) : [];
    const filteredOrders = parsedOrders.sort(
        (a: Order, b: Order) =>
          new Date(b.payment.paymentDate).getTime() - new Date(a.payment.paymentDate).getTime()
      );
    return (
        <View style={styles.container}>
            {/* Header with Back Button */}
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => router.replace(`/(tabs)/MyOrders`)} style={styles.backButton}>
                    <Ionicons name="caret-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{status}</Text>
            </SafeAreaView>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.section}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                    }}>
                        {filteredOrders.map((order: Order, index: number) => (
                            <TouchableOpacity key={index}
                                onPress={() => router.push({
                                    pathname: `/OrderDetailsScreen`,
                                    params: { order: JSON.stringify(order) },
                                })}>

                                <OrderCard order={order} role={role||'Buyer'} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#006D5B',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 20,
        zIndex: 10,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    textBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    textPrice: {
        color: '#C22727',
        fontWeight: 'bold',
        marginRight: 8,
    },
    textOldPrice: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
    textGray: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    orderDetails: {
        marginTop: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C22727',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: '#C22727',
        fontWeight: 'bold',
    },
    reviewButton: {
        borderColor: '#006D5B',
    },
});