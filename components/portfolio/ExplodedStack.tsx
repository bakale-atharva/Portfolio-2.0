/**
 * The hero's exploded view: three isometric slabs pulled apart along one axis,
 * numbered with circled callouts, and a dashed ghost slab for the part not yet
 * assembled. Pure geometry drawn in one 2px line weight. It carries no words,
 * so it makes no claims; it is decorative and hidden from assistive tech.
 *
 * Each layer is an `.explode-layer` that drifts further apart on scroll (see
 * globals.css); its resting pose is the exploded pose.
 */

const CX = 240;
const HALF_W = 150;
const HALF_H = 52;
const THICK = 18;

interface Slab {
  cy: number;
  n?: number;
  shift: string;
  fill: "accent" | "surface";
  detail: "inset" | "rows" | "core";
  ghost?: boolean;
}

const SLABS: Slab[] = [
  { cy: 120, n: 1, shift: "-28px", fill: "accent", detail: "inset" },
  { cy: 270, n: 2, shift: "0px", fill: "surface", detail: "rows" },
  { cy: 420, n: 3, shift: "28px", fill: "surface", detail: "core" },
  { cy: 570, shift: "56px", fill: "surface", detail: "inset", ghost: true },
];

function points(pts: Array<[number, number]>) {
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

function SlabShape({ slab }: { slab: Slab }) {
  const { cy, ghost } = slab;
  const top = points([
    [CX, cy - HALF_H],
    [CX + HALF_W, cy],
    [CX, cy + HALF_H],
    [CX - HALF_W, cy],
  ]);
  const left = points([
    [CX - HALF_W, cy],
    [CX, cy + HALF_H],
    [CX, cy + HALF_H + THICK],
    [CX - HALF_W, cy + THICK],
  ]);
  const right = points([
    [CX, cy + HALF_H],
    [CX + HALF_W, cy],
    [CX + HALF_W, cy + THICK],
    [CX, cy + HALF_H + THICK],
  ]);
  const inset = points([
    [CX, cy - HALF_H / 2],
    [CX + HALF_W / 2, cy],
    [CX, cy + HALF_H / 2],
    [CX - HALF_W / 2, cy],
  ]);
  const topFill =
    slab.fill === "accent" ? "var(--accent)" : "var(--surface)";

  return (
    <g
      fill="none"
      stroke="var(--ink)"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeDasharray={ghost ? "7 7" : undefined}
      opacity={ghost ? 0.5 : 1}
    >
      <polygon points={left} fill={ghost ? "none" : "var(--rule)"} />
      <polygon points={right} fill={ghost ? "none" : "var(--rule)"} />
      <polygon points={top} fill={ghost ? "none" : topFill} />
      {slab.detail === "inset" && <polygon points={inset} />}
      {slab.detail === "rows" && (
        <>
          <line x1={CX - 60} y1={cy - 18} x2={CX + 60} y2={cy + 18} />
          <line x1={CX - 90} y1={cy} x2={CX + 30} y2={cy + 36} />
          <line x1={CX - 30} y1={cy - 36} x2={CX + 90} y2={cy} />
        </>
      )}
      {slab.detail === "core" && (
        <polygon
          points={points([
            [CX, cy - 20],
            [CX + 40, cy],
            [CX, cy + 20],
            [CX - 40, cy],
          ])}
          fill="var(--accent)"
        />
      )}
    </g>
  );
}

export function ExplodedStack({ className = "" }: { className?: string }) {
  const rows = SLABS.slice(0, -1);
  return (
    <svg
      viewBox="0 0 480 660"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Dashed guides between the corners of each pair of parts. */}
      <g fill="none">
        {rows.map((slab, i) => {
          const next = SLABS[i + 1];
          return [-HALF_W, HALF_W].map((dx) => (
            <line
              key={`${i}-${dx}`}
              className="guide-dash"
              x1={CX + dx}
              y1={slab.cy + THICK + 6}
              x2={CX + dx}
              y2={next.cy - 4}
              opacity={next.ghost ? 0.5 : 1}
            />
          ));
        })}
      </g>

      {SLABS.map((slab) => (
        <g
          key={slab.cy}
          className="explode-layer"
          style={{ "--explode-y": slab.shift } as React.CSSProperties}
        >
          <SlabShape slab={slab} />
          {slab.n && (
            <g>
              <line
                x1={CX + HALF_W + 8}
                y1={slab.cy}
                x2={CX + HALF_W + 34}
                y2={slab.cy}
                stroke="var(--ink)"
                strokeWidth={2}
              />
              <circle
                cx={CX + HALF_W + 56}
                cy={slab.cy}
                r={22}
                fill="var(--accent)"
                stroke="var(--ink)"
                strokeWidth={2}
              />
              <text
                x={CX + HALF_W + 56}
                y={slab.cy + 9}
                textAnchor="middle"
                fontSize={26}
                fontWeight={900}
                fill="var(--on-accent)"
                className="font-display"
              >
                {slab.n}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
