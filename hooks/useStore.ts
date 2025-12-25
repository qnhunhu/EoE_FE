import { useEffect, useState } from 'react';
import { Store } from '../types/Store';
import axios from 'axios';
import Config from '../constants';
export default function useStore(storeId: number) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      // setStore(require('../constants/MockData').MOCK_STORE);

      axios.get(`${Config.API_BASE_URL}/api/Store/${storeId}`)
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch store', err);
      })
      .finally(() => {
        setLoading(false);
      });
      setLoading(false);


    }, 500);
  };

  useEffect(() => {
    fetchStore();
  }, [storeId]);

  return { store, loading, error, refetchStore: fetchStore };
}
