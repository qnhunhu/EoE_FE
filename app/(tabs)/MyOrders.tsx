import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useOrdersByBuyer from '@/hooks/useOrderByBuyer';
import { Order, OrderStatus } from '@/types/Order';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const statusConfig: Record<string, { title: string; color: string; icon: string }> = {
  [OrderStatus.ORDERED]: {
    title: 'Processing',
    color: '#FFA500',
    icon: 'time-outline',
  },
  [OrderStatus.DELIVERING]: {
    title: 'Delivering',
    color: '#1E90FF',
    icon: 'bicycle-outline',
  },
  [OrderStatus.DELIVERED]: {
    title: 'Delivered',
    color: '#32CD32',
    icon: 'checkmark-done-outline',
  },
  [OrderStatus.CANCELLED]: {
    title: 'Cancelled',
    color: '#FF0000',
    icon: 'close-circle-outline',
  },
};

export default function MyOrders() {
  const { userId } = useAuth();
  const { orders: fetchedOrders } = useOrdersByBuyer(userId || 7);
  const router = useRouter();

  const orders = fetchedOrders || [];

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

  const calculateTotal = (order: Order) => {
    return order.payment?.amount || order.orderDetails.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  };

  const renderOrderItem = (order: Order) => (
    <TouchableOpacity
      key={order.orderId}
      style={styles.orderItem}
      onPress={() => router.push({
        pathname: '/(customer-tabs)/OrderDetailsScreen',
        params: { orderId: order.orderId, order: JSON.stringify(order) },
      })}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order ID: #{order.orderId}</Text>
          <Text style={styles.orderDate}>{order.payment?.paymentDate ? new Date(order.payment.paymentDate).toLocaleDateString() : ''}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusConfig[order.status]?.color + '20' }]}>
          <Ionicons
            name={statusConfig[order.status]?.icon as any}
            size={16}
            color={statusConfig[order.status]?.color}
          />
          <Text style={[styles.statusText, { color: statusConfig[order.status]?.color }]}>
            {statusConfig[order.status]?.title || order.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderProducts}>
        {order.orderDetails.slice(0, 2).map((item, idx) => (
          <View key={idx} style={styles.productItem}>
            <Image
              source={{ uri: item.eggImageURL }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>{item.eggName}</Text>
              <Text style={styles.productPrice}>{item.quantity} x {item.unitPrice.toLocaleString()}đ</Text>
            </View>
          </View>
        ))}
        {order.orderDetails.length > 2 && (
          <Text style={styles.moreItems}>+{order.orderDetails.length - 2} other items</Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalPrice}>
          Total: <Text style={styles.price}>{calculateTotal(order).toLocaleString()}đ</Text>
        </Text>
        <View style={styles.actionButtons}>
          {order.status === OrderStatus.DELIVERED && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push({
                  pathname: '/(customer-tabs)/ReviewProductScreen',
                  params: { order: JSON.stringify(order) }
                })}
              >
                <Text style={styles.actionButtonText}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.buyAgainButton]}
                onPress={() => {
                  // Handle buy again logic
                }}
              >
                <Text style={[styles.actionButtonText, { color: Colors.light.primary }]}>Buy Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedOrders).map(([status, orders]) => (
          <View key={status} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {statusConfig[status as OrderStatus]?.title || status}
              </Text>
              <TouchableOpacity
                onPress={() => router.push({
                  pathname: '/(customer-tabs)/OrdersByStatusScreen',
                  params: {
                    status,
                    title: statusConfig[status as OrderStatus]?.title || status,
                    orders: JSON.stringify(orders)
                  },
                })}
              >
                <Text style={styles.seeMore}>See All</Text>
              </TouchableOpacity>
            </View>
            {orders.map(renderOrderItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  seeMore: {
    color: Colors.light.primary,
    fontSize: 14,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  orderProducts: {
    marginBottom: 12,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '500',
  },
  moreItems: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  totalPrice: {
    textAlign: 'right',
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  price: {
    fontWeight: 'bold',
    color: '#E53935',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buyAgainButton: {
    borderColor: Colors.light.primary,
  },
});
