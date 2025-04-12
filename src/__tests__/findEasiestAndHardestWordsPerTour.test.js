import { findEasiestAndHardestWordsPerTour } from '../util/findEasiestAndHardestWordsPerTour';

describe('findEasiestAndHardestWordsPerTour', () => {
  it('should return correct easiest and hardest word per tour with durations and teams', () => {
    const wordStats = [
      { tour: 'Tour A', word: 'apple', duration: 3000, team: 'Team 1' },
      { tour: 'Tour A', word: 'banana', duration: 6000, team: 'Team 2' },
      { tour: 'Tour A', word: 'apple', duration: 2000, team: 'Team 1' }, // Total: 5000
      { tour: 'Tour B', word: 'cat', duration: 4000, team: 'Team X' },
      { tour: 'Tour B', word: 'dog', duration: 10000, team: 'Team Y' },
    ];

    const result = findEasiestAndHardestWordsPerTour(wordStats);

    expect(result).toEqual({
      'Tour A': {
        easiest: { word: 'apple', duration: 5, team: 'Team 1' },
        hardest: { word: 'banana', duration: 6, team: 'Team 2' }
      },
      'Tour B': {
        easiest: { word: 'cat', duration: 4, team: 'Team X' },
        hardest: { word: 'dog', duration: 10, team: 'Team Y' }
      }
    });
  });

  it('should handle empty input', () => {
    const result = findEasiestAndHardestWordsPerTour([]);
    expect(result).toEqual({});
  });

  it('should round durations correctly', () => {
    const wordStats = [
      { tour: 'Tour X', word: 'moon', duration: 1499, team: 'Luna' },
      { tour: 'Tour X', word: 'sun', duration: 2500, team: 'Solar' },
    ];

    const result = findEasiestAndHardestWordsPerTour(wordStats);

    expect(result['Tour X'].easiest.duration).toBe(1); // 1499ms → 1s
    expect(result['Tour X'].hardest.duration).toBe(3); // 2500ms → 3s
  });

  it('should pick the first team if same word appears multiple times with different teams', () => {
    const wordStats = [
      { tour: 'Tour Z', word: 'earth', duration: 2000, team: 'Team A' },
      { tour: 'Tour Z', word: 'earth', duration: 3000, team: 'Team B' }, // Total 5000 but should keep Team A
    ];

    const result = findEasiestAndHardestWordsPerTour(wordStats);

    expect(result['Tour Z'].easiest).toEqual({
      word: 'earth',
      duration: 5,
      team: 'Team A'
    });

    expect(result['Tour Z'].hardest).toEqual({
      word: 'earth',
      duration: 5,
      team: 'Team A'
    });
  });
});
