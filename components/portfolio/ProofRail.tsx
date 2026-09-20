import { Metric } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/portfolio/Container";

interface ProofRailProps {
  metrics: Metric[];
}

export function ProofRail({ metrics }: ProofRailProps) {
  return (
    <section className="border-b-2 border-ink bg-surface">
      <Container>
        <Reveal yOffset={20}>
          <dl className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`py-6 md:py-8 ${index !== 0 ? "md:pl-8" : ""} ${
                  index !== metrics.length - 1 ? "md:pr-8" : ""
                }`}
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  {metric.label}
                </dt>
                <dd className="font-display text-4xl sm:text-5xl font-black text-ink tracking-[-0.03em] mt-1">
                  {metric.value}
                </dd>
                <dd className="text-sm text-muted mt-1">
                  {metric.description}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
