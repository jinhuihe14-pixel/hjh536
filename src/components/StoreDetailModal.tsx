import React from 'react';
import './StoreDetailModal.css';
import { StoreInfo } from '../data/types';

interface StoreDetailModalProps {
  store: StoreInfo | null;
  onClose: () => void;
}

const StoreDetailModal: React.FC<StoreDetailModalProps> = ({ store, onClose }) => {
  if (!store) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span className="modal-title-icon" />
            {store.name}
          </h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h4 className="section-title">基本信息</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">门店类型</span>
                <span className="info-value">{store.type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">所在城市</span>
                <span className="info-value">{store.city}</span>
              </div>
              <div className="info-item">
                <span className="info-label">客房数量</span>
                <span className="info-value">{store.rooms} 间</span>
              </div>
              <div className="info-item">
                <span className="info-label">月营收</span>
                <span className="info-value highlight">{(store.revenue / 10000).toFixed(0)} 万元</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4 className="section-title">核心指标</h4>
            <div className="kpi-grid">
              <div className="detail-kpi">
                <div className="kpi-label">出租率</div>
                <div
                  className="kpi-number"
                  style={{ color: store.occupancy >= 70 ? '#00e676' : store.occupancy >= 50 ? '#ffb300' : '#ff5252' }}
                >
                  {store.occupancy}%
                </div>
              </div>
              <div className="detail-kpi">
                <div className="kpi-label">利润率</div>
                <div
                  className="kpi-number"
                  style={{ color: store.profitRate >= 30 ? '#00e676' : store.profitRate >= 25 ? '#ffb300' : '#ff5252' }}
                >
                  {store.profitRate}%
                </div>
              </div>
              <div className="detail-kpi">
                <div className="kpi-label">平均房价</div>
                <div className="kpi-number">
                  ¥{Math.round(store.revenue / (store.rooms * 30 * (store.occupancy / 100)))}
                </div>
              </div>
              <div className="detail-kpi">
                <div className="kpi-label">RevPAR</div>
                <div className="kpi-number">
                  ¥{Math.round(store.revenue / (store.rooms * 30))}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4 className="section-title">数据下钻</h4>
            <div className="drill-buttons">
              <button className="drill-btn">日度明细</button>
              <button className="drill-btn">房型分析</button>
              <button className="drill-btn">渠道分析</button>
              <button className="drill-btn">成本构成</button>
              <button className="drill-btn">订单记录</button>
              <button className="drill-btn">会员画像</button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>关闭</button>
          <button className="btn-primary">查看完整报告</button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailModal;
