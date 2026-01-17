import { DataPoint, Alert, Insight, HomeSettings, DashboardStats } from '../types';

// Generate realistic electricity usage (kW) - baseline 1.5-3 kW with variations
export const generateElectricityReading = (isAnomaly: boolean = false): number => {
  const baselineMin = 1.5;
  const baselineMax = 3.0;
  const baseline = baselineMin + Math.random() * (baselineMax - baselineMin);
  
  if (isAnomaly) {
    return baseline * (1.5 + Math.random() * 0.5); // 50-100% spike
  }
  
  // Small random variations (±10%)
  const variation = (Math.random() - 0.5) * 0.2;
  return Math.max(0.5, baseline * (1 + variation));
};

// Generate realistic water usage (GPM) - 0 most of the time, spikes to 2-3 GPM
export const generateWaterReading = (isAnomaly: boolean = false): number => {
  if (isAnomaly) {
    return 0.3 + Math.random() * 0.2; // Continuous leak
  }
  
  // 80% of the time, water is at 0
  if (Math.random() > 0.2) {
    return 0;
  }
  
  // Random spikes simulating fixtures
  return 1.5 + Math.random() * 2;
};

// Generate 24 hours of historical data
export const generateHistoricalData = (hours: number = 24): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourOfDay = timestamp.getHours();
    
    // Baseline varies by time of day
    const electricityBaseline = hourOfDay >= 6 && hourOfDay <= 22 ? 2.5 : 1.5;
    const waterBaseline = hourOfDay >= 6 && hourOfDay <= 22 ? 0.5 : 0;
    
    // Add some natural variation
    const electricityVariation = (Math.sin(i / 3) * 0.3) + (Math.random() - 0.5) * 0.4;
    const waterSpike = Math.random() > 0.85 ? 1.5 + Math.random() * 2 : 0;
    
    data.push({
      timestamp: timestamp.toISOString(),
      electricity: Math.max(0.5, electricityBaseline + electricityVariation),
      water: waterSpike,
      electricityBaseline,
      waterBaseline,
    });
  }
  
  return data;
};

// Generate new data point for real-time updates
export const generateNewDataPoint = (isAnomaly: boolean = false): DataPoint => {
  const now = new Date();
  const hourOfDay = now.getHours();
  
  const electricityBaseline = hourOfDay >= 6 && hourOfDay <= 22 ? 2.5 : 1.5;
  const waterBaseline = hourOfDay >= 6 && hourOfDay <= 22 ? 0.5 : 0;
  
  return {
    timestamp: now.toISOString(),
    electricity: generateElectricityReading(isAnomaly),
    water: generateWaterReading(isAnomaly),
    electricityBaseline,
    waterBaseline,
  };
};

// Initial mock alerts
export const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'water',
    severity: 'high',
    title: '🚨 Possible water leak detected',
    description: '0.3 GPM continuous flow for 3 hours - unusual for this time',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    resolved: false,
    suggestedAction: 'Check toilets, faucets, and outdoor spigots for running water. Consider shutting off main valve if leak is severe.',
    costImpact: 15.50,
    likelyCause: 'Toilet flapper valve or outdoor irrigation leak',
  },
  {
    id: '2',
    type: 'electricity',
    severity: 'medium',
    title: '⚡ Electricity spike detected',
    description: '60% above normal usage (5.2 kW vs 3.2 kW average)',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    resolved: false,
    suggestedAction: 'Check if HVAC is running longer than expected. Consider adjusting thermostat.',
    costImpact: 8.50,
    likelyCause: 'HVAC running longer due to extreme heat outside',
  },
  {
    id: '3',
    type: 'water',
    severity: 'low',
    title: '💧 Water usage 15% higher today',
    description: 'Normal for weekend patterns - longer showers detected',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    resolved: false,
    suggestedAction: 'No action needed - this appears to be normal weekend usage.',
    costImpact: 2.30,
  },
];

// Mock insights
export const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'HVAC Running Hot',
    description: 'Your HVAC ran 20% more this week due to the heat wave. This added approximately $8.50 to your electricity bill.',
    confidence: 92,
    potentialSavings: 8.50,
    icon: 'thermometer',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Possible Toilet Leak',
    description: 'Toilet may have a slow leak - 0.1 GPM detected during nighttime hours when no usage is expected.',
    confidence: 78,
    potentialSavings: 45.00,
    icon: 'droplet',
  },
  {
    id: '3',
    type: 'tip',
    title: 'Off-Peak Laundry Savings',
    description: 'Shift laundry to after 9 PM to take advantage of off-peak electricity rates. Save approximately $0.45 per load.',
    confidence: 95,
    potentialSavings: 18.00,
    icon: 'lightbulb',
  },
  {
    id: '4',
    type: 'warning',
    title: 'Water Heater Cycling',
    description: 'Your water heater is cycling 30% more often than normal. This could indicate sediment buildup - consider maintenance.',
    confidence: 85,
    potentialSavings: 25.00,
    icon: 'zap',
  },
  {
    id: '5',
    type: 'tip',
    title: 'Vampire Power Drain',
    description: 'Standby electronics are using approximately 0.4 kW continuously. Use smart power strips to save $12/month.',
    confidence: 88,
    potentialSavings: 12.00,
    icon: 'lightbulb',
  },
];

// Default home settings
export const defaultSettings: HomeSettings = {
  squareFootage: 2200,
  occupancy: 4,
  appliances: ['HVAC', 'Water Heater', 'Refrigerator', 'Washer', 'Dryer', 'Dishwasher'],
  notifyHighAlerts: true,
  notifyMediumAlerts: true,
  notifyLowAlerts: false,
  emailNotifications: true,
  pushNotifications: true,
  weeklyReport: true,
};

// Dashboard stats
export const generateDashboardStats = (): DashboardStats => ({
  todayCost: 4.23 + (Math.random() - 0.5) * 0.5,
  monthCost: 87.50 + (Math.random() - 0.5) * 5,
  savingsVsLastMonth: 12.30 + (Math.random() - 0.5) * 2,
  savingsPercent: 15 + Math.floor((Math.random() - 0.5) * 4),
  carbonSaved: 23 + Math.floor((Math.random() - 0.5) * 4),
  currentElectricity: 2.3 + (Math.random() - 0.5) * 0.4,
  currentWater: Math.random() > 0.7 ? 2.1 + Math.random() * 0.5 : 0,
});

// Create an anomaly alert
export const createAnomalyAlert = (type: 'water' | 'electricity'): Alert => {
  if (type === 'water') {
    return {
      id: `anomaly-${Date.now()}`,
      type: 'water',
      severity: 'high',
      title: '🚨 LIVE: Unusual water flow detected!',
      description: 'Sudden spike to 3.2 GPM detected just now - this is outside normal patterns',
      timestamp: new Date(),
      resolved: false,
      suggestedAction: 'Check all water fixtures immediately. This could indicate a burst pipe or running faucet.',
      costImpact: 0.50,
    };
  } else {
    return {
      id: `anomaly-${Date.now()}`,
      type: 'electricity',
      severity: 'high',
      title: '⚡ LIVE: Electricity surge detected!',
      description: 'Power consumption jumped to 6.8 kW - 170% of normal',
      timestamp: new Date(),
      resolved: false,
      suggestedAction: 'Check for appliances that may have turned on unexpectedly. Verify HVAC and water heater operation.',
      costImpact: 0.25,
    };
  }
};

// Format time ago
export const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format time
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

