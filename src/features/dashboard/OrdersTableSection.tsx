import { useEffect, useState } from 'react';

interface Order {
  id: string;
  customer: string;
  item: string;
  qty: number;
  total: number;
  channel: string;
  status: 'Paid' | 'Processing' | 'Pending' | 'Cancelled';
  date: string;
}

type SortFields = 'id' | 'customer' | 'item' | 'qty' | 'total' | 'channel' | 'status' | 'date';
type SortOrder = 'asc' | 'desc';

export function OrdersTableSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  // Estados para controlar a ordenação do servidor simulada
  const [sortField, setSortField] = useState<SortFields>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Base completa de dados simulada do Back-end
  const fullMockData: Order[] = [
    { id: '#7800', customer: 'Sven Kowalski', item: 'Merino base layer', qty: 3, total: 367, channel: 'Direct', status: 'Cancelled', date: 'Mar 2, 2026' },
    { id: '#7801', customer: 'Oliver Kane', item: 'Mech keyboard', qty: 4, total: 474, channel: 'Partner', status: 'Processing', date: 'Apr 26, 2026' },
    { id: '#7802', customer: 'Emily Wang', item: 'Linen shirt', qty: 1, total: 236, channel: 'Partner', status: 'Cancelled', date: 'Feb 14, 2026' },
    { id: '#7803', customer: 'Fiona Reilly', item: 'Aurora hoodie', qty: 3, total: 374, channel: 'Email', status: 'Cancelled', date: 'Jan 26, 2026' },
    { id: '#7804', customer: 'Yuki Tanaka', item: 'Linen shirt', qty: 2, total: 387, channel: 'Direct', status: 'Paid', date: 'Feb 1, 2026' },
  ];

  useEffect(() => {
    async function fetchOrders() {
      // 1. Só ativa o loading visual se for uma nova busca por texto
      // Isso evita o "pisca-pisca" ao apenas ordenar as colunas
      if (search) {
        setLoading(true);
      }

      try {
        // Simulando delay da requisição à API Django
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 2. Corrigido para 'const': filtra os dados baseado na busca
        const filtered = fullMockData.filter(order =>
          order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.item.toLowerCase().includes(search.toLowerCase()) ||
          order.id.toLowerCase().includes(search.toLowerCase())
        );

        // 3. Aplica a ordenação na mesma referência do array
        filtered.sort((a, b) => {
          let aValue = a[sortField];
          let bValue = b[sortField];

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
          }

          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();

          if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });

        setOrders(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortField, sortOrder]);
  // Função gatilho disparada ao clicar em um cabeçalho
  const handleSort = (field: SortFields) => {
    if (sortField === field) {
      // Se clicou na mesma coluna, inverte a ordem
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Se clicou em uma nova coluna, define como padrão ascendente
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Renderiza a setinha ao lado da coluna selecionada
  const renderSortIcon = (field: SortFields) => {
    if (sortField !== field) return <span style={{ opacity: 0.3, marginLeft: '4px' }}>↕</span>;
    return sortOrder === 'asc' ? <span style={{ marginLeft: '4px', color: '#6366f1' }}>▲</span> : <span style={{ marginLeft: '4px', color: '#6366f1' }}>▼</span>;
  };

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Processing': return 'status-processing';
      case 'Pending': return 'status-pending';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Latest Orders</div>
          <div className="card-subtitle">Server data monitored dynamically.</div>
        </div>
      </div>

      <div className="table-search-bar" style={{ padding: '16px' }}>
        <input
          type="text"
          placeholder="Search by ID, customer or item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ width: '100%', maxWidth: '320px' }}
        />
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Order # {renderSortIcon('id')}
              </th>
              <th onClick={() => handleSort('customer')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Customer {renderSortIcon('customer')}
              </th>
              <th onClick={() => handleSort('item')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Item {renderSortIcon('item')}
              </th>
              <th onClick={() => handleSort('qty')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Qty {renderSortIcon('qty')}
              </th>
              <th onClick={() => handleSort('total')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Total {renderSortIcon('total')}
              </th>
              <th onClick={() => handleSort('channel')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Channel {renderSortIcon('channel')}
              </th>
              <th onClick={() => handleSort('status')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Status {renderSortIcon('status')}
              </th>
              <th onClick={() => handleSort('date')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Date {renderSortIcon('date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '24px' }}>Loading server data...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '24px' }}>No orders found.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.item}</td>
                  <td>{order.qty}</td>
                  <td>${order.total}</td>
                  <td>{order.channel}</td>
                  <td>
                    <span className={`status-dot ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}