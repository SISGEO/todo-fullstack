export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  licenseExpiration: Date;
  licenseType: 'basic' | 'premium' | 'enterprise';
}

export interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AuthContextData {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  logout: () => void;
  registerCompany: (data: CompanyRegistration) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CompanyRegistration {
  name: string;
  email: string;
  password: string;
  licenseType: 'basic' | 'premium' | 'enterprise';
} 