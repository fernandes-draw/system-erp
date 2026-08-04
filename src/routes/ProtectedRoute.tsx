// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
// Importamos a função utilitária do arquivo do hook
import  getUser  from "../hooks/user.actions";

interface protectRoutesProps {
  children: Node
}

function ProtectedRoute({ children }: protectRoutesProps) {
  const user = getUser();
  
  // Se existir um usuário válido, renderiza os filhos; caso contrário, joga para o login
  return user ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;