import { Activity, ActivityInstance, ItineraryDay } from '@/types/engine';
import { generateGlobalDatabase } from './globalDatabase';

export type PivotTrigger = 'Heavy Rain' | 'Traffic Gridlock' | 'Energy Low' | 'None';

export const generateInitialItinerary = (city: string, days: number): ItineraryDay[] => {
  const db = generateGlobalDatabase(city);
  const itinerary: ItineraryDay[] = [];
  
  let usedIds = new Set<string>();

  for (let d = 1; d <= days; d++) {
    const dailyActivities: ActivityInstance[] = [];
    for (let a = 1; a <= 3; a++) {
      const available = db.filter(act => !usedIds.has(act.id));
      if (available.length === 0) break; // Exhausted DB
      
      const selected = available[Math.floor(Math.random() * available.length)];
      usedIds.add(selected.id);
      
      dailyActivities.push({
        id: `inst-${d}-${a}-${selected.id}-${Math.random().toString(36).substring(7)}`,
        activityId: selected.id,
        activity: selected,
        timeSlot: a === 1 ? '09:00 AM - 12:00 PM' : a === 2 ? '01:00 PM - 04:00 PM' : '05:00 PM - 08:00 PM',
        travelTimeFromPrevious: a === 1 ? 0 : Math.floor(Math.random() * 20) + 15 // 15 to 35 mins
      });
    }
    
    itinerary.push({
      dayNumber: d,
      activities: dailyActivities
    });
  }
  
  return itinerary;
};

export const enginePivot = (
  city: string, 
  currentItinerary: ItineraryDay[], 
  trigger: PivotTrigger
): ItineraryDay[] => {
  if (trigger === 'None') return currentItinerary;

  const db = generateGlobalDatabase(city);
  const usedIds = new Set(currentItinerary.flatMap(d => d.activities.map(a => a.activityId)));

  return currentItinerary.map(day => ({
    ...day,
    activities: day.activities.map(instance => {
      let needsSwap = false;
      let filterFn: (a: Activity) => boolean = () => true;

      if (trigger === 'Heavy Rain' && instance.activity.isOutdoor) {
        needsSwap = true;
        filterFn = (a) => !a.isOutdoor;
      }

      if (trigger === 'Energy Low' && instance.activity.energyCost > 5) {
        needsSwap = true;
        filterFn = (a) => a.energyCost <= 4;
      }

      if (trigger === 'Traffic Gridlock') {
        // Only increase travel time if there's actual travel
        return {
          ...instance,
          travelTimeFromPrevious: instance.travelTimeFromPrevious > 0 ? instance.travelTimeFromPrevious + 45 : 0
        };
      }

      if (needsSwap) {
        // Find alternative
        const alternatives = db.filter(a => !usedIds.has(a.id) && filterFn(a));
        if (alternatives.length > 0) {
          const newAct = alternatives[0];
          usedIds.add(newAct.id);
          return {
            ...instance,
            activityId: newAct.id,
            activity: newAct,
          };
        }
      }

      return instance;
    })
  }));
};
