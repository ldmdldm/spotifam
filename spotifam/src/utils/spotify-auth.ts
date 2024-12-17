import { SPOTIFY_CONFIG } from '../config/spotify';

export const generateSpotifyAuthUrl = () => {
  const state = crypto.randomUUID();
  sessionStorage.setItem('spotify_auth_state', state);
  
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'token',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES,
    state: state,
    show_dialog: 'true'
  });
  
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessTokenFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const hashParams = new URLSearchParams(
    window.location.hash.substring(1) // Remove the leading #
  );
  
  const token = hashParams.get('access_token');
  const state = hashParams.get('state');
  const storedState = sessionStorage.getItem('spotify_auth_state');
  
  // Clean up stored state
  sessionStorage.removeItem('spotify_auth_state');
  
  if (!token) {
    console.error('No token found in URL');
    return null;
  }
  
  // Validate state if both exist
  if (state && storedState && state !== storedState) {
    console.error('State mismatch in auth flow');
    return null;
  }
  
  return token;
};

export const validateSpotifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Token validation error:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};