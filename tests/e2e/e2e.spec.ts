import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// 1.3
test('Mens category has the expected clothing categories', {
  annotation: { type: 'requirement', description: '1.3' },
}, async ({ page }) => {
  const home = new HomePage(page);

  await test.step('Open the home page', () => home.open());

  await test.step('Expand the Men category', () => home.expandMenCategories());

  await test.step('Verify the Men category shows Tshirts and Jeans', async () => {
    await expect(home.menCategoryItems).toHaveCount(2);
    await expect(home.menCategoryItems).toHaveText([/Tshirts/, /Jeans/]);
    expect(await home.getMenCategoryNames()).toEqual(['Tshirts', 'Jeans']);
  });

  await test.step('Verify the categories are viewable', async () => {
    for (const item of await home.menCategoryItems.all()) {
      await expect(item).toBeVisible();
    }
  });
});

// 1.4
test('A user can successfully add an item to their cart', {
  annotation: { type: 'requirement', description: '1.4' },
}, async ({ page }) => {
  const home = new HomePage(page);

  await test.step('Open the home page', () => home.open());

  const modal = await test.step('Add the first product to the cart',
    () => home.addFirstProductToCart());

  const cart = await test.step('Go to the cart', () => modal.viewCart());

  await test.step('Verify the product is in the cart', async () => {
    await expect(cart.rows).toHaveCount(1);
    await expect(cart.productNames).toHaveText([modal.addedProductName]);
  });
});
