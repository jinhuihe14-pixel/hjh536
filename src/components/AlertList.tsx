import React from 'react';
import './AlertList.css';
import { AlertItem as AlertItemType } from '../data/types';

interface AlertListProps {
  data: AlertItemType[];
}

const AlertList: React.FC<AlertListProps> = ({ data }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'danger': return '●';
      case 'warning': return '▲';
      case 'info': return '◆';
      default: return '•';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'danger': return '#ff5252';
      case 'warning': return '#ffb300';
      case 'info': return '#00c8ff';
      default: return '#e6f1ff';
    }
  };

  return (
    <div className="alert-list">
      {data.map(alert => (
        <div key={alert.id} className={`alert-item alert-${alert.type}`}>
          <div className="alert-icon" style={{ color: getTypeColor(alert.type) }}>
            {getTypeIcon(alert.type)}
          </div>
          <div className="alert-content">
            <div className="alert-header">
              <span className="alert-title">{alert.title}</span>
              <span className="alert-time">{alert.time}</span>
            </div>
            <div className="alert-desc">{alert.content}</div>
            <div className="alert-footer">
              <span className="alert-store">门店：{alert.store}</span>
              <span className="alert-metric">
                {alert.metric}：<strong style={{ color: getTypeColor(alert.type) }}>{alert.value}</strong>
                {alert.threshold !== '-' && <span className="alert-threshold"> / 阈值 {alert.threshold}</span>}
              </span>
            </div>
          </div>
          <div className="alert-indicator" style={{ background: getTypeColor(alert.type) }} />
        </div>
      ))}
    </div>
  );
};

export default AlertList;
