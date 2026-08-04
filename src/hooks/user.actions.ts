// src/hooks/user.actions.js
import { useNavigate } from "react-router-dom";
// Usamos o nosso helper para manter a consistência e URL base
import axiosService from "../helpers/axios";

function useUserActions() {
  const navigate = useNavigate();

  // Função para fazer Login
  function login(data) {
    return axiosService.post("/auth/login/", data).then((res) => {
      // Passamos a resposta correta do servidor (res.data) para salvar os tokens
      setUserData(res.data);
      navigate("/");
    });
  }

  // Função para cadastrar um novo Usuário
  function register(data) {
    return axiosService.post("/auth/register/", data).then((res) => {
      setUserData(res.data);
      navigate("/");
    });
  }

  // Função para deslogar
  function logout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  // Retorna as ações que os componentes poderão usar
  return {
    login,
    register,
    logout,
  };
}

// --- FUNÇÕES UTILITÁRIAS (Helpers do LocalStorage) ---

// Retorna as informações do usuário logado
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.user || null;
}

// Retorna o token de acesso (Access Token)
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.access || null;
}

// Retorna o token de atualização (Refresh Token)
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.refresh || null;
}

// Salva os tokens e dados do usuário no localStorage
function setUserData(authData) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: authData.access,
      refresh: authData.refresh,
      user: authData.user,
    })
  );
}

// Exportamos o Hook como padrão, e os utilitários como exportações nomeadas
export { getAccessToken, getRefreshToken, getUser, setUserData, useUserActions };
