import React from 'react';
import './KpiCard.css';

interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  icon?: string;
  colorScheme?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendLabel = '同比',
  colorScheme = 'blue',
}) => {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <div className={`kpi-card kpi-${colorScheme}`}>
      <div className="kpi-card-left">
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">
          <span className="kpi-value-num">{value}</span>
          {unit && <span className="kpi-unit">{unit}</span>}
        </div>
        {trend !== undefined && (
          <div className={`kpi-trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
            <span className="trend-arrow">{isPositive ? '▲' : '▼'}</span>
            <span className="trend-value">{Math.abs(trend)}%</span>
            <span className="trend-label">{trendLabel}</span>
          </div>
        )}
      </div>
      <div className="kpi-card-right">
        <div className="kpi-decoration">
          <div className="kpi-circle kpi-circle-1" />
          <div className="kpi-circle kpi-circle-2" />
        </div>
      </div>
      <div className="kpi-card-glow" />
    </div>
  );
};

export default KpiCard;
