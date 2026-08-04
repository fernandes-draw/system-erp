import React, { useState } from "react";
import type { AxiosError } from "axios";
import { useUserActions } from "../../hooks/user.actions";
import type { ApiErrorResponse, LoginPayload } from "../../types/auth";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const userActions = useUserActions();

  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await userActions.login(form);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(
        axiosError.response?.data?.detail || "E-mail ou senha incorretos."
      );
    }
  };

  return (
    <form id="login-form" className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Endereço de E-mail
        </label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          placeholder="Digite seu e-mail"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
        <input
          value={form.password}
          minLength={8}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Digite sua senha"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm mt-2"
      >
        Entrar
      </button>
    </form>
  );
}