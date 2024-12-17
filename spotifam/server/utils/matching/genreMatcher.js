import { genreRelations } from '../constants/musicGenres.js';

export function calculateGenreStats(userGenres, matchedUserGenres) {
  const allGenres = new Set([...userGenres, ...matchedUserGenres]);
  const stats = [];

  for (const genre of allGenres) {
    const inUser = userGenres.includes(genre);
    const inMatched = matchedUserGenres.includes(genre);
    
    if (inUser && inMatched) {
      const userCount = userGenres.filter(g => g === genre).length;
      const matchedCount = matchedUserGenres.filter(g => g === genre).length;
      
      let relationBonus = 0;
      Object.entries(genreRelations).forEach(([main, related]) => {
        if (genre.includes(main) || related.some(r => genre.includes(r))) {
          relationBonus = 0.1;
        }
      });

      stats.push({
        name: genre,
        percentage: Math.min(userCount, matchedCount) / Math.max(userCount, matchedCount) + relationBonus,
        trackCount: Math.min(userCount, matchedCount),
        isMainGenre: Object.keys(genreRelations).includes(genre.toLowerCase())
      });
    }
  }

  return stats.sort((a, b) => b.percentage - a.percentage).slice(0, 8);
}