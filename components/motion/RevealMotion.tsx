'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * The Motion fallback for <Reveal>, used only where CSS view timelines are
 * unavailable. Kept in its own module so `motion/react` lands in a separate
 * chunk that browsers on the CSS path never request.
 */
interface RevealMotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function RevealMotion({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
}: RevealMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
