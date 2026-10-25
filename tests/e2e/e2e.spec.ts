import { test, expect } from '@playwright/test';
import { CartPage, PageObject } from '../pageObjects/PageObject';

test.beforeEach(async ({ page }) => {
  // Third party ads (and Google's full page "vignette" ads) overlay the page and intercept clicks.
  await page.route(/googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoicesmessages/, route => route.abort());
});

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  const po = new PageObject(page);
  await po.goto();

  await po.expandMenCategory();

  await expect(po.men).toBeVisible();
  // The site renders the names uppercase via CSS, the underlying text is "Tshirts" / "Jeans"
  await expect(po.menCategories).toHaveText(["TShirts", "Jeans"], { ignoreCase: true });
  for (const category of await po.menCategories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4 FIXME
test("A user can successfully add an item to their cart", async ({ page }) => {
  const productName = "Blue Top";
  const po = new PageObject(page);
  const cart = new CartPage(page);
  await po.goto();

  await po.addProductToCart(productName);

  await expect(po.cartModal).toBeVisible();
  await expect(po.cartModal).toContainText("Your product has been added to cart.");

  await po.viewCartLink.click();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cart.rows).toHaveCount(1);
  const row = cart.row(productName);
  await expect(row).toBeVisible();
  await expect(row.locator(".cart_price")).toHaveText("Rs. 500");
  await expect(row.locator(".cart_quantity")).toHaveText("1");
});
