import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = getUser();

  return user ? <>{children}</> : <Navigate to="/login/" replace />;
}