import React, { createContext, useContext, useState } from 'react';
import { User, Company, AuthState, AuthContextData, CompanyRegistration } from '../types/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>({
    user: null,
    company: null,
    isAuthenticated: false,
    loading: true,
  });

  const signIn = async (email: string, password: string) => {
    // Simulando uma chamada à API
    const response: User = {
      id: '1',
      email,
      name: 'Usuário Teste',
      role: 'admin',
      companyId: '1',
    };

    setData(state => ({
      ...state,
      user: response,
      isAuthenticated: true,
      loading: false,
    }));
  };

  const signOut = () => {
    setData({
      user: null,
      company: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const logout = () => {
    setData({
      user: null,
      company: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const registerCompany = async (data: CompanyRegistration) => {
    // Simulando uma chamada à API
    const response: Company = {
      id: '1',
      name: data.name,
      licenseExpiration: new Date(),
      licenseType: data.licenseType,
    };

    setData(state => ({
      ...state,
      company: response,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        company: data.company,
        isAuthenticated: data.isAuthenticated,
        loading: data.loading,
        signIn,
        signOut,
        logout,
        registerCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 