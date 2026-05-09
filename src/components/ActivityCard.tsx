"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ActivityInstance } from '@/types/engine';
import { CloudSun, Building, Battery, BatteryFull, Clock, MapPin, Navigation } from 'lucide-react';

interface ActivityCardProps {
  instance: ActivityInstance;
  index: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ instance, index }) => {
  const { activity, timeSlot, travelTimeFromPrevious } = instance;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex flex-col gap-2"
    >
      {/* Travel Time Indicator if applicable */}
      {travelTimeFromPrevious > 0 && (
        <div className="flex items-center gap-2 text-xs font-medium text-fuchsia-400 ml-8 my-1 bg-fuchsia-500/10 w-fit px-3 py-1 rounded-full border border-fuchsia-500/20">
          <Navigation className="w-3 h-3" />
          <span>{travelTimeFromPrevious} mins travel</span>
        </div>
      )}

      <div className={`glass-panel p-5 rounded-2xl flex flex-col gap-3 group hover:glow-blue transition-all duration-300 relative overflow-hidden`}>
        {/* Category Badge bg */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <MapPin className="w-24 h-24" />
        </div>

        <div className="flex justify-between items-start z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{activity.name}</h3>
            <p className="text-sm text-slate-600 max-w-sm">{activity.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-700 flex items-center gap-1 border border-slate-300">
              <Clock className="w-3 h-3" /> {timeSlot}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 z-10">
          {/* Outdoor/Indoor Badge */}
          <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${
            activity.isOutdoor 
              ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' 
              : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
          }`}>
            {activity.isOutdoor ? <CloudSun className="w-3 h-3" /> : <Building className="w-3 h-3" />}
            {activity.isOutdoor ? 'Outdoor' : 'Indoor'}
          </span>
          
          <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border bg-slate-100 text-slate-600 border-slate-300">
            {activity.category}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-between mt-1 z-10 border-t border-slate-300 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Time Required</span>
              <span className="text-sm font-medium text-slate-700">
                {activity.timeRequired}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
