import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  spotifyUrl: z.string().url(),
  imageUrl: z.string().url().optional(),
  topTracks: z.array(z.object({
    id: z.string(),
    name: z.string(),
    artistName: z.string(),
    albumImageUrl: z.string().url().optional(),
  })),
  genres: z.array(z.string()),
});

export const matchSchema = z.object({
  userId: z.string(),
  matchedUserId: z.string(),
  score: z.number(),
  commonTracks: z.string(),
  commonGenres: z.string(),
});