import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3 FIXME
test.beforeEach(async ({ page }) => {
  const homePage = new PageObject(page);
  await homePage.blockAds();
});

test('Mens category has the expected clothing categories', async ({ page }) => {
  const homePage = new PageObject(page);

  await homePage.goto();
  await homePage.viewMenCategories();

  //Expect the Tshirts and Jeans category
  await expect(homePage.tshirtsLink).toBeVisible();
  await expect(homePage.jeansLink).toBeVisible();
  await expect(homePage.menCategoryLink).toHaveCount(2);
});

// 1.4 FIXME
test.skip("A user can successfully add an item to their cart", async () => {
  
})
