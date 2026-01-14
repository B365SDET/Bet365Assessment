import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);
  await page.locator(po.men).click();

  //Expect the Tshirts and Jeans category
  const categories = await page.locator(po.menCategories).all();

  await expect(categories).toHaveLength(2);
  let menCategories: string[] = [];
  for (let c of categories) {
    menCategories.push((await c.textContent())?.trim() || "");
  }

  expect(menCategories).toEqual(["Tshirts", "Jeans"]);

  for (const c of categories) {
    await expect(c).toBeVisible();
  }
});

// 1.4 FIXME
test("A user can successfully add an item to their cart", async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);

  // Grab first product and its name
  const firstProduct = page.locator(po.productCard).first();
  const productName = await firstProduct.locator(po.productName).textContent();

  // Add product to cart
  await firstProduct.hover();
  await firstProduct.locator(po.addToCart).click();

  // Go to cart
  await page.locator(po.viewCartLink).click();

  // Verify product is in the cart and verify name
  await expect(page.locator(po.cartProducts)).toHaveCount(1);
  await expect(page.locator(po.cartProductName).first()).toHaveText(productName!);
})
