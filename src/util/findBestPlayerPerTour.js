export function findBestPlayerPerTour(wordStats) {
  // Get unique tours
  const uniqueTours = [...new Set(wordStats.map(stat => stat.tour))];
  const results = {};

  uniqueTours.forEach(tourName => {
    // Filter stats for the specified tour
    const tourStats = wordStats.filter(stat => stat.tour === tourName);

    // Group by player and count words guessed for each
    const playerWordCount = {};
    const playerTeamMap = {}; // To keep track of which team each player belongs to

    tourStats.forEach(stat => {
      if (!playerWordCount[stat.player]) {
        playerWordCount[stat.player] = 0;
        playerTeamMap[stat.player] = stat.team;
      }
      playerWordCount[stat.player]++;
    });

    let bestPlayer = null;
    let bestTeam = null;
    let maxWords = -Infinity;

    for (const player in playerWordCount) {
      const wordCount = playerWordCount[player];

      if (wordCount > maxWords) {
        maxWords = wordCount;
        bestPlayer = player;
        bestTeam = playerTeamMap[player];
      }
    }

    results[tourName] = {
      player: bestPlayer,
      team: bestTeam,
      wordCount: maxWords
    };
  });

  return results;
}
