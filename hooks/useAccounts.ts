// hooks/useAccounts.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Account } from '../types/Account';

export default function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`${Config.API_BASE_URL}/api/Auth`);
      setAccounts(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, loading, error, refetch: fetchAccounts };
}
export const createAccount = async (accountData: Partial<Account>) => {
    return await axios.post(`${Config.API_BASE_URL}/api/Auth`, accountData);
  };
  
  export const updateAccount = async (userId: number, accountData: Partial<Account>) => {
    return await axios.put(`${Config.API_BASE_URL}/api/Auth/${userId}`, accountData);
  };
  
  export const deleteAccount = async (userId: number) => {
    return await axios.delete(`${Config.API_BASE_URL}/api/Auth/${userId}`);
  };
  
  export const getAccountById = async (userId: number) => {
    const res = await axios.get(`${Config.API_BASE_URL}/api/Auth/${userId}`);
    return res.data as Account;
  };
  