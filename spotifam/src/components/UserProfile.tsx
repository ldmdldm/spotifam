import React from 'react';
import { User } from 'lucide-react';
import type { SpotifyProfile } from '../types/spotify';

interface Props {
  profile: SpotifyProfile;
}

export const UserProfile: React.FC<Props> = ({ profile }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      {profile.images[0] ? (
        <img
          src={profile.images[0].url}
          alt={profile.display_name}
          className="w-16 h-16 rounded-full"
        />
      ) : (
        <User className="w-16 h-16 p-4 bg-gray-100 rounded-full" />
      )}
      <div>
        <h2 className="text-xl font-bold">{profile.display_name}</h2>
        <a
          href={profile.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-700"
        >
          View Spotify Profile
        </a>
      </div>
    </div>
  );
};