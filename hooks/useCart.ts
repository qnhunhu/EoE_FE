import Config from '@/constants';
import { Cart } from '@/types/Cart';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function useCart(buyerId: number | undefined) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!buyerId) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get<Cart>(`${Config.API_BASE_URL}/api/Cart/${buyerId}`);
        setCart(response.data);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [buyerId]);

  return { cart, loading, error };
}
