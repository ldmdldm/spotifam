import React from 'react';
import { Music } from 'lucide-react';
import { generateSpotifyAuthUrl } from '../utils/spotify-auth';

interface Props {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function LoginButton({ className = '', variant = 'primary' }: Props) {
  const baseStyles = "inline-flex items-center font-semibold rounded-full transition-all transform hover:-translate-y-0.5";
  const variants = {
    primary: "px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg shadow-lg hover:shadow-xl",
    secondary: "px-6 py-3 bg-white hover:bg-gray-50 text-green-600 text-base border-2 border-green-600 shadow-md hover:shadow-lg"
  };

  return (
    <a
      href={generateSpotifyAuthUrl()}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <Music className="w-6 h-6 mr-3" />
      Connect with Spotify
    </a>
  );
}