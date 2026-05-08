"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DynamicTimeline } from '@/components/DynamicTimeline';
import { LiveUpdateSidebar } from '@/components/LiveUpdateSidebar';
import { generateInitialItinerary, enginePivot, PivotTrigger } from '@/lib/enginePivot';
import { ItineraryDay } from '@/types/engine';
import { Loader2 } from 'lucide-react';

function ItineraryContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('dest') || 'Tokyo';
  const days = parseInt(searchParams.get('days') || '3');
  const vibe = searchParams.get('vibe') || 'Luxury';

  const [initialItinerary, setInitialItinerary] = useState<ItineraryDay[]>([]);
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryDay[]>([]);
  const [activeTrigger, setActiveTrigger] = useState<PivotTrigger>('None');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simulate network delay / AI generation
    setIsGenerating(true);
    const timer = setTimeout(() => {
      const generated = generateInitialItinerary(city, days);
      setInitialItinerary(generated);
      setCurrentItinerary(generated);
      setIsGenerating(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [city, days]);

  const handleTriggerPivot = (trigger: PivotTrigger) => {
    setActiveTrigger(trigger);
    setCurrentItinerary(enginePivot(city, initialItinerary, trigger));
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 relative z-10">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400">Synthesizing global data for {city}...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full relative z-10">
      <div className="flex-1">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-500">{city}</span> Experience
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            {days} Days • {vibe} Vibe
          </p>
        </header>

        <DynamicTimeline itinerary={currentItinerary} />
      </div>

      <aside className="w-full xl:w-96 shrink-0 mt-8 xl:mt-0">
        <LiveUpdateSidebar 
          onTriggerPivot={handleTriggerPivot}
          activeTrigger={activeTrigger}
        />
      </aside>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      }>
        <ItineraryContent />
      </Suspense>
    </main>
  );
}
