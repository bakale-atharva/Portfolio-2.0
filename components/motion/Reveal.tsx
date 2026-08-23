'use client';

import React, { Suspense, lazy, useSyncExternalStore } from 'react';

/**
 * Act 4 — per-section reveal.
 *
 * Two implementations, picked by capability:
 *
 *  - CSS scroll-driven (`animation-timeline: view()`), the default. Zero JS,
 *    runs off the main thread. See `.reveal` in globals.css — this component
 *    contributes nothing but a class name on that path.
 *  - Motion's `whileInView`, for browsers without view timelines (Firefox as
 *    of writing).
 *
 * The Motion implementation is behind `lazy()` on purpose: `motion/react` is
 * by far the heaviest dependency on this page, and browsers that take the CSS
 * path must never pay for it. Suspense falls back to the children rendered
 * plainly, so content is visible during the chunk fetch rather than blank.
 */
const RevealMotion = lazy(() =>
  import('./RevealMotion').then((m) => ({ default: m.RevealMotion })),
);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Stagger, in seconds. Only meaningful on the Motion path — on a view
   * timeline each element is already paced by its own scroll position, which
   * is a better result than a fixed offset.
   */
  delay?: number;
  yOffset?: number;
}

const subscribe = () => () => {};

/** True when the CSS path is available. */
const getSnapshot = () =>
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline', 'view()');

/**
 * The server cannot feature-detect. Assuming the CSS path is correct for the
 * majority of traffic and, more importantly, is the safe guess: the CSS path
 * renders plain visible markup, so a browser that turns out not to support it
 * shows readable content rather than something stuck at opacity 0.
 */
const getServerSnapshot = () => true;

export function Reveal({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
}: RevealProps) {
  const supportsViewTimeline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (supportsViewTimeline) {
    return <div className={`reveal ${className}`}>{children}</div>;
  }

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <RevealMotion className={className} delay={delay} yOffset={yOffset}>
        {children}
      </RevealMotion>
    </Suspense>
  );
}
