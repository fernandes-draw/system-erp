import LoginForm from "../components/authentication/LoginForm";
import { useTheme } from "../hooks/useTheme";

export default function Login() {
  // Garante que a tela de login respeite e aplique o tema salvo no localStorage
  useTheme();

  return (
    <LoginForm />
  );
}