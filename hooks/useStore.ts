import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Store } from '../types/Store';

export default function useStore(storeId: number) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = () => {
    setLoading(true);
    axios.get(`${Config.API_BASE_URL}/api/Store/${storeId}`)
      .then(res => {
        setStore(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Failed to fetch store', err);
        setError('Failed to fetch store');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStore();
  }, [storeId]);

  return { store, loading, error, refetchStore: fetchStore };
}
