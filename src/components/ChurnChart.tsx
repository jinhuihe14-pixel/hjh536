import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChurnData } from '../data/types';

interface ChurnChartProps {
  data: ChurnData[];
}

const ChurnChart: React.FC<ChurnChartProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      formatter: '{b}: {c}人 ({d}%)',
    },
    series: [
      {
        name: '用户状态',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(0, 20, 50, 0.8)',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside',
          color: 'rgba(230, 241, 255, 0.8)',
          fontSize: 10,
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          length: 8,
          length2: 6,
          lineStyle: { color: 'rgba(0, 150, 255, 0.3)' },
        },
        data: data.map((d, idx) => ({
          value: d.count,
          name: d.level,
          itemStyle: {
            color: ['#ff5252', '#ffb300', '#00c8ff', '#00e676', '#78909c'][idx % 5],
          },
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '42%',
        style: {
          text: '总用户',
          fontSize: 11,
          fill: 'rgba(230, 241, 255, 0.5)',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '52%',
        style: {
          text: `${data.reduce((s, d) => s + d.count, 0).toLocaleString()}`,
          fontSize: 16,
          fontWeight: 'bold',
          fill: '#00c8ff',
          textAlign: 'center',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default ChurnChart;
