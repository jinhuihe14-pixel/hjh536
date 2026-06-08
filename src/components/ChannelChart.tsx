import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChannelData } from '../data/types';

interface ChannelChartProps {
  data: ChannelData[];
}

const ChannelChart: React.FC<ChannelChartProps> = ({ data }) => {
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      formatter: (params: any) => {
        const d = data.find(item => item.name === params.name);
        if (!d) return '';
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${d.name}</div>
          <div>订单量: ${d.orders.toLocaleString()} 单</div>
          <div>营收: ${(d.revenue / 10000).toFixed(1)} 万</div>
          <div>获客成本: ${d.customerAcquisitionCost} 元</div>
          <div>转化率: ${d.conversionRate}%</div>
        `;
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: 5,
      left: 'center',
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 12,
    },
    series: [
      {
        name: '渠道营收',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(0, 20, 50, 0.8)',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#fff',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: { show: false },
        data: data.map((d, idx) => ({
          value: d.revenue,
          name: d.name,
          itemStyle: {
            color: [
              '#00c8ff',
              '#00e676',
              '#ffb300',
              '#b388ff',
              '#ff80ab',
              '#4dd0e1',
            ][idx % 6],
          },
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '35%',
        style: {
          text: '总营收',
          fontSize: 12,
          fill: 'rgba(230, 241, 255, 0.6)',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '45%',
        style: {
          text: `${(totalRevenue / 10000).toFixed(0)}万`,
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#00c8ff',
          textAlign: 'center',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default ChannelChart;
