import { NavLink } from 'react-router-dom'; // Importa a tag de navegação oficial do router
import { SYSTEM_NAME } from '../../config/constants'; // Consome o nome global da aplicação

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-icon">🐾</span>
        {/* Usando o nome global do sistema */}
        <span className="brand-name">{SYSTEM_NAME}</span>
      </div>

      <div className="sidebar-nav">
        <div className="nav-group">
          <div className="nav-label">Geral</div>

          {/* Link do Dashboard (end garante que só fique active exatamente na raiz '/') */}
          <NavLink to="/" end className={({ isActive }) => `nav-link nav-toggle ${isActive ? 'active' : ''}`}>
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="4" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="10" width="7" height="11" rx="1.5"></rect>
            </svg>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          {/* Link de Clientes */}
          <NavLink to="/customers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="fa fa-users icon"></i>
            <span className="nav-text">Clientes</span>
          </NavLink>

        </div>

        <div className="nav-label" style={{ marginTop: '16px' }}>Apps</div>
        <div className="nav-group">

          {/* Novo Link do Kanban integrado ao Router */}
          <NavLink to="/kanban" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="6" height="14" rx="1.5" />
              <rect x="11" y="3" width="6" height="9" rx="1.5" />
              <rect x="19" y="3" width="2" height="6" rx="0.5" />
            </svg>
            <span className="nav-text">Kanban</span>
          </NavLink>

        </div>
      </div>

      <div className="sidebar-footer">
        <NavLink to="/login">
          <div className="sidebar-user">
            <div className="avatar">
              {SYSTEM_NAME.charAt(0)}
              <span className="online"></span>
            </div>
            <div className="sidebar-user-info">
              <div className="name">
                {SYSTEM_NAME}
              </div>
              <div className="role">Admin</div>
            </div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}