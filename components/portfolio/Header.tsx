"use client";

import { useState } from "react";
import { Profile } from "@/content/portfolio";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  profile: Profile;
}

export function Header({ profile }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "// 01 WORK", href: "#work" },
    { name: "// 02 SERVICES", href: "#services" },
    { name: "// 03 SKILLS", href: "#skills" },
    { name: "// 04 ABOUT", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-hairline transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Monogram emblem */}
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 font-mono text-xl font-bold tracking-tight text-ink hover:opacity-80 transition-opacity touch-target py-2"
          aria-label="Atharva Bakale Home"
        >
          <span>{profile.monogram}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-accent border border-ink/20 inline-block" />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-wider uppercase text-muted hover:text-ink transition-colors py-2 touch-target inline-flex items-center"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side: Availability badge & CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-hairline bg-surface/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-muted">Available for work</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-ink/90 font-mono text-xs font-medium uppercase px-5 py-3 rounded-full transition-transform active:scale-95 touch-target"
          >
            <span>Let&apos;s work</span>
            <ArrowUpRight className="w-4 h-4 text-accent" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink hover:text-muted touch-target inline-flex items-center justify-center rounded-md focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-canvas px-4 pt-4 pb-6 space-y-4">
          <nav
            className="flex flex-col space-y-3"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-muted hover:text-ink py-2 touch-target"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-hairline flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-full border border-hairline bg-surface/50 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">Available for work</span>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-ink text-canvas font-mono text-xs font-medium uppercase px-5 py-3 rounded-full touch-target text-center"
            >
              <span>Let&apos;s work</span>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
