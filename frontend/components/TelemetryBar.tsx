'use client';

import React from 'react';
import { GridMetrics } from '@/lib/types';
import { Activity, Gauge, Zap, ShieldCheck } from 'lucide-react';

interface TelemetryBarProps {
  metrics: GridMetrics;
}

export function TelemetryBar({ metrics }: TelemetryBarProps) {
  const isFreqNormal = metrics.frequencyHz >= 49.5 && metrics.frequencyHz <= 50.5;

  return (
    <div className="bg-slate-950/80 border-b border-theme px-6 py-2 flex flex-wrap justify-between items-center text-xs font-mono">
      <div className="flex items-center gap-2">
        <Activity className={`w-4 h-4 ${isFreqNormal ? 'text-emerald-400' : 'text-red-400'}`} />
        <span className="text-muted-theme">Grid Frequency:</span>
        <span className={`font-bold ${isFreqNormal ? 'text-emerald-400' : 'text-red-400'}`}>
          {metrics.frequencyHz.toFixed(2)} Hz
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Gauge className="w-4 h-4 text-sky-400" />
        <span className="text-muted-theme">Voltage RMS:</span>
        <span className="font-bold text-sky-300">{metrics.voltageRMS} V</span>
      </div>

      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <span className="text-muted-theme">Gen / Load:</span>
        <span className="font-bold text-amber-300">
          {metrics.totalGenKW} kW / {metrics.totalLoadKW} kW
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-purple-400" />
        <span className="text-muted-theme">Grid Health Score:</span>
        <span className="font-bold text-purple-300">{metrics.globalScore} / 100</span>
      </div>
    </div>
  );
}
