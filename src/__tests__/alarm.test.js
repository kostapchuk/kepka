// alarm.js keeps module-level state (the singleton element and the unlocked
// flag), so every test re-imports it through jest.isolateModules.
describe('alarm', () => {

  let instances;

  const loadAlarm = (play) => {
    let alarm;
    jest.isolateModules(() => {
      instances = [];
      global.Audio = jest.fn(function (src) {
        this.src = src;
        this.muted = false;
        this.currentTime = 0;
        this.preload = '';
        this.load = jest.fn();
        this.pause = jest.fn();
        this.play = jest.fn(play);
        instances.push(this);
      });
      alarm = require('../util/alarm');
    });
    return alarm;
  };

  const flush = () => new Promise(resolve => setTimeout(resolve, 0));

  it('should create a single preloaded element and reuse it', () => {
    const {primeAlarm, playAlarm} = loadAlarm(() => Promise.resolve());

    primeAlarm();
    primeAlarm();
    playAlarm();

    expect(global.Audio).toHaveBeenCalledTimes(1);
    expect(instances[0].src).toBe('/alarm-bell-v1.mp3');
    expect(instances[0].preload).toBe('auto');
    expect(instances[0].load).toHaveBeenCalled();
  });

  it('should unlock silently: mute, play, then pause, rewind and unmute', async () => {
    const {primeAlarm} = loadAlarm(() => Promise.resolve());

    primeAlarm();
    const el = instances[0];
    expect(el.muted).toBe(true); // muted for the duration of the unlock
    expect(el.play).toHaveBeenCalledTimes(1);

    await flush();
    expect(el.pause).toHaveBeenCalledTimes(1);
    expect(el.currentTime).toBe(0);
    expect(el.muted).toBe(false);
  });

  it('should not play again once unlocked', async () => {
    const {primeAlarm} = loadAlarm(() => Promise.resolve());

    primeAlarm();
    await flush();
    primeAlarm();
    primeAlarm();

    expect(instances[0].play).toHaveBeenCalledTimes(1);
  });

  it('should stay locked and retry on the next tap when play is rejected', async () => {
    const {primeAlarm} = loadAlarm(() => Promise.reject(new Error('NotAllowedError')));

    primeAlarm();
    await flush();
    const el = instances[0];
    expect(el.muted).toBe(false); // unmuted again so a later playAlarm is audible

    primeAlarm();
    expect(el.play).toHaveBeenCalledTimes(2);
  });

  it('should treat a browser that returns no promise from play as unlocked', () => {
    const {primeAlarm} = loadAlarm(() => undefined);

    primeAlarm();
    primeAlarm();

    expect(instances[0].play).toHaveBeenCalledTimes(1);
    expect(instances[0].muted).toBe(false);
  });

  it('should rewind and unmute before playing the alarm', () => {
    const {playAlarm} = loadAlarm(() => Promise.resolve());

    const el = () => instances[0];
    playAlarm();
    el().currentTime = 1.2;
    el().muted = true;
    playAlarm();

    expect(el().currentTime).toBe(0);
    expect(el().muted).toBe(false);
    expect(el().play).toHaveBeenCalledTimes(2);
  });

  it('should always return a catchable promise from playAlarm', async () => {
    const {playAlarm} = loadAlarm(() => undefined);
    await expect(playAlarm()).resolves.toBeUndefined();
  });

  it('should stop and rewind on stopAlarm', () => {
    const {playAlarm, stopAlarm} = loadAlarm(() => Promise.resolve());

    playAlarm();
    instances[0].currentTime = 1.4;
    stopAlarm();

    expect(instances[0].pause).toHaveBeenCalledTimes(1);
    expect(instances[0].currentTime).toBe(0);
  });

  it('should not construct an element when stopping before anything played', () => {
    const {stopAlarm} = loadAlarm(() => Promise.resolve());
    stopAlarm();
    expect(global.Audio).not.toHaveBeenCalled();
  });
});
