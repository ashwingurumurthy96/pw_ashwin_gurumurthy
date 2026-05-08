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
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-teal-400"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">Journey</span>
          </h1>
          <p className="text-slate-400">Configure your global dynamic travel experience.</p>
        </header>

        <form onSubmit={handleLaunch} className="space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" /> Destination
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tokyo, Paris, New York..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all"
            />
          </div>

          {/* Environment Preference */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Environment
            </label>
            <div className="grid grid-cols-3 gap-3">
              {preferences.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreference(p)}
                  className={`py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    preference === p
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-fuchsia-400" /> Duration (Days)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="14"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full accent-fuchsia-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <span className="bg-slate-800 border border-slate-700 text-white font-mono px-4 py-2 rounded-lg min-w-[3rem] text-center">
                {duration}
              </span>
            </div>
          </div>

          {/* Vibe Selector */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" /> Vibe Selector
            </label>
            <div className="grid grid-cols-2 gap-3">
              {vibes.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibe(v)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    vibe === v
                      ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200'
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
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white font-bold text-lg py-4 rounded-xl flex justify-center items-center gap-3 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-shadow"
          >
            <Rocket className="w-5 h-5" /> Initialize Engine
          </motion.button>
        </form>
      </div>
    </div>
  );
};
