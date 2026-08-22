import React from 'react';
import { Profile } from '@/lib/content';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-canvas py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Monogram emblem */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-1 font-mono text-xl font-bold tracking-tight text-ink hover:opacity-80 transition-opacity touch-target"
              aria-label="Back to top"
            >
              <span>{profile.monogram}</span>
              <span className="w-2 h-2 rounded-full bg-accent border border-ink/20 inline-block" />
            </a>
            <span className="text-muted/40">|</span>
            <span className="font-mono text-xs text-muted">
              © {currentYear} {profile.name}. All rights reserved.
            </span>
          </div>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-hairline bg-surface/50">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-muted">{profile.availability}</span>
          </div>

          {/* Back to top CTA */}
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase text-ink hover:text-muted border border-hairline bg-surface/80 hover:bg-surface px-4 py-2.5 rounded-full transition-all touch-target"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
          </a>
        </div>
      </div>
    </footer>
  );
}
