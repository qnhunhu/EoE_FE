// hooks/useOrdersByBuyer.ts
import { useEffect, useState } from 'react';
import { Order } from '../types/Order';

export default function useOrdersDistributor(distributorId: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);


  const fetchOrders = async () => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(require('../constants/MockData').MOCK_ORDERS);

      // const res = await axios.get(`${Config.API_BASE_URL}/api/Order/distributorId-history/${distributorId}`);
      // setOrders(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (distributorId) fetchOrders();
  useEffect(() => {
    if (distributorId) fetchOrders();
  }, [distributorId]);

  return { orders, loading, error, refetch: fetchOrders };
}
