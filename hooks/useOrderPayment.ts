// useOrderPayment.ts
import { Order } from '@/types/Order';
import { Payment } from '@/types/Payment';
import { useMemo } from 'react';

export default function useOrderPayment(order: Order) {
  const latestPayment = useMemo<Payment | null>(() => {
    if (!order.payment) return null;
    return order.payment;
  }, [order.payment]);

  return {
    payment: latestPayment,
  };
}