import { test, expect, type Page } from '@playwright/test';

async function scrollTo(page: Page, y: number) {
  await page.evaluate((scrollY) => {
    window.scrollTo(0, scrollY);
  }, y);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThanOrEqual(Math.max(0, y - 50));
}

test.describe('Portfolio smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await scrollTo(page, 0);
  });

  test('loads core page structure', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Anna Saltveit', level: 1 })
    ).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByText('Featured Projects')).toBeVisible();
  });

  test('in-page navigation scrolls to Projects', async ({ page }) => {
    await page.getByRole('link', { name: 'link to Projects section' }).first().click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('scroll-aware header switches between full, hidden, and compact', async ({ page }) => {
    const header = page.locator('header');

    await expect(header.getByRole('link', { name: 'link to Experience section' })).toBeVisible();

    await scrollTo(page, 1500);
    await expect.poll(async () => header.getAttribute('aria-hidden')).toBe('true');

    const scrollY = await page.evaluate(() => window.scrollY);
    await scrollTo(page, Math.max(0, scrollY - 300));
    await expect.poll(async () => header.getAttribute('aria-hidden')).toBe('false');
    await expect(
      page.getByRole('navigation').getByRole('link', { name: 'link to About section' }).filter({ hasText: 'Anna' })
    ).toBeVisible();
    await expect(header.getByRole('link', { name: 'link to Experience section' })).not.toBeVisible();
  });

  test('theme toggle persists after reload', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload({ waitUntil: 'networkidle' });

    const toggle = page.getByRole('button', { name: 'Switch to dark theme' });
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect
      .poll(() => page.evaluate(() => document.documentElement.classList.contains('dark')))
      .toBe(true);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('theme')))
      .toBe('dark');

    await page.reload({ waitUntil: 'networkidle' });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.classList.contains('dark')))
      .toBe(true);
    await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();
  });

  test('skip to main content link receives keyboard focus', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /skip to main content/i })).toBeFocused();
  });
});

test.describe('Portfolio smoke — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('mobile menu closes after selecting a section', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open main menu' });
    const menuPanel = page.locator('#navbar-solid-bg');

    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(menuPanel).toBeVisible();

    await menuPanel.getByRole('link', { name: 'link to Projects section' }).click();
    await expect(menuPanel).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });
});
