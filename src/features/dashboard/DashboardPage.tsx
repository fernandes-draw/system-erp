// Garanta que está com "export function DashboardPage" exatamente assim:
export function DashboardPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Painel Principal</h1>
      </div>

      <div className="row col-3">
        <div className="card">
          <div className="card-body">
            <span className="text-muted">Total de Clientes</span>
            <h2 className="cell-strong" style={{ fontSize: '24px', margin: '8px 0' }}>2,500</h2>
            <p className="status-green">▲ 4% Em relação à semana passada</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <span className="text-muted">Tempo Médio</span>
            <h2 className="cell-strong" style={{ fontSize: '24px', margin: '8px 0' }}>123.50</h2>
            <p className="status-green">▲ 3% Em relação à semana passada</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <span className="text-muted">Vendas Totais</span>
            <h2 className="cell-strong" style={{ fontSize: '24px', margin: '8px 0' }}>R$ 45.231</h2>
            <p className="status-green">▲ 34% Em relação ao mês passado</p>
          </div>
        </div>
      </div>
    </div>
  );
}