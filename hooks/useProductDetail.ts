import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Product } from '../types/Product';
export default function useProductDetail(id: number) {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`${Config.API_BASE_URL}/api/Egg/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch eggs', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { product, loading };
}
