const BASE_URL = 'https://api.spotify.com/v1';

async function fetchWithToken(endpoint: string, token: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || 'API request failed');
  }
  
  return response.json();
}

export const spotifyApi = {
  getCurrentUser: (token: string) => 
    fetchWithToken('/me', token),
    
  getTopTracks: (token: string) => 
    fetchWithToken('/me/top/tracks?limit=50&time_range=medium_term', token),
    
  getLikedSongs: (token: string) => 
    fetchWithToken('/me/tracks?limit=50', token),
    
  getArtist: (token: string, artistId: string) =>
    fetchWithToken(`/artists/${artistId}`, token),
};