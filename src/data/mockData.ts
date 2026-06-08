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

  memberBenefit: {
    memberLevels: [
      { level: '钻石会员', count: 3280, proportion: 2.55, avgPoints: 28650, revenueContribution: 18.5 },
      { level: '铂金会员', count: 12560, proportion: 9.77, avgPoints: 15280, revenueContribution: 28.3 },
      { level: '黄金会员', count: 28650, proportion: 22.29, avgPoints: 8650, revenueContribution: 25.6 },
      { level: '白银会员', count: 45280, proportion: 35.22, avgPoints: 3280, revenueContribution: 18.2 },
      { level: '普通会员', count: 38790, proportion: 30.17, avgPoints: 580, revenueContribution: 9.4 },
    ],
    pointsFlow: dates.map((date, idx) => {
      const earnedBase = 580000;
      const spentBase = 320000;
      const trendFactor = 1 + idx * 0.003;
      return {
        date,
        earned: Math.round(earnedBase * trendFactor * (0.9 + Math.random() * 0.2)),
        spent: Math.round(spentBase * trendFactor * (0.85 + Math.random() * 0.3)),
        expired: Math.round(25000 * (0.8 + Math.random() * 0.4)),
      };
    }),
    couponTypes: [
      { name: '满500减80', totalIssued: 28650, used: 12580, expired: 4520, usageRate: 43.9, avgDiscount: 72, driveRevenue: 6280000 },
      { name: '满300减50', totalIssued: 52300, used: 22680, expired: 8560, usageRate: 43.4, avgDiscount: 45, driveRevenue: 8560000 },
      { name: '首住立减100', totalIssued: 15800, used: 6850, expired: 2340, usageRate: 43.4, avgDiscount: 100, driveRevenue: 3280000 },
      { name: '生日特惠券', totalIssued: 8650, used: 4820, expired: 1280, usageRate: 55.7, avgDiscount: 128, driveRevenue: 2850000 },
      { name: '连住3晚9折', totalIssued: 12500, used: 3680, expired: 4520, usageRate: 29.4, avgDiscount: 156, driveRevenue: 4120000 },
      { name: '房型升级券', totalIssued: 9800, used: 2560, expired: 3850, usageRate: 26.1, avgDiscount: 88, driveRevenue: 1560000 },
    ],
    rightsUsage: [
      { name: '免费早餐', totalCount: 58650, usedCount: 32800, usageRate: 55.9, satisfaction: 92.5 },
      { name: '延迟退房', totalCount: 45280, usedCount: 28650, usageRate: 63.3, satisfaction: 88.3 },
      { name: '免费升级', totalCount: 28650, usedCount: 12580, usageRate: 43.9, satisfaction: 95.2 },
      { name: '专属客服', totalCount: 35280, usedCount: 8650, usageRate: 24.5, satisfaction: 82.6 },
      { name: '积分加倍', totalCount: 25600, usedCount: 18560, usageRate: 72.5, satisfaction: 90.8 },
      { name: '机场接送', totalCount: 12580, usedCount: 3280, usageRate: 26.1, satisfaction: 78.5 },
      { name: '免费停车', totalCount: 42650, usedCount: 22800, usageRate: 53.5, satisfaction: 85.6 },
      { name: '迷你吧免费', totalCount: 18650, usedCount: 6580, usageRate: 35.3, satisfaction: 72.3 },
    ],
    activityEffects: [
      { activityName: '周年庆大促', newMembers: 5280, rePurchaseRate: 38.5, avgOrderValue: 486, revenueIncrease: 2680000, roi: 3.8 },
      { activityName: '双11特惠', newMembers: 8650, rePurchaseRate: 32.8, avgOrderValue: 412, revenueIncrease: 4520000, roi: 4.2 },
      { activityName: '会员日专享', newMembers: 3280, rePurchaseRate: 45.2, avgOrderValue: 528, revenueIncrease: 1850000, roi: 2.9 },
      { activityName: '邀请好友', newMembers: 6580, rePurchaseRate: 28.6, avgOrderValue: 385, revenueIncrease: 2180000, roi: 3.5 },
      { activityName: '生日礼遇', newMembers: 2360, rePurchaseRate: 52.3, avgOrderValue: 568, revenueIncrease: 1280000, roi: 2.6 },
    ],
    churnTrend: [
      { month: '1月', highLevelChurn: 128, midLevelChurn: 356, lowLevelChurn: 856 },
      { month: '2月', highLevelChurn: 142, midLevelChurn: 382, lowLevelChurn: 920 },
      { month: '3月', highLevelChurn: 115, midLevelChurn: 325, lowLevelChurn: 780 },
      { month: '4月', highLevelChurn: 136, midLevelChurn: 368, lowLevelChurn: 895 },
      { month: '5月', highLevelChurn: 158, midLevelChurn: 412, lowLevelChurn: 1020 },
      { month: '6月', highLevelChurn: 148, midLevelChurn: 395, lowLevelChurn: 968 },
    ],
    kpi: {
      totalMembers: 128560,
      activeMembers: 72680,
      highLevelRate: 12.3,
      avgPointsPerMember: 5680,
      couponUsageRate: 41.8,
      memberRevenueContribution: 38.5,
      churnRate: 5.8,
      pointsTurnoverRate: 62.3,
    },
  },

  channelPrice: {
    competitors: [
      { id: 'c1', name: '希尔顿酒店', star: 5, distance: 0.8, city: '上海' },
      { id: 'c2', name: '万豪酒店', star: 5, distance: 1.2, city: '上海' },
      { id: 'c3', name: '洲际酒店', star: 5, distance: 1.5, city: '上海' },
      { id: 'c4', name: '如家精选', star: 4, distance: 0.5, city: '上海' },
      { id: 'c5', name: '汉庭优佳', star: 3, distance: 0.3, city: '上海' },
    ],
    roomTypePrices: [
      {
        roomType: '标准大床房',
        ourPrice: 428,
        competitorPrices: [
          { competitor: '希尔顿酒店', price: 568 },
          { competitor: '万豪酒店', price: 528 },
          { competitor: '洲际酒店', price: 548 },
          { competitor: '如家精选', price: 388 },
          { competitor: '汉庭优佳', price: 298 },
        ],
        avgMarketPrice: 466,
        priceDiff: -38,
        priceDiffPercent: -8.2,
      },
      {
        roomType: '标准双床房',
        ourPrice: 458,
        competitorPrices: [
          { competitor: '希尔顿酒店', price: 628 },
          { competitor: '万豪酒店', price: 588 },
          { competitor: '洲际酒店', price: 598 },
          { competitor: '如家精选', price: 418 },
          { competitor: '汉庭优佳', price: 328 },
        ],
        avgMarketPrice: 512,
        priceDiff: -54,
        priceDiffPercent: -10.5,
      },
      {
        roomType: '豪华大床房',
        ourPrice: 588,
        competitorPrices: [
          { competitor: '希尔顿酒店', price: 788 },
          { competitor: '万豪酒店', price: 728 },
          { competitor: '洲际酒店', price: 758 },
          { competitor: '如家精选', price: 528 },
          { competitor: '汉庭优佳', price: 428 },
        ],
        avgMarketPrice: 646,
        priceDiff: -58,
        priceDiffPercent: -9.0,
      },
      {
        roomType: '行政套房',
        ourPrice: 888,
        competitorPrices: [
          { competitor: '希尔顿酒店', price: 1288 },
          { competitor: '万豪酒店', price: 1188 },
          { competitor: '洲际酒店', price: 1228 },
          { competitor: '如家精选', price: 688 },
          { competitor: '汉庭优佳', price: 568 },
        ],
        avgMarketPrice: 992,
        priceDiff: -104,
        priceDiffPercent: -10.5,
      },
      {
        roomType: '总统套房',
        ourPrice: 1888,
        competitorPrices: [
          { competitor: '希尔顿酒店', price: 2888 },
          { competitor: '万豪酒店', price: 2688 },
          { competitor: '洲际酒店', price: 2788 },
          { competitor: '如家精选', price: 1288 },
          { competitor: '汉庭优佳', price: 988 },
        ],
        avgMarketPrice: 2128,
        priceDiff: -240,
        priceDiffPercent: -11.3,
      },
    ],
    priceTrend: dates.slice(0, 15).map((date, idx) => {
      const base = 428;
      const trend = 1 + idx * 0.005;
      const ourVariance = (Math.random() - 0.5) * 30;
      const marketVariance = (Math.random() - 0.5) * 40;
      return {
        date,
        ourPrice: Math.round(base * trend + ourVariance),
        competitorAvgPrice: Math.round(base * 1.1 * trend + marketVariance),
        marketMinPrice: Math.round(base * 0.7 * trend + (Math.random() - 0.5) * 20),
        marketMaxPrice: Math.round(base * 1.5 * trend + (Math.random() - 0.5) * 50),
      };
    }),
    channelCompare: [
      { channel: '携程', ourPrice: 428, avgMarketPrice: 466, priceDiff: -38, priceDiffPercent: -8.2, priceRank: 3, totalCompetitors: 15 },
      { channel: '美团', ourPrice: 418, avgMarketPrice: 458, priceDiff: -40, priceDiffPercent: -8.7, priceRank: 2, totalCompetitors: 15 },
      { channel: '飞猪', ourPrice: 432, avgMarketPrice: 472, priceDiff: -40, priceDiffPercent: -8.5, priceRank: 4, totalCompetitors: 15 },
      { channel: '官网', ourPrice: 408, avgMarketPrice: 466, priceDiff: -58, priceDiffPercent: -12.4, priceRank: 1, totalCompetitors: 15 },
      { channel: '线下', ourPrice: 458, avgMarketPrice: 466, priceDiff: -8, priceDiffPercent: -1.7, priceRank: 7, totalCompetitors: 15 },
    ],
    priceAlerts: [
      { id: 'pa1', type: 'overpriced', roomType: '总统套房', ourPrice: 1888, marketPrice: 1680, diffPercent: 12.4, competitor: '万豪酒店', time: '30分钟前', store: '上海陆家嘴店' },
      { id: 'pa2', type: 'underpriced', roomType: '标准大床房', ourPrice: 368, marketPrice: 420, diffPercent: -12.4, competitor: '希尔顿酒店', time: '1小时前', store: '北京国贸店' },
      { id: 'pa3', type: 'competitor_change', roomType: '豪华大床房', ourPrice: 588, marketPrice: 568, diffPercent: 3.5, competitor: '希尔顿酒店', time: '2小时前', store: '深圳福田店' },
      { id: 'pa4', type: 'overpriced', roomType: '行政套房', ourPrice: 888, marketPrice: 798, diffPercent: 11.3, competitor: '洲际酒店', time: '3小时前', store: '广州天河店' },
      { id: 'pa5', type: 'competitor_change', roomType: '标准双床房', ourPrice: 458, marketPrice: 488, diffPercent: -6.1, competitor: '万豪酒店', time: '4小时前', store: '杭州西湖店' },
    ],
    competitorActions: [
      { id: 'ca1', competitor: '希尔顿酒店', action: 'price_down', detail: '标准大床房降价12%', priceChange: -58, time: '1小时前', impact: 'high' },
      { id: 'ca2', competitor: '万豪酒店', action: 'promotion', detail: '推出连住3晚8折活动', time: '2小时前', impact: 'medium' },
      { id: 'ca3', competitor: '洲际酒店', action: 'price_up', detail: '行政套房涨价8%', priceChange: 88, time: '3小时前', impact: 'low' },
      { id: 'ca4', competitor: '如家精选', action: 'new_room', detail: '新增家庭房型', time: '5小时前', impact: 'medium' },
      { id: 'ca5', competitor: '汉庭优佳', action: 'promotion', detail: '新用户首单立减100', time: '6小时前', impact: 'low' },
    ],
    kpi: {
      avgPriceIndex: 92.5,
      priceCompetitiveness: 78.6,
      alertCount: 12,
      avgPriceDiff: -6.8,
      belowMarketRooms: 4,
      competitorCount: 5,
    },
  },

  energyAnalysis: {
    categories: [
      { category: '电力', consumption: 2580000, cost: 1850000, unitPrice: 0.72, proportion: 56.8, yoyChange: 3.2 },
      { category: '自来水', consumption: 85000, cost: 420000, unitPrice: 4.94, proportion: 12.9, yoyChange: -1.5 },
      { category: '燃气', consumption: 128000, cost: 520000, unitPrice: 4.06, proportion: 16.0, yoyChange: 5.8 },
      { category: '布草洗涤', consumption: 52000, cost: 280000, unitPrice: 5.38, proportion: 8.6, yoyChange: 2.1 },
      { category: '电梯能耗', consumption: 185000, cost: 180000, unitPrice: 0.97, proportion: 5.5, yoyChange: 4.2 },
    ],
    zones: [
      { zone: '客房区域', consumption: 1280000, cost: 920000, proportion: 42.5, area: 12000 },
      { zone: '公共区域', consumption: 580000, cost: 420000, proportion: 19.4, area: 3500 },
      { zone: '餐饮区域', consumption: 480000, cost: 350000, proportion: 15.9, area: 2800 },
      { zone: '康体区域', consumption: 280000, cost: 200000, proportion: 9.3, area: 1800 },
      { zone: '办公区域', consumption: 180000, cost: 130000, proportion: 6.0, area: 1500 },
      { zone: '后勤区域', consumption: 200000, cost: 150000, proportion: 6.6, area: 1200 },
    ],
    floors: [
      { floor: '1F-大堂', consumption: 180000, cost: 130000, rooms: 0, perRoomConsumption: 0 },
      { floor: '2F-餐饮', consumption: 320000, cost: 230000, rooms: 0, perRoomConsumption: 0 },
      { floor: '3F-康体', consumption: 180000, cost: 130000, rooms: 0, perRoomConsumption: 0 },
      { floor: '5-10F客房', consumption: 520000, cost: 375000, rooms: 120, perRoomConsumption: 4333 },
      { floor: '11-20F客房', consumption: 580000, cost: 415000, rooms: 160, perRoomConsumption: 3625 },
      { floor: '21-25F行政', consumption: 280000, cost: 200000, rooms: 80, perRoomConsumption: 3500 },
    ],
    hourlyData: Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0') + ':00';
      const isPeak = i >= 18 && i <= 22;
      const isValley = i >= 2 && i <= 6;
      const baseConsumption = isPeak ? 180000 : isValley ? 60000 : 120000;
      const baseOccupancy = isPeak ? 85 : isValley ? 60 : 75;
      return {
        hour,
        consumption: Math.round(baseConsumption * (0.9 + Math.random() * 0.2)),
        cost: Math.round(baseConsumption * 0.72 * (isValley ? 0.5 : isPeak ? 1.2 : 1)),
        occupancyRate: Math.round(baseOccupancy + (Math.random() - 0.5) * 10),
      };
    }),
    seasonalData: [
      { month: '1月', consumption: 2280000, cost: 1650000, occupancyRate: 62.5, perRoomConsumption: 3850 },
      { month: '2月', consumption: 2180000, cost: 1580000, occupancyRate: 58.3, perRoomConsumption: 3980 },
      { month: '3月', consumption: 2480000, cost: 1780000, occupancyRate: 72.1, perRoomConsumption: 3440 },
      { month: '4月', consumption: 2680000, cost: 1920000, occupancyRate: 78.5, perRoomConsumption: 3410 },
      { month: '5月', consumption: 2850000, cost: 2050000, occupancyRate: 82.3, perRoomConsumption: 3460 },
      { month: '6月', consumption: 3280000, cost: 2380000, occupancyRate: 85.6, perRoomConsumption: 3830 },
      { month: '7月', consumption: 3680000, cost: 2680000, occupancyRate: 88.2, perRoomConsumption: 4170 },
      { month: '8月', consumption: 3580000, cost: 2580000, occupancyRate: 86.5, perRoomConsumption: 4140 },
      { month: '9月', consumption: 2980000, cost: 2150000, occupancyRate: 79.8, perRoomConsumption: 3730 },
      { month: '10月', consumption: 3180000, cost: 2280000, occupancyRate: 83.2, perRoomConsumption: 3820 },
      { month: '11月', consumption: 2580000, cost: 1850000, occupancyRate: 71.5, perRoomConsumption: 3610 },
      { month: '12月', consumption: 2480000, cost: 1780000, occupancyRate: 68.3, perRoomConsumption: 3630 },
    ],
    anomalies: [
      { id: 'ea1', zone: '11-20F客房', type: 'high_consumption', description: '本月能耗超出同区域均值22%', excessPercent: 22.5, estimatedLoss: 28000, time: '3天前', status: 'pending' },
      { id: 'ea2', zone: '中央空调系统', type: 'equipment_fault', description: '1号冷水机组能效比下降15%', excessPercent: 15.0, estimatedLoss: 18000, time: '1天前', status: 'processing' },
      { id: 'ea3', zone: '地下停车场', type: 'abnormal_spike', description: '凌晨2-4点用电异常激增', excessPercent: 45.0, estimatedLoss: 8000, time: '5小时前', status: 'pending' },
      { id: 'ea4', zone: '餐饮区域', type: 'high_consumption', description: '厨房燃气消耗量超标准18%', excessPercent: 18.0, estimatedLoss: 12000, time: '2天前', status: 'resolved' },
      { id: 'ea5', zone: '康体区域', type: 'equipment_fault', description: '泳池加热系统效率异常', excessPercent: 25.0, estimatedLoss: 15000, time: '1周前', status: 'resolved' },
    ],
    savingSuggestions: [
      { id: 'ss1', category: '照明系统', title: 'LED灯具改造', description: '将公共区域传统灯具替换为LED智能照明系统，配备人体感应和亮度调节', expectedSaving: 280000, investmentCost: 450000, paybackPeriod: 1.6, priority: 'high' },
      { id: 'ss2', category: '空调系统', title: '中央空调变频改造', description: '对冷水机组进行变频改造，根据负荷自动调节运行频率', expectedSaving: 520000, investmentCost: 1200000, paybackPeriod: 2.3, priority: 'high' },
      { id: 'ss3', category: '热水系统', title: '空气源热泵替代', description: '用空气源热泵替代部分燃气热水炉，利用空气中的热能加热热水', expectedSaving: 180000, investmentCost: 380000, paybackPeriod: 2.1, priority: 'medium' },
      { id: 'ss4', category: '智能管控', title: '客房智能控电系统', description: '安装客房智能控制系统，实现插卡取电、无人自动断电等功能', expectedSaving: 150000, investmentCost: 280000, paybackPeriod: 1.9, priority: 'high' },
      { id: 'ss5', category: '水资源', title: '中水回用系统', description: '建设中水回用系统，将处理后的废水用于绿化和冲厕', expectedSaving: 80000, investmentCost: 320000, paybackPeriod: 4.0, priority: 'low' },
      { id: 'ss6', category: '电梯系统', title: '电梯能量回馈', description: '安装电梯能量回馈装置，将电梯下行时产生的电能回馈电网', expectedSaving: 65000, investmentCost: 150000, paybackPeriod: 2.3, priority: 'medium' },
    ],
    kpi: {
      totalEnergyCost: 3250000,
      perRoomEnergyCost: 128,
      energyCostPerRevenue: 8.6,
      energyConsumptionYoY: 3.2,
      energySavingAmount: 280000,
      energySavingRate: 7.9,
      anomalyCount: 5,
      peakValleyDiff: 32.5,
    },
  },

  reportTemplates: [
    { id: 'rt1', name: '每日经营日报', description: '包含核心KPI、营收、入住率等关键指标', category: '经营分析', creator: '系统', createTime: '2024-01-01', isSystem: true, metrics: ['营收', 'ADR', '出租率', 'RevPAR'], dimensions: ['日期', '门店'] },
    { id: 'rt2', name: '月度营收分析', description: '详细的月度营收拆解和同比环比分析', category: '经营分析', creator: '系统', createTime: '2024-01-01', isSystem: true, metrics: ['营收', '成本', '利润', '利润率'], dimensions: ['月份', '门店', '房型'] },
    { id: 'rt3', name: '渠道效果分析', description: '各OTA渠道的订单、营收、获客成本分析', category: '渠道分析', creator: '系统', createTime: '2024-01-01', isSystem: true, metrics: ['订单量', '营收', '获客成本', '转化率'], dimensions: ['渠道', '月份'] },
    { id: 'rt4', name: '会员权益报表', description: '会员等级分布、权益使用、积分流转分析', category: '会员分析', creator: '运营部', createTime: '2024-03-15', isSystem: false, metrics: ['会员数', '权益使用率', '积分获取', '积分消耗'], dimensions: ['会员等级', '月份'] },
    { id: 'rt5', name: '能耗成本月报', description: '水电气能耗分项统计及成本分析', category: '成本分析', creator: '工程部', createTime: '2024-02-20', isSystem: false, metrics: ['用电量', '用水量', '用气量', '能耗成本'], dimensions: ['月份', '区域', '楼层'] },
    { id: 'rt6', name: '竞对价格监控', description: '周边竞品酒店价格对比及价差分析', category: '市场分析', creator: '市场部', createTime: '2024-04-10', isSystem: false, metrics: ['本店价格', '竞品均价', '价差', '排名'], dimensions: ['房型', '渠道', '日期'] },
  ],

  scheduledReports: [
    { id: 'sr1', templateId: 'rt1', templateName: '每日经营日报', frequency: 'daily', sendTime: '09:00', recipients: ['总经理', '运营总监', '财务总监'], formats: ['PDF', 'Excel'], status: 'active', lastSendTime: '2024-06-08 09:00' },
    { id: 'sr2', templateId: 'rt2', templateName: '月度营收分析', frequency: 'monthly', sendTime: '01日 10:00', recipients: ['总经理', '财务总监', '各门店店长'], formats: ['PDF', 'Excel', 'PPT'], status: 'active', lastSendTime: '2024-06-01 10:00' },
    { id: 'sr3', templateId: 'rt3', templateName: '渠道效果分析', frequency: 'weekly', sendTime: '周一 09:30', recipients: ['渠道经理', '运营总监'], formats: ['Excel'], status: 'active', lastSendTime: '2024-06-03 09:30' },
    { id: 'sr4', templateId: 'rt4', templateName: '会员权益报表', frequency: 'monthly', sendTime: '05日 14:00', recipients: ['会员运营经理', '市场总监'], formats: ['PDF', 'Excel'], status: 'paused' },
  ],

  userRoles: [
    { id: 'role1', name: '集团管理员', code: 'admin', description: '拥有全部数据权限和系统管理权限', permissions: ['数据查看', '数据导出', '报表管理', '系统设置', '用户管理', '权限配置'], userCount: 3 },
    { id: 'role2', name: '运营总监', code: 'operation_director', description: '全域经营数据查看及报表管理权限', permissions: ['数据查看', '数据导出', '报表管理', '门店数据', '会员数据'], userCount: 2 },
    { id: 'role3', name: '财务经理', code: 'finance_manager', description: '财务相关数据查看及导出权限', permissions: ['数据查看', '数据导出', '财务数据', '成本数据'], userCount: 5 },
    { id: 'role4', name: '门店店长', code: 'store_manager', description: '仅可查看管辖门店的经营数据', permissions: ['数据查看', '门店数据'], userCount: 12 },
    { id: 'role5', name: '数据分析师', code: 'data_analyst', description: '数据只读+报表导出，支持自定义报表', permissions: ['数据查看', '数据导出', '报表管理', '自定义报表'], userCount: 8 },
    { id: 'role6', name: '数据只读', code: 'readonly', description: '仅可查看数据，无导出权限', permissions: ['数据查看'], userCount: 15 },
  ],
};
