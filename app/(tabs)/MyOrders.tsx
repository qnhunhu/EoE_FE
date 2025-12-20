import OrderCard from '@/components/OrderCard';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useOrdersByBuyer from '@/hooks/useOrderByBuyer';
import { Order, OrderStatus } from '@/types/Order';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyOrders() {
  const { userId, role } = useAuth();
  const { orders } = useOrdersByBuyer(userId || 3);

  const router = useRouter();
  const groupedOrders = orders.reduce(
    (acc: Record<OrderStatus, Order[]>, order) => {
      if (!acc[order.status]) {
        acc[order.status] = [];
      }
      acc[order.status].push(order);
      return acc;
    },
    {} as Record<OrderStatus, Order[]>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {Object.keys(groupedOrders).length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>No orders found.</Text>
          </View>
        ) : (
          Object.keys(groupedOrders).map((status) => (
            <View key={status} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{status}</Text>
                <TouchableOpacity onPress={() => router.push({
                  pathname: `/OrdersByStatusScreen`,
                  params: { status, orders: JSON.stringify(groupedOrders[status as OrderStatus]) },
                })}>
                  <Text style={styles.seeMore}>See more</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}>
                {groupedOrders[status as OrderStatus].map((order, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => router.push({
                      pathname: `/OrderDetailsScreen`,
                      params: { order: JSON.stringify(order) },
                    })}>
                    <OrderCard
                      order={{ ...order, orderDetails: order.orderDetails.slice(0, 2) }}
                      role={role || 'Buyer'}
                    />
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.primary,
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seeMore: {
    color: '#006D5B',
    fontWeight: 'bold',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#006D5B',
    marginTop: 4,
  },
});