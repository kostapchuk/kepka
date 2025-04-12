export function findBestTeamPerTour(wordStats) {
  // Get unique tours
  const uniqueTours = [...new Set(wordStats.map(stat => stat.tour))];
  const results = {};

  uniqueTours.forEach(tourName => {
    // Filter stats for the specified tour
    const tourStats = wordStats.filter(stat => stat.tour === tourName);

    // Count words guessed by each team
    const teamWordCount = {};

    tourStats.forEach(stat => {
      if (!teamWordCount[stat.team]) {
        teamWordCount[stat.team] = 0;
      }
      teamWordCount[stat.team]++;
    });

    let bestTeam = null;
    let maxWords = -Infinity;

    for (const team in teamWordCount) {
      const wordCount = teamWordCount[team];

      if (wordCount > maxWords) {
        maxWords = wordCount;
        bestTeam = team;
      }
    }

    results[tourName] = {
      team: bestTeam,
      wordCount: maxWords
    };
  });

  return results;
}