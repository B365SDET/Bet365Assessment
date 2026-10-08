import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { CartPage } from '../pageObjects/CartPage';

// Third-party ads (Google vignette interstitials) hijack link clicks at random and cause flaky failures.
// They're not part of what we're testing, so block them.
// Kept as a beforeEach since there's one E2E spec; would move to a custom fixture as the suite grows.
const AD_HOSTS = /googlesyndication\.com|doubleclick\.net|adtrafficquality\.google|fundingchoicesmessages\.google\.com/;

test.beforeEach(async ({ page }) => {
  await page.route(AD_HOSTS, route => route.abort());
});

// 1.3
// Root cause: `page.locator(po.collapse).all()` only collected locators and never clicked anything,
// so the Men panel stayed collapsed and the "view the mens categories" step never happened.
// The assertion was also broken: `toBe` on an array compares references (it can never pass), and it
// expected "TSHIRTS"/"JEANS" while the DOM text is "Tshirts"/"Jeans" (the caps are CSS styling).
// Now: click the Men toggle, then use web-first assertions (toHaveCount/toHaveText/toBeVisible) that
// retry while the panel opens, instead of one-time .all()/textContent() snapshots.
// The expected text matches what the page shows ("Tshirts"); the requirement writes it as "TShirts".
test('Men category shows the expected clothing categories', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://automationexercise.com/');

  await homePage.expandMenCategory();

  const menCategories = page.locator(homePage.menCategories);
  await expect(menCategories).toHaveCount(2);
  await expect(menCategories).toHaveText(["Tshirts", "Jeans"]);
  for (const category of await menCategories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4
// Adds product 1 from the homepage like a user would (hover the card, click the overlay "Add to cart"),
// then verifies the cart page, not just the confirmation popup: the popup only proves the click was
// handled, while the cart page proves the product was added. The name and price are read from the
// homepage and compared on the cart page, so nothing is hardcoded and catalog changes don't break it.
// Each test starts with a fresh browser context, so the cart should contain exactly this one item.
test("A user can successfully add an item to their cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const cart = new CartPage(page);
  const productId = 1;

  await page.goto('https://automationexercise.com/');

  // Capture what the homepage shows, so the cart can be checked against it
  const productName = (await homePage.productName(productId).textContent())!.trim();
  const productPrice = (await homePage.productPrice(productId).textContent())!.trim();

  await homePage.addProductToCart(productId);

  const modal = page.locator(homePage.cartModal);
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Your product has been added to cart.');
  await modal.getByRole('link', { name: 'View Cart' }).click();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(page.locator(cart.cartRows)).toHaveCount(1);

  await expect(cart.productName(productId)).toHaveText(productName);
  await expect(cart.productPrice(productId)).toHaveText(productPrice);
  await expect(cart.productQuantity(productId)).toHaveText('1');
});
