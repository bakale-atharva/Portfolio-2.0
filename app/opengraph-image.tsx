import { ImageResponse } from 'next/og';
import { getPortfolioContent } from '@/lib/portfolio';

export const runtime = 'edge';

export const alt = 'Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Satori cannot read CSS variables, so the Exploded View palette (see
// globals.css :root) is mirrored here as constants: paper, graphite, signal.
const PAPER = '#F3F3EE';
const INK = '#16181B';
const SIGNAL = '#FFD21F';

export default async function Image() {
  const content = await getPortfolioContent();
  const profile = content?.profile ?? {
    monogram: 'AB',
    availability: 'Available',
    name: 'Portfolio',
    role: '',
    tagline: '',
    location: '',
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: SIGNAL,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          fontFamily: 'sans-serif',
          color: INK,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `4px solid ${INK}`,
            paddingBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: `4px solid ${INK}`,
              background: PAPER,
              padding: '8px 18px',
              fontSize: '28px',
              fontWeight: 900,
            }}
          >
            {profile.monogram}
          </div>
          <div
            style={{
              fontSize: '22px',
              letterSpacing: '3px',
              fontWeight: 800,
            }}
          >
            {profile.availability.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '120px',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-3px',
              textTransform: 'uppercase',
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: '34px', fontWeight: 700, maxWidth: '900px' }}>
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `4px solid ${INK}`,
            paddingTop: '20px',
            fontSize: '22px',
            fontWeight: 700,
          }}
        >
          <div>{profile.location.toUpperCase()}</div>
          <div
            style={{
              display: 'flex',
              background: INK,
              color: PAPER,
              padding: '6px 16px',
            }}
          >
            NEXT.JS 16 • TAILWIND V4 • TYPESCRIPT
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
