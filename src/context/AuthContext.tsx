import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { users } from '../data/initialData';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check for existing auth on component mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(authData.isAuthenticated);
      setIsAdmin(authData.isAdmin);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin);
      setShowLogin(false);
      
      // Store auth state in localStorage
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        isAdmin: user.isAdmin
      }));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowLogin(false);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdmin, 
      showLogin, 
      setShowLogin, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};