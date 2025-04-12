export function findEasiestAndHardestWordsPerTour(wordStats) {
  const uniqueTours = [...new Set(wordStats.map(stat => stat.tour))];
  const results = {};

  uniqueTours.forEach(tourName => {
    const tourStats = wordStats.filter(stat => stat.tour === tourName);
    const wordDataMap = {};

    tourStats.forEach(stat => {
      if (!wordDataMap[stat.word]) {
        wordDataMap[stat.word] = { duration: 0, team: stat.team };
      }
      wordDataMap[stat.word].duration += Number(stat.duration);
    });

    let easiest = { word: null, duration: Infinity, team: null };
    let hardest = { word: null, duration: -Infinity, team: null };

    for (const word in wordDataMap) {
      const { duration, team } = wordDataMap[word];

      if (duration < easiest.duration) {
        easiest = { word, duration, team };
      }

      if (duration > hardest.duration) {
        hardest = { word, duration, team };
      }
    }

    results[tourName] = {
      easiest: {
        word: easiest.word,
        duration: Math.round(easiest.duration / 1000),
        team: easiest.team
      },
      hardest: {
        word: hardest.word,
        duration: Math.round(hardest.duration / 1000),
        team: hardest.team
      }
    };
  });

  return results;
}
