import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  valueSuffix?: string; // Para o "min" do Avg Session
  icon: React.ComponentType;
  iconColor: string; // Ex: 'teal', 'blue', 'yellow', 'green', 'red', 'purple'
  trendText: string;
  trendValue: string;
  trendType: 'up' | 'down';
  subtext: string;
  // Opcionais dependendo do tipo do card
  sparklineData?: readonly number[];
  progressValue?: number; // Valor de 0 a 100 para a barra de progresso
}

export default function DashboardCard({
  title,
  value,
  valueSuffix,
  icon: Icon,
  iconColor,
  trendValue,
  trendType,
  subtext,
  sparklineData,
  progressValue
}: DashboardCardProps) {
  return (
    <div className="card">
      <div className="stat">
        {/* Ícone com classe de cor dinâmica */}
        <div className={`stat-icon ${iconColor}`}>
          <Icon />
        </div>

        <div className="stat-content">
          <div className="stat-label">{title}</div>
          <div className="stat-value-row">
            <span className="stat-value">
              {value}
              {valueSuffix && (
                <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '1px' }}>
                  {valueSuffix}
                </span>
              )}
            </span>

            {/* Tag de variação percentual (Up/Down) com seta SVG apropriada */}
            <span className={`stat-change ${trendType}`}>
              {trendType === 'up' ? (
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 9V3M3 6l3-3 3 3" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 3v6M3 6l3 3 3-3" />
                </svg>
              )}
              {trendValue}
            </span>
          </div>
          <div className="stat-subtext">{subtext}</div>
        </div>

        {/* Renderiza o mini-gráfico apenas se os dados existirem */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="stat-spark">
            {sparklineData.map((heightValue, index) => (
              <div
                key={index}
                className="bar"
                style={{ height: `${heightValue}%`, background: `var(--${iconColor})` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Renderiza a barra de progresso no rodapé apenas se o valor for informado */}
      {progressValue !== undefined && (
        <div style={{ padding: '0 16px 12px' }}>
          <div className="progress-thin">
            <div
              className="bar"
              style={{ width: `${progressValue}%`, background: `var(--${iconColor})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}