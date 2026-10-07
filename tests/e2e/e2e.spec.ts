import { test, expect } from "../fixtures/fixtures";

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

// 1.3
test("Mens category has the expected clothing categories", async ({ homePage }) => {
  // This was the main reason the test failed. The Men section is a collapsed accordion,
  // and `page.locator(po.collapse).all()` doesn't click anything - it just finds elements.
  // So the links were never shown and toBeVisible() could never pass.
  await homePage.expandCategory("Men");

  const menCategories = homePage.subCategories("Men");

  // The old version used toBe() on an array, which compares references, so it would
  // never match. It also expected "TSHIRTS" but the page text is "Tshirts ".
  // toHaveText retries until the panel finishes opening, trims whitespace, and with
  // ignoreCase we can match the wording in the requirement ("TShirts").
  await expect(menCategories).toHaveText(["TShirts", "Jeans"], { ignoreCase: true });

  for (const category of await menCategories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4
test("A user can successfully add an item to their cart", async ({ homePage, cartPage }) => {
  const productId = 1;
  // grab the name from the page rather than hard-coding "Blue Top"
  const productName = await homePage.productCard(productId).locator("p").innerText();

  await homePage.addProductToCart(productId);

  await expect(homePage.cartModal).toBeVisible();
  await expect(homePage.cartModal).toContainText("Your product has been added to cart.");

  // the popup alone doesn't prove much - check the cart actually has the item
  await homePage.viewCartLink.click();
  await expect(cartPage.page).toHaveURL(/\/view_cart$/);

  // every test starts with a fresh browser context, so the cart should only have this one item
  await expect(cartPage.cartRows).toHaveCount(1);
  await expect(cartPage.productName(productId)).toHaveText(productName);
  await expect(cartPage.productQuantity(productId)).toHaveText("1");
});
