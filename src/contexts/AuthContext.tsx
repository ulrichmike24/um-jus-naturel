import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: 'small' | 'large';
  image: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  neighborhood: string;
  address: string;
  payment: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'En attente' | 'En cours' | 'Livré' | 'Annulé';
  createdAt: string;
}

export interface ShopInfo {
  name: string;
  phone: string;
  description: string;
  address: string;
  logoUrl: string;
  category: string;
  status: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan?: string;
  shop: ShopInfo;
  orders: Order[];
}

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  plan?: string;
  shop?: ShopInfo;
  orders?: Order[];
};

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, plan?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USERS_KEY = 'um_saas_users';
const CURRENT_USER_KEY = 'um_saas_current_user';

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStoredCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function createDefaultShopInfo(name: string): ShopInfo {
  return {
    name: `${name} Boutique`,
    phone: '',
    description: 'Boutique naturelle spécialisée en jus et produits bien-être.',
    address: '',
    logoUrl: '',
    category: 'Produits naturels',
    status: 'Actif',
    updatedAt: new Date().toISOString(),
  };
}

function normalizeStoredUser(storedUser: StoredUser): User {
  const { password, ...user } = storedUser;
  return {
    ...user,
    shop: user.shop || createDefaultShopInfo(user.name),
    orders: user.orders || [],
  };
}

function normalizeCurrentUser(user: User): User {
  return {
    ...user,
    shop: user.shop || createDefaultShopInfo(user.name),
    orders: user.orders || [],
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getStoredCurrentUser();
    if (stored) {
      setUser(normalizeCurrentUser(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const matched = users.find(
          (storedUser) => storedUser.email.toLowerCase() === email.toLowerCase() && storedUser.password === password,
        );
        if (!matched) {
          const message = 'Email ou mot de passe invalide';
          setError(message);
          setLoading(false);
          reject(new Error(message));
          return;
        }

        const current = normalizeStoredUser(matched);
        setUser(current);
        saveStoredCurrentUser(current);
        setLoading(false);
        resolve();
      }, 300);
    });
  };

  const signup = async (email: string, password: string, name: string, plan?: string) => {
    setLoading(true);
    setError(null);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const exists = users.some((storedUser) => storedUser.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          const message = 'Cet email est déjà utilisé';
          setError(message);
          setLoading(false);
          reject(new Error(message));
          return;
        }

        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        const shop = createDefaultShopInfo(name);
        const newUser: StoredUser = { id, name, email, password, plan, shop, orders: [] };
        users.push(newUser);
        saveStoredUsers(users);

        const current = normalizeStoredUser(newUser);
        setUser(current);
        saveStoredCurrentUser(current);
        setLoading(false);
        resolve();
      }, 300);
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      ...updates,
      shop: updates.shop ? { ...user.shop, ...updates.shop } : user.shop,
      orders: updates.orders ? updates.orders : user.orders,
    };
    setUser(updatedUser);
    saveStoredCurrentUser(updatedUser);

    const users = getStoredUsers();
    const updatedUsers = users.map((storedUser) =>
      storedUser.id === updatedUser.id ? { ...storedUser, ...updates } : storedUser,
    );
    saveStoredUsers(updatedUsers);
  };

  const logout = () => {
    setUser(null);
    saveStoredCurrentUser(null);
    setError(null);
    navigate('/');
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signup,
      logout,
      updateUser,
    }),
    [user, loading, error, login, signup, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
