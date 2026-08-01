const SRC = '/alarm-bell-v1.mp3';

export const ALARM_MS = 1500;

let el = null;
let unlocked = false;

function element() {
  if (!el) {
    el = new Audio(SRC);
    el.preload = 'auto';
    el.load();
  }
  return el;
}

/**
 * Satisfies the mobile autoplay policy: an element that has played once during a
 * user gesture stays playable programmatically afterwards. Must be called
 * synchronously from an onClick handler. Cheap to call on every tap - it no-ops
 * once unlocked, and a rejected attempt is retried on the next tap.
 */
export function primeAlarm() {
  const a = element();
  if (unlocked) return;
  a.muted = true;
  const played = a.play();
  if (!played) {
    unlocked = true;
    a.muted = false;
    return;
  }
  played.then(() => {
    a.pause();
    a.currentTime = 0;
    a.muted = false;
    unlocked = true;
  }).catch(() => {
    a.muted = false;
  });
}

export function playAlarm() {
  const a = element();
  a.muted = false;
  a.currentTime = 0;
  return a.play() ?? Promise.resolve();
}

export function stopAlarm() {
  if (!el) return;
  el.pause();
  el.currentTime = 0;
}
