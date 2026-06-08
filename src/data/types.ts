export interface KpiData {
  occupancy: number;
  adr: number;
  revpar: number;
  revenue: number;
  cost: number;
  profit: number;
  occupancyYoY: number;
  adrYoY: number;
  revparYoY: number;
  revenueYoY: number;
  costYoY: number;
  profitYoY: number;
  occupancyMoM: number;
  adrMoM: number;
  revparMoM: number;
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
  occupancy: number;
  adr: number;
  revpar: number;
}

export interface RoomTypeData {
  name: string;
  count: number;
  revenue: number;
  occupancy: number;
  adr: number;
}

export interface ChannelData {
  name: string;
  orders: number;
  revenue: number;
  customerAcquisitionCost: number;
  conversionRate: number;
  avgOrderValue: number;
}

export interface CustomerSegment {
  type: string;
  count: number;
  revenue: number;
  avgConsumption: number;
  nights: number;
}

export interface ConsumptionLevel {
  level: string;
  count: number;
  proportion: number;
}

export interface ChurnData {
  level: string;
  count: number;
  proportion: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  proportion: number;
}

export interface StoreProfit {
  name: string;
  revenue: number;
  cost: number;
  profit: number;
  profitRate: number;
  type: string;
}

export interface AlertItem {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  content: string;
  time: string;
  store: string;
  metric: string;
  value: string;
  threshold: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  type: '商务酒店' | '精品民宿' | '度假酒店';
  city: string;
  rooms: number;
  occupancy: number;
  revenue: number;
  profitRate: number;
  lng: number;
  lat: number;
}

export interface MemberLevelData {
  level: string;
  count: number;
  proportion: number;
  avgPoints: number;
  revenueContribution: number;
}

export interface PointsFlowItem {
  date: string;
  earned: number;
  spent: number;
  expired: number;
}

export interface CouponTypeData {
  name: string;
  totalIssued: number;
  used: number;
  expired: number;
  usageRate: number;
  avgDiscount: number;
  driveRevenue: number;
}

export interface RightsUsageData {
  name: string;
  totalCount: number;
  usedCount: number;
  usageRate: number;
  satisfaction: number;
}

export interface MemberActivityEffect {
  activityName: string;
  newMembers: number;
  rePurchaseRate: number;
  avgOrderValue: number;
  revenueIncrease: number;
  roi: number;
}

export interface MemberChurnTrendItem {
  month: string;
  highLevelChurn: number;
  midLevelChurn: number;
  lowLevelChurn: number;
}

export interface MemberBenefitData {
  memberLevels: MemberLevelData[];
  pointsFlow: PointsFlowItem[];
  couponTypes: CouponTypeData[];
  rightsUsage: RightsUsageData[];
  activityEffects: MemberActivityEffect[];
  churnTrend: MemberChurnTrendItem[];
  kpi: {
    totalMembers: number;
    activeMembers: number;
    highLevelRate: number;
    avgPointsPerMember: number;
    couponUsageRate: number;
    memberRevenueContribution: number;
    churnRate: number;
    pointsTurnoverRate: number;
  };
}

export interface CompetitorHotel {
  id: string;
  name: string;
  star: number;
  distance: number;
  city: string;
}

export interface RoomTypePrice {
  roomType: string;
  ourPrice: number;
  competitorPrices: { competitor: string; price: number }[];
  avgMarketPrice: number;
  priceDiff: number;
  priceDiffPercent: number;
}

export interface PriceTrendItem {
  date: string;
  ourPrice: number;
  competitorAvgPrice: number;
  marketMinPrice: number;
  marketMaxPrice: number;
}

export interface ChannelPriceCompare {
  channel: string;
  ourPrice: number;
  avgMarketPrice: number;
  priceDiff: number;
  priceDiffPercent: number;
  priceRank: number;
  totalCompetitors: number;
}

export interface PriceAlertItem {
  id: string;
  type: 'overpriced' | 'underpriced' | 'competitor_change';
  roomType: string;
  ourPrice: number;
  marketPrice: number;
  diffPercent: number;
  competitor: string;
  time: string;
  store: string;
}

export interface CompetitorActionItem {
  id: string;
  competitor: string;
  action: 'price_up' | 'price_down' | 'promotion' | 'new_room';
  detail: string;
  priceChange?: number;
  time: string;
  impact: 'high' | 'medium' | 'low';
}

export interface ChannelPriceData {
  competitors: CompetitorHotel[];
  roomTypePrices: RoomTypePrice[];
  priceTrend: PriceTrendItem[];
  channelCompare: ChannelPriceCompare[];
  priceAlerts: PriceAlertItem[];
  competitorActions: CompetitorActionItem[];
  kpi: {
    avgPriceIndex: number;
    priceCompetitiveness: number;
    alertCount: number;
    avgPriceDiff: number;
    belowMarketRooms: number;
    competitorCount: number;
  };
}

export interface EnergyCategoryItem {
  category: string;
  consumption: number;
  cost: number;
  unitPrice: number;
  proportion: number;
  yoyChange: number;
}

export interface EnergyZoneItem {
  zone: string;
  consumption: number;
  cost: number;
  proportion: number;
  area: number;
}

export interface EnergyFloorItem {
  floor: string;
  consumption: number;
  cost: number;
  rooms: number;
  perRoomConsumption: number;
}

export interface EnergyTimeItem {
  hour: string;
  consumption: number;
  cost: number;
  occupancyRate: number;
}

export interface EnergySeasonItem {
  month: string;
  consumption: number;
  cost: number;
  occupancyRate: number;
  perRoomConsumption: number;
}

export interface EnergyAnomalyItem {
  id: string;
  zone: string;
  type: 'high_consumption' | 'abnormal_spike' | 'equipment_fault';
  description: string;
  excessPercent: number;
  estimatedLoss: number;
  time: string;
  status: 'pending' | 'processing' | 'resolved';
}

export interface EnergySavingSuggestion {
  id: string;
  category: string;
  title: string;
  description: string;
  expectedSaving: number;
  investmentCost: number;
  paybackPeriod: number;
  priority: 'high' | 'medium' | 'low';
}

export interface EnergyAnalysisData {
  categories: EnergyCategoryItem[];
  zones: EnergyZoneItem[];
  floors: EnergyFloorItem[];
  hourlyData: EnergyTimeItem[];
  seasonalData: EnergySeasonItem[];
  anomalies: EnergyAnomalyItem[];
  savingSuggestions: EnergySavingSuggestion[];
  kpi: {
    totalEnergyCost: number;
    perRoomEnergyCost: number;
    energyCostPerRevenue: number;
    energyConsumptionYoY: number;
    energySavingAmount: number;
    energySavingRate: number;
    anomalyCount: number;
    peakValleyDiff: number;
  };
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  createTime: string;
  isSystem: boolean;
  metrics: string[];
  dimensions: string[];
}

export interface ScheduledReport {
  id: string;
  templateId: string;
  templateName: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  sendTime: string;
  recipients: string[];
  formats: string[];
  status: 'active' | 'paused';
  lastSendTime?: string;
}

export interface UserRole {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface DashboardData {
  kpi: KpiData;
  revenueTrend: RevenueTrendItem[];
  roomTypes: RoomTypeData[];
  channels: ChannelData[];
  customerSegments: CustomerSegment[];
  consumptionLevels: ConsumptionLevel[];
  churnData: ChurnData[];
  costBreakdown: CostBreakdown[];
  storeProfits: StoreProfit[];
  alerts: AlertItem[];
  stores: StoreInfo[];
  summaryStats: {
    totalStores: number;
    totalRooms: number;
    totalMembers: number;
    todayCheckins: number;
  };
  memberBenefit: MemberBenefitData;
  channelPrice: ChannelPriceData;
  energyAnalysis: EnergyAnalysisData;
  reportTemplates: ReportTemplate[];
  scheduledReports: ScheduledReport[];
  userRoles: UserRole[];
}
