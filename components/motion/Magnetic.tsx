'use client';

import React, { useRef } from 'react';

/**
 * Act 8 — magnetic CTA.
 *
 * Pulls its child toward the pointer while hovered, then springs back. The
 * transform is written directly to the node (no state, no re-render), and
 * `will-change` is set on enter and cleared on leave so it is never a
 * standing cost on every CTA on the page.
 *
 * Touch and reduced-motion get a plain wrapper: the handlers still attach but
 * bail immediately, and the CSS transition that makes it feel elastic is
 * itself behind `(pointer: fine)`.
 */
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum pull, in px, at the edge of the element. */
  strength?: number;
}

export function Magnetic({
  children,
  className = '',
  strength = 12,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || !enabled()) return;

    const rect = node.getBoundingClientRect();
    // -1..1 across each axis, measured from the element's centre.
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    node.style.transform = `translate3d(${relX * strength}px, ${relY * strength}px, 0)`;
  };

  const onPointerEnter = () => {
    const node = ref.current;
    if (!node || !enabled()) return;
    node.style.willChange = 'transform';
    node.dataset.engaged = 'true';
  };

  const onPointerLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.dataset.engaged = 'false';
    node.style.transform = '';
    // Dropped on the way out so the compositor layer is not held open for
    // the lifetime of the page.
    node.style.willChange = '';
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </span>
  );
}
