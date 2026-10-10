// `test` comes from ../fixtures, which blocks third-party ad hosts for every test that uses `page`
// (Google vignette ads hijack link clicks at random and caused the 1.3 flakiness).
import { test, expect } from "../fixtures";
import { HomePage } from "../pageObjects/HomePage";
import { CartPage } from "../pageObjects/CartPage";

// 1.3 FIXME (fixed)
// Root cause: `page.locator(po.collapse).all()` only collected locators and never clicked anything,
// so the Men panel stayed collapsed and the "view the mens categories" step never happened.
// The assertion was also broken: `toBe` on an array compares references (it can never pass), and it
// expected "TSHIRTS"/"JEANS" while the DOM text is "Tshirts"/"Jeans" (the caps are CSS styling).
// Now: click the Men toggle, then use web-first assertions (toHaveCount/toHaveText/toBeVisible) that
// retry while the panel opens, instead of one-time .all()/textContent() snapshots.
// The expected text matches what the page shows ("Tshirts"); the requirement writes it as "TShirts".
test("Men category shows the expected clothing categories", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("https://automationexercise.com/");

  await homePage.expandMenCategory();

  await expect(homePage.menCategories).toHaveCount(2);
  await expect(homePage.menCategories).toHaveText(["Tshirts", "Jeans"]);
  for (const category of await homePage.menCategories.all()) {
    await expect(category).toBeVisible();
  }
});

// 1.4 FIXME (fixed)
// Adds product 1 from the homepage like a user would (hover the card, click the overlay "Add to cart"),
// then verifies the cart page, not just the confirmation popup: the popup only proves the click was
// handled, while the cart page proves the product was added. The name and price are read from the
// homepage and compared on the cart page, so nothing is hardcoded and catalog changes don't break it.
// Each test starts with a fresh browser context, so the cart should contain exactly this one item.
test("A user can successfully add an item to their cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const productId = 1;

  await page.goto("https://automationexercise.com/");

  // Capture what the homepage shows, so the cart can be checked against it
  const productName = (await homePage.productName(productId).textContent())!.trim();
  const productPrice = (await homePage.productPrice(productId).textContent())!.trim();

  await homePage.addProductToCart(productId);

  await expect(homePage.cartModal).toBeVisible();
  await expect(homePage.cartModal).toContainText("Your product has been added to cart.");
  await homePage.cartModal.getByRole("link", { name: "View Cart" }).click();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(cartPage.cartRows).toHaveCount(1);

  await expect(cartPage.productName(productId)).toHaveText(productName);
  await expect(cartPage.productPrice(productId)).toHaveText(productPrice);
  await expect(cartPage.productQuantity(productId)).toHaveText("1");
});
