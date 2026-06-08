import React from 'react';
import ReactECharts from 'echarts-for-react';
import './EnergyAnalysisPage.css';
import Panel from './Panel';
import KpiCard from './KpiCard';
import { EnergyAnalysisData } from '../data/types';

interface EnergyAnalysisPageProps {
  data: EnergyAnalysisData;
}

const EnergyAnalysisPage: React.FC<EnergyAnalysisPageProps> = ({ data }) => {
  const formatNumber = (val: number) => {
    if (val >= 10000) {
      return (val / 10000).toFixed(1) + '万';
    }
    return val.toLocaleString();
  };

  const categoryColors = ['#00c8ff', '#00e676', '#ffb300', '#b388ff', '#ff80ab'];

  const categoryOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      formatter: (params: any) => {
        const d = data.categories.find(item => item.category === params.name);
        if (!d) return '';
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${d.category}</div>
          <div>能耗: ${d.consumption.toLocaleString()} kWh</div>
          <div>成本: ${formatNumber(d.cost)} 元</div>
          <div>占比: ${d.proportion}%</div>
        `;
      },
    },
    legend: {
      orient: 'vertical',
      right: 5,
      top: 'center',
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8,
    },
    series: [
      {
        name: '能耗分类',
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(0, 20, 50, 0.8)',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: data.categories.map((d, idx) => ({
          value: d.consumption,
          name: d.category,
          itemStyle: { color: categoryColors[idx % categoryColors.length] },
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '35%',
        top: '42%',
        style: {
          text: '总能耗',
          fontSize: 10,
          fill: 'rgba(230, 241, 255, 0.5)',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        left: '35%',
        top: '52%',
        style: {
          text: formatNumber(data.categories.reduce((sum, d) => sum + d.consumption, 0)),
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#00c8ff',
          textAlign: 'center',
        },
      },
    ],
  };

  const zoneOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['能耗', '成本'],
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
      data: data.zones.map(d => d.zone),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: {
        color: 'rgba(230, 241, 255, 0.6)',
        fontSize: 9,
        interval: 0,
        rotate: 15,
      },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: '能耗(kWh)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
        splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
      },
      {
        type: 'value',
        name: '成本(元)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '能耗',
        type: 'bar',
        yAxisIndex: 0,
        data: data.zones.map(d => d.consumption),
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
        barWidth: '30%',
      },
      {
        name: '成本',
        type: 'line',
        yAxisIndex: 1,
        data: data.zones.map(d => d.cost),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
    ],
  };

  const floorOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const d = data.floors.find(item => item.floor === p.name);
        if (!d) return '';
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${d.floor}</div>
          <div>单位面积能耗: ${d.perRoomConsumption} kWh/间</div>
          <div>总能耗: ${d.consumption.toLocaleString()} kWh</div>
          <div>房间数: ${d.rooms} 间</div>
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
      name: 'kWh/间',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    yAxis: {
      type: 'category',
      data: data.floors.map(d => d.floor).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: data.floors.map((d, idx) => ({
          value: d.perRoomConsumption,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: categoryColors[idx % categoryColors.length] + '44' },
                { offset: 1, color: categoryColors[idx % categoryColors.length] },
              ],
            },
            borderRadius: [0, 3, 3, 0],
          },
        })).reverse(),
        barWidth: 14,
        label: {
          show: true,
          position: 'right',
          color: 'rgba(230, 241, 255, 0.7)',
          fontSize: 10,
          formatter: '{c}',
        },
      },
    ],
  };

  const hourlyOption = {
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
      data: ['峰时能耗', '谷时能耗', '总能耗'],
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
      data: data.hourlyData.map(d => d.hour),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '能耗(kWh)',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    series: [
      {
        name: '总能耗',
        type: 'line',
        data: data.hourlyData.map(d => d.consumption),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#00c8ff', width: 2 },
        itemStyle: { color: '#00c8ff' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 200, 255, 0.35)' },
              { offset: 1, color: 'rgba(0, 200, 255, 0)' },
            ],
          },
        },
      },
      {
        name: '峰时能耗',
        type: 'line',
        data: data.hourlyData.map(d => {
          const hour = parseInt(d.hour);
          return (hour >= 8 && hour <= 22) ? d.consumption * 0.7 : 0;
        }),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#ff5252', width: 0 },
        itemStyle: { color: '#ff5252' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 82, 82, 0.15)' },
              { offset: 1, color: 'rgba(255, 82, 82, 0)' },
            ],
          },
        },
      },
      {
        name: '谷时能耗',
        type: 'line',
        data: data.hourlyData.map(d => {
          const hour = parseInt(d.hour);
          return (hour < 8 || hour > 22) ? d.consumption * 0.7 : 0;
        }),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#00e676', width: 0 },
        itemStyle: { color: '#00e676' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 230, 118, 0.15)' },
              { offset: 1, color: 'rgba(0, 230, 118, 0)' },
            ],
          },
        },
      },
    ],
  };

  const seasonalOption = {
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
      data: ['月度能耗', '入住率', '单房能耗'],
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
      data: data.seasonalData.map(d => d.month),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: '能耗(kWh)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
        splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
      },
      {
        type: 'value',
        name: '比率(%)',
        nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
        splitLine: { show: false },
        min: 0,
        max: 100,
      },
    ],
    series: [
      {
        name: '月度能耗',
        type: 'bar',
        yAxisIndex: 0,
        data: data.seasonalData.map(d => d.consumption),
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
        barWidth: '40%',
      },
      {
        name: '入住率',
        type: 'line',
        yAxisIndex: 1,
        data: data.seasonalData.map(d => d.occupancyRate),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#00e676', width: 2 },
        itemStyle: { color: '#00e676' },
      },
      {
        name: '单房能耗',
        type: 'line',
        yAxisIndex: 1,
        data: data.seasonalData.map(d => d.perRoomConsumption),
        smooth: true,
        symbol: 'diamond',
        symbolSize: 5,
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
    ],
  };

  const getAnomalyTypeLabel = (type: string) => {
    switch (type) {
      case 'high_consumption': return '高能耗';
      case 'abnormal_spike': return '异常突增';
      case 'equipment_fault': return '设备故障';
      default: return '未知';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'processing': return '处理中';
      case 'resolved': return '已解决';
      default: return '-';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ff5252';
      case 'processing': return '#ffb300';
      case 'resolved': return '#00e676';
      default: return '#e6f1ff';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff5252';
      case 'medium': return '#ffb300';
      case 'low': return '#00e676';
      default: return '#00c8ff';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '-';
    }
  };

  return (
    <div className="energy-analysis-page">
      <div className="kpi-row">
        <KpiCard
          title="总能耗成本"
          value={formatNumber(data.kpi.totalEnergyCost)}
          unit="元"
          colorScheme="blue"
        />
        <KpiCard
          title="单房能耗"
          value={data.kpi.perRoomEnergyCost.toFixed(1)}
          unit="元/间"
          colorScheme="green"
        />
        <KpiCard
          title="能耗营收占比"
          value={data.kpi.energyCostPerRevenue.toFixed(2)}
          unit="%"
          colorScheme="orange"
        />
        <KpiCard
          title="能耗同比"
          value={Math.abs(data.kpi.energyConsumptionYoY).toFixed(1)}
          unit="%"
          trend={data.kpi.energyConsumptionYoY}
          trendLabel="同比"
          colorScheme="purple"
        />
        <KpiCard
          title="节能量"
          value={formatNumber(data.kpi.energySavingAmount)}
          unit="kWh"
          colorScheme="green"
        />
        <KpiCard
          title="节能率"
          value={data.kpi.energySavingRate.toFixed(1)}
          unit="%"
          colorScheme="blue"
        />
        <KpiCard
          title="异常数"
          value={data.kpi.anomalyCount.toString()}
          unit="个"
          colorScheme="red"
        />
        <KpiCard
          title="峰谷差"
          value={data.kpi.peakValleyDiff.toFixed(1)}
          unit="%"
          colorScheme="orange"
        />
      </div>

      <div className="main-content">
        <div className="left-column">
          <Panel title="能耗分类占比">
            <div className="chart-container">
              <ReactECharts option={categoryOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="各区域能耗分布">
            <div className="chart-container">
              <ReactECharts option={zoneOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="楼层能耗对比" subtitle="单位面积能耗">
            <div className="chart-container">
              <ReactECharts option={floorOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>
        </div>

        <div className="center-column">
          <Panel title="24小时能耗曲线" subtitle="峰谷分时">
            <div className="chart-container">
              <ReactECharts option={hourlyOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="淡旺季能耗趋势" subtitle="月度分析">
            <div className="chart-container">
              <ReactECharts option={seasonalOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>
        </div>

        <div className="right-column">
          <Panel title="能耗异常列表">
            <div className="anomaly-list">
              {data.anomalies.map(item => (
                <div key={item.id} className="anomaly-item">
                  <div className="anomaly-header">
                    <span
                      className="anomaly-type"
                      style={{ backgroundColor: getStatusColor(item.status) + '20', color: getStatusColor(item.status) }}
                    >
                      {getAnomalyTypeLabel(item.type)}
                    </span>
                    <span
                      className="anomaly-status"
                      style={{ color: getStatusColor(item.status) }}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <div className="anomaly-zone">{item.zone}</div>
                  <div className="anomaly-desc">{item.description}</div>
                  <div className="anomaly-footer">
                    <span className="anomaly-excess">
                      超幅：<strong style={{ color: '#ff5252' }}>+{item.excessPercent}%</strong>
                    </span>
                    <span className="anomaly-loss">
                      预估损失：<strong style={{ color: '#ffb300' }}>{formatNumber(item.estimatedLoss)}元</strong>
                    </span>
                  </div>
                  <div className="anomaly-time">{item.time}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="节能优化建议" subtitle="智能推荐">
            <div className="suggestion-list">
              {data.savingSuggestions.map(item => (
                <div key={item.id} className="suggestion-item">
                  <div className="suggestion-header">
                    <span
                      className="suggestion-priority"
                      style={{ backgroundColor: getPriorityColor(item.priority) + '20', color: getPriorityColor(item.priority) }}
                    >
                      {getPriorityLabel(item.priority)}
                    </span>
                    <span className="suggestion-category">{item.category}</span>
                  </div>
                  <div className="suggestion-title">{item.title}</div>
                  <div className="suggestion-desc">{item.description}</div>
                  <div className="suggestion-footer">
                    <span className="suggestion-saving">
                      预期节省：<strong style={{ color: '#00e676' }}>{formatNumber(item.expectedSaving)}元/年</strong>
                    </span>
                    <span className="suggestion-payback">
                      回收期：<strong style={{ color: '#00c8ff' }}>{item.paybackPeriod}个月</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default EnergyAnalysisPage;
