import React, { useState } from 'react';
import './StoreMap.css';
import { StoreInfo } from '../data/types';

interface StoreMapProps {
  stores: StoreInfo[];
  onStoreClick?: (store: StoreInfo) => void;
}

const StoreMap: React.FC<StoreMapProps> = ({ stores, onStoreClick }) => {
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  const getStorePosition = (lng: number, lat: number) => {
    const x = ((lng - 95) / 30) * 100;
    const y = ((45 - lat) / 25) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '商务酒店': return '#00c8ff';
      case '精品民宿': return '#00e676';
      case '度假酒店': return '#ffb300';
      default: return '#b388ff';
    }
  };

  return (
    <div className="store-map">
      <div className="map-bg">
        <svg className="china-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 120, 220, 0.15)" />
              <stop offset="100%" stopColor="rgba(0, 60, 140, 0.05)" />
            </linearGradient>
          </defs>
          <path
            d="M15,25 L25,18 L40,15 L55,12 L70,18 L80,25 L85,35 L82,48 L75,58 L68,68 L58,75 L45,78 L32,72 L22,62 L15,50 L12,38 Z"
            fill="url(#mapGradient)"
            stroke="rgba(0, 180, 255, 0.4)"
            strokeWidth="0.5"
          />
          <path
            d="M30,30 L45,28 L60,32 L70,40 L68,52 L55,60 L40,58 L32,48 Z"
            fill="none"
            stroke="rgba(0, 150, 255, 0.2)"
            strokeWidth="0.3"
            strokeDasharray="2,2"
          />
        </svg>

        <div className="grid-lines">
          {[...Array(5)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line grid-h" style={{ top: `${(i + 1) * 20}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line grid-v" style={{ left: `${(i + 1) * 16.6}%` }} />
          ))}
        </div>
      </div>

      {stores.map(store => {
        const pos = getStorePosition(store.lng, store.lat);
        const color = getTypeColor(store.type);
        const isHovered = hoveredStore === store.id;

        return (
          <div
            key={store.id}
            className={`store-marker ${isHovered ? 'hovered' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              '--marker-color': color,
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredStore(store.id)}
            onMouseLeave={() => setHoveredStore(null)}
            onClick={() => onStoreClick?.(store)}
          >
            <div className="marker-pulse" />
            <div className="marker-dot" />
            {isHovered && (
              <div className="marker-tooltip">
                <div className="tooltip-title">{store.name}</div>
                <div className="tooltip-row">
                  <span>业态：</span>
                  <span style={{ color }}>{store.type}</span>
                </div>
                <div className="tooltip-row">
                  <span>客房：</span>
                  <span>{store.rooms}间</span>
                </div>
                <div className="tooltip-row">
                  <span>出租率：</span>
                  <span style={{ color: store.occupancy >= 70 ? '#00e676' : store.occupancy >= 50 ? '#ffb300' : '#ff5252' }}>
                    {store.occupancy}%
                  </span>
                </div>
                <div className="tooltip-row">
                  <span>月营收：</span>
                  <span>{(store.revenue / 10000).toFixed(0)}万</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#00c8ff' }} />
          <span>商务酒店</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#00e676' }} />
          <span>精品民宿</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#ffb300' }} />
          <span>度假酒店</span>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
