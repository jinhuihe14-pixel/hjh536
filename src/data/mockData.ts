import { DashboardData } from './types';

const generateDateRange = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`);
  }
  return dates;
};

const dates = generateDateRange(30);

export const mockDashboardData: DashboardData = {
  kpi: {
    occupancy: 78.6,
    adr: 428.5,
    revpar: 336.8,
    revenue: 12680000,
    cost: 8750000,
    profit: 3930000,
    occupancyYoY: 5.2,
    adrYoY: 8.6,
    revparYoY: 14.3,
    revenueYoY: 12.8,
    costYoY: 6.5,
    profitYoY: 28.6,
    occupancyMoM: 3.1,
    adrMoM: 2.4,
    revparMoM: 5.6,
  },

  revenueTrend: dates.map((date, idx) => {
    const base = 380000;
    const weekendFactor = [3, 4, 5].includes((idx + 1) % 7) ? 1.3 : 1;
    const trendFactor = 1 + idx * 0.005;
    const randomFactor = 0.85 + Math.random() * 0.3;
    const revenue = base * weekendFactor * trendFactor * randomFactor;
    const occupancy = 65 + Math.random() * 25;
    const adr = 380 + Math.random() * 100;
    return {
      date,
      revenue: Math.round(revenue),
      occupancy: Math.round(occupancy * 10) / 10,
      adr: Math.round(adr * 10) / 10,
      revpar: Math.round((occupancy / 100) * adr * 10) / 10,
    };
  }),

  roomTypes: [
    { name: '标准大床房', count: 480, revenue: 3200000, occupancy: 82.3, adr: 328 },
    { name: '标准双床房', count: 360, revenue: 2680000, occupancy: 76.8, adr: 358 },
    { name: '豪华大床房', count: 220, revenue: 2100000, occupancy: 74.5, adr: 488 },
    { name: '行政套房', count: 120, revenue: 1850000, occupancy: 68.2, adr: 688 },
    { name: '总统套房', count: 24, revenue: 850000, occupancy: 45.6, adr: 1288 },
    { name: '家庭房', count: 96, revenue: 1200000, occupancy: 71.4, adr: 428 },
  ],

  channels: [
    { name: '携程', orders: 12850, revenue: 5120000, customerAcquisitionCost: 85, conversionRate: 12.5, avgOrderValue: 398 },
    { name: '美团', orders: 9680, revenue: 3520000, customerAcquisitionCost: 68, conversionRate: 15.2, avgOrderValue: 364 },
    { name: '飞猪', orders: 4320, revenue: 1680000, customerAcquisitionCost: 72, conversionRate: 10.8, avgOrderValue: 389 },
    { name: '线下直订', orders: 5860, revenue: 2450000, customerAcquisitionCost: 15, conversionRate: 85.0, avgOrderValue: 418 },
    { name: '会员渠道', orders: 4120, revenue: 1720000, customerAcquisitionCost: 22, conversionRate: 45.0, avgOrderValue: 417 },
    { name: '企业协议', orders: 2580, revenue: 1180000, customerAcquisitionCost: 35, conversionRate: 68.0, avgOrderValue: 457 },
  ],

  customerSegments: [
    { type: '商务客', count: 18560, revenue: 7280000, avgConsumption: 392, nights: 2.3 },
    { type: '旅游客', count: 12480, revenue: 4680000, avgConsumption: 375, nights: 1.8 },
    { type: '团体客', count: 3200, revenue: 1860000, avgConsumption: 581, nights: 3.2 },
    { type: '会员客', count: 8650, revenue: 3520000, avgConsumption: 407, nights: 2.6 },
    { type: '协议客', count: 2180, revenue: 980000, avgConsumption: 449, nights: 2.1 },
  ],

  consumptionLevels: [
    { level: '高消费', count: 4850, proportion: 14.2 },
    { level: '中高消费', count: 8620, proportion: 25.3 },
    { level: '中等消费', count: 12580, proportion: 36.9 },
    { level: '中低消费', count: 5420, proportion: 15.9 },
    { level: '低消费', count: 2600, proportion: 7.6 },
  ],

  churnData: [
    { level: '高风险流失', count: 1280, proportion: 4.2 },
    { level: '中风险流失', count: 3560, proportion: 11.8 },
    { level: '低风险流失', count: 5840, proportion: 19.3 },
    { level: '活跃用户', count: 12480, proportion: 41.3 },
    { level: '沉睡用户', count: 7020, proportion: 23.2 },
  ],

  costBreakdown: [
    { category: '人力成本', amount: 3250000, proportion: 37.1 },
    { category: '能耗成本', amount: 1280000, proportion: 14.6 },
    { category: '布草洗涤', amount: 680000, proportion: 7.8 },
    { category: '易耗品', amount: 520000, proportion: 5.9 },
    { category: '渠道佣金', amount: 1850000, proportion: 21.1 },
    { category: '维护维修', amount: 480000, proportion: 5.5 },
    { category: '营销费用', amount: 420000, proportion: 4.8 },
    { category: '其他', amount: 270000, proportion: 3.1 },
  ],

  storeProfits: [
    { name: '上海陆家嘴店', revenue: 2580000, cost: 1680000, profit: 900000, profitRate: 34.9, type: '商务酒店' },
    { name: '北京国贸店', revenue: 2350000, cost: 1580000, profit: 770000, profitRate: 32.8, type: '商务酒店' },
    { name: '杭州西湖店', revenue: 1920000, cost: 1250000, profit: 670000, profitRate: 34.9, type: '精品民宿' },
    { name: '三亚亚龙湾店', revenue: 2180000, cost: 1520000, profit: 660000, profitRate: 30.3, type: '度假酒店' },
    { name: '深圳福田店', revenue: 1850000, cost: 1280000, profit: 570000, profitRate: 30.8, type: '商务酒店' },
    { name: '成都春熙路店', revenue: 1520000, cost: 1050000, profit: 470000, profitRate: 30.9, type: '商务酒店' },
    { name: '丽江古城店', revenue: 880000, cost: 650000, profit: 230000, profitRate: 26.1, type: '精品民宿' },
    { name: '桂林阳朔店', revenue: 720000, cost: 580000, profit: 140000, profitRate: 19.4, type: '度假酒店' },
  ],

  alerts: [
    { id: '1', type: 'danger', title: '出租率严重偏低', content: '桂林阳朔店近7日平均出租率仅42.3%，低于阈值60%', time: '10分钟前', store: '桂林阳朔店', metric: '出租率', value: '42.3%', threshold: '60%' },
    { id: '2', type: 'danger', title: '渠道佣金暴涨', content: '携程渠道佣金环比上涨28.5%，超出预警阈值', time: '25分钟前', store: '全集团', metric: '渠道佣金', value: '+28.5%', threshold: '+15%' },
    { id: '3', type: 'warning', title: '能耗成本异常', content: '北京国贸店本月能耗成本环比上升18.2%', time: '1小时前', store: '北京国贸店', metric: '能耗成本', value: '+18.2%', threshold: '+10%' },
    { id: '4', type: 'warning', title: '会员流失加剧', content: '本月高流失风险会员新增328人，环比上升15%', time: '2小时前', store: '全集团', metric: '流失会员', value: '328人', threshold: '280人' },
    { id: '5', type: 'warning', title: 'RevPAR下滑', content: '丽江古城店本周RevPAR同比下降8.6%', time: '3小时前', store: '丽江古城店', metric: 'RevPAR', value: '-8.6%', threshold: '-5%' },
    { id: '6', type: 'info', title: '单店营收创新高', content: '三亚亚龙湾店单日营收突破86万，创历史新高', time: '5小时前', store: '三亚亚龙湾店', metric: '单日营收', value: '86万', threshold: '-' },
    { id: '7', type: 'info', title: '会员增长达标', content: '本月新增会员2,856人，超额完成月度目标', time: '8小时前', store: '全集团', metric: '新增会员', value: '2,856人', threshold: '2,500人' },
  ],

  stores: [
    { id: '1', name: '上海陆家嘴店', type: '商务酒店', city: '上海', rooms: 280, occupancy: 85.2, revenue: 2580000, profitRate: 34.9, lng: 121.5, lat: 31.23 },
    { id: '2', name: '北京国贸店', type: '商务酒店', city: '北京', rooms: 260, occupancy: 82.6, revenue: 2350000, profitRate: 32.8, lng: 116.46, lat: 39.92 },
    { id: '3', name: '深圳福田店', type: '商务酒店', city: '深圳', rooms: 220, occupancy: 79.8, revenue: 1850000, profitRate: 30.8, lng: 114.05, lat: 22.55 },
    { id: '4', name: '广州天河店', type: '商务酒店', city: '广州', rooms: 200, occupancy: 77.3, revenue: 1620000, profitRate: 29.5, lng: 113.32, lat: 23.12 },
    { id: '5', name: '成都春熙路店', type: '商务酒店', city: '成都', rooms: 180, occupancy: 75.4, revenue: 1520000, profitRate: 30.9, lng: 104.06, lat: 30.67 },
    { id: '6', name: '杭州西湖店', type: '精品民宿', city: '杭州', rooms: 68, occupancy: 81.2, revenue: 1920000, profitRate: 34.9, lng: 120.15, lat: 30.27 },
    { id: '7', name: '丽江古城店', type: '精品民宿', city: '丽江', rooms: 42, occupancy: 62.5, revenue: 880000, profitRate: 26.1, lng: 100.23, lat: 26.87 },
    { id: '8', name: '苏州平江路店', type: '精品民宿', city: '苏州', rooms: 36, occupancy: 74.8, revenue: 720000, profitRate: 28.3, lng: 120.62, lat: 31.32 },
    { id: '9', name: '三亚亚龙湾店', type: '度假酒店', city: '三亚', rooms: 320, occupancy: 72.1, revenue: 2180000, profitRate: 30.3, lng: 109.74, lat: 18.24 },
    { id: '10', name: '桂林阳朔店', type: '度假酒店', city: '桂林', rooms: 150, occupancy: 42.3, revenue: 720000, profitRate: 19.4, lng: 110.49, lat: 24.78 },
    { id: '11', name: '大理洱海店', type: '度假酒店', city: '大理', rooms: 120, occupancy: 68.5, revenue: 980000, profitRate: 27.8, lng: 100.23, lat: 25.6 },
    { id: '12', name: '厦门鼓浪屿店', type: '精品民宿', city: '厦门', rooms: 48, occupancy: 76.2, revenue: 860000, profitRate: 31.2, lng: 118.06, lat: 24.45 },
  ],

  summaryStats: {
    totalStores: 12,
    totalRooms: 1924,
    totalMembers: 128560,
    todayCheckins: 1286,
  },
};
