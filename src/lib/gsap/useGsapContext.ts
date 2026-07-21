"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "./index";

/** Avoid the SSR useLayoutEffect warning while keeping sync timing on client. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Wraps `gsap.context()` scoped to a component ref and reverts on cleanup.
 * EVERY animation in the app must run inside this hook (or a manual context)
 * so App Router remounts never leak ScrollTriggers, timelines, or pins.
 *
 * @param callback  Receives the gsap context; create timelines/tweens here.
 * @param scope     Ref to the component root; scopes selector text + cleanup.
 * @param deps      Re-run dependencies (e.g. [locale]).
 */
export function useGsapContext(
  callback: (context: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
): void {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback, scope.current ?? undefined);
    return () => ctx.revert();
  }, deps);
}
