import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

test('Mens category has the expected clothing categories', async ({ page }) => {
  const po = new PageObject(page);

  await page.goto('/');
  await po.menCategoryToggle.dispatchEvent('click');

  await expect(po.menCategoryPanel).toBeVisible();
  await expect(po.menCategories).toHaveCount(2);
  await expect(po.menCategories).toHaveText([/tshirts/i, /jeans/i]);
});

test('A user can successfully add an item to their cart', async ({ page }) => {
  const po = new PageObject(page);

  await page.goto('/');

  const product = po.productCards.first();
  const productName = (await product.locator('.productinfo p').innerText()).trim();

  await product.locator('.productinfo .add-to-cart').click();
  await expect(po.cartModal).toBeVisible();
  await po.cartModal.getByRole('link', { name: 'View Cart' }).click();

  await expect(po.cartRows).toHaveCount(1);
  await expect(po.cartRows.first().locator('.cart_description')).toContainText(productName);
});
