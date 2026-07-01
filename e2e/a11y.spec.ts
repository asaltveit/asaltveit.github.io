import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

async function waitForPageContent(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Create Biblio')).toBeVisible();
}

test.describe('Accessibility — axe', () => {
  test('light theme has no WCAG violations including color contrast', async ({ page }) => {
    await page.goto('/');
    await waitForPageContent(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dark theme has no WCAG violations including color contrast', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await waitForPageContent(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

test.describe('Accessibility — keyboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, 0));
  });

  test('in-page navigation moves focus to section heading', async ({ page }) => {
    await page.getByRole('link', { name: 'link to Projects section' }).first().click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('#projects-heading')).toBeFocused();
  });

  test('mobile menu Escape returns focus to menu button', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const menuButton = page.getByRole('button', { name: /main menu/i });
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toBeFocused();
  });
});
