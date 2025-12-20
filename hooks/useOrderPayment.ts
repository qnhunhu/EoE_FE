// import { Order } from '@/types/Order';
// import { Payment } from '@/types/Payment';
// import { useMemo } from 'react';

// export default function useOrderPayment(order: Order) {
//   const latestPayment = useMemo<Payment | null>(() => {
//     if (!order.payment || order.payment.length === 0) return null;
//     return order.payment.reduce((latest, curr) =>
//       new Date(curr.paymentDate) > new Date(latest.paymentDate) ? curr : latest
//     );
//   }, [order]);

//   return {
//     payment: latestPayment,
//   };
// }
