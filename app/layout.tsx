import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atharva Bakale — Creative Technologist & Full-Stack Architect',
  description:
    'Bridging technical precision and editorial aesthetics. Specializing in Next.js, React performance, design systems, and modern web applications.',
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
