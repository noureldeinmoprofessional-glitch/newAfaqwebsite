/**
 * Named easing vocabulary. Import from here — never inline an easing string
 * anywhere else in the codebase.
 *
 * Banned: elastic, bounce, back — they read as toy-like and break the brand.
 */
export const easeOut = "power3.out"; // default reveal
export const easeInOut = "power2.inOut"; // pinned / scrubbed sequences
export const easeExpo = "expo.out"; // hero, large display type
export const easeLinear = "none"; // marquees, continuous loops

/** Global timing constants (seconds). */
export const timing = {
  reveal: 0.9,
  stagger: 0.08,
  heroTotal: 1.8,
  hover: 0.4,
  pageOut: 0.6,
  pageIn: 0.8,
} as const;
