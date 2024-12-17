import { nanoid } from 'nanoid';
import { userModel } from '../models/user.js';
import { trackModel } from '../models/track.js';
import { genreModel } from '../models/genre.js';
import matchService from './matchService.js';

export async function createOrUpdateUser(userData) {
  const existingUser = userModel.findById.get(userData.id);
  
  if (existingUser) {
    userModel.update.run(userData);
  } else {
    userModel.create.run(userData);
  }

  // Update tracks
  for (const track of userData.topTracks) {
    trackModel.create.run(track);
    trackModel.addToUser.run({
      userId: userData.id,
      trackId: track.id,
      type: 'top'
    });
  }

  // Update genres
  for (const genreName of userData.genres) {
    const genreId = nanoid();
    genreModel.create.run({ id: genreId, name: genreName });
    genreModel.addToUser.run({
      userId: userData.id,
      genreId
    });
  }

  return matchService.updateMatches(userData.id);
}

export default { createOrUpdateUser };