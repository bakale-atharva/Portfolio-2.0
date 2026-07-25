import { MetadataRoute } from 'next';
import { portfolioContent } from '@/content/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioContent.seo.canonicalUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}

