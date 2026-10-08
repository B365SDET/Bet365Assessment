import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// Third-party ads (Google vignette interstitials) hijack link clicks at random and cause flaky failures.
// They're not part of what we're testing, so block them.
const AD_HOSTS = /googlesyndication\.com|doubleclick\.net|adtrafficquality\.google|fundingchoicesmessages\.google\.com/;

test.beforeEach(async ({ page }) => {
  await page.route(AD_HOSTS, route => route.abort());
});

// 1.3 FIXME
test('Men category shows the expected clothing categories', async ({ page }) => {
  const po = new PageObject(page);
  await page.goto('https://automationexercise.com/');

  await po.expandMenCategory();

  const menCategories = page.locator(po.menCategories);
  await expect(menCategories).toHaveCount(2);
  await expect(menCategories).toHaveText(["Tshirts", "Jeans"]);
  for (const category of await menCategories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4 FIXME
test.skip("A user can successfully add an item to their cart", async () => {
  
})
