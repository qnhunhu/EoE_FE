import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Account } from '../types/Account';



export default function useAccount(id : number) {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`${Config.API_BASE_URL}/api/Auth/${id}`);
                setAccount(response.data);
            } catch (error) {
                console.error('Failed to fetch account', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, []);

    return { account, loading };
}