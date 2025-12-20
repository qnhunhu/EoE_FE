// hooks/useRegister.ts
import axios from 'axios';
import { useState } from 'react';
import Config from '../constants';
import { Account } from '../types/Account';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: number; 
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData): Promise<Account | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<Account>(`${Config.API_BASE_URL}/api/Auth/register`, data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Register failed');
      console.error('Register failed', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
