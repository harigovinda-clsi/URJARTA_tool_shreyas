'use client';

import React from 'react';
import { GridNode } from '@/lib/types';

interface CanvasProps {
  nodes: GridNode[];
  onNodeToggle: (id: string) => void;
}

export function Canvas({ nodes, onNodeToggle }: CanvasProps) {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      <svg className="absolute inset-0 w-full h-full">
        {/* Render Grid Interconnecting Lines */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((targetNode) => (
            <line
              key={`${node.id}-${targetNode.id}`}
              x1={node.x}
              y1={node.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke={node.isolated || targetNode.isolated ? 'rgba(239, 68, 68, 0.3)' : 'rgba(56, 189, 248, 0.4)'}
              strokeWidth={node.isolated || targetNode.isolated ? 1 : 2}
              strokeDasharray={node.isolated || targetNode.isolated ? '4 4' : 'none'}
            />
          ))
        )}
      </svg>

      {/* Render Substation Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          onClick={() => onNodeToggle(node.id)}
          style={{ left: `${node.x}px`, top: `${node.y}px` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-xl border transition-all ${
            node.isolated
              ? 'bg-red-950/80 border-red-500 text-red-300'
              : 'card-bg border-sky-400 text-sky-300 hover:scale-105'
          }`}
        >
          <div className="text-[10px] font-mono font-bold">{node.label || node.name}</div>
          <div className="text-[9px] font-mono opacity-80">{node.voltageKV} kV</div>
        </div>
      ))}
    </div>
  );
}
