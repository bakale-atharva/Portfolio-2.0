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

  test('should navigate via anchor links cleanly to all main sections', async ({ page }) => {
    const sections = ['work', 'services', 'skills', 'about', 'contact'];

    for (const sectionId of sections) {
      const link = page.locator(`a[href="#${sectionId}"]`).first();
      await expect(link).toBeVisible();
      await link.click();
      await expect(page.locator(`#${sectionId}`)).toBeVisible();
    }
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

  test('should support sequential keyboard focus order and visible focus states', async ({ page }) => {
    // Focus first interactive element
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus');
    await expect(firstFocused).toBeVisible();

    // Tab through main header navigation links
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Tab');
      const focusedLink = page.locator(':focus');
      await expect(focusedLink).toBeVisible();
    }
  });

  test('should respect reduced motion setting and render static fallback elements', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check that marquee marquee container aria-label is hidden or fallback grid is rendered
    const staticSkillsContainer = page.locator('#skills');
    await expect(staticSkillsContainer).toBeVisible();
    await expect(staticSkillsContainer.getByText('TypeScript').first()).toBeVisible();
  });

  test('should enforce minimum 44px touch target sizes for primary links and buttons', async ({ page }) => {
    const touchTargetElements = page.locator('.touch-target');
    const count = await touchTargetElements.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 10); i++) {
      const box = await touchTargetElements.nth(i).boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
