import db from '../db/index.js';

export const userModel = {
  create: db.prepare(`
    INSERT INTO users (id, display_name, spotify_url, image_url)
    VALUES (@id, @displayName, @spotifyUrl, @imageUrl)
  `),

  update: db.prepare(`
    UPDATE users 
    SET display_name = @displayName,
        spotify_url = @spotifyUrl,
        image_url = @imageUrl,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @id
  `),

  findById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),

  findAll: db.prepare(`
    SELECT * FROM users
  `),
};