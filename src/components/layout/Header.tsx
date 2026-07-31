interface HeaderProps {
  onToggleMenu: () => void;
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ onToggleMenu, currentTheme, onToggleTheme }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button onClick={onToggleMenu} className="sidebar-toggle">
          <i className="fa fa-bars"></i>
        </button>
      </div>

      <div className="topbar-right">
        {/* Botão de Toggle do Tema */}
        <button
          onClick={onToggleTheme}
          className="tb-btn theme-toggle"
          title="Alternar Tema"
          style={{ marginRight: '8px' }}
        >
          {currentTheme === 'light' ? (
            <i className="fa fa-moon-o text-secondary"></i>
          ) : (
            <i className="fa fa-sun-o" style={{ color: 'var(--yellow)' }}></i>
          )}
        </button>

        <span className="text-secondary" style={{ marginRight: '12px' }}>Usuário ERP</span>
        <div className="tb-avatar">U</div>
      </div>
    </header>
  );
}