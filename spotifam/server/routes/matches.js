import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

function calculateMatchScore(user1Tracks, user2Tracks, user1Genres, user2Genres) {
  const commonTracks = user1Tracks.filter(track1 => 
    user2Tracks.some(track2 => track2.id === track1.id)
  );

  const commonGenres = user1Genres.filter(genre1 => 
    user2Genres.includes(genre1)
  );

  const trackScore = commonTracks.length / Math.max(user1Tracks.length, user2Tracks.length);
  const genreScore = commonGenres.length / Math.max(user1Genres.length, user2Genres.length);

  return {
    score: (trackScore * 0.6) + (genreScore * 0.4),
    commonTracks,
    commonGenres,
  };
}

router.get('/:userId', (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user's tracks and genres
    const userTracks = db.prepare(`
      SELECT t.* FROM tracks t
      JOIN user_tracks ut ON t.id = ut.track_id
      WHERE ut.user_id = ?
    `).all(userId);

    const userGenres = db.prepare(`
      SELECT g.name FROM genres g
      JOIN user_genres ug ON g.id = ug.genre_id
      WHERE ug.user_id = ?
    `).all(userId).map(g => g.name);

    // Get all other users with their tracks and genres
    const otherUsers = db.prepare(`
      SELECT * FROM users WHERE id != ?
    `).all(userId);

    const getTracksStmt = db.prepare(`
      SELECT t.* FROM tracks t
      JOIN user_tracks ut ON t.id = ut.track_id
      WHERE ut.user_id = ?
    `);

    const getGenresStmt = db.prepare(`
      SELECT g.name FROM genres g
      JOIN user_genres ug ON g.id = ug.genre_id
      WHERE ug.user_id = ?
    `);

    // Calculate and store matches
    const matches = otherUsers.map(otherUser => {
      const otherUserTracks = getTracksStmt.all(otherUser.id);
      const otherUserGenres = getGenresStmt.all(otherUser.id).map(g => g.name);

      const { score, commonTracks, commonGenres } = calculateMatchScore(
        userTracks,
        otherUserTracks,
        userGenres,
        otherUserGenres
      );

      // Store match
      const matchId = Math.random().toString(36).substr(2, 9);
      db.prepare(`
        INSERT INTO matches (id, user_id, matched_user_id, score, common_tracks, common_genres)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id, matched_user_id) DO UPDATE SET
          score = excluded.score,
          common_tracks = excluded.common_tracks,
          common_genres = excluded.common_genres
      `).run(
        matchId,
        userId,
        otherUser.id,
        score,
        JSON.stringify(commonTracks),
        JSON.stringify(commonGenres)
      );

      return {
        matchedUser: {
          id: otherUser.id,
          displayName: otherUser.display_name,
          imageUrl: otherUser.image_url,
          spotifyUrl: otherUser.spotify_url,
        },
        score,
        commonTracks,
        commonGenres,
      };
    });

    // Sort matches by score
    matches.sort((a, b) => b.score - a.score);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const matchRoutes = router;