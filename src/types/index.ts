export interface DataPoint {
  timestamp: string;
  electricity: number; // kW
  water: number; // GPM
  electricityBaseline: number;
  waterBaseline: number;
}

export interface Alert {
  id: string;
  type: 'water' | 'electricity';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  suggestedAction?: string;
  costImpact?: number;
  likelyCause?: string;
}

export interface Insight {
  id: string;
  type: 'tip' | 'warning' | 'info';
  title: string;
  description: string;
  confidence: number; // 0-100
  potentialSavings?: number;
  icon: 'lightbulb' | 'alert-triangle' | 'info' | 'thermometer' | 'droplet' | 'zap';
}

export interface HomeSettings {
  squareFootage: number;
  occupancy: number;
  appliances: string[];
  notifyHighAlerts: boolean;
  notifyMediumAlerts: boolean;
  notifyLowAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReport: boolean;
}

export type StatusLevel = 'normal' | 'warning' | 'danger';

export interface DashboardStats {
  todayCost: number;
  monthCost: number;
  savingsVsLastMonth: number;
  savingsPercent: number;
  carbonSaved: number;
  currentElectricity: number;
  currentWater: number;
}

