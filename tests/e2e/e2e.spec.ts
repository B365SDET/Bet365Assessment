import { test, expect } from "../fixtures";

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

// 1.3 
test("Men category shows the expected clothing categories", async ({ homePage }) => {
  await homePage.expandMenCategory();

  await expect(homePage.menPanel).toBeVisible();
  await expect(homePage.menCategories).toHaveText(["Tshirts", "Jeans"]);
});

// 1.4 
test("A user can successfully add an item to their cart", async ({ page, homePage, cartPage }) => {
  const productId = 1;

  const productName = await homePage.productName(productId).innerText();
  const productPrice = await homePage.productPrice(productId).innerText();

  await homePage.addProductToCart(productId);

  await expect(homePage.cartModal).toContainText("Your product has been added to cart.");
  await homePage.viewCartLink.click();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.cartRows).toHaveCount(1);
  await expect(cartPage.productName(productId)).toHaveText(productName);
  await expect(cartPage.productPrice(productId)).toHaveText(productPrice);
  await expect(cartPage.productQuantity(productId)).toHaveText("1");
});
