import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Alterna o tema entre light e dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Injetamos o data-theme diretamente no elemento container para o CSS aplicar as variáveis corretas
    <div
      className={`app-container ${isCollapsed ? 'sidebar-rail' : ''}`}
      data-theme={theme}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Sidebar isCollapsed={isCollapsed} />

      <div className="main" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Passamos o tema atual e a função de alternar para o Header */}
        <Header
          onToggleMenu={() => setIsCollapsed(!isCollapsed)}
          currentTheme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="page-wrapper" style={{ flex: 1 }}>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}