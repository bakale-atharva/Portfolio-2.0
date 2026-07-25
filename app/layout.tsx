import type { Metadata } from 'next';
import { portfolioContent } from '@/content/portfolio';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(portfolioContent.seo.canonicalUrl),
  title: {
    default: portfolioContent.seo.title,
    template: `%s | ${portfolioContent.profile.name}`,
  },
  description: portfolioContent.seo.description,
  alternates: {
    canonical: portfolioContent.seo.canonicalUrl,
  },
  openGraph: {
    title: portfolioContent.seo.title,
    description: portfolioContent.seo.description,
    url: portfolioContent.seo.canonicalUrl,
    siteName: `${portfolioContent.profile.name} — Editorial Circuit`,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: portfolioContent.seo.ogImage,
        width: 1200,
        height: 630,
        alt: portfolioContent.seo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioContent.seo.title,
    description: portfolioContent.seo.description,
    images: [portfolioContent.seo.ogImage],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-paper text-ink antialiased font-display selection:bg-lime selection:text-ink">
        {children}
      </body>
    </html>
  );
}

