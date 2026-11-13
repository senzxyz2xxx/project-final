export type SystemTabKey = 'overview' | 'warroom' | 'finance' | 'attendance' | 'vms' | 'hr' | 'crm' | 'cms';
export type UserRole = 'user' | 'admin' | 'developer';

export type SiteKey = 'all' | 'hq' | 'muangthong' | 'phuket' | 'chiangmai';

export interface SiteOption {
  key: SiteKey;
  label: string;
  short: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  org: string;
  role: UserRole;
  status: 'active' | 'inactive';
  allowedSites: SiteKey[];
  allowedSystems: SystemTabKey[];
}

export interface UserPermissions {
  allowedSites: SiteKey[];
  allowedSystems: SystemTabKey[];
}

export interface KPICard {
  id: string;
  label: string;
  value: string;
  badge: string;
  arrow: '↑' | '↓';
  sub: string;
  isGreen: boolean;
}

export interface ChartDayData {
  day: string;
  date: string;
  sales: number;
  returns: number;
  salesFormatted: string;
}

export interface FunnelStage {
  name: string;
  value: number;
  percentage: number;
}

export interface TrafficSourceItem {
  name: string;
  count: number;
  color: string;
  widthPercent: number;
}

export interface RegionRow {
  region: string;
  orders: number;
  trend: '↑' | '↓';
  isUp: boolean;
  revenue: string;
}

export interface DashboardSystemData {
  key: SystemTabKey;
  brand: string;
  title: string;
  subtitle: string;
  kpis: [KPICard, KPICard, KPICard, KPICard, KPICard];
  chart: {
    title: string;
    sub: string;
    legend1: string;
    legendVal1: string;
    legendBadge1: string;
    legend2: string;
    legendVal2: string;
    legendBadge2: string;
    tooltipDay: string;
    tooltipTime: string;
    tooltipVal: string;
    days: ChartDayData[];
  };
  funnel: {
    title: string;
    sub: string;
    conversionRate: string;
    conversionBadge: string;
    stages: FunnelStage[];
  };
  sessions: {
    title: string;
    uniqueUsers: string;
    uniqueLabel: string;
    totalSessions: string;
    totalLabel: string;
    gaugePercentage: number;
  };
  traffic: {
    title: string;
    spend: string;
    cpa: string;
    impressions: string;
    clicks: string;
    sources: TrafficSourceItem[];
  };
  regions: {
    title: string;
    rows: RegionRow[];
  };
}
