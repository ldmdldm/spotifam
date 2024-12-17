import { calculateMatchScore } from '../utils/matching/matchCalculator.js';
import { trackModel } from '../models/track.js';
import { genreModel } from '../models/genre.js';
import { matchModel } from '../models/match.js';
import { nanoid } from 'nanoid';
import { db } from '../db/index.js';

export async function updateMatches(userId) {
  const userTracks = trackModel.getUserTracks.all(userId);
  const userGenres = genreModel.getUserGenres.all(userId).map(g => g.name);
  const otherUsers = db.prepare('SELECT * FROM users WHERE id != ?').all(userId);

  const matches = await Promise.all(otherUsers.map(async (otherUser) => {
    const otherUserTracks = trackModel.getUserTracks.all(otherUser.id);
    const otherUserGenres = genreModel.getUserGenres.all(otherUser.id).map(g => g.name);

    const matchResult = calculateMatchScore(userTracks, otherUserTracks, userGenres, otherUserGenres);
    const matchId = nanoid();

    await matchModel.upsert.run({
      id: matchId,
      userId,
      matchedUserId: otherUser.id,
      score: matchResult.matchStrength.overall,
      commonTracks: JSON.stringify(matchResult.commonTracks),
      commonGenres: JSON.stringify(matchResult.genreBreakdown)
    });

    return {
      matchedUser: {
        id: otherUser.id,
        displayName: otherUser.display_name,
        imageUrl: otherUser.image_url,
        spotifyUrl: otherUser.spotify_url
      },
      ...matchResult
    };
  }));

  return matches.sort((a, b) => b.matchStrength.overall - a.matchStrength.overall);
}

export default { updateMatches };