import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);
  const categories = page.locator(po.menCategories);

  // The Men sub-categories sit in a collapsed Bootstrap accordion, and the page
  // injects ads/late JS that can swallow the first click before the collapse
  // handler is bound. Retry the click until the panel actually expands —
  await expect(async () => {
    await page.locator(po.menToggle).click();
    await expect(categories.first()).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 15000 });

  // toHaveText compares the element's text content (Tshirts/Jeans),
  // not the CSS-uppercased display text. It also asserts the count is 2.
  await expect(categories).toHaveText(["Tshirts", "Jeans"]);

  // The requirement says the categories should be visible, so assert that too.
  await expect(categories.first()).toBeVisible();
  await expect(categories.last()).toBeVisible();
});

// 1.4 FIXME
test("A user can successfully add an item to their cart", async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Pick the first product on the home page and remember its name.
  const product = page.locator('.features_items .product-image-wrapper').first();
  const productName = (await product.locator('.productinfo p').first().textContent())?.trim();
  expect(productName).toBeTruthy();

  // Add it to the cart via the product's "Add to cart" button.
  await product.locator('a.add-to-cart').first().click();

  // A confirmation modal appears — use its link to go to the cart.
  const modal = page.locator('#cartModal');
  await expect(modal).toBeVisible();
  await modal.getByRole('link', { name: 'View Cart' }).click();

  // The product should now be listed in the cart.
  await expect(page).toHaveURL(/view_cart/);
  await expect(page.locator('#cart_info')).toContainText(productName!);
});
