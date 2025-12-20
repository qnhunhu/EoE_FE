import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
export default function useProductDetail(id: number) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      const found = require('../constants/MockData').MOCK_PRODUCTS.find((p: any) => p.eggId === Number(id));
      setProduct(found);
      setLoading(false);
    }, 500);

    // axios.get(`${Config.API_BASE_URL}/api/Egg/${id}`)
    //   .then((res) => {
    //     setProduct(res.data);
    //   })
    //   .catch((err) => {
    //     console.error('Failed to fetch eggs', err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [id]);

  return { product, loading };
}
