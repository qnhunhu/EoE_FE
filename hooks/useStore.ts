import { useEffect, useState } from 'react';
import { Store } from '../types/Store';

export default function useStore(storeId: number) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setStore(require('../constants/MockData').MOCK_STORE);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchStore();
  }, [storeId]);

  return { store, loading, error, refetchStore: fetchStore };
}
