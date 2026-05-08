"use client";

import React from 'react';
import { ItineraryDay } from '@/types/engine';
import { ActivityCard } from './ActivityCard';

interface DynamicTimelineProps {
  itinerary: ItineraryDay[];
}

export const DynamicTimeline: React.FC<DynamicTimelineProps> = ({ itinerary }) => {
  if (itinerary.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12 pb-24">
      {itinerary.map((day) => (
        <div key={`day-${day.dayNumber}`} className="relative">
          {/* Day Header */}
          <div className="sticky top-0 md:top-6 z-20 bg-[#0f172a]/90 backdrop-blur-md py-4 mb-4 border-b border-slate-700/50">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 inline-block">
              Day {day.dayNumber}
            </h2>
          </div>

          {/* Timeline Line */}
          <div className="absolute left-[19px] top-20 bottom-0 w-1 bg-slate-800 rounded-full z-0 hidden md:block"></div>

          {/* Activities */}
          <div className="space-y-6 relative z-10 md:pl-10">
            {day.activities.map((instance, index) => (
              <ActivityCard 
                key={instance.id} 
                instance={instance} 
                index={index} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
