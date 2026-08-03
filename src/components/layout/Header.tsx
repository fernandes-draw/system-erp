
interface HeaderProps {
  onToggleMenu: () => void;
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentPath?: string; // Para alimentar dinamicamente o Breadcrumb
}

export function Header({
  onToggleMenu,
  currentTheme,
  onToggleTheme,
  currentPath = 'Home'
}: HeaderProps) {

  // Lembrete do sistema: A variável global do nome do sistema deve ser usada nas menções diretas.
  const USER_NAME = "Everson";

  return (
    <header className="topbar">

      {/* ── LADO ESQUERDO: CONTROLES E BREADCRUMB ── */}
      <div className="topbar-left">
        <button
          onClick={onToggleMenu}
          className="sidebar-toggle"
          type="button"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <span className="current" aria-current="page">{currentPath}</span>
        </nav>
      </div>

      {/* ── CENTRO: CAIXA DE BUSCA (COMMAND PALETTE MOCK) ── */}
      <div className="search-box">
        <svg className="s-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <circle cx="7" cy="7" r="5" />
          <path d="M11 11l3.5 3.5" />
        </svg>
        <input type="text" placeholder="Busque pág ou rode um comando…" aria-label="Open command palette" />
        <kbd>⌘K</kbd>
      </div>

      {/* ── LADO DIREITO: AÇÕES E PERFIL ── */}
      <div className="topbar-right">

        {/* Alternador de Tema Dinâmico (Sol/Lua SVGs) */}
        <button
          onClick={onToggleTheme}
          className="tb-btn theme-toggle"
          type="button"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {currentTheme === 'light' ? (
            /* Ícone de Lua para sugerir mudar para o Dark Mode */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            /* Ícone de Sol para sugerir mudar para o Light Mode */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </button>

        {/* Notificações */}
        <button className="tb-btn tb-notifications" type="button" title="Notifications" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path d="M12 3a6 6 0 00-6 6c0 6-3 7-3 7h18s-3-1-3-7a6 6 0 00-6-6z" />
            <path d="M10.5 21a1.5 1.5 0 003 0" />
          </svg>
          <span className="dot"></span>
        </button>

        {/* Mensagens */}
        <button className="tb-btn tb-messages" type="button" title="Messages" aria-label="Messages">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <path d="M2 7l10 6 10-6" />
          </svg>
        </button>

        {/* Perfil do Usuário Integrado */}
        <span className="text-secondary" style={{ marginRight: '4px', fontSize: '0.875rem' }}>
          {USER_NAME}
        </span>
        <button className="tb-avatar" type="button" aria-label="Account menu">
          {USER_NAME.charAt(0)}
        </button>

      </div>
    </header>
  );
}
