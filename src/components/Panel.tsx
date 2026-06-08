import React from 'react';
import './Panel.css';

interface PanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  height?: string | number;
}

const Panel: React.FC<PanelProps> = ({ title, subtitle, children, className = '', height }) => {
  return (
    <div className={`panel ${className}`} style={height ? { height } : undefined}>
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-icon" />
          <span className="panel-title-text">{title}</span>
          {subtitle && <span className="panel-subtitle">{subtitle}</span>}
        </div>
        <div className="panel-header-decoration" />
      </div>
      <div className="panel-body">{children}</div>
      <div className="panel-corner panel-corner-tl" />
      <div className="panel-corner panel-corner-tr" />
      <div className="panel-corner panel-corner-bl" />
      <div className="panel-corner panel-corner-br" />
    </div>
  );
};

export default Panel;
