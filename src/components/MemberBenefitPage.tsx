import React from 'react';
import ReactECharts from 'echarts-for-react';
import './MemberBenefitPage.css';
import Panel from './Panel';
import KpiCard from './KpiCard';
import { MemberBenefitData } from '../data/types';

interface MemberBenefitPageProps {
  data: MemberBenefitData;
}

const MemberBenefitPage: React.FC<MemberBenefitPageProps> = ({ data }) => {
  const formatNumber = (val: number) => {
    if (val >= 10000) {
      return (val / 10000).toFixed(1) + '万';
    }
    return val.toLocaleString();
  };

  const memberLevelOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      formatter: '{b}: {c}人 ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8,
    },
    series: [
      {
        name: '会员等级',
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
        data: data.memberLevels.map((d, idx) => ({
          value: d.count,
          name: d.level,
          itemStyle: {
            color: ['#00c8ff', '#00e676', '#ffb300', '#b388ff', '#ff80ab'][idx % 5],
          },
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '35%',
        top: '42%',
        style: {
          text: '会员总数',
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
          text: formatNumber(data.kpi.totalMembers),
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#00c8ff',
          textAlign: 'center',
        },
      },
    ],
  };

  const pointsFlowOption = {
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
      data: ['积分获取', '积分消耗', '积分过期'],
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
      top: '18%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.pointsFlow.map(d => d.date),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '积分',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    series: [
      {
        name: '积分获取',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.pointsFlow.map(d => d.earned),
        lineStyle: { color: '#00e676', width: 2 },
        itemStyle: { color: '#00e676' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 230, 118, 0.35)' },
              { offset: 1, color: 'rgba(0, 230, 118, 0)' },
            ],
          },
        },
      },
      {
        name: '积分消耗',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.pointsFlow.map(d => d.spent),
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
        name: '积分过期',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.pointsFlow.map(d => d.expired),
        lineStyle: { color: '#ff5252', width: 2 },
        itemStyle: { color: '#ff5252' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 82, 82, 0.35)' },
              { offset: 1, color: 'rgba(255, 82, 82, 0)' },
            ],
          },
        },
      },
    ],
  };

  const churnTrendOption = {
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
      data: ['高等级流失', '中等级流失', '低等级流失'],
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
      top: '18%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.churnTrend.map(d => d.month),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '人数',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    series: [
      {
        name: '高等级流失',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        data: data.churnTrend.map(d => d.highLevelChurn),
        lineStyle: { color: '#ff5252', width: 2 },
        itemStyle: { color: '#ff5252' },
      },
      {
        name: '中等级流失',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.churnTrend.map(d => d.midLevelChurn),
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
      {
        name: '低等级流失',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.churnTrend.map(d => d.lowLevelChurn),
        lineStyle: { color: '#00c8ff', width: 2 },
        itemStyle: { color: '#00c8ff' },
      },
    ],
  };

  const couponTypeOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['发放量', '使用量', '过期量'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      top: 0,
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
      data: data.couponTypes.map(d => d.name),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: {
        color: 'rgba(230, 241, 255, 0.6)',
        fontSize: 9,
        interval: 0,
        rotate: 15,
      },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '数量',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
    },
    series: [
      {
        name: '发放量',
        type: 'bar',
        data: data.couponTypes.map(d => d.totalIssued),
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
        barWidth: '22%',
      },
      {
        name: '使用量',
        type: 'bar',
        data: data.couponTypes.map(d => d.used),
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
        barWidth: '22%',
      },
      {
        name: '过期量',
        type: 'bar',
        data: data.couponTypes.map(d => d.expired),
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
        barWidth: '22%',
      },
    ],
  };

  const rightsUsageOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['使用率(%)', '满意度(分)'],
      textStyle: { color: 'rgba(230, 241, 255, 0.7)', fontSize: 10 },
      top: 0,
      right: 0,
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
      name: '%/分',
      nameTextStyle: { color: 'rgba(230, 241, 255, 0.5)', fontSize: 9 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 100, 200, 0.15)' } },
      max: 100,
    },
    yAxis: {
      type: 'category',
      data: data.rightsUsage.map(d => d.name).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: { color: 'rgba(230, 241, 255, 0.6)', fontSize: 9 },
      axisTick: { show: false },
    },
    series: [
      {
        name: '使用率(%)',
        type: 'bar',
        data: data.rightsUsage.map(d => d.usageRate).reverse(),
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
        name: '满意度(分)',
        type: 'line',
        data: data.rightsUsage.map(d => d.satisfaction).reverse(),
        symbol: 'diamond',
        symbolSize: 6,
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
    ],
  };

  const activityEffectOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 30, 60, 0.9)',
      borderColor: 'rgba(0, 150, 255, 0.3)',
      textStyle: { color: '#e6f1ff' },
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['新增会员', '复购率', 'ROI'],
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
      data: data.activityEffects.map(d => d.activityName),
      axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.3)' } },
      axisLabel: {
        color: 'rgba(230, 241, 255, 0.6)',
        fontSize: 9,
        interval: 0,
        rotate: 20,
      },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: '新增会员',
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
      },
    ],
    series: [
      {
        name: '新增会员',
        type: 'bar',
        yAxisIndex: 0,
        data: data.activityEffects.map(d => d.newMembers),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(179, 136, 255, 0.9)' },
              { offset: 1, color: 'rgba(100, 80, 200, 0.3)' },
            ],
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '35%',
      },
      {
        name: '复购率',
        type: 'line',
        yAxisIndex: 1,
        data: data.activityEffects.map(d => d.rePurchaseRate),
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#00e676', width: 2 },
        itemStyle: { color: '#00e676' },
      },
      {
        name: 'ROI',
        type: 'line',
        yAxisIndex: 1,
        data: data.activityEffects.map(d => d.roi),
        smooth: true,
        symbol: 'diamond',
        symbolSize: 5,
        lineStyle: { color: '#ffb300', width: 2 },
        itemStyle: { color: '#ffb300' },
      },
    ],
  };

  const suggestions = [
    { id: 1, title: '提升高等级会员专属权益', desc: '建议增加钻石会员专属房型升级、行政酒廊等特权，降低高等级会员流失率', priority: 'high', impact: '预计降低流失率15%' },
    { id: 2, title: '优化积分过期提醒机制', desc: '在积分到期前30天、7天、1天分别推送提醒，并推出积分加速兑换活动', priority: 'high', impact: '预计减少积分过期40%' },
    { id: 3, title: '丰富优惠券类型组合', desc: '增加周末特惠、连住优惠等定向优惠券，提升优惠券核销率', priority: 'medium', impact: '预计提升核销率8%' },
    { id: 4, title: '会员日专属活动策划', desc: '每月设置会员日，推出专属折扣和双倍积分活动，提升会员活跃度', priority: 'medium', impact: '预计提升活跃度12%' },
    { id: 5, title: '完善会员权益使用引导', desc: '在APP首页增加权益入口，通过新手引导和消息推送提升权益使用率', priority: 'low', impact: '预计提升使用率10%' },
  ];

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
    <div className="member-benefit-page">
      <div className="kpi-row">
        <KpiCard
          title="会员总数"
          value={formatNumber(data.kpi.totalMembers)}
          unit="人"
          colorScheme="blue"
        />
        <KpiCard
          title="活跃会员"
          value={formatNumber(data.kpi.activeMembers)}
          unit="人"
          colorScheme="green"
        />
        <KpiCard
          title="高等级占比"
          value={data.kpi.highLevelRate.toFixed(1)}
          unit="%"
          colorScheme="orange"
        />
        <KpiCard
          title="人均积分"
          value={data.kpi.avgPointsPerMember.toLocaleString()}
          unit="分"
          colorScheme="purple"
        />
        <KpiCard
          title="券核销率"
          value={data.kpi.couponUsageRate.toFixed(1)}
          unit="%"
          colorScheme="blue"
        />
        <KpiCard
          title="会员营收贡献"
          value={data.kpi.memberRevenueContribution.toFixed(1)}
          unit="%"
          colorScheme="green"
        />
        <KpiCard
          title="流失率"
          value={data.kpi.churnRate.toFixed(1)}
          unit="%"
          colorScheme="red"
        />
        <KpiCard
          title="积分周转率"
          value={data.kpi.pointsTurnoverRate.toFixed(1)}
          unit="%"
          colorScheme="orange"
        />
      </div>

      <div className="main-content">
        <div className="left-column">
          <Panel title="会员等级分布">
            <div className="chart-container">
              <ReactECharts option={memberLevelOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="积分流水趋势" subtitle="近30天">
            <div className="chart-container">
              <ReactECharts option={pointsFlowOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="会员流失趋势" subtitle="近6个月">
            <div className="chart-container">
              <ReactECharts option={churnTrendOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>
        </div>

        <div className="center-column">
          <Panel title="优惠券类型分析">
            <div className="chart-container">
              <ReactECharts option={couponTypeOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="权益使用率排行">
            <div className="chart-container">
              <ReactECharts option={rightsUsageOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>
        </div>

        <div className="right-column">
          <Panel title="会员活动效果分析">
            <div className="chart-container">
              <ReactECharts option={activityEffectOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Panel>

          <Panel title="权益优化建议" subtitle="智能推荐">
            <div className="suggestion-list">
              {suggestions.map(item => (
                <div key={item.id} className="suggestion-item">
                  <div className="suggestion-header">
                    <span
                      className="suggestion-priority"
                      style={{ backgroundColor: getPriorityColor(item.priority) + '20', color: getPriorityColor(item.priority) }}
                    >
                      {getPriorityLabel(item.priority)}
                    </span>
                    <span className="suggestion-title">{item.title}</span>
                  </div>
                  <div className="suggestion-desc">{item.desc}</div>
                  <div className="suggestion-impact">
                    <span className="impact-label">预期效果：</span>
                    <span className="impact-value">{item.impact}</span>
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

export default MemberBenefitPage;
