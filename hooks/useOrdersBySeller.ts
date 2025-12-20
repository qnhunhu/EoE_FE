import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Config from '../constants';
import { Order } from '../types/Order';

export default function useOrdersBySeller(sellerId: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
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