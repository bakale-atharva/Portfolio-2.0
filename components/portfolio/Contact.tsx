'use client';

import React, { useState } from 'react';
import { Profile, SocialLink } from '@/content/portfolio';
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
    <section id="contact" className="py-20 md:py-32 border-b border-hairline bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <Reveal yOffset={20}>
          <div className="mb-12 border-b border-hairline pb-6">
            <span className="font-mono text-xs tracking-widest uppercase text-slate">
              {"// 05 INITIATE CONTACT"}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline & Interactive Copy Block */}
          <div className="lg:col-span-8 space-y-8">
            <Reveal yOffset={30}>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-ink uppercase tracking-tight leading-[1.05]">
                Start a project. <br />
                <span className="text-slate">Let&apos;s build something extraordinary.</span>
              </h2>
            </Reveal>

            {/* Interactive Email Copy Block */}
            <Reveal yOffset={30} delay={0.15}>
              <div className="border border-hairline bg-ink text-paper p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between font-mono text-xs text-white/50 border-b border-white/10 pb-4">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-lime" />
                    <span>DIRECT STUDIO EMAIL</span>
                  </span>
                  <span className="text-lime">READY</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-paper tracking-tight select-all">
                    {profile.email}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 bg-lime text-ink hover:bg-lime/90 font-mono text-xs font-bold uppercase px-5 py-3.5 rounded-full transition-all active:scale-95 touch-target"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-ink" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-ink" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center justify-center p-3.5 rounded-full border border-white/20 hover:border-white text-paper transition-all touch-target"
                      aria-label="Send email via default client"
                    >
                      <ArrowUpRight className="w-5 h-5 text-lime" />
                    </a>
                  </div>
                </div>

                {/* Copied Feedback Toast */}
                {copied && (
                  <div
                    className="absolute bottom-3 left-6 font-mono text-[11px] text-lime flex items-center gap-1.5 animate-fadeIn"
                    role="status"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                    <span>Email copied to clipboard successfully</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Social Links & Availability info */}
          <div className="lg:col-span-4 space-y-8">
            <Reveal yOffset={30} delay={0.2}>
              <div className="border border-hairline bg-white/70 p-6 sm:p-8 rounded-2xl space-y-6">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate border-b border-hairline pb-3">
                  {"// CONNECT & CHANNELS"}
                </h3>

                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-sm uppercase text-ink hover:text-slate p-3 rounded-lg border border-hairline bg-paper hover:bg-white transition-all group touch-target"
                    >
                      <span className="font-semibold">{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
