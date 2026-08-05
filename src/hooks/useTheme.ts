import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  // Inicializa lendo do localStorage ou usa 'dark' como fallback
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Aplica o atributo data-theme no HTML globalmente
    document.documentElement.setAttribute('data-theme', theme);
    // Persiste a escolha do usuário
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}