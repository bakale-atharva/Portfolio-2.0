import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { getPortfolioContent, FALLBACK_SEO } from "@/lib/portfolio";
import "./globals.css";

// `axes: ["wdth"]` pulls in the width axis alongside the weight axis: the hero
// headline condenses on scroll (act 2), and heavy condensed Archivo is the
// manual's numeral and heading voice.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Runs before first paint so the resolved theme is on <html> with no flash.
// Light (the paper sheet) is the default: only an explicit stored preference
// or an explicit OS dark-mode signal resolves to dark.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var t=(s==="dark"||s==="light")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPortfolioContent();
  const seo = content?.seo ?? FALLBACK_SEO;
  const siteName = content
    ? `${content.profile.name} — Editorial Circuit`
    : seo.title;

  return {
    metadataBase: new URL(seo.canonicalUrl),
    title: {
      default: seo.title,
      template: content ? `%s | ${content.profile.name}` : "%s",
    },
    description: seo.description,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
    icons: {
      icon: "/icon.svg",
    },
  };
}

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
