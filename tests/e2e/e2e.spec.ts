import { test, expect } from '@playwright/test';
import { HomePageObject } from '../pageObjects/HomePageObject';
import { NavBarPageObject } from '../pageObjects/NavBarPageObject';
import { ProductPageObject } from '../pageObjects/ProductPageObject';
let homepage: HomePageObject;
let navBar: NavBarPageObject;
let productPage: ProductPageObject; 

test.beforeEach(async ({ page }) => {
  // initialize page objects
  homepage = new HomePageObject(page);
  navBar = new NavBarPageObject(page);
  productPage = new ProductPageObject(page);

  //go to home page
  await page.goto('/');
});

// 1.3
test('Mens category has the expected clothing categories', async ({ page }) => {
  
  // Expand Men category
  await homepage.expandMen();

  //Expect the Tshirts and Jeans category
  const categories = await page.locator(homepage.menCategories).all();
  await expect(categories.length).toEqual(2);

  let menCategories = [];
  for (let c of categories) {
    menCategories.push((await c.textContent())?.trim());
  }

  await expect(menCategories).toStrictEqual(["Tshirts", "Jeans"]);
  
  for (let c of categories) {
    await expect(c).toBeVisible();
  }
});

// 1.4 
test('Product can be added to cart successfully', async ({ page }) => {
  await navBar.navigateToProducts();
  await productPage.addToCartByProductId(1);
  await productPage.verifyProductAddedToCartModalVisible();

  //TODO: Further validations can be added to verify cart count, cart details by navigating to cart page
});
