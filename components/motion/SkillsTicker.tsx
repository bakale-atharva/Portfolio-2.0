'use client';

import React from 'react';
import { useReducedMotion } from 'motion/react';

interface SkillsTickerProps {
  skills: string[];
  className?: string;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function SkillsTicker({ skills, className = '' }: SkillsTickerProps) {
  const shouldReduceMotion = useReducedMotion();
  const mounted = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (mounted && shouldReduceMotion) {
    return (
      <div className={`py-6 overflow-hidden border-y border-hairline bg-ink text-canvas ${className}`}>
        <div className="flex flex-wrap justify-center gap-3 px-4 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="inline-flex items-center px-4 py-2 text-sm font-mono tracking-wider uppercase border border-white/15 bg-white/5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2.5" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Four copies so the track always overflows the viewport; the animation
  // shifts by -50% (two copies), a whole number of repeats, so it is seamless.
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-hairline bg-ink text-canvas py-5 select-none ${className}`}
      aria-label="Technical skills marquee"
    >
      <div className="marquee-track animate-marquee flex whitespace-nowrap gap-6 w-max cursor-default">
        {duplicatedSkills.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className="inline-flex items-center gap-3 px-5 py-2 text-sm font-mono tracking-wider uppercase bg-white/5 border border-white/10 hover:border-accent hover:text-accent transition-colors rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
