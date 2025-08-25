import React, { createContext, useContext, useState } from 'react';
import { UserModel } from '../types/models';

interface AuthContextProps {
  user: any;
  setUser: (value: UserModel | null) => void;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

const defaultValue: AuthContextProps = {
  user: null,
  setUser: () => {},
};
const AuthContext = createContext<AuthContextProps>(defaultValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
