import { Profile } from "@/lib/content";
import { Container } from "@/components/portfolio/Container";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-canvas py-10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2 border-2 border-ink px-3 h-11 font-black text-xl tracking-tight text-ink hover:bg-accent hover:text-on-accent transition-colors touch-target"
              aria-label="Back to top"
            >
              <span>{profile.monogram}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-ink inline-block" />
            </a>
            <span className="font-mono text-xs text-muted">
              © {currentYear} {profile.name}. All rights reserved.
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 h-9 border-2 border-ink">
            <span className="w-2.5 h-2.5 rounded-full bg-accent border border-ink" />
            <span className="text-ink">{profile.availability}</span>
          </div>

          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-ink border-2 border-ink hover:bg-accent hover:text-on-accent px-4 h-11 transition-colors touch-target"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
