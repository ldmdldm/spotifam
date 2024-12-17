import db from '../db/index.js';

export const trackModel = {
  create: db.prepare(`
    INSERT INTO tracks (id, name, artist_name, album_image_url)
    VALUES (@id, @name, @artistName, @albumImageUrl)
    ON CONFLICT(id) DO UPDATE SET
      name = @name,
      artist_name = @artistName,
      album_image_url = @albumImageUrl
  `),

  addToUser: db.prepare(`
    INSERT INTO user_tracks (user_id, track_id, type)
    VALUES (@userId, @trackId, @type)
    ON CONFLICT DO NOTHING
  `),

  getUserTracks: db.prepare(`
    SELECT t.* FROM tracks t
    JOIN user_tracks ut ON t.id = ut.track_id
    WHERE ut.user_id = ?
  `),
};