"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DynamicTimeline } from '@/components/DynamicTimeline';
import { LiveUpdateSidebar } from '@/components/LiveUpdateSidebar';
import { ItineraryDay, PivotTrigger } from '@/types/engine';
import { Loader2, ArrowLeft, Home } from 'lucide-react';

function ItineraryContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('dest') || 'Tokyo';
  const days = parseInt(searchParams.get('days') || '3');
  const vibe = searchParams.get('vibe') || 'Luxury';
  const pref = searchParams.get('pref') || 'Mixed';

  const [initialItinerary, setInitialItinerary] = useState<ItineraryDay[]>([]);
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryDay[]>([]);
  const [activeTrigger, setActiveTrigger] = useState<PivotTrigger>('None');
  const [isGenerating, setIsGenerating] = useState(true);
  const [isPivoting, setIsPivoting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const generateItinerary = async () => {
      setIsGenerating(true);
      setErrorMsg(null);
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city, days, vibe, pref })
        });
        const data = await res.json();
        if (data.itinerary) {
          setInitialItinerary(data.itinerary);
          setCurrentItinerary(data.itinerary);
        } else {
          console.error("Error generating itinerary:", data.error);
          setErrorMsg(data.error || 'Failed to generate itinerary.');
        }
      } catch (e) {
        console.error("Fetch failed", e);
        setErrorMsg('Network error occurred while fetching itinerary.');
      } finally {
        setIsGenerating(false);
      }
    };
    generateItinerary();
  }, [city, days, vibe, pref]);

  const handleTriggerPivot = async (trigger: PivotTrigger) => {
    setActiveTrigger(trigger);
    if (trigger === 'None') {
      setCurrentItinerary(initialItinerary);
      return;
    }
    
    setIsPivoting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          city, 
          days, 
          vibe, 
          pref,
          trigger, 
          currentItinerary: initialItinerary 
        })
      });
      const data = await res.json();
      if (data.itinerary) {
        setCurrentItinerary(data.itinerary);
      } else {
        setErrorMsg(data.error || 'Failed to pivot itinerary.');
      }
    } catch (e) {
      console.error("Pivot fetch failed", e);
      setErrorMsg('Network error occurred while pivoting.');
    } finally {
      setIsPivoting(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 relative z-10">
        <Loader2 className="w-12 h-12 text-[#4287f5] animate-spin" />
        <p className="text-slate-500">Synthesizing global data for {city} via Gemini...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 relative z-10 text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl max-w-md">
          <h3 className="font-bold mb-2">Error Generating Itinerary</h3>
          <p className="text-sm">{errorMsg}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg transition-colors border border-slate-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full relative z-10">
      <div className="flex-1 overflow-hidden">
        <header className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#4287f5] mb-6 transition-colors font-medium">
            <Home className="w-4 h-4" /> Back to Launchpad
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
            Your <span className="text-[#4287f5]">{city}</span> Experience
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            {days} Days • {vibe} Vibe • {pref} Preference
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4287f5]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-[#4287f5] animate-spin" />
        </div>
      }>
        <ItineraryContent />
      </Suspense>
    </main>
  );
}
