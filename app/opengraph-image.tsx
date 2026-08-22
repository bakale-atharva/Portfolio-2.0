import { ImageResponse } from 'next/og';
import { getPortfolioContent } from '@/lib/portfolio';

export const runtime = 'edge';

export const alt = 'Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

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
          background: '#11110F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#F3F0E8',
          border: '12px solid #C7FF3D',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#F3F0E8',
              color: '#11110F',
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#C7FF3D',
              }}
            />
            {`${profile.monogram} // EDITORIAL CIRCUIT`}
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#C7FF3D',
              letterSpacing: '2px',
              fontWeight: 600,
            }}
          >
            {profile.availability.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '56px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px' }}>
            {profile.name}
          </div>
          <div style={{ fontSize: '28px', color: '#66655F', maxWidth: '800px' }}>
            {profile.role}
          </div>
          <div style={{ fontSize: '22px', color: '#C7FF3D', marginTop: '12px' }}>
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(243, 240, 232, 0.2)',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#66655F',
          }}
        >
          <div>{profile.location.toUpperCase()}</div>
          <div>NEXT.JS 16 • TAILWIND V4 • TYPESCRIPT</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
