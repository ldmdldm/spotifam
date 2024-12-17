// Add new types for enhanced matching
export interface ArtistMatch {
  id: string;
  name: string;
  genres: string[];
  matchCount: number;
}

export interface GenreStats {
  name: string;
  percentage: number;
  trackCount: number;
}

export interface MatchDetails {
  topArtists: ArtistMatch[];
  genreBreakdown: GenreStats[];
  decadeDistribution: Record<string, number>;
  recentlyAddedCommon: SpotifyTrack[];
  matchStrength: {
    overall: number;
    genres: number;
    artists: number;
    tracks: number;
    recency: number;
  };
}