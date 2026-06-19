import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);
  await po.dismissGoogleVignette();
  await po.expandMenCategory();
  await po.dismissGoogleVignette();

  //Expect the Tshirts and Jeans category
  const categories = page.locator(po.menCategories);
  await expect(categories).toHaveCount(2);
  const menCategories = (await categories.allTextContents()).map((t) => t.trim());
  await expect(menCategories).toEqual(['Tshirts', 'Jeans']);
  for (const category of await categories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4 FIXME
test('A user can successfully add an item to their cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  const productName = 'Blue Top';

  const po = new PageObject(page);
  await po.dismissGoogleVignette();
  await page.waitForLoadState('networkidle');

  // scope to the featured product card, wait for it, then click the "Add to cart" text inside it
  const productCard = page.locator('.features_items .productinfo').filter({ hasText: productName }).first();
  await expect(productCard).toBeVisible({ timeout: 5000 });

  const addBtn = productCard.locator('text=Add to cart');
  await expect(addBtn).toBeVisible({ timeout: 5000 });
  await addBtn.click();

  // Wait for confirmation modal
  await expect(page.locator('#cartModal')).toBeVisible();
  await expect(page.getByText('Your product has been added to cart.')).toBeVisible();
  // Go to cart
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page).toHaveURL(/view_cart/);
  // Verify product is in cart
  await expect(page.locator('#cart_info_table')).toContainText(productName);
});
