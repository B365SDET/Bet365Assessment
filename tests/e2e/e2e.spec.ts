import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3
test('Mens category has the expected clothing categories', { tag: "@e2e" }, async ({ page }) => {
  const po = new PageObject(page);
  await po.blockAds();
  await page.goto(PageObject.BASE_URL);

  await po.accordian.scrollIntoViewIfNeeded();
  await po.menHeading.click();
  await po.menCategories.first().waitFor({ state: 'visible' });

  const expectedCategories = ["Tshirts", "Jeans"];
  const menCategories = await po.menCategories.allTextContents();

  expect(menCategories.map(c => c.trim())).toEqual(expectedCategories);
});

// 1.4
test.describe("Shopping Cart", () => {
  test("Adding a product to the cart reflects correct details at checkout", { tag: "@e2e" }, async ({ page }) => {
    const po = new PageObject(page);
    await po.blockAds();

    await test.step("Given the user navigates to the homepage", async () => {
      await page.goto(PageObject.BASE_URL);
    });

    const { expectedName, expectedPrice } = await test.step(
      "User adds the first product to the cart",
      async () => {
        const firstCard = po.productCard.first();
        await firstCard.scrollIntoViewIfNeeded();

        const name  = (await po.getProductName(firstCard).textContent())?.trim() ?? "";
        const price = (await po.getProductPrice(firstCard).textContent())?.trim() ?? "";

        await firstCard.hover();
        await po.addToCart.first().click();
        await po.viewCartLink.click();

        return { expectedName: name, expectedPrice: price };
      }
    );

    await test.step("Cart reflects the correct product", async () => {
      await expect(page).toHaveURL(PageObject.VIEW_CART_URL);
      await expect(po.cartRow).toHaveCount(1);
      await expect(po.emptyCart).not.toBeVisible();
      await expect(po.cartDescription.first()).toHaveText(expectedName);
      await expect(po.cartPrice.first()).toHaveText(expectedPrice);
      await expect(po.cartQuantity.first()).toHaveText("1");
      await expect(po.cartTotalPrice.first()).toHaveText(expectedPrice);
    });
  });
});