import {findEasiestAndHardestWords} from "../util/findEasiestAndHardestWords";

describe('findEasiestAndHardestWords', () => {
  it('should return correct easiest and hardest words', () => {
    const stats = [
      { word: 'apple', duration: 1000 },
      { word: 'banana', duration: 3000 },
      { word: 'apple', duration: 1000 },
      { word: 'carrot', duration: 7000 }
    ];

    const result = findEasiestAndHardestWords(stats);

    expect(result).toEqual({
      easiest: { word: 'apple', duration: 2 },
      hardest: { word: 'carrot', duration: 7 }
    });
  });

  it('should return null words with 0 durations when input is empty', () => {
    const result = findEasiestAndHardestWords([]);
    expect(result).toEqual({
      easiest: { word: null, duration: Math.round(Infinity / 1000) },
      hardest: { word: null, duration: Math.round(-Infinity / 1000) }
    });
  });

  it('should handle one word correctly', () => {
    const stats = [
      { word: 'apple', duration: 5000 }
    ];

    const result = findEasiestAndHardestWords(stats);

    expect(result).toEqual({
      easiest: { word: 'apple', duration: 5 },
      hardest: { word: 'apple', duration: 5 }
    });
  });

  it('should handle durations as strings', () => {
    const stats = [
      { word: 'apple', duration: '2000' },
      { word: 'banana', duration: '5000' }
    ];

    const result = findEasiestAndHardestWords(stats);

    expect(result).toEqual({
      easiest: { word: 'apple', duration: 2 },
      hardest: { word: 'banana', duration: 5 }
    });
  });

  it('should round durations properly', () => {
    const stats = [
      { word: 'apple', duration: 1999 },
      { word: 'banana', duration: 2501 }
    ];

    const result = findEasiestAndHardestWords(stats);

    expect(result).toEqual({
      easiest: { word: 'apple', duration: 2 },
      hardest: { word: 'banana', duration: 3 }
    });
  });
});
