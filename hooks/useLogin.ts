// hooks/useLogin.ts
import { useState } from 'react';
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockUser = require('../constants/MockData').MOCK_USER;
      // Check credentials trivially (or just always succeed for dev)
      if (data.email === 'error@test.com') {
        throw new Error('Invalid credentials');
      }
      return mockUser;

      //   const res = await axios.post<AuthResponse>(`${Config.API_BASE_URL}/api/Auth/login`, data);
      //   return res.data;
    } catch (err: any) {
      setError(err.message || 'Login failed'); // Adjusted to catch simple error object
      console.error('Login failed', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
