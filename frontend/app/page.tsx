'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TelemetryBar } from '@/components/TelemetryBar';
import { Canvas } from '@/components/Canvas';
import { AgentDrawer } from '@/components/AgentDrawer';
import { AiLabTaDrawer } from '@/components/AiLabTaDrawer';
import { ThemeMode, ViewMode, StressLevel, GridNode, GridMetrics, NodeAction } from '@/lib/types';
import { computeGridStep } from '@/lib/marlEngine';

const INITIAL_NODES: GridNode[] = [
  { id: 'NODE-DELHI', name: 'Delhi State Grid', label: 'NR-DELHI', voltageKV: 400, x: 380, y: 180, baseLoad: 450, baseGen: 120, loadKW: 450, genKW: 120, isolated: false, manualOverride: false, priority: 1, status: 'HEALTHY' },
  { id: 'NODE-MUMBAI', name: 'Mumbai Substation', label: 'WR-MUMBAI', voltageKV: 765, x: 220, y: 440, baseLoad: 600, baseGen: 300, loadKW: 600, genKW: 300, isolated: false, manualOverride: false, priority: 1, status: 'HEALTHY' },
  { id: 'NODE-BENGALURU', name: 'Bengaluru Substation', label: 'SR-BLR', voltageKV: 400, x: 320, y: 620, baseLoad: 520, baseGen: 200, loadKW: 520, genKW: 200, isolated: false, manualOverride: false, priority: 2, status: 'HEALTHY' },
  { id: 'NODE-KOLKATA', name: 'Kolkata Load Center', label: 'ER-KOL', voltageKV: 400, x: 620, y: 320, baseLoad: 410, baseGen: 480, loadKW: 410, genKW: 480, isolated: false, manualOverride: false, priority: 1, status: 'HEALTHY' },
  { id: 'NODE-CHENNAI', name: 'Chennai Substation', label: 'SR-MAA', voltageKV: 400, x: 390, y: 660, baseLoad: 480, baseGen: 450, loadKW: 480, genKW: 450, isolated: false, manualOverride: false, priority: 2, status: 'HEALTHY' },
];

export default function NationalGridPage() {
  const [theme, setTheme] = useState<ThemeMode>('dark-blue');
  const [viewMode, setViewMode] = useState<ViewMode>('CAPITALS');
  const [stress, setStress] = useState<StressLevel>('NORMAL');
  const [nodes, setNodes] = useState<GridNode[]>(INITIAL_NODES);
  const [actions, setActions] = useState<NodeAction[]>([]);
  const [metrics, setMetrics] = useState<GridMetrics>({
    frequencyHz: 50.0,
    voltageRMS: 230,
    globalScore: 98,
    totalGenKW: 1550,
    totalLoadKW: 2460,
  });

  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [timeStep, setTimeStep] = useState(0);

  // Real-time grid simulation pulse (500ms cycle)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStep((prev) => prev + 1);
      const result = computeGridStep(nodes, stress, timeStep);
      setNodes(result.updatedNodes);
      setActions(result.actions);
      setMetrics(result.metrics);
    }, 500);

    return () => clearInterval(timer);
  }, [nodes, stress, timeStep]);

  const toggleNodeIsolate = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, isolated: !n.isolated } : n))
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header
        theme={theme}
        setTheme={setTheme}
        viewMode={viewMode}
        setViewMode={setViewMode}
        stress={stress}
        setStress={setStress}
        toggleAgentDrawer={() => setIsAgentDrawerOpen(!isAgentDrawerOpen)}
        toggleAiDrawer={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
        title="URJA RTA: All-India National Grid Engine"
        subtitle="28 State Capitals + Delhi & Regional TRANSCO District Substation Telemetry"
      />

      <TelemetryBar metrics={metrics} />

      <main className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
        {/* Main Canvas Viewport */}
        <div className="flex-1 relative canvas-grid bg-[var(--bg-main)]">
          <Canvas nodes={nodes} onNodeToggle={toggleNodeIsolate} />
        </div>

        {/* Node Control Sidebar */}
        <aside className="w-full md:w-80 panel-bg border-t md:border-t-0 md:border-l border-theme p-4 overflow-y-auto">
          <h2 className="text-sm font-bold font-mono tracking-wider text-sky-400 mb-3 uppercase">
            Substation Controller
          </h2>
          <div className="space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="card-bg border border-theme p-3 rounded-lg flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs">{node.name}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      node.isolated
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {node.isolated ? 'ISOLATED' : 'ONLINE'}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-muted-theme flex justify-between">
                  <span>Gen: {node.genKW} kW</span>
                  <span>Load: {node.loadKW} kW</span>
                </div>
                <button
                  onClick={() => toggleNodeIsolate(node.id)}
                  className={`mt-1 py-1 px-2 rounded text-xs font-mono transition ${
                    node.isolated
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white'
                  }`}
                >
                  {node.isolated ? 'Reconnect Substation' : 'Isolate Grid Node'}
                </button>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Drawers */}
      <AgentDrawer
        isOpen={isAgentDrawerOpen}
        onClose={() => setIsAgentDrawerOpen(false)}
        actions={actions}
      />
      <AiLabTaDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />
    </div>
  );
}
