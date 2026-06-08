import React from 'react';
import './StoreRanking.css';
import { StoreProfit } from '../data/types';

interface StoreRankingProps {
  data: StoreProfit[];
  onStoreClick?: (store: StoreProfit) => void;
}

const StoreRanking: React.FC<StoreRankingProps> = ({ data, onStoreClick }) => {
  const sortedData = [...data].sort((a, b) => b.profitRate - a.profitRate);

  const getRankColor = (index: number) => {
    if (index === 0) return '#ffd700';
    if (index === 1) return '#c0c0c0';
    if (index === 2) return '#cd7f32';
    return 'rgba(230, 241, 255, 0.5)';
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
    <div className="store-ranking">
      <div className="ranking-header">
        <span className="rank-col">排名</span>
        <span className="name-col">门店</span>
        <span className="type-col">业态</span>
        <span className="profit-col">利润率</span>
      </div>
      <div className="ranking-list">
        {sortedData.map((store, index) => (
          <div
            key={store.name}
            className={`ranking-item ${store.profitRate < 25 ? 'warning' : ''}`}
            onClick={() => onStoreClick?.(store)}
          >
            <span className="rank-col">
              <span
                className="rank-badge"
                style={{
                  background: index < 3 ? getRankColor(index) : 'rgba(0, 100, 200, 0.3)',
                  color: index < 3 ? '#0a1a33' : '#e6f1ff',
                }}
              >
                {index + 1}
              </span>
            </span>
            <span className="name-col">{store.name}</span>
            <span className="type-col">
              <span
                className="type-tag"
                style={{
                  background: getTypeColor(store.type) + '22',
                  color: getTypeColor(store.type),
                  borderColor: getTypeColor(store.type) + '55',
                }}
              >
                {store.type}
              </span>
            </span>
            <span className="profit-col">
              <span
                className="profit-value"
                style={{ color: store.profitRate >= 30 ? '#00e676' : store.profitRate >= 25 ? '#ffb300' : '#ff5252' }}
              >
                {store.profitRate.toFixed(1)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreRanking;
