CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  spotify_url TEXT NOT NULL,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  album_image_url TEXT
);

CREATE TABLE IF NOT EXISTS user_tracks (
  user_id TEXT NOT NULL,
  track_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('top', 'liked')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, track_id, type)
);

CREATE TABLE IF NOT EXISTS genres (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_genres (
  user_id TEXT NOT NULL,
  genre_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, genre_id)
);

CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  matched_user_id TEXT NOT NULL,
  score REAL NOT NULL,
  common_tracks TEXT NOT NULL,
  common_genres TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (matched_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, matched_user_id)
);