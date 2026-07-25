import { MetadataRoute } from 'next';
import { portfolioContent } from '@/content/portfolio';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = portfolioContent.seo.canonicalUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

