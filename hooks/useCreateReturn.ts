import axios from 'axios';
import { useState } from 'react';
import Config from '../constants';
import useUpdateOrderStatus from './useUpdateOrderStatus';
interface CreateReturnPayload {
  orderId: number;
  reason: string;
}

export default function useCreateReturn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
    const [success, setSuccess] = useState(false);
    const { updateOrderStatus } = useUpdateOrderStatus();

  const createReturn = async (payload: CreateReturnPayload) => {
    setLoading(true);
    setError(null);
      setSuccess(false);
      

    try {
      await axios.post(`${Config.API_BASE_URL}/api/ReturnRequest`, payload);
        setSuccess(true);
        updateOrderStatus({
            orderId: payload.orderId, 
            newStatus: 6 // Assuming 4 is the status for "Return Requested"
        });
        
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createReturn, loading, error, success };
}
