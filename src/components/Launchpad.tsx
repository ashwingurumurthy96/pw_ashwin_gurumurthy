"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vibe } from '@/types/engine';
import { MapPin, CalendarDays, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Launchpad: React.FC = () => {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState<number>(3);
  const [vibe, setVibe] = useState<Vibe>('Luxury');
  const [preference, setPreference] = useState<'Mixed' | 'Outdoor' | 'Indoor'>('Mixed');

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    
    const params = new URLSearchParams({
      dest: destination,
      days: duration.toString(),
      vibe: vibe,
      pref: preference
    });
    
    router.push(`/itinerary?${params.toString()}`);
  };

  const vibes: Vibe[] = ['Luxury', 'Backpacker', 'Food-centric', 'Digital Nomad'];
  const preferences = ['Mixed', 'Outdoor', 'Indoor'] as const;

  return (
    <div className="w-full max-w-xl mx-auto glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
      {/* Background glow effects - Light mode variant */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4287f5] via-[#4287f5] to-teal-400"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#4287f5]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <header className="mb-8 text-center flex flex-col items-center">
          <img src="/logo.png" alt="RouteNova Logo" className="w-24 h-24 object-contain mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4287f5] mb-2 tracking-tight">
            RouteNova
          </h1>
          <p className="text-slate-500 font-medium">Find Your Perfect Path</p>
        </header>

        <form onSubmit={handleLaunch} className="space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4287f5]" /> Destination
            </label>
            <input
              type="text"
              required
              placeholder="e.g. San Francisco, Tokyo, Paris..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-[#4287f5] focus:ring-1 focus:ring-[#4287f5] rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Environment Preference */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4287f5]" /> Environment
            </label>
            <div className="grid grid-cols-3 gap-3">
              {preferences.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreference(p)}
                  className={`py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    preference === p
                      ? 'bg-[#4287f5]/10 border-[#4287f5] text-[#4287f5] shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#4287f5]" /> Duration (Days)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="14"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full accent-[#4287f5] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="bg-white border border-slate-200 text-slate-700 font-mono px-4 py-2 rounded-lg min-w-[3rem] text-center">
                {duration}
              </span>
            </div>
          </div>

          {/* Vibe Selector */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4287f5]" /> Vibe Selector
            </label>
            <div className="grid grid-cols-2 gap-3">
              {vibes.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibe(v)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    vibe === v
                      ? 'bg-[#4287f5]/10 border-[#4287f5] text-[#4287f5] shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Launch Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-8 bg-[#4287f5] text-white font-bold text-lg py-4 rounded-xl flex justify-center items-center gap-3 hover:bg-[#3270d1] hover:shadow-lg transition-all"
          >
            <Rocket className="w-5 h-5" /> Explore
          </motion.button>
        </form>
      </div>
    </div>
  );
};
