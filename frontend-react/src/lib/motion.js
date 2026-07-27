// Shared animation tokens so every component pulls from the same easing
// curves instead of re-declaring them.

// Organic, slightly-elastic ease used for ambient/floating loops (orb glow,
// orbiting particles, floating cards).
export const EASE_ORGANIC = [0.45, 0.05, 0.55, 0.95];

// Confident "ease out" used for one-shot entrance transitions (fades,
// slide-ins, page transitions).
export const EASE_ENTRANCE = [0.16, 1, 0.3, 1];

export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};
