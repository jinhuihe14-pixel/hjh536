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
}
