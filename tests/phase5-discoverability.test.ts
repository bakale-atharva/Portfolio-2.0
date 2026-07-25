import fs from 'fs';
import path from 'path';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { metadata } from '../app/layout';
import { portfolioContent } from '../content/portfolio';

describe('Phase 5 — Discoverability & Local Assets', () => {
  test('sitemap returns correct canonical URL and entries', () => {
    const sitemapEntries = sitemap();
    expect(sitemapEntries).toHaveLength(1);
    expect(sitemapEntries[0].url).toBe(portfolioContent.seo.canonicalUrl);
    expect(sitemapEntries[0].priority).toBe(1.0);
    expect(sitemapEntries[0].changeFrequency).toBe('monthly');
  });

  test('robots returns correct policy and sitemap reference', () => {
    const robotsConfig = robots();
    expect(robotsConfig.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });
    expect(robotsConfig.sitemap).toBe(`${portfolioContent.seo.canonicalUrl}/sitemap.xml`);
  });

  test('layout metadata is sourced from portfolioContent', () => {
    expect(metadata.description).toBe(portfolioContent.seo.description);
    expect(metadata.alternates?.canonical).toBe(portfolioContent.seo.canonicalUrl);
    expect(metadata.openGraph?.title).toBe(portfolioContent.seo.title);
    expect(metadata.openGraph?.description).toBe(portfolioContent.seo.description);
    expect(metadata.openGraph?.url).toBe(portfolioContent.seo.canonicalUrl);
  });

  test('local SVG project assets exist in public/ directory', () => {
    const publicDir = path.join(process.cwd(), 'public');
    portfolioContent.projects.forEach((project) => {
      const relativeImagePath = project.image.replace(/^\//, '');
      const fullPath = path.join(publicDir, relativeImagePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  test('app/icon.svg exists', () => {
    const iconPath = path.join(process.cwd(), 'app', 'icon.svg');
    expect(fs.existsSync(iconPath)).toBe(true);
  });
});
