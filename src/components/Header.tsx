import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = '酒店集团全域数据分析平台',
  subtitle = 'Hotel Group Data Intelligence Center',
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return `${year}年${month}月${day}日 ${weekDays[date.getDay()]}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="header-stat">
          <span className="stat-label">门店总数</span>
          <span className="stat-value">12</span>
          <span className="stat-unit">家</span>
        </div>
        <div className="header-stat">
          <span className="stat-label">客房总数</span>
          <span className="stat-value">1,924</span>
          <span className="stat-unit">间</span>
        </div>
      </div>

      <div className="header-center">
        <h1 className="header-title">
          <span className="title-text">{title}</span>
          <span className="title-decoration title-decoration-left" />
          <span className="title-decoration title-decoration-right" />
        </h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>

      <div className="header-right">
        <div className="header-time">
          <span className="time-value">{formatTime(currentTime)}</span>
          <span className="date-value">{formatDate(currentTime)}</span>
        </div>
        <div className="header-user">
          <div className="user-avatar">管</div>
          <div className="user-info">
            <span className="user-name">集团管理员</span>
            <span className="user-role">全域数据权限</span>
          </div>
        </div>
      </div>

      <div className="header-border header-border-top" />
      <div className="header-border header-border-bottom" />
    </header>
  );
};

export default Header;
