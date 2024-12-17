import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateSpotifyToken } from '../utils/spotify-auth';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = sessionStorage.getItem('spotify_token');
        
        if (storedToken) {
          // Validate stored token
          const isValid = await validateSpotifyToken(storedToken);
          
          if (isValid) {
            setToken(storedToken);
          } else {
            // Token is invalid, remove it
            sessionStorage.removeItem('spotify_token');
            setError('Session expired. Please log in again.');
          }
        }

        // Check for error in location state
        const state = location.state as { error?: string };
        if (state?.error) {
          setError(state.error);
          // Clean up error from location state
          navigate(location.pathname, { 
            replace: true,
            state: {} 
          });
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication.');
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [location, navigate]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('spotify_token');
    setToken(null);
    setError(null);
    navigate('/', { replace: true });
  }, [navigate]);

  return { token, isInitialized, error, logout };
}