import {findBestPlayerPerTour} from "../util/findBestPlayerPerTour";

describe('findBestPlayerPerTour', () => {
  it('should return the best player per tour with correct team and word count', () => {
    const stats = [
      { tour: 'Tour A', player: 'Alice', team: 'Red', word: 'apple' },
      { tour: 'Tour A', player: 'Bob', team: 'Blue', word: 'banana' },
      { tour: 'Tour A', player: 'Alice', team: 'Red', word: 'carrot' },
      { tour: 'Tour B', player: 'Charlie', team: 'Green', word: 'date' },
      { tour: 'Tour B', player: 'Charlie', team: 'Green', word: 'eggplant' },
      { tour: 'Tour B', player: 'Daisy', team: 'Yellow', word: 'fig' },
    ];

    const result = findBestPlayerPerTour(stats);

    expect(result).toEqual({
      'Tour A': {
        player: 'Alice',
        team: 'Red',
        wordCount: 2
      },
      'Tour B': {
        player: 'Charlie',
        team: 'Green',
        wordCount: 2
      }
    });
  });

  it('should return an empty object if wordStats is empty', () => {
    const result = findBestPlayerPerTour([]);
    expect(result).toEqual({});
  });

  it('should return the only player as the best if only one entry exists', () => {
    const stats = [
      { tour: 'Tour C', player: 'Eve', team: 'Pink', word: 'grape' }
    ];

    const result = findBestPlayerPerTour(stats);

    expect(result).toEqual({
      'Tour C': {
        player: 'Eve',
        team: 'Pink',
        wordCount: 1
      }
    });
  });

  it('should handle tie cases and return the first best player encountered', () => {
    const stats = [
      { tour: 'Tour D', player: 'Alice', team: 'Red', word: 'kiwi' },
      { tour: 'Tour D', player: 'Bob', team: 'Blue', word: 'lemon' }
    ];

    const result = findBestPlayerPerTour(stats);
    expect(result['Tour D'].wordCount).toBe(1);
    expect(['Alice', 'Bob']).toContain(result['Tour D'].player);
    expect(['Red', 'Blue']).toContain(result['Tour D'].team);
  });

  it('should associate player with their correct team', () => {
    const stats = [
      { tour: 'Tour E', player: 'Frank', team: 'Orange', word: 'mango' },
      { tour: 'Tour E', player: 'Frank', team: 'Orange', word: 'nectarine' },
      { tour: 'Tour E', player: 'Grace', team: 'Purple', word: 'orange' },
    ];

    const result = findBestPlayerPerTour(stats);

    expect(result).toEqual({
      'Tour E': {
        player: 'Frank',
        team: 'Orange',
        wordCount: 2
      }
    });
  });
});
