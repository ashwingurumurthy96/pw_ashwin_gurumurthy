import { Activity } from '@/types/engine';

// Mock database simulating dynamic search results
export const generateGlobalDatabase = (city: string): Activity[] => {
  const normalizedCity = city.toLowerCase();

  if (normalizedCity.includes('tokyo')) {
    return [
      { id: 't-1', name: 'Senso-ji Temple', isOutdoor: true, energyCost: 4, category: 'Cultural', description: 'Ancient Buddhist temple in Asakusa.' },
      { id: 't-2', name: 'Shibuya Crossing', isOutdoor: true, energyCost: 7, category: 'Sightseeing', description: 'The busiest pedestrian intersection.' },
      { id: 't-3', name: 'teamLab Planets', isOutdoor: false, energyCost: 3, category: 'Museum', description: 'Immersive digital art museum.' },
      { id: 't-4', name: 'Omoide Yokocho', isOutdoor: false, energyCost: 2, category: 'Food-centric', description: 'Narrow alley packed with yakitori stalls.' },
      { id: 't-5', name: 'Meiji Jingu Shrine', isOutdoor: true, energyCost: 5, category: 'Cultural', description: 'Shinto shrine surrounded by a forest.' },
      { id: 't-6', name: 'Akihabara Arcade', isOutdoor: false, energyCost: 8, category: 'Entertainment', description: 'Multi-floor arcade and anime hub.' },
      { id: 't-7', name: 'Shinjuku Gyoen', isOutdoor: true, energyCost: 3, category: 'Relaxation', description: 'Large park with beautiful gardens.' },
      { id: 't-8', name: 'Tsukiji Outer Market', isOutdoor: true, energyCost: 6, category: 'Food-centric', description: 'Famous street food and seafood market.' },
      { id: 't-9', name: 'Ginza Six Shopping', isOutdoor: false, energyCost: 4, category: 'Luxury', description: 'High-end luxury shopping complex.' },
      { id: 't-10', name: 'Tokyo Skytree', isOutdoor: false, energyCost: 2, category: 'Sightseeing', description: 'Observation tower with panoramic views.' },
    ];
  }

  if (normalizedCity.includes('paris')) {
    return [
      { id: 'p-1', name: 'Eiffel Tower', isOutdoor: true, energyCost: 5, category: 'Sightseeing', description: 'Iconic iron lattice tower on the Champ de Mars.' },
      { id: 'p-2', name: 'Louvre Museum', isOutdoor: false, energyCost: 4, category: 'Museum', description: 'World\'s largest art museum.' },
      { id: 'p-3', name: 'Montmartre Walk', isOutdoor: true, energyCost: 7, category: 'Cultural', description: 'Historic hill district with artistic heritage.' },
      { id: 'p-4', name: 'Le Marais Cafes', isOutdoor: false, energyCost: 2, category: 'Food-centric', description: 'Trendy district with historic architecture and cafes.' },
      { id: 'p-5', name: 'Jardin du Luxembourg', isOutdoor: true, energyCost: 3, category: 'Relaxation', description: 'Beautiful gardens created in 1612.' },
      { id: 'p-6', name: 'Palais Garnier', isOutdoor: false, energyCost: 2, category: 'Luxury', description: 'Opulent opera house.' },
    ];
  }

  // Generic Fallback Data mapped dynamically
  return [
    { id: `g-1`, name: `${city} Central Park`, isOutdoor: true, energyCost: 5, category: 'Relaxation', description: 'Main outdoor gathering space.' },
    { id: `g-2`, name: `${city} National Museum`, isOutdoor: false, energyCost: 3, category: 'Museum', description: 'History and art exhibits.' },
    { id: `g-3`, name: `${city} Old Town Square`, isOutdoor: true, energyCost: 6, category: 'Cultural', description: 'Historic center for walking.' },
    { id: `g-4`, name: `${city} Grand Cafe`, isOutdoor: false, energyCost: 1, category: 'Food-centric', description: 'A cozy spot to eat and relax.' },
    { id: `g-5`, name: `${city} Mountain Trail`, isOutdoor: true, energyCost: 9, category: 'Adventure', description: 'High-energy hiking trail.' },
    { id: `g-6`, name: `${city} Luxury Spa`, isOutdoor: false, energyCost: 1, category: 'Luxury', description: 'Premium relaxation experience.' },
    { id: `g-7`, name: `${city} Shopping Mall`, isOutdoor: false, energyCost: 4, category: 'Entertainment', description: 'Indoor shopping and dining.' },
    { id: `g-8`, name: `${city} Rooftop Bar`, isOutdoor: true, energyCost: 3, category: 'Luxury', description: 'Drinks with a view.' },
  ];
};
