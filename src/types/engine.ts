export type Vibe = 'Luxury' | 'Backpacker' | 'Food-centric' | 'Digital Nomad';

export interface Activity {
  id: string;
  name: string;
  isOutdoor: boolean;
  energyCost: number; // 1 to 10
  category: string;
  description: string;
}

export interface ActivityInstance {
  id: string; // unique to the timeline instance
  activityId: string;
  activity: Activity;
  timeSlot: string; // e.g. '09:00 AM - 11:00 AM'
  travelTimeFromPrevious: number; // in minutes
}

export interface ItineraryDay {
  dayNumber: number;
  activities: ActivityInstance[];
}

export interface UserPreferences {
  destination: string;
  durationDays: number;
  vibe: Vibe;
}
