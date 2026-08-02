import DashboardCard from './DashboardCard';
import { OrdersTableSection } from './OrdersTableSection';

// ── DEFINIÇÃO DOS ÍCONES (SVGs LIMPOS) ──
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const OrdersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const RevenueIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const ConversionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ViewsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function DashboardPage() {
  // Dados da primeira linha (Cards com Minigráficos)
  const sparklineCards = [
    {
      id: 'c1',
      title: "Total Users",
      value: "2,500",
      icon: UsersIcon,
      iconColor: "green",
      trendText: "Up",
      trendValue: "12%",
      trendType: "up",
      subtext: "342 new this week",
      sparklineData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 90]
    },
    {
      id: 'c2',
      title: "Avg Session",
      value: "123.5",
      valueSuffix: "min",
      icon: ClockIcon,
      iconColor: "blue",
      trendText: "Up",
      trendValue: "8%",
      trendType: "up",
      subtext: "+14min from last week",
      sparklineData: [50, 40, 65, 55, 70, 60, 80, 75, 85, 90]
    },
    {
      id: 'c3',
      title: "Orders",
      value: "1,240",
      icon: OrdersIcon,
      iconColor: "yellow",
      trendText: "Down",
      trendValue: "3%",
      trendType: "down",
      subtext: "78 shipped today",
      sparklineData: [80, 70, 75, 60, 65, 50, 55, 45, 40, 35]
    }
  ] as const;

  // Dados da segunda linha (Cards com Barra de Progresso)
  const progressCards = [
    {
      id: 'c4',
      title: "Revenue",
      value: "$24,567",
      icon: RevenueIcon,
      iconColor: "green",
      trendText: "Up",
      trendValue: "18%",
      trendType: "up",
      subtext: "$3,218 today",
      progressValue: 75
    },
    {
      id: 'c5',
      title: "Conversions",
      value: "2,315",
      icon: ConversionsIcon,
      iconColor: "red",
      trendText: "Up",
      trendValue: "5%",
      trendType: "up",
      subtext: "Rate: 4.2%",
      progressValue: 42
    },
    {
      id: 'c6',
      title: "Page Views",
      value: "47,325",
      icon: ViewsIcon,
      iconColor: "purple",
      trendText: "Up",
      trendValue: "22%",
      trendType: "up",
      subtext: "6,854 unique visitors",
      progressValue: 68
    }
  ] as const;

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Primeira Linha: Sparklines */}
      <div className="row col-3">
        {sparklineCards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            value={card.value}
            valueSuffix={'valueSuffix' in card ? card.valueSuffix : undefined}
            icon={card.icon}
            iconColor={card.iconColor}
            trendText={card.trendText}
            trendValue={card.trendValue}
            trendType={card.trendType}
            subtext={card.subtext}
            sparklineData={card.sparklineData}
          />
        ))}
      </div>

      {/* Segunda Linha: Progress Bar */}
      <div className="row col-3">
        {progressCards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconColor={card.iconColor}
            trendText={card.trendText}
            trendValue={card.trendValue}
            trendType={card.trendType}
            subtext={card.subtext}
            progressValue={card.progressValue}
          />
        ))}
      </div>

      <div>
        <OrdersTableSection />
      </div>

    </div>
  );
}