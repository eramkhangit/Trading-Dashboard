import React from "react";
import { useLocation } from "wouter";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const {user , loading} = useAuth()
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    if (!loading && !user) {
      setLocation(redirectTo);
    }
  }, [user, loading, setLocation, redirectTo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );   
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
