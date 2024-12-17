import { getCollaborationScore } from './collaborationAnalyzer.js';

export function calculateArtistMatches(userTracks, matchedUserTracks) {
  const artistMatches = new Map();
  const collaborations = getCollaborationScore([...userTracks, ...matchedUserTracks]);

  // Build artist matches with collaboration data
  for (const track of userTracks) {
    for (const artist of track.artists) {
      if (!artistMatches.has(artist.id)) {
        const collaborationCount = Array.from(collaborations.entries())
          .filter(([key]) => key.includes(artist.id))
          .reduce((sum, [, count]) => sum + count, 0);

        artistMatches.set(artist.id, {
          id: artist.id,
          name: artist.name,
          genres: artist.genres || [],
          matchCount: 0,
          collaborationScore: collaborationCount
        });
      }
    }
  }

  // Count matches
  for (const track of matchedUserTracks) {
    for (const artist of track.artists) {
      if (artistMatches.has(artist.id)) {
        const artistMatch = artistMatches.get(artist.id);
        artistMatch.matchCount++;
      }
    }
  }

  return Array.from(artistMatches.values())
    .filter(artist => artist.matchCount > 0)
    .sort((a, b) => {
      const scoreA = a.matchCount * 0.7 + a.collaborationScore * 0.3;
      const scoreB = b.matchCount * 0.7 + b.collaborationScore * 0.3;
      return scoreB - scoreA;
    })
    .slice(0, 5);
}