import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenFromUrl, validateSpotifyToken } from '../utils/spotify-auth';
import { LoadingSpinner } from './LoadingSpinner';

export function CallbackHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = getAccessTokenFromUrl();
        
        if (!token) {
          throw new Error('No access token found in URL');
        }

        // Validate the token
        const isValid = await validateSpotifyToken(token);
        if (!isValid) {
          throw new Error('Invalid access token');
        }

        // Store the token and redirect
        sessionStorage.setItem('spotify_token', token);
        
        // Clean up URL and redirect
        navigate('/', { 
          replace: true,
          state: { from: 'callback' }
        });
      } catch (err) {
        console.error('Auth error:', err);
        sessionStorage.removeItem('spotify_token');
        navigate('/', { 
          replace: true,
          state: { error: 'Authentication failed. Please try again.' }
        });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}