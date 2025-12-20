// hooks/useOrdersByBuyer.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Order } from '../types/Order';

// export default function useOrdersByBuyer(buyerId: number) {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`${Config.API_BASE_URL}/api/Order/buyer-history/${buyerId}`);
//         setOrders(res.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (buyerId) fetchOrders();
//   }, [buyerId]);

//   return { orders, loading, error };
// }
// useOrdersByBuyer.ts
export default function useOrdersByBuyer(buyerId: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${Config.API_BASE_URL}/api/Order/buyer-history/${buyerId}`);
      setOrders(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (buyerId) fetchOrders();
  }, [buyerId]);

  return { orders, loading, error, refetch: fetchOrders };
}
