import { useCheckAuth } from "../hooks/auth/useCheckAuth";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useCheckAuth();

  const isAuthenticated = !isError && data?.user ? true : false;

  const value = { isAuthenticated, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default AuthContextProvider;
