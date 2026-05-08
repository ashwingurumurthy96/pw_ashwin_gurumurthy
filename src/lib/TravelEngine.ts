import { Location, mockDatabase } from './mockDatabase';

export interface ItineraryItem {
  id: string; // Unique instance ID for the timeline card
  locationId: string;
  location: Location;
  timeSlot: string; // e.g. "09:00 AM - 11:00 AM"
}

export type Constraint = 'Rain' | 'Low Energy' | 'None';

export const recalculateItinerary = (
  currentItinerary: ItineraryItem[],
  constraint: Constraint
): ItineraryItem[] => {
  if (constraint === 'None') return currentItinerary;

  return currentItinerary.map((item) => {
    let needsSwap = false;
    let requiredType: 'indoor' | 'outdoor' | undefined;
    let requiredEnergy: 'low' | 'medium' | 'high' | undefined;

    if (constraint === 'Rain' && item.location.type === 'outdoor') {
      needsSwap = true;
      requiredType = 'indoor';
    }

    if (constraint === 'Low Energy' && item.location.energyLevel === 'high') {
      needsSwap = true;
      requiredEnergy = 'low';
      // If it was already outdoor and it's raining, we'd need both, but our simple logic 
      // processes one constraint at a time.
    }

    if (needsSwap) {
      // Avoid locations already in the itinerary
      const currentLocIds = currentItinerary.map((i) => i.locationId);
      
      const candidates = mockDatabase.filter((loc) => {
        if (currentLocIds.includes(loc.id)) return false;
        if (requiredType && loc.type !== requiredType) return false;
        if (requiredEnergy && loc.energyLevel !== requiredEnergy) return false;
        return true;
      });

      if (candidates.length > 0) {
        // Shuffle or pick first. Let's just pick a random one to feel "dynamic".
        const newLocation = candidates[Math.floor(Math.random() * candidates.length)];
        return {
          ...item,
          locationId: newLocation.id,
          location: newLocation,
        };
      }
    }

    return item;
  });
};
