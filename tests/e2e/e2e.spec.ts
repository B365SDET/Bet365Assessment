import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

let po: PageObject;
const BASE_URL = 'https://automationexercise.com/';

// Clean slate for test
test.beforeEach(async ({ page, context }) => {
  await context.clearCookies();

  await page.goto(BASE_URL);
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.reload();

  // TO DO: Create a fixture for page object, please... :)
  po = new PageObject(page);
});

// 1.3
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.locator(po.menToggle).scrollIntoViewIfNeeded();
  await page.locator(po.menToggle).click();

  const menCategoryLocators = page.locator(po.menCategories);
  const menCategoryTextsRaw = await menCategoryLocators.allTextContents();
  const menCategoryTexts = menCategoryTextsRaw.map(text => text.trim());

// TO DO: Validate expected categories so we can check them individually and store expect aray at top level 
  await expect(menCategoryLocators).toHaveCount(2);
  expect(menCategoryTexts).toStrictEqual(['Tshirts', 'Jeans']);

  await expect(menCategoryLocators.first()).toBeVisible();
});

// 1.4
test('A user can successfully add an item to their cart', async ({ page }) => {
  const firstProduct = page.locator(po.productCard).first();
  await firstProduct.hover();
  await firstProduct.locator(po.addToCartBtn).click();

  await page.getByRole('link', { name: 'View Cart' }).click();

  await expect(page).toHaveURL(/.*view_cart/);

  await expect(page.locator(po.cartEmptyContainer)).toBeHidden();

  const table = page.locator(po.cartTable);
  await expect(table).toBeVisible();

  const rowCount = await table.locator('tbody tr').count();
  expect(rowCount).toBeGreaterThan(0);
});
