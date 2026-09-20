import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  /** Stored section label, e.g. "// 01 SELECTED WORK". Its number becomes the step numeral. */
  label: string;
  title?: ReactNode;
  blurb?: ReactNode;
  className?: string;
}

/**
 * Splits a stored label like "// 02 SERVICES & OFFERS" into its step number
 * and tag text. A label without a number keeps all its text and gets no badge.
 */
export function parseSectionLabel(label: string) {
  const match = label.match(/^\s*(?:\/\/)?\s*(\d+)\s+(.*)$/);
  if (!match) return { step: null, text: label.replace(/^\s*\/\/\s*/, "") };
  return { step: String(Number(match[1])), text: match[2] };
}

/**
 * A section opens like a manual step: circled step numeral, the heading, and
 * the stored label set as a page tag on the closing rule.
 */
export function SectionHeader({
  label,
  title,
  blurb,
  className = "",
}: SectionHeaderProps) {
  const { step, text } = parseSectionLabel(label);

  return (
    <Reveal yOffset={20}>
      <header
        className={`mb-12 md:mb-16 border-b-2 border-ink pb-6 ${className}`}
      >
        <div className="flex items-start gap-4 sm:gap-6">
          {step && <span className="step-badge mt-1 sm:mt-2">{step}</span>}
          <div className="min-w-0 flex-1">
            {title && (
              <h2 className="text-4xl sm:text-6xl font-black font-display text-ink uppercase tracking-[-0.03em] leading-[0.95]">
                {title}
              </h2>
            )}
            {blurb && (
              <p className="text-base text-muted mt-4 max-w-xl">{blurb}</p>
            )}
          </div>
          <span className="hidden md:block font-mono text-xs uppercase tracking-wider text-muted whitespace-nowrap pt-3">
            {text}
          </span>
        </div>
      </header>
    </Reveal>
  );
}
