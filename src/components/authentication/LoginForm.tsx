import type { AxiosError } from "axios";
import React, { useState } from "react";
import { SYSTEM_NAME } from "../../config/constants";
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
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-icon">{SYSTEM_NAME.charAt(0)}</div>
          <div className="brand-name">
            {SYSTEM_NAME}{" "}
            <small
              style={{
                fontWeight: "400",
                color: "var(--text-muted)",
                fontSize: "13px",
                marginLeft: "2px",
              }}
            >
              v4
            </small>
          </div>
        </div>

        <div className="auth-title">Bem vindo de volta!</div>
        <div className="auth-subtitle">
          Faça login para continuar no seu painel.
        </div>

        <div
          style={{
            padding: "8px 12px",
            marginBottom: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px dashed var(--border-color, #374151)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "var(--text-muted, #9ca3af)",
          }}
        >
          🔑 <strong>Mock de testes:</strong>
          <br />
          E-mail: <code>admin@admin.com</code>
          <br />
          Senha: <code>password123</code>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Endereço de E-mail</label>
            <div className="input-group">
              <svg
                className="input-icon"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="3" width="12" height="10" rx="1.5"></rect>
                <path d="M2 5l6 4 6-4"></path>
              </svg>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                type="email"
                className="form-control"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <div className="input-group">
              <svg
                className="input-icon"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="7" width="10" height="7" rx="1.5"></rect>
                <path d="M5 7V5a3 3 0 016 0v2"></path>
              </svg>
              <input
                value={form.password}
                minLength={8}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                type="password"
                className="form-control"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200 mb-3">
              {error}
            </div>
          )}

          <div className="auth-actions">
            <label className="form-check">
              <input type="checkbox" defaultChecked readOnly />
              Lembrar-me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary justify-center w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}