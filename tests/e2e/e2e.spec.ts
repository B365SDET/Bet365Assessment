import { test, expect } from '@playwright/test';
import { PageObject } from './pageObjects/PageObject';

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);

  await page.locator(po.collapse).click({ selector: '#accordian" #Men' });

  //Expect the Tshirts and Jeans category
  const categories = page.locator(po.menCategories);

   await expect(categories).toHaveCount(2);
  
   await expect(menCategories).toBe(["Tshirts", "Jeans"]);
  
  await expect(categories).toBeVisible();
});

// 1.4 FIXME
test('User can add a product to the cart', async ({ page }) => {
 
  await page.goto('https://automationexercise.com/');

  await expect(page.locator('#header')).toBeVisible();

  const firstProduct = page.locator('.features_items .product-image-wrapper').first();
  await firstProduct.hover();

  await firstProduct.locator('a:has-text("Add to cart")').click();

  const modal = page.locator('#cartModal');
  await expect(modal).toBeVisible();

  await modal.locator('a:has-text("View Cart")').click();

 const cartItems = page.locator('#cart_info_table tbody tr');
  await expect(cartItems).toHaveCount(1);

 const productName = await cartItems.first().locator('.cart_description a').innerText();
  expect(productName.trim().length).toBeGreaterThan(0);
});
