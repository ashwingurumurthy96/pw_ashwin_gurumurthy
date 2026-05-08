"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ImageCarouselProps {
  city: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ city }) => {
  // Generate an array of 4 unique image URLs based on the city
  const images = Array.from({ length: 4 }).map((_, i) => 
    `https://loremflickr.com/800/400/${encodeURIComponent(city)}?lock=${i + 1}`
  );

  return (
    <div className="w-full mb-12 relative">
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {images.map((src, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="snap-center shrink-0 w-full md:w-[80%] lg:w-[60%] aspect-[2/1] rounded-2xl overflow-hidden relative shadow-lg border border-slate-700/50"
          >
            <img 
              src={src} 
              alt={`${city} landmark ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Gradient overlay for aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Scroll hints */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/50 backdrop-blur border border-slate-700/50 flex items-center justify-center pointer-events-none shadow-lg text-white opacity-50 md:hidden">
        &rarr;
      </div>
    </div>
  );
};
