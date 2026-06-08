import React from 'react';
import ReactECharts from 'echarts-for-react';
import './ChannelPricePage.css';
import Panel from './Panel';
import KpiCard from './KpiCard';
import { ChannelPriceData } from '../data/types';

interface ChannelPricePageProps {
  data: ChannelPriceData;
}

const ChannelPricePage: React.FC<ChannelPricePageProps> = ({ data }) => {
  const roomTypeOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['本店价', '竞品均价', '市场最低', '市场最高'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      top: 0,
      right: 0,
      itemWidth: 12,
      itemHeight: 8,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.roomTypePrices.map(d => d.roomType),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: {
        color: 'rgba(230, 241, 255, 0.6)',
        fontSize: 10,
        interval: 0,
        rotate: 15,
      },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '价格(元)',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    series: [
      {
        name: '本店价',
        type: 'bar',
        data: data.roomTypePrices.map(d => d.ourPrice),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 200, 255, 0.9)' },
              { offset: 1, color: 'rgba(0, 100, 200, 0.3)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '18%',
      },
      {
        name: '竞品均价',
        type: 'bar',
        data: data.roomTypePrices.map(d => d.avgMarketPrice),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 179, 0, 0.9)' },
              { offset: 1, color: 'rgba(200, 140, 0, 0.3)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '18%',
      },
      {
        name: '市场最低',
        type: 'bar',
        data: data.roomTypePrices.map(d => Math.min(...d.competitorPrices.map(c => c.price))),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 230, 118, 0.9)' },
              { offset: 1, color: 'rgba(0, 180, 90, 0.3)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '18%',
      },
      {
        name: '市场最高',
        type: 'bar',
        data: data.roomTypePrices.map(d => Math.max(...d.competitorPrices.map(c => c.price))),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 82, 82, 0.9)' },
              { offset: 1, color: 'rgba(200, 50, 50, 0.3)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '18%',
      },
    ],
  };

  const priceTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: {
        type: 'cross',
        crossStyle: { color: 'rgba(0, 200, 255, 0.5)' },
      },
    },
    legend: {
      data: ['本店价', '竞品均价', '市场区间'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      top: 0,
      right: 0,
      itemWidth: 12,
      itemHeight: 8,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.priceTrend.map(d => d.date),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '价格(元)',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    series: [
      {
        name: '本店价',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        data: data.priceTrend.map(d => d.ourPrice),
        lineStyle: { color: '#00c8ff', width: 2 },
        itemStyle: { color: '#00c8ff' },
      },
      {
        name: '竞品均价',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.priceTrend.map(d => d.competitorAvgPrice),
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
      {
        name: '市场区间',
        type: 'line',
        data: data.priceTrend.map(d => d.marketMaxPrice),
        lineStyle: { color: 'transparent' },
        stack: 'priceRange',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(179, 136, 255, 0.15)' },
              { offset: 1, color: 'rgba(179, 136, 255, 0.05)' },
            ],
          },
        },
      },
      {
        name: '市场最低',
        type: 'line',
        data: data.priceTrend.map(d => d.marketMinPrice),
        lineStyle: { color: 'transparent' },
        stack: 'priceRangeBottom',
        areaStyle: {
          color: 'rgba(0, 20, 50, 0.9)',
        },
      },
    ],
  };

  const channelCompareOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
      formatter: (params: any[]) => {
        const channelName = params[0].name;
        const channel = data.channelCompare.find(c => c.channel === channelName);
        if (!channel) return '';
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${channelName}</div>
          <div>本店价: ${channel.ourPrice} 元</div>
          <div>竞品均价: ${channel.avgMarketPrice} 元</div>
          <div>价差: ${channel.priceDiff > 0 ? '+' : ''}${channel.priceDiff} 元 (${channel.priceDiffPercent > 0 ? '+' : ''}${channel.priceDiffPercent}%)</div>
          <div>排名: ${channel.priceRank} / ${channel.totalCompetitors}</div>
        `;
      },
    },
    legend: {
      data: ['本店价', '竞品均价'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      top: 0,
      itemWidth: 12,
      itemHeight: 8,
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: '价格(元)',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    yAxis: {
      type: 'category',
      data: data.channelCompare.map(d => d.channel).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    series: [
      {
        name: '本店价',
        type: 'bar',
        data: data.channelCompare.map(d => d.ourPrice).reverse(),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(0, 180, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 200, 255, 0.9)' },
            ],
          },
          borderRadius: [0, 3, 3, 0],
        },
        barWidth: '35%',
      },
      {
        name: '竞品均价',
        type: 'bar',
        data: data.channelCompare.map(d => d.avgMarketPrice).reverse(),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(255, 179, 0, 0.3)' },
              { offset: 1, color: 'rgba(255, 179, 0, 0.9)' },
            ],
          },
          borderRadius: [0, 3, 3, 0],
        },
        barWidth: '35%',
      },
    ],
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'overpriced': return '#ff5252';
      case 'underpriced': return '#00e676';
      case 'competitor_change': return '#ffb300';
      default: return '#00c8ff';
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'overpriced': return '价高预警';
      case 'underpriced': return '价低预警';
      case 'competitor_change': return '竞对调价';
      default: return '其他';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#ff5252';
      case 'medium': return '#ffb300';
      case 'low': return '#00e676';
      default: return '#00c8ff';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '-';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'price_up': return '涨价';
      case 'price_down': return '降价';
      case 'promotion': return '促销';
      case 'new_room': return '新房型';
      default: return '其他';
    }
  };

  const renderStars = (star: number) => {
    return '★'.repeat(star);
  };

  return (
    <div className="channel-price-page">
      <div className="kpi-row">
        <KpiCard
          title="价格指数"
          value={data.kpi.avgPriceIndex.toFixed(1)}
          unit="%"
          colorScheme="blue"
        />
        <KpiCard
          title="价格竞争力"
          value={data.kpi.priceCompetitiveness.toFixed(1)}
          unit="分"
          colorScheme="green"
        />
        <KpiCard
          title="预警数"
          value={data.kpi.alertCount.toString()}
          unit="条"
          colorScheme="red"
        />
        <KpiCard
          title="平均价差"
          value={data.kpi.avgPriceDiff.toFixed(0)}
          unit="元"
          colorScheme="orange"
        />
        <KpiCard
          title="低于市场价房型"
          value={data.kpi.belowMarketRooms.toString()}
          unit="个"
          colorScheme="purple"
        />
        <KpiCard
          title="竞品数"
          value={data.kpi.competitorCount.toString()}
          unit="家"
          colorScheme="blue"
        />
      </div>

      <div className="main-content">
        <div className="left-column">
          <Panel title="竞品酒店列表">
            <div className="competitor-list">
              {data.competitors.map(hotel => (
                <div key={hotel.id} className="competitor-item">
                  <div className="competitor-info">
                    <div className="competitor-name">{hotel.name}</div>
                    <div className="competitor-meta">
                      <span className="competitor-star" style={{ color: '#ffb300' }}>
                        {renderStars(hotel.star)}
                      </span>
                      <span className="competitor-city">{hotel.city}</span>
                    </div>
                  </div>
                  <div className="competitor-distance">
                    <span className="distance-value">{hotel.distance}</span>
                    <span className="distance-unit">km</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="价格预警列表">
            <div className="alert-list">
              {data.priceAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-header">
                    <span
                      className="alert-type"
                      style={{
                        backgroundColor: getAlertTypeColor(alert.type) + '20',
                        color: getAlertTypeColor(alert.type),
                      }}
                    >
                      {getAlertTypeLabel(alert.type)}
                    </span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                  <div className="alert-content">
                    <span className="alert-room">{alert.roomType}</span>
                    <span
                      className="alert-diff"
                      style={{ color: alert.diffPercent > 0 ? '#ff5252' : '#00e676' }}
                    >
                      {alert.diffPercent > 0 ? '+' : ''}{alert.diffPercent}%
                    </span>
                  </div>
                  <div className="alert-detail">
                    本店 {alert.ourPrice} 元 / 市场价 {alert.marketPrice} 元
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="center-column">
          <Panel title="房型价格对比">
            <div className="chart-container">
              <ReactECharts option={roomTypeOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="价格趋势分析" subtitle="近30天">
            <div className="chart-container">
              <ReactECharts option={priceTrendOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>
        </div>

        <div className="right-column">
          <Panel title="各渠道价格对比">
            <div className="chart-container">
              <ReactECharts option={channelCompareOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="竞对动态列表">
            <div className="action-list">
              {data.competitorActions.map(action => (
                <div key={action.id} className="action-item">
                  <div className="action-header">
                    <span className="action-competitor">{action.competitor}</span>
                    <span
                      className="action-impact"
                      style={{
                        backgroundColor: getImpactColor(action.impact) + '20',
                        color: getImpactColor(action.impact),
                      }}
                    >
                      {getImpactLabel(action.impact)}影响
                    </span>
                  </div>
                  <div className="action-body">
                    <span className="action-type">{getActionLabel(action.action)}</span>
                    {action.priceChange !== undefined && (
                      <span
                        className="action-price-change"
                        style={{ color: action.priceChange > 0 ? '#ff5252' : '#00e676' }}
                      >
                        {action.priceChange > 0 ? '+' : ''}{action.priceChange}元
                      </span>
                    )}
                  </div>
                  <div className="action-detail">{action.detail}</div>
                  <div className="action-time">{action.time}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default ChannelPricePage;
