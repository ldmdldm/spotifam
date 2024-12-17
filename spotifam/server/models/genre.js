import db from '../db/index.js';

export const genreModel = {
  create: db.prepare(`
    INSERT INTO genres (id, name)
    VALUES (@id, @name)
    ON CONFLICT(name) DO UPDATE SET
      id = @id
  `),

  addToUser: db.prepare(`
    INSERT INTO user_genres (user_id, genre_id)
    VALUES (@userId, @genreId)
    ON CONFLICT DO NOTHING
  `),

  getUserGenres: db.prepare(`
    SELECT g.* FROM genres g
    JOIN user_genres ug ON g.id = ug.genre_id
    WHERE ug.user_id = ?
  `),
};