'use client';

import React, { useState } from 'react';
import { Profile, SocialLink } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function Contact({ profile, socialLinks }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-b border-hairline bg-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <Reveal yOffset={20}>
          <div className="mb-12 border-b border-hairline pb-6">
            <span className="font-mono text-xs tracking-widest uppercase text-muted">
              {"// 05 INITIATE CONTACT"}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline & Interactive Copy Block */}
          <div className="lg:col-span-8 space-y-8">
            <Reveal yOffset={30}>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold font-display text-ink uppercase tracking-tighter leading-[0.95]">
                Start a project. <br />
                <span className="text-muted">Let&apos;s build something extraordinary.</span>
              </h2>
            </Reveal>

            {/* Interactive Email Copy Block — an elevated surface panel,
                matching the other cards' move away from the ink-inversion
                trick now that canvas is dark by default. */}
            <Reveal yOffset={30} delay={0.15}>
              <div className="border border-hairline bg-surface text-ink p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-hairline pb-4">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>DIRECT STUDIO EMAIL</span>
                  </span>
                  <span className="text-accent">READY</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-ink tracking-tight select-all">
                    {profile.email}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 bg-accent text-on-accent hover:bg-accent/90 font-mono text-xs font-bold uppercase px-5 py-3.5 rounded-full transition-all active:scale-95 touch-target"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center justify-center p-3.5 rounded-full border border-hairline hover:border-ink text-ink transition-all touch-target"
                      aria-label="Send email via default client"
                    >
                      <ArrowUpRight className="w-5 h-5 text-accent" />
                    </a>
                  </div>
                </div>

                {/* Copied Feedback Toast */}
                {copied && (
                  <div
                    className="absolute bottom-3 left-6 font-mono text-[11px] text-accent flex items-center gap-1.5 animate-fade-in"
                    role="status"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Email copied to clipboard successfully</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Social Links & Availability info */}
          <div className="lg:col-span-4 space-y-8">
            <Reveal yOffset={30} delay={0.2}>
              <div className="border border-hairline bg-surface/70 p-6 sm:p-8 rounded-2xl space-y-6">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted border-b border-hairline pb-3">
                  {"// CONNECT & CHANNELS"}
                </h3>

                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-sm uppercase text-ink hover:text-muted p-3 rounded-lg border border-hairline bg-canvas hover:bg-surface transition-all group touch-target"
                    >
                      <span className="font-semibold">{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
