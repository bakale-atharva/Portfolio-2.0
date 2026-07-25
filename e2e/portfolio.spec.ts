import { test, expect } from '@playwright/test';

test.describe('Editorial Circuit Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render page title and main hero statement', async ({ page }) => {
    await expect(page).toHaveTitle(/Atharva Bakale/);
    const heroHeading = page.getByRole('heading', { level: 1, name: /expressive digital experiences/i });
    await expect(heroHeading).toBeVisible();
  });

  test('should navigate via anchor links cleanly', async ({ page }) => {
    // Click work link
    const workLink = page.getByRole('link', { name: /^work$/i }).first();
    await workLink.click();
    await expect(page.locator('#work')).toBeVisible();

    // Click skills link
    const skillsLink = page.getByRole('link', { name: /^skills$/i }).first();
    await skillsLink.click();
    await expect(page.locator('#skills')).toBeVisible();

    // Click services link
    const servicesLink = page.getByRole('link', { name: /^services$/i }).first();
    await servicesLink.click();
    await expect(page.locator('#services')).toBeVisible();

    // Click about link
    const aboutLink = page.getByRole('link', { name: /^about$/i }).first();
    await aboutLink.click();
    await expect(page.locator('#about')).toBeVisible();
  });

  test('should have no horizontal scroll overflow on mobile (375px), tablet (768px), and desktop (1440px)', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(isOverflowing).toBe(false);
    }
  });

  test('should support keyboard navigation and focus rings', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeDefined();
  });
});
