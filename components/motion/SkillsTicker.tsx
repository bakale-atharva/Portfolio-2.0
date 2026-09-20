import React from 'react';

interface SkillsTickerProps {
  skills: string[];
  className?: string;
}

/**
 * Act 9 — the marquee band.
 *
 * Pure CSS and, as of Phase 5, a Server Component: no `useReducedMotion`, no
 * mount check, no hydration dance. Both states are rendered and CSS picks one,
 * which is what let the JS go away entirely — importing `useReducedMotion`
 * here used to pull all of `motion/react` into the main bundle and cancel out
 * the lazy-loading in <Reveal>.
 *
 * The whole band is aria-hidden: every skill in it is already listed, in
 * structured form, in the Skills grid directly above. This is decoration.
 */
export function SkillsTicker({ skills, className = '' }: SkillsTickerProps) {
  // Four copies so the track always overflows the viewport; the animation
  // shifts by -50% (two copies), a whole number of repeats, so it is seamless.
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div
      className={`relative w-full overflow-hidden bg-accent text-on-accent py-5 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Animated track — hidden under reduced motion. */}
      <div className="ticker-animated marquee-track animate-marquee flex whitespace-nowrap gap-4 w-max cursor-default">
        {duplicatedSkills.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className="inline-flex items-center gap-3 px-5 py-2 text-sm font-mono font-bold tracking-wider uppercase border-2 border-ink text-on-accent hover:bg-ink hover:text-canvas transition-colors"
          >
            <span className="w-2 h-2 bg-ink" />
            <span>{skill}</span>
          </div>
        ))}
      </div>

      {/* Static wrapped equivalent — shown only under reduced motion, so a
          single un-duplicated set is the right content there. */}
      <div className="ticker-static flex-wrap justify-center gap-3 px-4 max-w-7xl mx-auto">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-4 py-2 text-sm font-mono font-bold tracking-wider uppercase border-2 border-ink text-on-accent"
          >
            <span className="w-2 h-2 bg-ink mr-2.5" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
