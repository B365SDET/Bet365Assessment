import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';
import { CartPage } from '../pageObjects/CartPage';

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
test("A user can successfully add an item to their cart", async ({ page }) => {
  const po = new PageObject(page);
  const cart = new CartPage(page);
  const productId = 1;

  await page.goto('https://automationexercise.com/');

  // Capture what the homepage shows, so the cart can be checked against it
  const card = po.productCard(productId);
  const productName = (await card.locator('.productinfo p').textContent())!.trim();
  const productPrice = (await card.locator('.productinfo h2').textContent())!.trim();

  await po.addProductToCart(productId);

  const modal = page.locator(po.cartModal);
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Your product has been added to cart.');
  await modal.getByRole('link', { name: 'View Cart' }).click();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(page.locator(cart.cartRows)).toHaveCount(1);

  const row = cart.cartRow(productId);
  await expect(row.locator('.cart_description h4')).toHaveText(productName);
  await expect(row.locator('.cart_price')).toHaveText(productPrice);
  await expect(row.locator('.cart_quantity')).toHaveText('1');
});
