import React from 'react';
import ReactECharts from 'echarts-for-react';
import { CustomerSegment, ConsumptionLevel } from '../data/types';

interface CustomerChartProps {
  segments: CustomerSegment[];
  consumptionLevels: ConsumptionLevel[];
}

const CustomerChart: React.FC<CustomerChartProps> = ({ segments, consumptionLevels }) => {
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
    },
    legend: {
      data: segments.map(s => s.type),
      bottom: 0,
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8,
    },
    series: [
      {
        name: '客群分布',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '45%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 3,
          borderColor: 'rgba(0, 20, 50, 0.8)',
          borderWidth: 2,
        },
        label: {
          color: 'rgba(230, 241, 255, 0.8)',
          fontSize: 10,
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          lineStyle: { color: 'rgba(0, 150, 255, 0.3)' },
        },
        data: segments.map((s, idx) => ({
          value: s.count,
          name: s.type,
          itemStyle: {
            color: [
              '#00c8ff',
              '#00e676',
              '#ffb300',
              '#b388ff',
              '#ff80ab',
            ][idx % 5],
          },
        })),
      },
    ],
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
      <div className="consumption-levels">
        <div className="consumption-title">消费能力分布</div>
        <div className="consumption-bars">
          {consumptionLevels.map((level, idx) => (
            <div key={level.level} className="consumption-item">
              <span className="consumption-label">{level.level}</span>
              <div className="consumption-bar-wrap">
                <div
                  className="consumption-bar"
                  style={{
                    width: `${level.proportion * 2}%`,
                    background: `linear-gradient(90deg, ${['#00c8ff', '#00e676', '#ffb300', '#b388ff', '#ff80ab'][idx % 5]}55, ${['#00c8ff', '#00e676', '#ffb300', '#b388ff', '#ff80ab'][idx % 5]}cc)`,
                  }}
                />
              </div>
              <span className="consumption-value">{level.proportion}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerChart;
