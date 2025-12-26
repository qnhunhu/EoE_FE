import axios from 'axios';
import { useState } from 'react';
import Config from '../constants';
import { Product } from '../types/Product';

export default function useSearchEggs() {
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchEggs = async (name: string) => {
        if (!name.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${Config.API_BASE_URL}/api/Egg/search`, {
                params: { name },
            });
            setResults(res.data);
        } catch (err) {
            console.error('Failed to search eggs', err);
            setError('Search failed');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => {
        setResults([]);
        setError(null);
    };

    return { results, loading, error, searchEggs, clearResults };
}
