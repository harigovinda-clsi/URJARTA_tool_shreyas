'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeMode, ViewMode, StressLevel } from '@/lib/types';
import { Activity, Zap, Cpu, Bot, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  viewMode?: ViewMode;
  setViewMode?: (v: ViewMode) => void;
  stress?: StressLevel;
  setStress?: (s: StressLevel) => void;
  toggleAgentDrawer?: () => void;
  toggleAiDrawer?: () => void;
  title: string;
  subtitle: string;
}

export function Header({
  theme,
  setTheme,
  viewMode,
  setViewMode,
  stress,
  setStress,
  toggleAgentDrawer,
  toggleAiDrawer,
  title,
  subtitle,
}: HeaderProps) {
  return (
    <header className="panel-bg border-b border-theme p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-sky-400" />
          <h1 className="text-lg font-bold font-mono tracking-wider text-sky-400">{title}</h1>
        </div>
        <p className="text-xs text-muted-theme font-mono">{subtitle}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-2 text-xs font-mono">
        <Link href="/" className="px-2.5 py-1.5 rounded card-bg hover:border-sky-400 border border-theme transition">
          National Grid
        </Link>
        <Link href="/telemetry" className="px-2.5 py-1.5 rounded card-bg hover:border-sky-400 border border-theme transition">
          SCADA Network
        </Link>
        <Link href="/physics" className="px-2.5 py-1.5 rounded card-bg hover:border-sky-400 border border-theme transition">
          Physics Engine
        </Link>
        <Link href="/math" className="px-2.5 py-1.5 rounded card-bg hover:border-sky-400 border border-theme transition">
          Game Theory
        </Link>
      </nav>

      {/* Controls & Drawers */}
      <div className="flex items-center gap-2">
        {setStress && (
          <select
            value={stress}
            onChange={(e) => setStress(e.target.value as StressLevel)}
            className="bg-slate-900 text-xs font-mono text-sky-300 border border-theme rounded px-2 py-1.5 focus:outline-none"
          >
            <option value="NORMAL">Stress: Normal</option>
            <option value="HIGH_DEMAND">Stress: Peak Load</option>
            <option value="CYBER_ATTACK">Stress: Cyber Attack</option>
            <option value="LINE_TRIP">Stress: Line Trip</option>
          </select>
        )}

        {toggleAgentDrawer && (
          <button
            onClick={toggleAgentDrawer}
            className="p-2 rounded card-bg border border-theme hover:border-sky-400 text-sky-400 transition"
            title="MARL Agent Audit"
          >
            <Cpu className="w-4 h-4" />
          </button>
        )}

        {toggleAiDrawer && (
          <button
            onClick={toggleAiDrawer}
            className="p-2 rounded card-bg border border-theme hover:border-emerald-400 text-emerald-400 transition"
            title="AI Lab TA Assistant"
          >
            <Bot className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setTheme(theme === 'dark-blue' ? 'light-white' : 'dark-blue')}
          className="p-2 rounded card-bg border border-theme hover:border-amber-400 text-amber-400 transition"
        >
          {theme === 'dark-blue' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
