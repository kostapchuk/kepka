export function findEasiestAndHardestWords(wordStats) {
  // Group by word and sum up the time
  const wordTimeMap = {};

  wordStats.forEach(stat => {
    if (!wordTimeMap[stat.word]) {
      wordTimeMap[stat.word] = 0;
    }
    wordTimeMap[stat.word] += Number(stat.duration);
  });

  let easiestWord = null;
  let hardestWord = null;
  let minTime = Infinity;
  let maxTime = -Infinity;

  for (const word in wordTimeMap) {
    const totalTime = wordTimeMap[word];

    if (totalTime < minTime) {
      minTime = totalTime;
      easiestWord = word;
    }

    if (totalTime > maxTime) {
      maxTime = totalTime;
      hardestWord = word;
    }
  }

  return {
    easiest: {word: easiestWord, duration: Math.round(minTime / 1000)},
    hardest: {word: hardestWord, duration: Math.round(maxTime / 1000)}
  };
}