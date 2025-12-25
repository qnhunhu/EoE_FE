import { useCallback, useEffect, useState } from 'react';
import { Order } from '../types/Order';
import axios from 'axios';
import Config from '../constants';

export default function useOrdersBySeller(sellerId: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // setOrders(require('../constants/MockData').MOCK_ORDERS);
      // setError(null);

        const res = await axios.get(`${Config.API_BASE_URL}/api/Order/seller-history/${sellerId}`);
        setOrders(res.data);
        setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  useEffect(() => {
    if (sellerId) {
      fetchOrders();
    }
  }, [sellerId, fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}