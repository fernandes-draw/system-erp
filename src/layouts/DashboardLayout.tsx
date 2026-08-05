import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { useTheme } from '../hooks/useTheme';

export function DashboardLayout() {
  // Inicializa o estado lendo do localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const { theme, toggleTheme } = useTheme();

  // Atualiza a preferência no localStorage
  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => {
      const nextState = !prev;
      localStorage.setItem('sidebar_collapsed', JSON.stringify(nextState));
      return nextState;
    });
  };

  return (
    <div
      className={`app-container ${isCollapsed ? 'sidebar-rail' : ''}`}
      data-theme={theme}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Sidebar isCollapsed={isCollapsed} />

      <div className="main" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header
          onToggleMenu={handleToggleSidebar}
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