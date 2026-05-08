export type ActivityType = 'indoor' | 'outdoor';
export type EnergyLevel = 'low' | 'medium' | 'high';

export interface Location {
  id: string;
  name: string;
  type: ActivityType;
  energyLevel: EnergyLevel;
  zone: string;
  description: string;
}

export const mockDatabase: Location[] = [
  // Outdoor / High Energy
  { id: 'loc-1', name: 'Nandi Hills Trek', type: 'outdoor', energyLevel: 'high', zone: 'Outskirts', description: 'Early morning trek with a view.' },
  { id: 'loc-2', name: 'Cubbon Park Cycling', type: 'outdoor', energyLevel: 'high', zone: 'Central', description: 'Cycle through the green heart of the city.' },
  
  // Outdoor / Low Energy
  { id: 'loc-3', name: 'Lalbagh Botanical Garden', type: 'outdoor', energyLevel: 'low', zone: 'South', description: 'Relaxing walk among exotic plants and the Glass House.' },
  { id: 'loc-4', name: 'Ulsoor Lake Boating', type: 'outdoor', energyLevel: 'low', zone: 'Central', description: 'Peaceful boat ride at sunset.' },

  // Indoor / High Energy
  { id: 'loc-5', name: 'Play Arena', type: 'indoor', energyLevel: 'high', zone: 'Sarjapur', description: 'Bowling, laser tag, and arcade games.' },
  { id: 'loc-6', name: 'Bounce Inc', type: 'indoor', energyLevel: 'high', zone: 'Orion Mall', description: 'Indoor trampoline park.' },

  // Indoor / Low Energy
  { id: 'loc-7', name: 'UB City Mall', type: 'indoor', energyLevel: 'low', zone: 'Central', description: 'Luxury shopping and fine dining.' },
  { id: 'loc-8', name: 'Visvesvaraya Museum', type: 'indoor', energyLevel: 'low', zone: 'Central', description: 'Interactive science exhibits.' },
  { id: 'loc-9', name: 'Toit Brewpub', type: 'indoor', energyLevel: 'low', zone: 'Indiranagar', description: 'Famous microbrewery with great ambiance.' },
  { id: 'loc-10', name: 'Blossom Book House', type: 'indoor', energyLevel: 'low', zone: 'Church Street', description: 'Lose yourself in three floors of books.' },
];
