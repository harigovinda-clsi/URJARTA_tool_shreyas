'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ThemeMode, GridNode } from '@/lib/types';
import { Network, Server, ShieldCheck, Activity, Terminal } from 'lucide-react';

const TELEMETRY_NODES: GridNode[] = [
  { id: 'RTU-NR-01', name: 'Northern Grid Control (SLDC Delhi)', voltageKV: 400, x: 0, y: 0, baseLoad: 300, baseGen: 300, loadKW: 300, genKW: 300, isolated: false, manualOverride: false, ip: '10.140.12.1', protocol: 'IEC 61850 GOOSE', rtu: 'ABB RTU560', ping: '1.2 ms', status: 'HEALTHY' },
  { id: 'RTU-WR-02', name: 'Western TRANSCO (SLDC Kalwa)', voltageKV: 765, x: 0, y: 0, baseLoad: 500, baseGen: 500, loadKW: 500, genKW: 500, isolated: false, manualOverride: false, ip: '10.140.18.4', protocol: 'DNP3 over TCP/IP', rtu: 'Siemens SICAM PAS', ping: '3.4 ms', status: 'HEALTHY' },
  { id: 'RTU-SR-03', name: 'Southern Grid Control (SLDC Chennai)', voltageKV: 400, x: 0, y: 0, baseLoad: 420, baseGen: 420, loadKW: 420, genKW: 420, isolated: false, manualOverride: false, ip: '10.140.24.9', protocol: 'IEC 60870-5-104', rtu: 'GE Reason RTU', ping: '2.1 ms', status: 'HEALTHY' },
  { id: 'RTU-ER-04', name: 'Eastern Region (SLDC Howrah)', voltageKV: 400, x: 0, y: 0, baseLoad: 380, baseGen: 380, loadKW: 380, genKW: 380, isolated: false, manualOverride: false, ip: '10.140.32.11', protocol: 'IEC 61850 MMS', rtu: 'Schneider Saitel', ping: '1.8 ms', status: 'HEALTHY' },
];

export default function TelemetryControlPage() {
  const [theme, setTheme] = useState<ThemeMode>('dark-blue');
  const [telemetryList, setTelemetryList] = useState<GridNode[]>(TELEMETRY_NODES);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM INIT] Connected to SCADA IEC 61850 GOOSE Bus.',
    '[HEARTBEAT] All 4 Regional Transco RTUs responding (0% packet drop).',
  ]);

  // Simulate telemetry log stream
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = TELEMETRY_NODES[Math.floor(Math.random() * TELEMETRY_NODES.length)];
      const randomPing = (Math.random() * 3 + 1).toFixed(2);
      const newLog = `[TELEMETRY] ${randomNode.id} (${randomNode.ip}) -> Ping: ${randomPing}ms | Protocol: ${randomNode.protocol} | Status: OK`;
      
      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header
        theme={theme}
        setTheme={setTheme}
        title="SCADA Telemetry & IEC 61850 SLD Network Engine"
        subtitle="Substation Control & Sub-station Level Telemetry Link Inspector"
      />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
          <div className="card-bg border border-theme p-4 rounded-xl flex items-center gap-3">
            <Server className="w-8 h-8 text-sky-400" />
            <div>
              <p className="text-xs text-muted-theme">Active RTUs</p>
              <p className="text-xl font-bold">4 / 4 Connected</p>
            </div>
          </div>
          <div className="card-bg border border-theme p-4 rounded-xl flex items-center gap-3">
            <Network className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-xs text-muted-theme">Bus Protocol</p>
              <p className="text-xl font-bold">IEC 61850 / DNP3</p>
            </div>
          </div>
          <div className="card-bg border border-theme p-4 rounded-xl flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-xs text-muted-theme">Avg Latency</p>
              <p className="text-xl font-bold">2.1 ms</p>
            </div>
          </div>
          <div className="card-bg border border-theme p-4 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <div>
              <p className="text-xs text-muted-theme">Failover Mode</p>
              <p className="text-xl font-bold">Auto-Reroute</p>
            </div>
          </div>
        </div>

        {/* RTU Table Inspector */}
        <div className="card-bg border border-theme rounded-xl overflow-hidden">
          <div className="p-4 border-b border-theme flex justify-between items-center">
            <h3 className="font-mono font-bold text-sm text-sky-400 flex items-center gap-2">
              <Server className="w-4 h-4" /> Regional Substation Control Units (RTU / SCADA Nodes)
            </h3>
            <span className="text-xs font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded">
              REAL-TIME SLD TELEMETRY
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-900/50 border-b border-theme text-muted-theme">
                <tr>
                  <th className="p-3">RTU Identifier</th>
                  <th className="p-3">Substation Name</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Protocol</th>
                  <th className="p-3">Hardware Unit</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme">
                {telemetryList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-bold text-sky-400">{item.id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.ip}</td>
                    <td className="p-3 text-purple-300">{item.protocol}</td>
                    <td className="p-3">{item.rtu}</td>
                    <td className="p-3 text-emerald-400">{item.ping}</td>
                    <td className="p-3">
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                        ONLINE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Terminal Output */}
        <div className="card-bg border border-theme rounded-xl p-4 font-mono text-xs space-y-2">
          <div className="flex items-center gap-2 text-sky-400 border-b border-theme pb-2">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">Live SCADA Protocol Stream</span>
          </div>
          <div className="bg-black/60 rounded-lg p-3 space-y-1 text-emerald-400 h-40 overflow-y-auto font-mono text-[11px]">
            {logs.map((log, idx) => (
              <p key={idx}>{log}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
