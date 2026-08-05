import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import type { AuthState, LoginPayload, RegisterPayload, User } from "../types/auth";

export function getUser(): User | null {
  const authString = localStorage.getItem("auth");
  if (!authString) return null;
  const auth: AuthState = JSON.parse(authString);
  return auth?.user || null;
}

export function getAccessToken(): string | null {
  const authString = localStorage.getItem("auth");
  if (!authString) return null;
  const auth: AuthState = JSON.parse(authString);
  return auth?.access || null;
}

export function getRefreshToken(): string | null {
  const authString = localStorage.getItem("auth");
  if (!authString) return null;
  const auth: AuthState = JSON.parse(authString);
  return auth?.refresh || null;
}

export function setUserData(authData: AuthState): void {
  localStorage.setItem("auth", JSON.stringify(authData));
}

export function useUserActions() {
  const navigate = useNavigate();

  const login = async (data: LoginPayload): Promise<void> => {
    // 1. VERIFICAÇÃO DE MOCK (TESTE LOCAL SEM API DJANGO)
    if (data.email === "admin@admin.com" && data.password === "password123") {
      const mockUser: User = {
        id: 1,
        email: data.email,
        username: "admin",
        first_name: "Admin",
        last_name: "Teste",
      };

      const mockAuthData: AuthState = {
        access: "fake-jwt-access-token",
        refresh: "fake-jwt-refresh-token",
        user: mockUser,
      };

      setUserData(mockAuthData);
      navigate("/");
      return;
    }

    // 2. CHAMADA REAL À API DJANGO
    const res = await axiosService.post<AuthState>("/auth/login/", data);
    setUserData(res.data);
    navigate("/");
  };

  const register = async (data: RegisterPayload): Promise<void> => {
    const res = await axiosService.post<AuthState>("/auth/register/", data);
    setUserData(res.data);
    navigate("/");
  };

  const logout = (): void => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return {
    login,
    register,
    logout,
  };
}