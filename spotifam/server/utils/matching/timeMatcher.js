import { eraClassifications } from '../constants/musicEras.js';

export function calculateTimeDistribution(commonTracks) {
  const distribution = {};
  const eraStats = {
    classics: 0,    // Pre-1980
    retro: 0,       // 1980-1999
    modern: 0,      // 2000-2015
    contemporary: 0 // 2016-present
  };

  commonTracks.forEach(track => {
    const year = track.album?.release_date?.slice(0, 4);
    if (year) {
      const yearNum = parseInt(year);
      const decade = Math.floor(yearNum / 10) * 10;
      distribution[decade] = (distribution[decade] || 0) + 1;

      // Era classification
      const era = eraClassifications.find(([start, end]) => 
        yearNum >= start && yearNum <= (end || new Date().getFullYear())
      )?.[2];
      
      if (era) {
        eraStats[era]++;
      }
    }
  });

  return {
    byDecade: distribution,
    byEra: eraStats,
    dominantEra: Object.entries(eraStats)
      .reduce((a, b) => a[1] > b[1] ? a : b)[0]
  };
}