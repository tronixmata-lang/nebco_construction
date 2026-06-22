/** Map scroll progress (0–1) through a hold segment then ease the remainder. */
export function segmentProgress(
  progress: number,
  holdUntil: number,
  ease: (t: number) => number = easeOutCubic,
): number {
  if (progress <= holdUntil) return 0;
  const t = (progress - holdUntil) / (1 - holdUntil);
  return ease(Math.min(1, Math.max(0, t)));
}

export function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function getSpacerProgress(spacer: HTMLElement, endRatio = 0.8): number {
  const scrollRange = spacer.offsetHeight - window.innerHeight;
  if (scrollRange <= 0) return 0;
  const raw = -spacer.getBoundingClientRect().top / scrollRange;
  return Math.min(1, Math.max(0, raw / endRatio));
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}
