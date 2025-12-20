import Config from '@/constants';
import { CreateOrderCommand, Order } from '@/types/Order';
import axios from 'axios';
import { useState } from 'react';
export function useCreateOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (command: CreateOrderCommand): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<Order>(`${Config.API_BASE_URL}/api/Order/create`, command);
      setOrder(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? err.message ?? 'Unknown error'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    order,
    loading,
    error,
  };
}
