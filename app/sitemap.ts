import { MetadataRoute } from 'next';
import { getSeo } from '@/lib/portfolio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeo();
  const baseUrl = seo.canonicalUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
