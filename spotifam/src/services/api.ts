import type { UserData, MatchResult } from '../types/spotify';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://spotifam.vercel.app/api'
  : 'http://localhost:3000/api';

export const api = {
  async saveUser(userData: UserData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      return mockMatchData(userData);
    }
  },

  async getMatches(userId: string): Promise<MatchResult[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  }
};

// Fallback mock data function
function mockMatchData(userData: UserData) {
  return {
    matches: [
      {
        matchedUser: {
          id: 'mock_user_1',
          displayName: 'Music Lover',
          spotifyUrl: 'https://open.spotify.com',
          imageUrl: 'https://source.unsplash.com/random/400x400?face-1'
        },
        matchStrength: {
          overall: 0.85,
          genres: 0.9,
          artists: 0.8,
          tracks: 0.85,
          recency: 0.75
        },
        commonTracks: userData.topTracks.slice(0, 3),
        insights: {
          eraCompatibility: 'modern',
          mainGenreOverlap: 3,
          listeningStyle: 'Explorer',
          collaborationScore: 0.75
        }
      }
    ]
  };
}