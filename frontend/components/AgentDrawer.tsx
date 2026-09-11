'use client';

import React from 'react';
import { NodeAction } from '@/lib/types';
import { Cpu, X } from 'lucide-react';

interface AgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  actions: NodeAction[];
}

export function AgentDrawer({ isOpen, onClose, actions }: AgentDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 panel-bg border-l border-theme p-4 shadow-2xl z-50 flex flex-col font-mono text-xs">
      <div className="flex justify-between items-center border-b border-theme pb-3">
        <h2 className="font-bold text-sky-400 flex items-center gap-2">
          <Cpu className="w-4 h-4" /> MARL Audit Log
        </h2>
        <button onClick={onClose} className="p-1 hover:text-white text-muted-theme">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 space-y-2">
        {actions.length === 0 ? (
          <p className="text-muted-theme italic">No automated actions taken yet.</p>
        ) : (
          actions.map((act) => (
            <div key={act.id} className="card-bg border border-theme p-2.5 rounded-lg space-y-1">
              <div className="flex justify-between text-[10px] text-muted-theme">
                <span>{act.timestamp}</span>
                <span className="text-amber-400 font-bold">{act.actionType}</span>
              </div>
              <p className="text-sky-200">{act.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
