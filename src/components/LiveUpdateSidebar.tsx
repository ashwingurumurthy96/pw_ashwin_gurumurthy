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
        <h2 className="text-xl font-bold text-slate-900 mb-2">Simulation Engine</h2>
        <p className="text-sm text-slate-500">Trigger real-time events to see the itinerary pivot dynamically.</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onTriggerPivot('Heavy Rain')}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all border ${
            activeTrigger === 'Heavy Rain'
              ? 'bg-[#4287f5]/20 border-[#4287f5] shadow-[0_0_15px_rgba(66,135,245,0.3)]'
              : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
          }`}
        >
          <div className="bg-[#4287f5]/20 p-2 rounded-lg text-[#4287f5]">
            <CloudRain className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-slate-900">Heavy Rain</h4>
            <p className="text-xs text-slate-500">Swaps outdoor for indoor.</p>
          </div>
        </button>

        <button
          onClick={() => onTriggerPivot('Traffic Gridlock')}
          className={`p-4 rounded-xl flex items-center gap-3 transition-all border ${
            activeTrigger === 'Traffic Gridlock'
              ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
              : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
          }`}
        >
          <div className="bg-orange-500/20 p-2 rounded-lg text-orange-500">
            <Car className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-slate-900">Traffic Gridlock</h4>
            <p className="text-xs text-slate-500">Extends travel time.</p>
          </div>
        </button>

      </div>

      <button
        onClick={() => onTriggerPivot('None')}
        className="mt-4 py-3 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-slate-600"
      >
        <RefreshCcw className="w-4 h-4" /> Reset Simulation
      </button>
    </div>
  );
};
