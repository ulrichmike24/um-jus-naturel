import { useState } from 'react';
import type { Product } from '@/data/products';

const ADMIN_PASSWORD = 'admin123'; // À changer en production!

const useAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, product: Product) => {
    setProducts(products.map(p => p.id === id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return {
    isLoggedIn,
    login,
    logout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useAdmin;
