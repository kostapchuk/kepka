export function remainingSeconds(deadline, now = Date.now()) {
  if (!deadline) return null;
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
