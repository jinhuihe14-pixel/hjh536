import React from 'react';
import ReactECharts from 'echarts-for-react';
import { RevenueTrendItem } from '../data/types';

interface RevenueTrendChartProps {
  data: RevenueTrendItem[];
}

const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data }) => {
  const option = {
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
      data: ['营收', '出租率', 'RevPAR'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 11 },
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
      data: data.map(d => d.date),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: '营收(万)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
      },
      {
        type: 'value',
        name: '比率(%)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 10 },
        splitLine: { show: false },
        min: 0,
        max: 100,
      },
    ],
    series: [
      {
        name: '营收',
        type: 'bar',
        yAxisIndex: 0,
        data: data.map(d => (d.revenue / 10000).toFixed(1)),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 200, 255, 0.8)' },
              { offset: 1, color: 'rgba(0, 100, 200, 0.2)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '40%',
      },
      {
        name: '出租率',
        type: 'line',
        yAxisIndex: 1,
        data: data.map(d => d.occupancy),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#00e676', width: 2 },
        itemStyle: { color: '#00e676' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 230, 118, 0.25)' },
              { offset: 1, color: 'rgba(0, 230, 118, 0)' },
            ],
          },
        },
      },
      {
        name: 'RevPAR',
        type: 'line',
        yAxisIndex: 1,
        data: data.map(d => (d.revpar / 5).toFixed(1)),
        smooth: true,
        symbol: 'diamond',
        symbolSize: 5,
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default RevenueTrendChart;
