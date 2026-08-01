import {remainingSeconds} from "../util/roundTime";

describe('remainingSeconds', () => {
  it('should return null when there is no deadline', () => {
    expect(remainingSeconds(null)).toBeNull();
    expect(remainingSeconds(undefined)).toBeNull();
    expect(remainingSeconds(0)).toBeNull();
  });

  it('should return the whole seconds left until the deadline', () => {
    expect(remainingSeconds(10_000, 0)).toBe(10);
    expect(remainingSeconds(10_000, 7_000)).toBe(3);
  });

  it('should round a partial second up so the display never skips a number', () => {
    expect(remainingSeconds(10_000, 9_001)).toBe(1);
    expect(remainingSeconds(10_000, 9_999)).toBe(1);
  });

  it('should return 0 exactly at the deadline', () => {
    expect(remainingSeconds(10_000, 10_000)).toBe(0);
  });

  it('should clamp to 0 for a deadline in the past', () => {
    expect(remainingSeconds(10_000, 60_000)).toBe(0);
  });

  it('should default now to the current time', () => {
    const spy = jest.spyOn(Date, 'now').mockReturnValue(5_000);
    expect(remainingSeconds(8_000)).toBe(3);
    spy.mockRestore();
  });
});
