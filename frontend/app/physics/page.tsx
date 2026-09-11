'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { TelemetryBar } from '@/components/TelemetryBar';
import { ThemeMode, GridMetrics } from '@/lib/types';
import { Activity, Zap, Radio, Sliders, Play, Pause, RefreshCw } from 'lucide-react';

export default function PhysicsOscilloscopePage() {
  const [theme, setTheme] = useState<ThemeMode>('dark-blue');
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Physics Control Parameters
  const [frequency, setFrequency] = useState<number>(50.0); // Hz
  const [voltageAmp, setVoltageAmp] = useState<number>(230); // V (RMS)
  const [currentAmp, setCurrentAmp] = useState<number>(15); // A (RMS)
  const [phaseShiftDeg, setPhaseShiftDeg] = useState<number>(18); // Degrees (lag/lead)
  const [harmonics, setHarmonics] = useState<number>(0); // 3rd Harmonic Distortion (%)

  // Ref for HTML5 Canvas elements
  const oscilloCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const phasorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number>(0);
  const phaseAngleRef = useRef<number>(0);

  // Computed Power Values
  const pf = Math.cos((phaseShiftDeg * Math.PI) / 180);
  const activePowerKW = ((voltageAmp * currentAmp * pf) / 1000).toFixed(2);
  const reactivePowerKVAR = ((voltageAmp * currentAmp * Math.sin((phaseShiftDeg * Math.PI) / 180)) / 1000).toFixed(2);
  const apparentPowerKVA = ((voltageAmp * currentAmp) / 1000).toFixed(2);

  const metrics: GridMetrics = {
    frequencyHz: frequency,
    voltageRMS: voltageAmp,
    globalScore: pf > 0.9 ? 99 : pf > 0.8 ? 85 : 62,
    totalGenKW: Math.round(Number(activePowerKW) * 100),
    totalLoadKW: Math.round(Number(apparentPowerKVA) * 100),
  };

  // Canvas Animation Loop
  useEffect(() => {
    const oscCanvas = oscilloCanvasRef.current;
    const phasorCanvas = phasorCanvasRef.current;
    if (!oscCanvas || !phasorCanvas) return;

    const ctxOsc = oscCanvas.getContext('2d');
    const ctxPhasor = phasorCanvas.getContext('2d');
    if (!ctxOsc || !ctxPhasor) return;

    const render = () => {
      const width = oscCanvas.width;
      const height = oscCanvas.height;
      const midY = height / 2;

      // -------------------------------------------------------------
      // 1. Oscilloscope Rendering
      // -------------------------------------------------------------
      ctxOsc.clearRect(0, 0, width, height);

      // Render Grid Lines
      ctxOsc.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctxOsc.lineWidth = 1;

      // Vertical grid lines
      for (let x = 0; x < width; x += 40) {
        ctxOsc.beginPath();
        ctxOsc.moveTo(x, 0);
        ctxOsc.lineTo(x, height);
        ctxOsc.stroke();
      }
      // Horizontal grid lines
      for (let y = 0; y < height; y += 30) {
        ctxOsc.beginPath();
        ctxOsc.moveTo(0, y);
        ctxOsc.lineTo(width, y);
        ctxOsc.stroke();
      }

      // Center Reference Line
      ctxOsc.strokeStyle = 'rgba(148, 163, 184, 0.6)';
      ctxOsc.beginPath();
      ctxOsc.moveTo(0, midY);
      ctxOsc.lineTo(width, midY);
      ctxOsc.stroke();

      const phaseShiftRad = (phaseShiftDeg * Math.PI) / 180;
      const omega = (2 * Math.PI * frequency) / 100;

      // Render Trace 1: Voltage Waveform (Cyan)
      ctxOsc.beginPath();
      ctxOsc.strokeStyle = '#38bdf8';
      ctxOsc.lineWidth = 2.5;

      for (let x = 0; x < width; x++) {
        const t = x * 0.015;
        const fundamental = Math.sin(omega * t + phaseAngleRef.current);
        const harmonic = (harmonics / 100) * Math.sin(3 * (omega * t + phaseAngleRef.current));
        const vScaled = (fundamental + harmonic) * (voltageAmp / 280) * (height * 0.35);

        const y = midY - vScaled;
        if (x === 0) ctxOsc.moveTo(x, y);
        else ctxOsc.lineTo(x, y);
      }
      ctxOsc.stroke();

      // Render Trace 2: Current Waveform (Amber)
      ctxOsc.beginPath();
      ctxOsc.strokeStyle = '#fbbf24';
      ctxOsc.lineWidth = 2;

      for (let x = 0; x < width; x++) {
        const t = x * 0.015;
        const fundamental = Math.sin(omega * t + phaseAngleRef.current - phaseShiftRad);
        const harmonic = (harmonics / 100) * Math.sin(3 * (omega * t + phaseAngleRef.current - phaseShiftRad));
        const iScaled = (fundamental + harmonic) * (currentAmp / 30) * (height * 0.3);

        const y = midY - iScaled;
        if (x === 0) ctxOsc.moveTo(x, y);
        else ctxOsc.lineTo(x, y);
      }
      ctxOsc.stroke();

      // -------------------------------------------------------------
      // 2. Phasor Vector Diagram Rendering
      // -------------------------------------------------------------
      const pWidth = phasorCanvas.width;
      const pHeight = phasorCanvas.height;
      const pCenterX = pWidth / 2;
      const pCenterY = pHeight / 2;
      const radius = Math.min(pWidth, pHeight) * 0.38;

      ctxPhasor.clearRect(0, 0, pWidth, pHeight);

      // Polar Circular Axes
      ctxPhasor.strokeStyle = 'rgba(51, 65, 85, 0.6)';
      ctxPhasor.lineWidth = 1;
      ctxPhasor.beginPath();
      ctxPhasor.arc(pCenterX, pCenterY, radius, 0, 2 * Math.PI);
      ctxPhasor.arc(pCenterX, pCenterY, radius * 0.5, 0, 2 * Math.PI);
      ctxPhasor.stroke();

      // Horizontal & Vertical Crosshair
      ctxPhasor.beginPath();
      ctxPhasor.moveTo(pCenterX - radius - 15, pCenterY);
      ctxPhasor.lineTo(pCenterX + radius + 15, pCenterY);
      ctxPhasor.moveTo(pCenterX, pCenterY - radius - 15);
      ctxPhasor.lineTo(pCenterX, pCenterY + radius + 15);
      ctxPhasor.stroke();

      // Rotating Voltage Vector (Cyan)
      const vAngle = phaseAngleRef.current;
      const vX = pCenterX + radius * Math.cos(vAngle);
      const vY = pCenterY - radius * Math.sin(vAngle);

      ctxPhasor.strokeStyle = '#38bdf8';
      ctxPhasor.lineWidth = 3;
      ctxPhasor.beginPath();
      ctxPhasor.moveTo(pCenterX, pCenterY);
      ctxPhasor.lineTo(vX, vY);
      ctxPhasor.stroke();

      // Voltage Arrow Head
      ctxPhasor.fillStyle = '#38bdf8';
      ctxPhasor.beginPath();
      ctxPhasor.arc(vX, vY, 5, 0, 2 * Math.PI);
      ctxPhasor.fill();

      // Rotating Current Vector (Amber with Phase Lag)
      const iAngle = phaseAngleRef.current - phaseShiftRad;
      const iLen = radius * 0.75;
      const iX = pCenterX + iLen * Math.cos(iAngle);
      const iY = pCenterY - iLen * Math.sin(iAngle);

      ctxPhasor.strokeStyle = '#fbbf24';
      ctxPhasor.lineWidth = 2.5;
      ctxPhasor.beginPath();
      ctxPhasor.moveTo(pCenterX, pCenterY);
      ctxPhasor.lineTo(iX, iY);
      ctxPhasor.stroke();

      // Current Arrow Head
      ctxPhasor.fillStyle = '#fbbf24';
      ctxPhasor.beginPath();
      ctxPhasor.arc(iX, iY, 4, 0, 2 * Math.PI);
      ctxPhasor.fill();

      // Increment phase angle if simulation is running
      if (isRunning) {
        phaseAngleRef.current += (2 * Math.PI * frequency) / 3600;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [frequency, voltageAmp, currentAmp, phaseShiftDeg, harmonics, isRunning]);

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header
        theme={theme}
        setTheme={setTheme}
        title="Electromagnetic Physics & Wave Engine"
        subtitle="Dual-Trace AC Oscilloscope, Phasor Analysis & Harmonic Distortion Lab"
      />

      <TelemetryBar metrics={metrics} />

      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        {/* Left Column: Dual-Trace Oscilloscope & Phasor Visualizers */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {/* Main Oscilloscope Screen */}
          <div className="card-bg border border-theme rounded-2xl p-4 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <h2 className="font-mono font-bold text-sm text-sky-400 uppercase tracking-wider">
                  Dual-Trace AC Waveform Oscilloscope
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-3 h-1 bg-sky-400 rounded-full inline-block"></span> CH1: Voltage (V)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-1 bg-amber-400 rounded-full inline-block"></span> CH2: Current (I)
                </span>
              </div>
            </div>

            <div className="relative w-full aspect-[21/9] bg-black/80 rounded-xl overflow-hidden border border-slate-800">
              <canvas
                ref={oscilloCanvasRef}
                width={840}
                height={360}
                className="w-full h-full block"
              />
            </div>
          </div>

          {/* Bottom Grid: Vector Phasor + Computed Power Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vector Phasor Plot */}
            <div className="card-bg border border-theme rounded-2xl p-4 flex flex-col">
              <h3 className="font-mono font-bold text-xs text-sky-400 uppercase mb-3 flex items-center gap-2">
                <Radio className="w-4 h-4" /> Rotating Vector Phasor
              </h3>
              <div className="flex-1 bg-black/80 rounded-xl p-2 flex items-center justify-center border border-slate-800">
                <canvas
                  ref={phasorCanvasRef}
                  width={280}
                  height={240}
                  className="max-w-full block"
                />
              </div>
            </div>

            {/* Power Triangle & Calculated Parameters */}
            <div className="card-bg border border-theme rounded-2xl p-4 flex flex-col justify-between font-mono space-y-4">
              <h3 className="font-mono font-bold text-xs text-sky-400 uppercase flex items-center gap-2">
                <Zap className="w-4 h-4" /> Real-Time Electrical Power Triangle
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-theme">
                  <span className="text-muted-theme">Active Power (P):</span>
                  <span className="text-base font-bold text-emerald-400">{activePowerKW} kW</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-theme">
                  <span className="text-muted-theme">Reactive Power (Q):</span>
                  <span className="text-base font-bold text-amber-400">{reactivePowerKVAR} kVAR</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-theme">
                  <span className="text-muted-theme">Apparent Power (S):</span>
                  <span className="text-base font-bold text-sky-400">{apparentPowerKVA} kVA</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-theme">
                  <span className="text-muted-theme">Power Factor ($\cos \phi$):</span>
                  <span className={`text-base font-bold ${pf >= 0.9 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pf.toFixed(3)} {phaseShiftDeg > 0 ? '(Lagging)' : '(Leading)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Physics Tuning Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-bg border border-theme rounded-2xl p-5 space-y-5 font-mono">
            <div className="flex justify-between items-center border-b border-theme pb-3">
              <h2 className="font-bold text-sm text-sky-400 uppercase flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Waveform Synthesizer
              </h2>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-bold transition ${
                  isRunning
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'Pause Wave' : 'Resume Wave'}
              </button>
            </div>

            {/* Frequency Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">Grid Frequency ($f$)</span>
                <span className="text-sky-400 font-bold">{frequency.toFixed(2)} Hz</span>
              </div>
              <input
                type="range"
                min="45.0"
                max="55.0"
                step="0.05"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-theme">
                <span>45.0 Hz</span>
                <span>50.0 Hz (Nominal)</span>
                <span>55.0 Hz</span>
              </div>
            </div>

            {/* Voltage Amplitude Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">Voltage RMS ($V$)</span>
                <span className="text-sky-400 font-bold">{voltageAmp} V</span>
              </div>
              <input
                type="range"
                min="180"
                max="270"
                step="1"
                value={voltageAmp}
                onChange={(e) => setVoltageAmp(parseInt(e.target.value, 10))}
                className="w-full accent-sky-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Current Amplitude Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">Current RMS ($I$)</span>
                <span className="text-amber-400 font-bold">{currentAmp} A</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={currentAmp}
                onChange={(e) => setCurrentAmp(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Phase Angle Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">Phase Lag ($\phi$)</span>
                <span className="text-purple-400 font-bold">{phaseShiftDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={phaseShiftDeg}
                onChange={(e) => setPhaseShiftDeg(parseInt(e.target.value, 10))}
                className="w-full accent-purple-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Total Harmonic Distortion Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">3rd Harmonic Injection (THD)</span>
                <span className="text-red-400 font-bold">{harmonics}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={harmonics}
                onChange={(e) => setHarmonics(parseInt(e.target.value, 10))}
                className="w-full accent-red-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-theme space-y-2">
              <span className="text-xs text-muted-theme block">Fault Presets</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setFrequency(50.0);
                    setVoltageAmp(230);
                    setCurrentAmp(15);
                    setPhaseShiftDeg(12);
                    setHarmonics(0);
                  }}
                  className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-sky-300 transition"
                >
                  Standard Grid
                </button>
                <button
                  onClick={() => {
                    setFrequency(48.2);
                    setVoltageAmp(205);
                    setCurrentAmp(28);
                    setPhaseShiftDeg(48);
                    setHarmonics(22);
                  }}
                  className="px-2 py-1.5 rounded bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-[11px] text-red-300 transition"
                >
                  Inductive Load Surge
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
