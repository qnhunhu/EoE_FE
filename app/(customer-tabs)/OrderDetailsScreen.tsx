import OrderCard from '@/components/OrderCard';
import { useAuth } from '@/contexts/AuthContent';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderDetailsScreen() {
    const { order } = useLocalSearchParams(); // Get the order details from the route parameters
    const router = useRouter();
    const parsedOrder = JSON.parse(order as string); // Parse the order details
    const {role}= useAuth();
 
    return (
        <View style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="caret-back-outline" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>ORDER INFORMATION</Text>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                style={styles.section}>
                <OrderCard order={parsedOrder} role={role ||"Buyer"} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#034C53',
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
});

