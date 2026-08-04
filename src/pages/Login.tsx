import LoginForm from "../components/authentication/LoginForm";
import { SYSTEM_NAME } from "../config/constants";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-5">

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-orange-600 text-white rounded-md w-10 h-10 mb-2 font-bold text-lg">
            ■
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {SYSTEM_NAME}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Insira suas credenciais para acessar o painel administrativo
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <LoginForm />
        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} {SYSTEM_NAME}. Todos os direitos reservados.
        </div>

      </div>
    </div>
  );
}