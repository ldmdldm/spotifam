export function getCollaborationScore(tracks) {
  const collaborations = new Map();

  function addCollaboration(artistId1, artistId2) {
    const key = [artistId1, artistId2].sort().join('-');
    collaborations.set(key, (collaborations.get(key) || 0) + 1);
  }

  tracks.forEach(track => {
    if (track.artists.length > 1) {
      for (let i = 0; i < track.artists.length; i++) {
        for (let j = i + 1; j < track.artists.length; j++) {
          addCollaboration(track.artists[i].id, track.artists[j].id);
        }
      }
    }
  });

  return collaborations;
}