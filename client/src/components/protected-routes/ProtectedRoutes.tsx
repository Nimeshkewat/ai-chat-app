import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <h2>Loading...</h2>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <h2>Loading...</h2>;

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }
  return children;
};
