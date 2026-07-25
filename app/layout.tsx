import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Editorial Circuit Portfolio',
  description: 'A modern, high-performance portfolio featuring editorial aesthetic and interactive UI components.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
