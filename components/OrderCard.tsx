import useAccount from '@/hooks/useAccount';
import useUpdateOrderStatus from '@/hooks/useUpdateOrderStatus';
import { Order } from '@/types/Order';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function OrderCard({ order, role, onStatusUpdated }: { order: Order; role: string; onStatusUpdated?: () => void  }) {
  const router = useRouter();
  const isBuyer = role === 'Buyer';
  const isDistributor = role === 'Distributor';

  // Buyer cần biết thông tin seller
    // Distributor cần biết thông tin buyer
    
  const userIdToFetch = isBuyer ? order.distributorId : isDistributor ? order.buyerId : null;
  const { account, loading } = useAccount(userIdToFetch ?? 0);
    const { updateOrderStatus } = useUpdateOrderStatus();
  const renderProductInfo = () => (
    <>
      {order.orderDetails.map((item, itemIndex) => (
        <View key={itemIndex} style={styles.orderRow}>
          <Image source={{ uri: item.eggImageURL }} style={styles.productImage} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.textBold}>{item.eggName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.textPrice}>${item.unitPrice}</Text>
              <Text style={styles.textOldPrice}>${item.unitPrice * 2}</Text>
            </View>
            <Text style={styles.textGray}>Quantity: {item.quantity}</Text>
            {order.orderDetails.length > 1 && itemIndex === 0 && (
              <Text style={styles.textGray}>And {order.orderDetails.length - 1} other items</Text>
            )}
          </View>
        </View>
      ))}
    </>
  );

  const renderCustomerOrPartnerInfo = () => {
    if (!account || loading) return null;

    if ((isBuyer && order.status === 'ORDERED') || (isBuyer && order.status === 'ARRIVED_AT_DISTRIBUTOR') || isDistributor) {
      return (
        <View style={styles.customerInfo}>
          <Text style={styles.customerTitle}>{isBuyer ? 'Seller Information' : 'Customer Information'}</Text>
          <Text style={styles.textGray}>Name: {account.name}</Text>
          <Text style={styles.textGray}>Phone: {account.phone}</Text>
          <Text style={styles.textGray}>Address: {account.address}</Text>
        </View>
      );
    }
    return null;
  };

  const renderPaymentInfo = () => (
    <View style={styles.orderDetails}>
      <Text style={styles.textGray}>Payment time: {order.payment.paymentDate}</Text>
      <Text style={styles.textGray}>Payment method: {order.payment.method}</Text>
      <Text style={styles.textGray}>Total: ${order.payment.amount}</Text>
    </View>
  );

  const renderActionButtons = () => {
    // Case: Distributor -> đơn hàng đã đến
    if (order.status === 'ARRIVED_AT_DISTRIBUTOR' && isDistributor) {
      return (
        <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}
        onPress={() => {
          updateOrderStatus({ orderId: order.orderId, newStatus: 5 });
          onStatusUpdated?.();
        }}>
          <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Complete</Text>
        </TouchableOpacity>
      );
    }
    // Case: Distributor -> đơn hàng đã đến
    if (order.status === 'SELLER_CONFIRMED' && isDistributor) {
        return (
            <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}
    onPress={() =>{
        updateOrderStatus({ orderId: order.orderId, newStatus: 4 });
        onStatusUpdated?.();}}>
          <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Confirm</Text>
        </TouchableOpacity>
      );
    }

    // Case: Seller nhận yêu cầu return
    if (order.status === 'RETURN_REQUEST' && role === 'Distributor') {
      return (
        <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}>
          <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Send back to Buyer</Text>
        </TouchableOpacity>
      );
    }


    // Case: Buyer sau khi nhận hàng
    if (isBuyer && order.status === 'RECEIVED_BY_BUYER') {
      return (
        <>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              router.push({
                pathname: `/ExchangeAndReturnScreen`,
                params: { order: JSON.stringify(order) },
              })
            }
          >
            <Text style={styles.actionButtonText}>Exchange/Return</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.reviewButton]}
            onPress={() =>
              router.push({
                pathname: `/ReviewProductScreen`,
                params: { order: JSON.stringify(order) },
              })
            }
          >
            <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Review</Text>
          </TouchableOpacity>
        </>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {renderProductInfo()}
      {renderCustomerOrPartnerInfo()}
      {renderPaymentInfo()}
      <View style={styles.actionButtons}>{renderActionButtons()}</View>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
    customerInfo: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
    },
    customerTitle: {
        fontWeight: 'bold',
        color: '#034C53',
        marginBottom: 4,
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