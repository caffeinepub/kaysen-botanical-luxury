// Stop-motion timing constants
export const STOP_MOTION_STEPS = 8;
export const RATCHET_STEPS = 6;

// Timing functions for mechanical animations
export const stopMotionTiming = (progress: number, steps: number = STOP_MOTION_STEPS): number => {
  return Math.floor(progress * steps) / steps;
};

export const ratchetTiming = (progress: number): number => {
  return stopMotionTiming(progress, RATCHET_STEPS);
};

// Easing functions with stepped motion
export const steppedEaseOut = (t: number, steps: number = STOP_MOTION_STEPS): number => {
  const stepped = stopMotionTiming(t, steps);
  return stepped * stepped * (3 - 2 * stepped);
};

export const steppedEaseInOut = (t: number, steps: number = STOP_MOTION_STEPS): number => {
  const stepped = stopMotionTiming(t, steps);
  return stepped < 0.5
    ? 2 * stepped * stepped
    : 1 - Math.pow(-2 * stepped + 2, 2) / 2;
};

// Spring physics constants
export const SPRING_CONFIG = {
  gentle: { stiffness: 0.1, damping: 0.8 },
  bouncy: { stiffness: 0.15, damping: 0.3 },
  stiff: { stiffness: 0.3, damping: 0.9 },
};

// Scroll trigger thresholds
export const SCROLL_THRESHOLDS = {
  start: 0.1,
  middle: 0.5,
  end: 0.9,
};
