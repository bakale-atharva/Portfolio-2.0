'use client';

import { useEffect, useRef } from 'react';

/**
 * Act 7 — custom cursor that swells over interactive elements.
 *
 * `pointer: fine` only. One rAF loop, transform-only, and the element is
 * `display: none` in CSS on touch so it cannot paint even before this runs.
 *
 * Position is written straight to `style.transform` rather than through React
 * state — a setState per pointermove would re-render the tree at input rate.
 */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, select, textarea, label';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    // Target = raw pointer position; current = eased position actually drawn.
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let seenPointer = false;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!seenPointer) {
        // Jump to the first observed position instead of gliding in from
        // 0,0 across the whole viewport.
        seenPointer = true;
        currentX = targetX;
        currentY = targetY;
        dot.dataset.visible = 'true';
      }

      const target = event.target;
      const overInteractive =
        target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;
      dot.dataset.swell = overInteractive ? 'true' : 'false';
    };

    const onPointerLeave = () => {
      dot.dataset.visible = 'false';
    };

    const onPointerEnter = () => {
      if (seenPointer) dot.dataset.visible = 'true';
    };

    const tick = () => {
      // Exponential smoothing — the dot trails the pointer slightly, which is
      // what makes it read as a physical object rather than a repainted cursor.
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointerenter', onPointerEnter);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
