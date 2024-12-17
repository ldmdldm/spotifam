import db from '../db/index.js';

export const matchModel = {
  upsert: db.prepare(`
    INSERT INTO matches (id, user_id, matched_user_id, score, common_tracks, common_genres)
    VALUES (@id, @userId, @matchedUserId, @score, @commonTracks, @commonGenres)
    ON CONFLICT(user_id, matched_user_id) DO UPDATE SET
      score = @score,
      common_tracks = @commonTracks,
      common_genres = @commonGenres
  `),

  getByUserId: db.prepare(`
    SELECT m.*, u.display_name, u.image_url, u.spotify_url
    FROM matches m
    JOIN users u ON m.matched_user_id = u.id
    WHERE m.user_id = ?
    ORDER BY m.score DESC
  `),
};