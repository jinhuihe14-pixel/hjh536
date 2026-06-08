import React from 'react';
import ReactECharts from 'echarts-for-react';
import { RoomTypeData } from '../data/types';

interface RoomTypeChartProps {
  data: RoomTypeData[];
}

const RoomTypeChart: React.FC<RoomTypeChartProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['营收(万)', '出租率(%)'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      top: 0,
      itemWidth: 12,
      itemHeight: 8,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '18%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: {
        color: 'rgba(230, 241, 255, 0.6)',
        fontSize: 10,
        interval: 0,
        rotate: 15,
      },
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
        name: '出租率(%)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 10 },
        splitLine: { show: false },
        max: 100,
      },
    ],
    series: [
      {
        name: '营收(万)',
        type: 'bar',
        data: data.map(d => (d.revenue / 10000).toFixed(1)),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(0, 180, 255, 0.8)' },
              { offset: 1, color: 'rgba(100, 200, 255, 0.9)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '35%',
      },
      {
        name: '出租率(%)',
        type: 'line',
        yAxisIndex: 1,
        data: data.map(d => d.occupancy),
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default RoomTypeChart;
