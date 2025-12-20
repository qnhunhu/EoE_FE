import axios from 'axios';
import { useState } from 'react';
import Config from '../constants';

interface UpdateOrderStatusPayload {
  orderId: number;
  newStatus: number;
}

export default function useUpdateOrderStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const updateOrderStatus = async (payload: UpdateOrderStatusPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.put(`${Config.API_BASE_URL}/api/Order/${payload.orderId}`, payload);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateOrderStatus, loading, error, success };
}
