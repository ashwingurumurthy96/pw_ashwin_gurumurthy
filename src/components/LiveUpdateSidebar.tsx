"use client";

import React from 'react';
import { CloudRain, Car, BatteryLow, RefreshCcw } from 'lucide-react';
import { PivotTrigger } from '@/types/engine';

interface LiveUpdateSidebarProps {
  onTriggerPivot: (trigger: PivotTrigger) => void;
  activeTrigger: PivotTrigger;
}

export const LiveUpdateSidebar: React.FC<LiveUpdateSidebarProps> = ({ onTriggerPivot, activeTrigger }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 w-full max-w-sm sticky top-6 z-30">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Simulation Engine</h2>
        <p className="text-sm text-slate-400">Trigger real-time events to see the itinerary pivot dynamically.</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onTriggerPivot('Heavy Rain')}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all border ${
            activeTrigger === 'Heavy Rain'
              ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
            <CloudRain className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-white">Heavy Rain</h4>
            <p className="text-xs text-slate-400">Swaps outdoor for indoor.</p>
          </div>
        </button>

        <button
          onClick={() => onTriggerPivot('Traffic Gridlock')}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all border ${
            activeTrigger === 'Traffic Gridlock'
              ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
              : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400">
            <Car className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-white">Traffic Gridlock</h4>
            <p className="text-xs text-slate-400">Extends travel time.</p>
          </div>
        </button>

        <button
          onClick={() => onTriggerPivot('Energy Low')}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all border ${
            activeTrigger === 'Energy Low'
              ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
              : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <div className="bg-fuchsia-500/20 p-2 rounded-lg text-fuchsia-400">
            <BatteryLow className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-white">Energy Low</h4>
            <p className="text-xs text-slate-400">Swaps to low-energy acts.</p>
          </div>
        </button>
      </div>

      <button
        onClick={() => onTriggerPivot('None')}
        className="mt-4 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-slate-300"
      >
        <RefreshCcw className="w-4 h-4" /> Reset Simulation
      </button>
    </div>
  );
};
