import React from 'react';
import ReactECharts from 'echarts-for-react';
import { CostBreakdown } from '../data/types';

interface CostChartProps {
  data: CostBreakdown[];
}

const CostChart: React.FC<CostChartProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const d = data.find(item => item.category === p.name);
        if (!d) return '';
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${d.category}</div>
          <div>金额: ${(d.amount / 10000).toFixed(1)} 万</div>
          <div>占比: ${d.proportion}%</div>
        `;
      },
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.category),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 11 },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d, idx) => ({
          value: d.proportion,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: ['#ff5252', '#ffb300', '#00c8ff', '#00e676', '#b388ff', '#ff80ab', '#4dd0e1', '#78909c'][idx % 8] + '88' },
                { offset: 1, color: ['#ff5252', '#ffb300', '#00c8ff', '#00e676', '#b388ff', '#ff80ab', '#4dd0e1', '#78909c'][idx % 8] },
              ],
            },
            borderRadius: [0, 3, 3, 0],
          },
        })),
        barWidth: 14,
        label: {
          show: true,
          position: 'right',
          color: 'rgba(230, 241, 255, 0.7)',
          fontSize: 11,
          formatter: '{c}%',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default CostChart;
