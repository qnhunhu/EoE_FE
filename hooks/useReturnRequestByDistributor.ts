// hooks/useReturnRequestsBySeller.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { ReturnRequest } from '../types/ReturnRequest';

export default function useReturnRequestsByDistributor(distributorId: number) {
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchReturnRequests = async () => {
      try {
        const res = await axios.get(`${Config.API_BASE_URL}/api/ReturnRequest/distributor/${distributorId}`);
        setReturnRequests(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (distributorId) fetchReturnRequests();
  }, [distributorId]);

  return { returnRequests, loading, error };
}
