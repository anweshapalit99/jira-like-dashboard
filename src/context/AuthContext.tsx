import React, { createContext } from "react";
import type { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthContext.Provider
      value={{ user: null, login: async () => {}, logout: () => {} }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
