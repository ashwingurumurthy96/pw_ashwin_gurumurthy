import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ItineraryDay } from '@/types/engine';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const { city, days, vibe, trigger, currentItinerary, pref } = await request.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    let prompt = '';

    if (trigger && currentItinerary && trigger !== 'None') {
      prompt = `You are a real-time travel and logistics expert.
I have a current itinerary for ${city}. A sudden real-time event has occurred: "${trigger}".

Here is the current itinerary in JSON format:
${JSON.stringify(currentItinerary, null, 2)}

If the trigger is "Heavy Rain": Swap all "isOutdoor: true" activities with indoor alternatives.
If the trigger is "Traffic Gridlock": Keep the same activities but increase all "travelTimeFromPrevious" by 30 mins.

Return the completely updated JSON array of ItineraryDay objects matching this exact TypeScript schema:
\`\`\`typescript
interface Activity {
  id: string; // unique ID
  name: string;
  isOutdoor: boolean;
  category: string; 
  description: string; // Keep concise, max 1 sentence.
  timeRequired: string;
}

interface ActivityInstance {
  id: string;
  activityId: string;
  activity: Activity;
  timeSlot: string; 
  travelTimeFromPrevious: number;
}

interface ItineraryDay {
  dayNumber: number;
  activities: ActivityInstance[];
}
\`\`\`
Return ONLY the JSON array. Do not include markdown formatting.`;

    } else {
      prompt = `You are a real-time travel and logistics expert.
Create a detailed ${days}-day itinerary for ${city} with a "${vibe}" vibe.
The user has specified an environment preference: "${pref}".
Ensure your activity selection strictly adheres to this preference (e.g. if "Outdoor", only include isOutdoor: true. If "Mixed", include both).

Your output must be a strictly valid JSON array of ItineraryDay objects matching this exact TypeScript schema:
\`\`\`typescript
interface Activity {
  id: string; // generate a unique string ID
  name: string;
  isOutdoor: boolean; // Must respect the "${pref}" preference!
  category: string; // e.g., Museum, Relaxation, Cultural, Sightseeing, Food-centric, Adventure
  description: string; // Keep very concise, max 1 sentence to optimize speed.
  timeRequired: string; // e.g., "2-3 hours"
}

interface ActivityInstance {
  id: string; // generate a unique string ID for this instance
  activityId: string;
  activity: Activity;
  timeSlot: string; // e.g. '09:00 AM - 11:00 AM'
  travelTimeFromPrevious: number; // in minutes (0 for the first activity of the day)
}

interface ItineraryDay {
  dayNumber: number;
  activities: ActivityInstance[]; // typically 3 activities per day
}
\`\`\`

Return ONLY the JSON array. Do not include markdown formatting.`;
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the JSON strictly
    let itinerary: ItineraryDay[];
    try {
      itinerary = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse Gemini output:", responseText);
      return NextResponse.json({ error: 'Failed to generate valid itinerary structure.' }, { status: 500 });
    }

    return NextResponse.json({ itinerary });
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    if (error.message && error.message.includes('503')) {
      return NextResponse.json({ error: 'Google Gemini AI is currently overloaded. Please wait a moment and try again.' }, { status: 503 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
