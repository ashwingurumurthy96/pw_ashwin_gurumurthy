"use client";

import { Launchpad } from '@/components/Launchpad';

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 flex items-center justify-center relative overflow-hidden">
      {/* Background grid pattern for light aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="z-10 w-full">
        <Launchpad />
      </div>
    </main>
  );
}
