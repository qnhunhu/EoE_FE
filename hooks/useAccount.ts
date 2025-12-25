import { useEffect, useState } from 'react';
import { Account } from '../types/Account';
import axios from 'axios';
import Config from '../constants';


import { MOCK_ACCOUNT } from '@/constants/MockData';

export default function useAccount(id: number) {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccount = async () => {
            // Simulate network delay
            setTimeout(async () => {
                        // setAccount(MOCK_ACCOUNT);
                        const response = await axios.get<Account>(`${Config.API_BASE_URL}/api/Auth/${id}`);
        setAccount(response.data);
                setLoading(false);
            }, 1000);
        };

        fetchAccount();
    }, []);

    return { account, loading };
}