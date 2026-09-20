'use client';

import React, { useState } from 'react';
import { Profile, SocialLink } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/portfolio/Container';
import { SectionHeader } from '@/components/portfolio/SectionHeader';
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
    <section id="contact" className="py-20 md:py-28 border-b-2 border-ink bg-canvas relative overflow-hidden">
      <Container>
        <SectionHeader label="// 05 INITIATE CONTACT" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Headline & Interactive Copy Block */}
          <div className="lg:col-span-8 space-y-10">
            <Reveal yOffset={30}>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-ink uppercase tracking-[-0.03em] leading-[0.92]">
                Start a project. <br />
                <span className="text-muted">Let&apos;s build something extraordinary.</span>
              </h2>
            </Reveal>

            <Reveal yOffset={30} delay={0.15}>
              <div className="border-2 border-ink bg-surface text-ink relative">
                <div className="flex items-center justify-between font-mono text-xs border-b-2 border-ink px-6 sm:px-8 py-4">
                  <span className="flex items-center gap-2 font-bold">
                    <Mail className="w-4 h-4" />
                    <span>DIRECT STUDIO EMAIL</span>
                  </span>
                  <span className="bg-accent text-on-accent border-2 border-ink px-2 py-0.5 font-bold">
                    READY
                  </span>
                </div>

                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-lg sm:text-2xl font-bold text-ink tracking-tight select-all break-all">
                    {profile.email}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 bg-accent text-on-accent hover:bg-ink hover:text-canvas border-2 border-ink font-mono text-xs font-bold uppercase px-5 h-12 transition-colors active:translate-y-px touch-target"
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
                      className="inline-flex items-center justify-center w-12 h-12 border-2 border-ink text-ink hover:bg-accent hover:text-on-accent transition-colors touch-target"
                      aria-label="Send email via default client"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {copied && (
                  <div
                    className="border-t-2 border-ink px-6 sm:px-8 py-3 font-mono text-xs text-ink flex items-center gap-2 animate-fade-in"
                    role="status"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-ink" />
                    <span>Email copied to clipboard successfully</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-4">
            <Reveal yOffset={30} delay={0.2}>
              <div className="border-2 border-ink bg-surface">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink border-b-2 border-ink px-6 py-4">
                  {"// CONNECT & CHANNELS"}
                </h3>

                <ul className="divide-y-2 divide-ink">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between font-mono text-sm font-bold uppercase text-ink hover:bg-accent hover:text-on-accent px-6 h-14 transition-colors group touch-target"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
