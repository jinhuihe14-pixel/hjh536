import React from 'react';
import './NavTabs.css';

export type TabKey = 'dashboard' | 'member' | 'price' | 'energy' | 'report' | 'permission';

interface NavTabItem {
  key: TabKey;
  label: string;
  icon: string;
}

interface NavTabsProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
}

const tabs: NavTabItem[] = [
  { key: 'dashboard', label: '经营大屏', icon: '📊' },
  { key: 'member', label: '会员权益', icon: '👑' },
  { key: 'price', label: '渠道比价', icon: '💰' },
  { key: 'energy', label: '能耗分析', icon: '⚡' },
  { key: 'report', label: '报表中心', icon: '📑' },
  { key: 'permission', label: '权限管理', icon: '🔐' },
];

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="nav-tabs-container">
      <div className="nav-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`nav-tab-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            <span className="nav-tab-icon">{tab.icon}</span>
            <span className="nav-tab-label">{tab.label}</span>
            {activeTab === tab.key && <div className="nav-tab-indicator" />}
          </div>
        ))}
      </div>
      <div className="nav-tabs-decoration-left" />
      <div className="nav-tabs-decoration-right" />
    </div>
  );
};

export default NavTabs;
