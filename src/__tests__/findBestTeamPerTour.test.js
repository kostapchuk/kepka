import {findBestTeamPerTour} from "../util/findBestTeamPerTour";

describe('findBestTeamPerTour', () => {
  it('should return the team with the most words per tour', () => {
    const stats = [
      { tour: 'Tour A', team: 'Team Red', word: 'apple' },
      { tour: 'Tour A', team: 'Team Red', word: 'banana' },
      { tour: 'Tour A', team: 'Team Blue', word: 'carrot' },
      { tour: 'Tour B', team: 'Team Green', word: 'date' },
      { tour: 'Tour B', team: 'Team Green', word: 'eggplant' },
      { tour: 'Tour B', team: 'Team Yellow', word: 'fig' },
    ];

    const result = findBestTeamPerTour(stats);

    expect(result).toEqual({
      'Tour A': {
        team: 'Team Red',
        wordCount: 2
      },
      'Tour B': {
        team: 'Team Green',
        wordCount: 2
      }
    });
  });

  it('should return an empty object when input is empty', () => {
    const result = findBestTeamPerTour([]);
    expect(result).toEqual({});
  });

  it('should handle a tour with only one team', () => {
    const stats = [
      { tour: 'Tour C', team: 'Team Solo', word: 'grape' },
      { tour: 'Tour C', team: 'Team Solo', word: 'honeydew' }
    ];

    const result = findBestTeamPerTour(stats);

    expect(result).toEqual({
      'Tour C': {
        team: 'Team Solo',
        wordCount: 2
      }
    });
  });

  it('should handle tie situations (returns first encountered max)', () => {
    const stats = [
      { tour: 'Tour D', team: 'Team A', word: 'kiwi' },
      { tour: 'Tour D', team: 'Team B', word: 'lemon' },
    ];

    const result = findBestTeamPerTour(stats);

    expect(result['Tour D'].wordCount).toEqual(1);
    expect(['Team A', 'Team B']).toContain(result['Tour D'].team); // either is valid
  });

  it('should work with numeric team names or IDs', () => {
    const stats = [
      { tour: 'Tour E', team: 101, word: 'mango' },
      { tour: 'Tour E', team: 101, word: 'nectarine' },
      { tour: 'Tour E', team: 102, word: 'orange' },
    ];

    const result = findBestTeamPerTour(stats);

    expect(result).toEqual({
      'Tour E': {
        team: '101',
        wordCount: 2
      }
    });
  });
});
