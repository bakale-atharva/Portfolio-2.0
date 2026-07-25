'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
      <div className={`py-6 overflow-hidden border-y border-hairline bg-ink text-paper ${className}`}>
        <div className="flex flex-wrap justify-center gap-3 px-4 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="inline-flex items-center px-4 py-2 text-sm font-mono tracking-wider uppercase border border-white/15 bg-white/5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime mr-2.5" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-hairline bg-ink text-paper py-5 select-none ${className}`}
      aria-label="Technical skills marquee"
    >
      <motion.div
        className="flex whitespace-nowrap gap-6 w-max cursor-default"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedSkills.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className="inline-flex items-center gap-3 px-5 py-2 text-sm font-mono tracking-wider uppercase bg-white/5 border border-white/10 hover:border-lime hover:text-lime transition-colors rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>{skill}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
