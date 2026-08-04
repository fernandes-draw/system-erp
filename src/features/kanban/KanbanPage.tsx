import { useMemo, useState } from 'react';
import { KanbanForm } from './components/KanbanForm';
import { KanbanModal } from './components/KanbanModal';


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
    { id: '1', title: 'Auditar acessibilidade nas páginas de formulário', description: '', category: ['ENG', 'DOCS'], date: 'Mai 08', status: 'todo', assignee: ['ME', 'TH'] },
    { id: '2', title: 'Definir sequência de e-mails de boas-vindas', description: 'Fluxo de três mensagens de boas-vindas com cadência do dia 1, 3 e 7', category: ['PM'], date: 'Mai 02', status: 'todo', assignee: ['EW'] },
    { id: '3', title: 'Atualizar sistema de ícones', description: 'Migrar de heroicons para um conjunto personalizado com traço consistente', category: ['DESIGN'], date: 'Mai 05', status: 'todo', assignee: ['SK'] },
    { id: '4', title: 'Planejar OKRs do Q3', description: 'Workshop com líderes para definir resultados do Q3', category: ['PM'], date: 'Mai 15', status: 'todo', assignee: ['EW'] },

    { id: '5', title: 'Implementar quadro kanban com arrastar e soltar', description: 'Usar API de arrastar do HTML5, sem biblioteca', category: ['ENG'], date: 'Abr 30', status: 'inprogress', assignee: ['MR'] },
    { id: '6', title: 'Projetar página de detalhes do produto', description: 'Galeria + variantes + avaliações + relacionados', category: ['DESIGN'], date: 'Abr 30', status: 'inprogress', assignee: ['SK'] },
    { id: '7', title: 'Escrever conteúdo de FAQ', description: '15 artigos em 5 categorias', category: ['DOCS'], date: 'Mai 01', status: 'inprogress', assignee: ['EW'] },

    { id: '8', title: 'Corrigir indicadores de ordenação do DataTables', description: 'Substituir span vazio por chevron SVG', category: ['BUG', 'ENG'], date: 'Abr 29', status: 'review', assignee: ['MR'] },
    { id: '9', title: 'Menu suspenso de notificações', description: 'Botão de sino → painel com notificações de exemplo', category: ['ENG'], date: 'Abr 29', status: 'review', assignee: ['TH'] },

    { id: '10', title: 'Construir página de chat', description: '', category: ['ENG'], date: 'Abr 28', status: 'done', assignee: ['MR'] },
    { id: '11', title: 'Construir página de configurações', description: '', category: ['ENG', 'DESIGN'], date: 'Abr 28', status: 'done', assignee: [] },
    { id: '12', title: 'Migrar para Vite 8', description: '', category: ['ENG'], date: 'Abr 25', status: 'done', assignee: [] },
    { id: '13', title: 'Adicionar modo escuro', description: 'Script de pré-renderização, mapeamentos de tokens e observador de tema do ECharts', category: ['ENG', 'DESIGN'], date: 'Abr 25', status: 'done', assignee: ['MR'] }
  ];

  const columns: Column[] = [
    { id: 'todo', title: 'A fazer' },
    { id: 'inprogress', title: 'Em andamento' },
    { id: 'review', title: 'Revisão' },
    { id: 'done', title: 'Concluído' },
  ];

  const filteredCards = useMemo(() => {
    return initialCards.filter(card =>
      card.title.toLowerCase().includes(filterText.toLowerCase()) ||
      card.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  return (
    <>
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
                placeholder="Filtrar cartões…"
                aria-label="Filtrar cartões"
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
    </>
  );
}