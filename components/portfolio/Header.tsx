"use client";

import { useState } from "react";
import { Profile } from "@/lib/content";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { Container } from "@/components/portfolio/Container";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  profile: Profile;
}

// Header height and sticky offsets elsewhere (`top-20 md:top-24`) key off h-20.
const navLinks = [
  { step: "1", name: "WORK", href: "#work" },
  { step: "2", name: "SERVICES", href: "#services" },
  { step: "3", name: "SKILLS", href: "#skills" },
  { step: "4", name: "ABOUT", href: "#about" },
];

export function Header({ profile }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b-2 border-ink">
      <Container className="h-20 flex items-center justify-between">
        {/* Monogram: a boxed part number with the yellow active-part dot. */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 border-2 border-ink px-3 h-11 font-black text-xl tracking-tight text-ink hover:bg-accent hover:text-on-accent transition-colors touch-target"
          aria-label={`${profile.name} Home`}
        >
          <span>{profile.monogram}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-ink inline-block" />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-ink py-2 touch-target"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-ink font-display font-black text-[11px] leading-none group-hover:bg-accent transition-colors">
                {link.step}
              </span>
              <span className="underline decoration-transparent group-hover:decoration-ink underline-offset-4 decoration-2 transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Right side: availability & CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 h-9 border-2 border-ink">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent border border-ink"></span>
            </span>
            <span className="text-ink">Available for work</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-ink text-canvas hover:bg-accent hover:text-on-accent border-2 border-ink font-mono text-xs font-bold uppercase px-5 h-11 transition-colors active:translate-y-px touch-target"
          >
            <span>Let&apos;s work</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 border-2 border-ink text-ink hover:bg-accent hover:text-on-accent touch-target transition-colors"
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
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-canvas px-4 pt-4 pb-6 space-y-4">
          <nav
            className="flex flex-col space-y-1"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-ink py-2 touch-target"
              >
                <span className="step-badge !w-8 !h-8 !text-sm">{link.step}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t-2 border-ink flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 h-9 border-2 border-ink w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-accent border border-ink" />
              <span className="text-ink">Available for work</span>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-ink text-canvas border-2 border-ink font-mono text-xs font-bold uppercase px-5 h-12 touch-target text-center"
            >
              <span>Let&apos;s work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
