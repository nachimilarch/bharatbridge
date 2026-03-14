'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

const AuthContext = createContext(null);

// Cookie helpers (client-side)
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bb_user');
      const token  = localStorage.getItem('bb_token');
      if (stored && token) setUser(JSON.parse(stored));
    } catch {}
    finally { setLoading(false); }
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = data.data;
    // localStorage (for API calls)
    localStorage.setItem('bb_token',         accessToken);
    localStorage.setItem('bb_refresh_token', refreshToken);
    localStorage.setItem('bb_user',          JSON.stringify(user));
    // Cookies (for Next.js middleware route protection)
    setCookie('bb_token', accessToken, 1);
    setCookie('bb_role',  user.role,   1);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bb_token');
    localStorage.removeItem('bb_refresh_token');
    localStorage.removeItem('bb_user');
    deleteCookie('bb_token');
    deleteCookie('bb_role');
    setUser(null);
    window.location.href = '/';
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      const updated = data.data;
      localStorage.setItem('bb_user', JSON.stringify(updated));
      setUser(updated);
      return updated;
    } catch { logout(); }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};
