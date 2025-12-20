import Config from '@/constants';
import axios from 'axios';
import { useState } from 'react';

export interface AddToCartCommand {
  buyerId: number;
  eggId: number;
  quantity: number;
}

export default function useAddToCart() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addToCart = async (command: AddToCartCommand) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`${Config.API_BASE_URL}/api/Cart/add`, command);
      setSuccess(true);
    } catch (err: any) {
      console.error('Add to cart failed:', err);
      setError(err.response?.data?.message || err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error, success };
}
