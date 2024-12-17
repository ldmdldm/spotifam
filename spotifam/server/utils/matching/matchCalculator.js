import { calculateArtistMatches } from './artistMatcher.js';
import { calculateGenreStats } from './genreMatcher.js';
import { calculateTimeDistribution } from './timeMatcher.js';
import { calculateListeningPatterns } from './patternMatcher.js';

export function calculateMatchScore(user1Tracks, user2Tracks, user1Genres, user2Genres) {
  const commonTracks = user1Tracks.filter(track1 => 
    user2Tracks.some(track2 => track1.id === track2.id)
  );

  const topArtists = calculateArtistMatches(user1Tracks, user2Tracks);
  const genreBreakdown = calculateGenreStats(user1Genres, user2Genres);
  const timeDistribution = calculateTimeDistribution(commonTracks);
  const listeningPatterns = calculateListeningPatterns(user1Tracks, user2Tracks);

  const trackScore = commonTracks.length / Math.max(user1Tracks.length, user2Tracks.length);
  const genreScore = genreBreakdown.reduce((acc, g) => acc + g.percentage, 0) / genreBreakdown.length;
  const artistScore = topArtists.reduce((acc, a) => acc + (a.matchCount / Math.max(user1Tracks.length, user2Tracks.length)), 0);

  const recentlyAddedCommon = commonTracks
    .sort((a, b) => new Date(b.added_at) - new Date(a.added_at))
    .slice(0, 5);
  const recencyScore = recentlyAddedCommon.length / 5;

  const insights = {
    eraCompatibility: timeDistribution.dominantEra,
    mainGenreOverlap: genreBreakdown.filter(g => g.isMainGenre).length,
    listeningStyle: listeningPatterns.popularityMatch > 0.7 ? 'Mainstream' : 'Explorer',
    collaborationScore: topArtists.reduce((sum, artist) => sum + artist.collaborationScore, 0) / topArtists.length
  };

  return {
    matchStrength: {
      overall: (trackScore * 0.25) + (genreScore * 0.25) + (artistScore * 0.25) + 
               (recencyScore * 0.15) + (listeningPatterns.popularityMatch * 0.1),
      genres: genreScore,
      artists: artistScore,
      tracks: trackScore,
      recency: recencyScore
    },
    commonTracks,
    topArtists,
    genreBreakdown,
    timeDistribution,
    recentlyAddedCommon,
    listeningPatterns,
    insights
  };
}