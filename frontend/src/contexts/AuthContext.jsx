import { createContext, useContext, useState, useEffect } from 'react';
import { authService, TokenManager } from '../services/api';

// Criar contexto
const AuthContext = createContext({});

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  // Captura tokens dos callbacks OAuth (?token=...&refresh_token=...) e conclui o login
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh_token');

    if (token && refreshToken) {
      TokenManager.setToken(token);
      TokenManager.setRefreshToken(refreshToken);

      const newUrl = `${window.location.origin}${window.location.pathname}${window.location.hash || '#dashboard'}`;
      window.history.replaceState({}, document.title, newUrl);
      window.location.hash = 'dashboard';
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      
      if (!authService.isAuthenticated()) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const response = await authService.getMe();
      setUser(response.data.user);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
      TokenManager.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      TokenManager.clearTokens();
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const updateProfile = async (userId, profileData) => {
    try {
      const response = await authService.updateProfile(userId, profileData);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    updateProfile,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
