import { MetadataRoute } from 'next';
import { getSeo } from '@/lib/portfolio';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeo();
  const baseUrl = seo.canonicalUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
