// hooks/useLogin.ts
import axios from 'axios';
import { useState } from 'react';
import Config from '../constants';
import { AuthResponse } from '../types/Account';

export interface LoginData {
  email: string;
  password: string;
}


export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<AuthResponse>(`${Config.API_BASE_URL}/api/Auth/login`, data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login failed', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
