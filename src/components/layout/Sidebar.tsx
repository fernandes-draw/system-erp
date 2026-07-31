interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-icon">🐾</span>
        <span className="brand-name">SystemERP</span>
      </div>

      <div className="sidebar-nav">
        <div className="nav-label">Geral</div>
        <div className="nav-group">
          <a className="nav-link active">
            <i className="fa fa-dashboard icon"></i>
            <span className="nav-text">Dashboard</span>
          </a>
          <a className="nav-link">
            <i className="fa fa-users icon"></i>
            <span className="nav-text">Clientes</span>
          </a>
        </div>
      </div>
    </aside>
  );
}