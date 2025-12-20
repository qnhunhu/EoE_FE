import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Product } from '../types/Product';

export default function useEggProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`${Config.API_BASE_URL}/api/Egg`)
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch eggs', err);
        setError('Failed to fetch products');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct: Omit<Product, 'eggId'>) => {
    try {
      setLoading(true);
      await axios.post(`${Config.API_BASE_URL}/api/Egg`, newProduct);
      fetchProducts(); // Refresh after add
    } catch (err) {
      console.error('Failed to add product', err);
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (eggId: number, updatedProduct: Product) => {
    try {
      setLoading(true);
      await axios.put(`${Config.API_BASE_URL}/api/Egg/${eggId}`, updatedProduct);
      fetchProducts(); // Refresh after update
    } catch (err) {
      console.error('Failed to update product', err);
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (eggId: number) => {
    try {
      setLoading(true);
      await axios.delete(`${Config.API_BASE_URL}/api/Egg/${eggId}`);
      setProducts((prev) => prev.filter((p) => p.eggId !== eggId)); 
    } catch (err) {
      console.error('Failed to delete product', err);
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}
