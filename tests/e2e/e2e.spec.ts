import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3 FIXME
test('Mens category has the expected clothing categories', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  const po = new PageObject(page);

  await page.locator(po.collapse).all();

  //Expect the Tshirts and Jeans category
  const categories = await page.locator(po.menCategories).all();

  await expect(categories.length).toEqual(2);
  let menCategories = [];
  for (let c of categories) {
    menCategories.push((await c.textContent())?.toUpperCase().trim());
  }

   expect(menCategories).toStrictEqual(["TSHIRTS", "JEANS"]);
  
   await page.locator(po.men).click();
  for (let c of categories) {
    await expect(c).toBeVisible();
  }
});

// 1.4 FIXME
test.skip("A user can successfully add an item to their cart", async () => {
  
})
