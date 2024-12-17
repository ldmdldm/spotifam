import React from 'react';
import { Disc, Radio, Headphones } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

function FloatingMusicNotes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -right-8 top-20 opacity-10">
        <Disc className="w-48 h-48 text-white animate-spin-slow" />
      </div>
      <div className="absolute left-12 bottom-12 opacity-10">
        <Radio className="w-32 h-32 text-white animate-pulse" />
      </div>
      <div className="absolute right-1/4 top-1/3 opacity-10">
        <Headphones className="w-24 h-24 text-white animate-bounce" />
      </div>
    </div>
  );
}

function WavePattern() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg
        className="w-full h-24 fill-current text-gray-100 transform translate-y-1/2"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
      </svg>
    </div>
  );
}

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative bg-gradient-to-br from-green-600 to-green-700 pb-32 overflow-hidden">
        <FloatingMusicNotes />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          {children}
        </div>
        <WavePattern />
      </div>
    </div>
  );
}