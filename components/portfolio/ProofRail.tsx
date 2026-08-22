import React from 'react';
import { Metric } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';

interface ProofRailProps {
  metrics: Metric[];
}

export function ProofRail({ metrics }: ProofRailProps) {
  return (
    <section className="border-y border-hairline bg-canvas py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal yOffset={20}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`flex flex-col items-start ${
                  index !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''
                }`}
              >
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight">
                  {metric.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mt-2">
                  {"// "}{metric.label}
                </span>
                <span className="text-xs text-muted font-display mt-1">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
