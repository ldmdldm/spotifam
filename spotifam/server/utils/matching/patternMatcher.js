export function calculateListeningPatterns(userTracks, matchedUserTracks) {
  const patterns = {
    popularityMatch: 0,
    varietyScore: 0,
    releaseYearSpread: 0
  };

  // Calculate popularity match
  const userPopularity = userTracks.reduce((sum, t) => sum + (t.popularity || 0), 0) / userTracks.length;
  const matchedPopularity = matchedUserTracks.reduce((sum, t) => sum + (t.popularity || 0), 0) / matchedUserTracks.length;
  patterns.popularityMatch = 1 - Math.abs(userPopularity - matchedPopularity) / 100;

  // Calculate variety score (unique artists ratio)
  const userArtists = new Set(userTracks.flatMap(t => t.artists.map(a => a.id))).size;
  const matchedArtists = new Set(matchedUserTracks.flatMap(t => t.artists.map(a => a.id))).size;
  patterns.varietyScore = Math.min(userArtists, matchedArtists) / Math.max(userArtists, matchedArtists);

  // Calculate release year spread
  const getYearSpread = tracks => {
    const years = tracks
      .map(t => t.album?.release_date?.slice(0, 4))
      .filter(Boolean)
      .map(Number);
    return years.length ? Math.max(...years) - Math.min(...years) : 0;
  };

  const userSpread = getYearSpread(userTracks);
  const matchedSpread = getYearSpread(matchedUserTracks);
  patterns.releaseYearSpread = Math.abs(userSpread - matchedSpread) / Math.max(userSpread, matchedSpread);

  return patterns;
}