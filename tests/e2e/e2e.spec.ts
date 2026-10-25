import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// The site serves Google ads. Clicking a link can trigger a full-screen
// "vignette" ad (URL changes to #google_vignette) that swallows the click.
// Ads aren't what we're testing, so only allow first-party requests.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const { hostname } = new URL(route.request().url());
    return hostname.endsWith('automationexercise.com') ? route.continue() : route.abort();
  });
});

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);

  // The Men sub-categories are in a collapsed accordion panel: they're in the
  // DOM but hidden until the "Men" toggle is clicked.
  await page.locator(po.menToggle).click();

  //Expect the Tshirts and Jeans category
  const menCategories = page.locator(po.menCategories);

  // Web-first assertions retry until they pass or time out
  await expect(menCategories).toHaveCount(2);
  await expect(menCategories).toHaveText(["Tshirts", "Jeans"]);

  for (const category of await menCategories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4 FIXME
test('A user can successfully add an item to their cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByText('Add to cart').first().click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.locator('#product-1')).toContainText('Blue Top');
});
