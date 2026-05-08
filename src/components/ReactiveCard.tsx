"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ItineraryItem } from '@/lib/TravelEngine';
import { MapPin, Clock, Battery, BatteryFull, CloudSun, Building, AlertTriangle, Zap } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

interface ReactiveCardProps {
  item: ItineraryItem;
  index: number;
  activeAlert?: 'traffic' | 'event' | null;
}

export const ReactiveCard: React.FC<ReactiveCardProps> = ({ item, index, activeAlert }) => {
  // Determine glow class based on active alert
  let alertClass = '';
  if (activeAlert === 'traffic') alertClass = 'glow-red border-red-500/50';
  else if (activeAlert === 'event') alertClass = 'glow-magenta border-fuchsia-500/50';
  else alertClass = 'hover:glow-blue border-transparent transition-all duration-300';

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 ${snapshot.isDragging ? 'opacity-90 scale-105 z-50' : 'z-10'} relative`}
          style={{ ...provided.draggableProps.style }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`glass-panel p-5 rounded-xl flex items-center justify-between group ${alertClass} ${snapshot.isDragging ? 'glow-blue border-blue-500/50' : ''}`}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {item.location.name}
                    {activeAlert === 'traffic' && <AlertTriangle className="text-red-400 w-5 h-5 animate-pulse" />}
                    {activeAlert === 'event' && <Zap className="text-fuchsia-400 w-5 h-5 animate-pulse" />}
                  </h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" /> {item.timeSlot}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                   <span className="text-xs font-semibold px-2 py-1 bg-slate-700 rounded-full text-slate-300 flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {item.location.zone}
                   </span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-slate-700/50 text-slate-300 border border-slate-600/50">
                  {item.location.type === 'outdoor' ? <CloudSun className="w-3 h-3 text-yellow-400"/> : <Building className="w-3 h-3 text-blue-400"/>}
                  {item.location.type.charAt(0).toUpperCase() + item.location.type.slice(1)}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-slate-700/50 text-slate-300 border border-slate-600/50">
                  {item.location.energyLevel === 'high' ? <BatteryFull className="w-3 h-3 text-green-400"/> : <Battery className="w-3 h-3 text-yellow-400"/>}
                  {item.location.energyLevel.charAt(0).toUpperCase() + item.location.energyLevel.slice(1)} Energy
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};
