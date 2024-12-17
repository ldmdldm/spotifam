import { useState, useEffect, useCallback, useRef } from 'react';
import { spotifyApi } from '../services/spotify-api';
import { api } from '../services/api';
import type { SpotifyProfile, MatchResult } from '../types/spotify';

export function useUserData(token: string | null) {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const fetchUserData = useCallback(async () => {
    if (!token || fetchingRef.current) return;
    
    fetchingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user profile and music data from Spotify
      const userProfile = await spotifyApi.getCurrentUser(token);
      setProfile(userProfile);

      const [topTracks, likedSongs] = await Promise.all([
        spotifyApi.getTopTracks(token),
        spotifyApi.getLikedSongs(token)
      ]);

      // Process tracks and get artist genres
      const tracks = [...topTracks.items, ...likedSongs.items];
      const uniqueArtistIds = Array.from(new Set(
        tracks.flatMap(track => track.artists.map(artist => artist.id))
      ));

      const artistGenres = await Promise.all(
        uniqueArtistIds.map(artistId => spotifyApi.getArtist(token, artistId))
      );

      const allGenres = artistGenres.flatMap(artist => artist.genres || []);
      const uniqueGenres = Array.from(new Set(allGenres));

      // Prepare user data for API
      const userData = {
        id: userProfile.id,
        displayName: userProfile.display_name,
        spotifyUrl: userProfile.external_urls.spotify,
        imageUrl: userProfile.images[0]?.url,
        topTracks: tracks.map(track => ({
          id: track.id,
          name: track.name,
          artistName: track.artists[0].name,
          albumImageUrl: track.album.images[0]?.url,
        })),
        genres: uniqueGenres,
      };

      // Save user data and get matches
      const { matches: newMatches } = await api.saveUser(userData);
      setMatches(newMatches);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load your music profile. Please try again.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setProfile(null);
      setMatches([]);
    }
  }, [token, fetchUserData]);

  return { profile, matches, loading, error, refetch: fetchUserData };
}