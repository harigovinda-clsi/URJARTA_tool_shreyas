'use client';

import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

interface AiLabTaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiLabTaDrawer({ isOpen, onClose }: AiLabTaDrawerProps) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hello! I am your URJA RTA AI Lab Assistant. Ask me anything about SCADA IEC 61850, Shapley coalition values, or AC phasor dynamics.' },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Analyzing query "${userMsg}": Grid stability remains within ±0.05 Hz parameters under active multi-agent policy optimization.`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 panel-bg border-l border-theme p-4 shadow-2xl z-50 flex flex-col font-mono text-xs">
      <div className="flex justify-between items-center border-b border-theme pb-3">
        <h2 className="font-bold text-emerald-400 flex items-center gap-2">
          <Bot className="w-4 h-4" /> AI Lab TA Assistant
        </h2>
        <button onClick={onClose} className="p-1 hover:text-white text-muted-theme">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2.5 rounded-lg border ${
              m.sender === 'user'
                ? 'bg-sky-950/40 border-sky-500/30 text-sky-200 ml-4'
                : 'card-bg border-theme text-emerald-200 mr-4'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2 pt-2 border-t border-theme">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI Assistant..."
          className="flex-1 bg-slate-900 border border-theme rounded px-2 py-1.5 text-xs focus:outline-none text-sky-200"
        />
        <button onClick={handleSend} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded">
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
