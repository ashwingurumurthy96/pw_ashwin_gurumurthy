"use client";

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { ItineraryItem } from '@/lib/TravelEngine';
import { ReactiveCard } from './ReactiveCard';

interface TimelineViewProps {
  itinerary: ItineraryItem[];
  setItinerary: (items: ItineraryItem[]) => void;
  activeAlerts: Record<string, 'traffic' | 'event' | null>; // Maps location ID to alert type
}

export const TimelineView: React.FC<TimelineViewProps> = ({ itinerary, setItinerary, activeAlerts }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(itinerary);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Keep chronological order of time slots
    const timeSlots = itinerary.map(item => item.timeSlot);
    const newItems = items.map((item, idx) => ({
      ...item,
      timeSlot: timeSlots[idx],
    }));

    setItinerary(newItems);
  };

  if (!mounted) return <div className="min-h-[500px] w-full max-w-2xl mx-auto animate-pulse bg-slate-800/50 rounded-xl" />;

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="absolute left-6 top-4 bottom-4 w-1 bg-slate-700 rounded-full z-0 opacity-50 hidden md:block"></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="timeline">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-h-[500px] relative z-10"
            >
              {itinerary.map((item, index) => (
                <ReactiveCard 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  activeAlert={activeAlerts[item.locationId]} 
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
