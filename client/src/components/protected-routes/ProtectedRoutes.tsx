import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size={60} />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size={60} />
      </div>
    );

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }
  return children;
};
