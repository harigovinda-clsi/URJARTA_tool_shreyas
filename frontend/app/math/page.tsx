'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ThemeMode } from '@/lib/types';
import { FunctionSquare, Calculator, Network, BrainCircuit, CheckCircle2 } from 'lucide-react';

interface CoalitionNode {
  id: string;
  name: string;
  standaloneVal: number;
  shapleyValue: number;
  qValue: number;
}

export default function MathematicalFrameworkPage() {
  const [theme, setTheme] = useState<ThemeMode>('dark-blue');
  const [discountFactor, setDiscountFactor] = useState<number>(0.95);
  const [learningRate, setLearningRate] = useState<number>(0.1);

  // Cooperative Game Theory Nodes
  const [nodes, setNodes] = useState<CoalitionNode[]>([
    { id: 'NR', name: 'Northern Grid Coalition (NR)', standaloneVal: 120, shapleyValue: 0, qValue: 88.4 },
    { id: 'WR', name: 'Western TRANSCO Hub (WR)', standaloneVal: 180, shapleyValue: 0, qValue: 94.2 },
    { id: 'SR', name: 'Southern Load Center (SR)', standaloneVal: 140, shapleyValue: 0, qValue: 86.1 },
    { id: 'ER', name: 'Eastern Power Belt (ER)', standaloneVal: 110, shapleyValue: 0, qValue: 79.5 },
  ]);

  // Compute Shapley Values dynamically
  useEffect(() => {
    // Characteristic Function v(S) with synergy multiplier for cross-regional coalitions
    const computeCoalitionValue = (members: CoalitionNode[]): number => {
      if (members.length === 0) return 0;
      const baseSum = members.reduce((acc, m) => acc + m.standaloneVal, 0);
      const synergyBonus = members.length > 1 ? members.length * 35 : 0;
      return baseSum + synergyBonus;
    };

    const N = nodes.length;
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

    const updatedNodes = nodes.map((node) => {
      let phi = 0;

      // Iterate through all possible subsets excluding 'node'
      const otherNodes = nodes.filter((n) => n.id !== node.id);
      const totalSubsets = 1 << otherNodes.length; // 2^(N-1)

      for (let i = 0; i < totalSubsets; i++) {
        const subset: CoalitionNode[] = [];
        for (let j = 0; j < otherNodes.length; j++) {
          if ((i & (1 << j)) !== 0) {
            subset.push(otherNodes[j]);
          }
        }

        const S_size = subset.length;
        const valWithout = computeCoalitionValue(subset);
        const valWith = computeCoalitionValue([...subset, node]);
        const marginalContribution = valWith - valWithout;

        const weight = (factorial(S_size) * factorial(N - S_size - 1)) / factorial(N);
        phi += weight * marginalContribution;
      }

      return {
        ...node,
        shapleyValue: Number(phi.toFixed(2)),
      };
    });

    setNodes(updatedNodes);

    // Re-trigger MathJax rendering if present on window
    if (typeof window !== 'undefined' && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise?.();
    }
  }, [discountFactor, learningRate]);

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header
        theme={theme}
        setTheme={setTheme}
        title="Game-Theoretic & Mathematical Framework"
        subtitle="Shapley Value Coalitional Payoffs & Multi-Agent Reinforcement Learning (MARL) Formulations"
      />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto font-mono">
        {/* Latex Formulas Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formula 1: Shapley Value */}
          <div className="card-bg border border-theme rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2 uppercase tracking-wider">
              <FunctionSquare className="w-4 h-4" /> 1. Shapley Value Fair Allocation
            </h3>
            <p className="text-xs text-muted-theme">
              Calculates the exact unique payoff allocation $\phi_i(v)$ for each regional grid node based on its marginal contribution across all $2^N$ coalition subsets:
            </p>
            <div className="bg-black/60 rounded-xl p-4 text-center border border-slate-800 text-sky-300 text-sm overflow-x-auto">
              {`$$\\phi_i(v) = \\sum_{S \\subseteq N \\setminus \\{i\\}} \\frac{|S|!(|N| - |S| - 1)!}{|N|!} \\Big( v(S \\cup \\{i\\}) - v(S) \\Big)$$`}
            </div>
          </div>

          {/* Formula 2: MARL Bellman Optimality */}
          <div className="card-bg border border-theme rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" /> 2. MARL Multi-Agent Bellman Equation
            </h3>
            <p className="text-xs text-muted-theme">
              Iterative state-action Q-value updates for load shedding and active power sharing under dynamic grid frequency constraints:
            </p>
            <div className="bg-black/60 rounded-xl p-4 text-center border border-slate-800 text-emerald-300 text-sm overflow-x-auto">
              {`$$Q_{i}^*(s, \\mathbf{a}) = R_i(s, \\mathbf{a}) + \\gamma \\sum_{s'} P(s' | s, \\mathbf{a}) \\max_{a_i'} Q_i^*(s', a_i', \\mathbf{a}_{-i})$$`}
            </div>
          </div>
        </div>

        {/* Dynamic Calculator & Interactive Payoff Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Shapley Payoff Results */}
          <div className="lg:col-span-8 card-bg border border-theme rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-theme flex justify-between items-center bg-slate-900/40">
              <h3 className="font-bold text-xs text-sky-400 flex items-center gap-2 uppercase">
                <Calculator className="w-4 h-4" /> Calculated Coalition Marginal Payoffs
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                SYNERGY MULTIPLIER ACTIVE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950/60 border-b border-theme text-muted-theme">
                  <tr>
                    <th className="p-3.5">Regional Node</th>
                    <th className="p-3.5">Standalone Value $v(\{i\})$</th>
                    <th className="p-3.5">Calculated Shapley Payoff $\phi_i(v)$</th>
                    <th className="p-3.5">MARL Policy Q-Score</th>
                    <th className="p-3.5">Efficiency Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme">
                  {nodes.map((node) => {
                    const ratio = ((node.shapleyValue / node.standaloneVal) * 100).toFixed(1);
                    return (
                      <tr key={node.id} className="hover:bg-slate-800/30 transition">
                        <td className="p-3.5 font-bold text-sky-400">{node.name}</td>
                        <td className="p-3.5">{node.standaloneVal} kW</td>
                        <td className="p-3.5 font-bold text-emerald-400">+{node.shapleyValue} pts</td>
                        <td className="p-3.5 text-purple-300">{node.qValue}</td>
                        <td className="p-3.5">
                          <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded text-[10px]">
                            {ratio}% Efficiency
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Hyperparameter Tuning for Game Engine */}
          <div className="lg:col-span-4 card-bg border border-theme rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-sky-400 uppercase border-b border-theme pb-2 flex items-center gap-2">
              <Network className="w-4 h-4" /> Solver Hyperparameters
            </h3>

            {/* Discount Factor Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">Discount Factor ($\gamma$)</span>
                <span className="text-emerald-400 font-bold">{discountFactor}</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="0.99"
                step="0.01"
                value={discountFactor}
                onChange={(e) => setDiscountFactor(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Learning Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-theme">Learning Rate ($\alpha$)</span>
                <span className="text-sky-400 font-bold">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.50"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-theme space-y-2 text-[11px] text-muted-theme">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Axiomatic Guarantee
              </div>
              <p>
                The calculated Shapley value guarantees Efficiency ($\sum \phi_i = v(N)$), Symmetry, and Dummy Player axioms across all regional Transco nodes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
