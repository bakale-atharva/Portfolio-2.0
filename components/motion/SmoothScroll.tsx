'use client';

import { useEffect } from 'react';

/**
 * Act 6 — Lenis smooth scroll.
 *
 * Desktop pointer only, and never under reduced motion. Touch devices keep
 * native scrolling: momentum scrolling is already good there, and hijacking
 * it costs battery and breaks the platform feel for no gain.
 *
 * Lenis is imported dynamically so its bytes only reach the clients that
 * actually run it — a phone never fetches the chunk.
 *
 * Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return;

    let cancelled = false;
    // Typed as the class instance rather than `any` so `destroy()` is checked.
    let lenis: import('lenis').default | undefined;

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({
          // Lenis drives its own rAF loop; no need to hand-roll one.
          autoRaf: true,
          // Route in-page anchor jumps (#work, #contact, the header nav)
          // through Lenis so they ease instead of teleporting mid-glide.
          anchors: true,
          duration: 1.1,
        });
      })
      .catch(() => {
        // A failed chunk fetch just means native scrolling. Nothing to do.
      });

    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, []);

  return null;
}
