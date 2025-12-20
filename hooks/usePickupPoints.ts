import Config from '@/constants';
import { Account } from '@/types/Account';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function usePickupPoints() {
  const [pickupPoints, setPickupPoints] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPickupPoints = async () => {
      try {
        const res = await axios.get<Account[]>(`${Config.API_BASE_URL}/api/Auth`);
        const distributors = res.data.filter(account => account.role === 'Distributor');
        setPickupPoints(distributors);
      } catch (err: any) {
        console.error('Failed to fetch pickup points:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPickupPoints();
  }, []);

  return { pickupPoints, loading, error };
}
