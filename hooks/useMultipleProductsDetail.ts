import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Product } from '../types/Product';

export default function useMultipleProductsDetail(ids: number[]) {
    const [products, setProducts] = useState<{ [id: number]: Product }>({});
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (!ids || ids.length === 0) return;

        const fetchAll = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(
                    ids.map(id => axios.get(`${Config.API_BASE_URL}/api/Egg/${id}`))
                );
                const data: { [id: number]: Product } = {};
                results.forEach((res, i) => {
                    data[ids[i]] = res.data;
                });
                setProducts(data);
console.log("Server response:", data);

            } catch (error) {
                console.error('Failed to fetch multiple eggs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [JSON.stringify(ids)]); 

    return { products, loading };
}
