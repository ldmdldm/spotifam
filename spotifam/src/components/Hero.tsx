import React from 'react';
import { Music, Users, BarChart2, Heart } from 'lucide-react';
import { LoginButton } from './LoginButton';

export function Hero() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm 
                    px-4 py-2 rounded-full text-green-100 border border-white/20 mb-8">
        <Music className="w-4 h-4" />
        <span className="text-sm font-medium">Powered by Spotify</span>
      </div>
      <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
        Find Your Music Soulmate
      </h1>
      <p className="text-xl text-green-100 max-w-2xl mx-auto mb-12 leading-relaxed">
        Connect with people who share your musical taste. Discover new friends 
        and artists based on your Spotify listening history.
      </p>
      <LoginButton className="mb-12" />
      <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Match with Music Lovers</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart2 className="w-4 h-4" />
          <span>Get Detailed Insights</span>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4" />
          <span>Find Common Favorites</span>
        </div>
      </div>
    </div>
  );
}