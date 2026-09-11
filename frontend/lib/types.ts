export type ThemeMode = 'dark-blue' | 'light-white';
export type ViewMode = 'CAPITALS' | 'DISTRICTS';
export type StressLevel = 'NORMAL' | 'HIGH_DEMAND' | 'CYBER_ATTACK' | 'LINE_TRIP';

export interface GridNode {
  id: string;
  name: string;
  label?: string;
  voltageKV: number;
  x: number;
  y: number;
  baseLoad: number;
  baseGen: number;
  loadKW: number;
  genKW: number;
  isolated: boolean;
  manualOverride: boolean;
  priority?: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  ip?: string;
  protocol?: string;
  rtu?: string;
  ping?: string;
}

export interface GridMetrics {
  frequencyHz: number;
  voltageRMS: number;
  globalScore: number;
  totalGenKW: number;
  totalLoadKW: number;
}

export interface NodeAction {
  id: string;
  nodeId: string;
  actionType: 'SHED_LOAD' | 'INCREASE_GEN' | 'ISOLATE' | 'RECONNECT';
  timestamp: string;
  reason: string;
}
