import { useMemo, useState } from 'react';
import { KanbanModal } from './components/KanbanModal';
import { KanbanForm } from './components/KanbanForm';


interface KanbanCard {
  id: string;
  title: string;
  description: string;
  category: ('PM' | 'ENG' | 'DESIGN' | 'DOCS' | 'BUG')[];
  date: string;
  status: 'todo' | 'inprogress' | 'review' | 'done';
  assignee: string[];
}

interface Column {
  id: 'todo' | 'inprogress' | 'review' | 'done';
  title: string;
}

export default function KanbanPage() {
  const [filterText, setFilterText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  console.info(modalIsOpen)

  const initialCards: KanbanCard[] = [
    { id: '1', title: 'Audit a11y on form pages', description: '', category: ['ENG', 'DOCS'], date: 'May 08', status: 'todo', assignee: ['ME', 'TH'] },
    { id: '2', title: 'Define onboarding email sequence', description: 'Three-message welcome flow with day 1, 3, 7 cadence', category: ['PM'], date: 'May 02', status: 'todo', assignee: ['EW'] },
    { id: '3', title: 'Refresh icon system', description: 'Move from heroicons to a custom set with consistent stroke', category: ['DESIGN'], date: 'May 05', status: 'todo', assignee: ['SK'] },
    { id: '4', title: 'Plan Q3 OKRs', description: 'Workshop with leads to define Q3 outcomes', category: ['PM'], date: 'May 15', status: 'todo', assignee: ['EW'] },

    { id: '5', title: 'Implement drag-and-drop kanban', description: 'Use HTML5 drag API, no library', category: ['ENG'], date: 'Apr 30', status: 'inprogress', assignee: ['MR'] },
    { id: '6', title: 'Design product detail page', description: 'Gallery + variants + reviews + related', category: ['DESIGN'], date: 'Apr 30', status: 'inprogress', assignee: ['SK'] },
    { id: '7', title: 'Write FAQ content', description: '15 articles across 5 categories', category: ['DOCS'], date: 'May 01', status: 'inprogress', assignee: ['EW'] },

    { id: '8', title: 'Fix DataTables sort indicators', description: 'Replace empty span with chevron SVG', category: ['BUG', 'ENG'], date: 'Apr 29', status: 'review', assignee: ['MR'] },
    { id: '9', title: 'Notifications dropdown', description: 'Bell button → panel with sample notifications', category: ['ENG'], date: 'Apr 29', status: 'review', assignee: ['TH'] },

    { id: '10', title: 'Build chat page', description: '', category: ['ENG'], date: 'Apr 28', status: 'done', assignee: ['MR'] },
    { id: '11', title: 'Build settings page', description: '', category: ['ENG', 'DESIGN'], date: 'Apr 28', status: 'done', assignee: [] },
    { id: '12', title: 'Migrate to Vite 8', description: '', category: ['ENG'], date: 'Apr 25', status: 'done', assignee: [] },
    { id: '13', title: 'Add dark mode', description: 'Pre-paint script, token mappings, ECharts theme observer', category: ['ENG', 'DESIGN'], date: 'Apr 25', status: 'done', assignee: ['MR'] }
  ];

  const columns: Column[] = [
    { id: 'todo', title: 'To do' },
    { id: 'inprogress', title: 'In progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  const filteredCards = useMemo(() => {
    return initialCards.filter(card =>
      card.title.toLowerCase().includes(filterText.toLowerCase()) ||
      card.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  return (
    <div className="page-wrapper kanban-page">

      {/* Cabeçalho */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <div className="page-pretitle">Apps</div>
            <h1 className="page-title">Kanban board</h1>
          </div>

          <div className="page-actions">
            <div className="search-box" style={{ width: '220px' }}>
              <svg className="s-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3.5 3.5" />
              </svg>
              <input
                type="text"
                id="kanban-filter"
                placeholder="Filter cards…"
                aria-label="Filter cards"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <button className="btn btn-outline">Filters</button>
            <button className="btn btn-primary" id="kanban-add-btn">+ New card</button>
          </div>
        </div>
      </div>

      {/* Grid Kanban */}
      <div id="kanban-board" className="kanban-board">
        {columns.map(column => {
          const columnCards = filteredCards.filter(c => c.status === column.id);

          return (
            <section key={column.id} className="kanban-column">

              <header className="kanban-column-head justify-between">
                <div>
                  <span className={`dot `} style={{ background: "var(--text-muted)" }}></span>
                  <span className="title">{column.title}</span>
                  <span className="count">{columnCards.length}</span>
                </div>

                <div>
                  <button className="kanban-add" onClick={handleOpenModal}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add card
                  </button>
                </div>
              </header>

              <div className="kanban-column-body">
                {columnCards.map(card => (

                  <article key={card.id} className="kanban-card">
                    {card.category.length > 0 && (
                      <div className="kanban-card-labels" >
                        {card.category.map((cat, index) => {
                          // Dicionário mapeando a categoria com a classe de cor correspondente do Gentelella
                          const colorMap: Record<string, string> = {
                            'PM': 'kanban-label-green',
                            'DESIGN': 'kanban-label-purple',
                            'ENG': 'kanban-label-blue',
                            'BUG': 'kanban-label-red',
                            'DOCS': 'kanban-label-orange' // ou a classe padrão para DOCS do template
                          };

                          const colorClass = colorMap[cat.toUpperCase()] || 'kanban-label-secondary';

                          return (
                            <span key={index} className={`kanban-label ${colorClass}`}>
                              {cat}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div className="kanban-card-title">{card.title}</div>

                    {card.description && (
                      <p className="kanban-card-desc">{card.description}</p>
                    )}

                    <div className="kanban-card-foot">
                      <div className="kanban-card-meta">
                        <span className="due-date flex gap-1 items-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                            <line x1="4" y1="22" x2="4" y2="15" />
                          </svg>
                          {card.date}
                        </span>
                      </div>

                      {/* Lógica de Avatares com Iniciais e Background inline da Colorlib */}
                      {card.assignee.length > 0 && (
                        <div className="kanban-card-avatars">
                          {card.assignee.map((user, idx) => {
                            // Mapeamento dos metadados dos membros a partir do primeiro kanban
                            const userMap: Record<string, { name: string; color: string }> = {
                              'EW': { name: 'Emily Wang', color: 'var(--yellow)' },
                              'SK': { name: 'Scott King', color: 'var(--blue)' },
                              'TH': { name: 'Thomas Hardy', color: 'var(--purple)' },
                              'ME': { name: 'Max E.', color: 'var(--purple)' }, // Ou a cor correspondente do print
                              'MR': { name: 'Matt Redman', color: 'var(--pink)' }
                            };

                            const userData = userMap[user.toUpperCase()] || { name: user, color: 'var(--gray)' };

                            return (
                              <span
                                key={idx}
                                className="kanban-avatar"
                                style={{ background: userData.color }}
                                title={userData.name}
                              >
                                {user}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* RENDERIZE O MODAL AQUI, NO FINAL DA PÁGINA */}
      <KanbanModal isOpen={modalIsOpen} onClose={handleOpenModal} title='Adicionar Nova Tarefa'>
        <div className="">
          <KanbanForm />
        </div>
      </KanbanModal>
    </div>
  );
}