import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { portfolioContent } from "@/content/portfolio";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Runs before first paint so the resolved theme is on <html> with no flash.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var t=(s==="dark"||s==="light")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

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
    locale: "en_US",
    type: "website",
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
    card: "summary_large_image",
    title: portfolioContent.seo.title,
    description: portfolioContent.seo.description,
    images: [portfolioContent.seo.ogImage],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${archivo.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas text-ink antialiased font-display selection:bg-accent selection:text-on-accent">
        {children}
      </body>
    </html>
  );
}
