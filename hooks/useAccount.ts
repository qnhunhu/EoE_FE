import { useEffect, useState } from 'react';
import { Account } from '../types/Account';



import { MOCK_ACCOUNT } from '@/constants/MockData';

export default function useAccount(id: number) {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccount = async () => {
            // Simulate network delay
            setTimeout(() => {
                setAccount(MOCK_ACCOUNT);
                setLoading(false);
            }, 1000);
        };

        fetchAccount();
    }, []);

    return { account, loading };
}