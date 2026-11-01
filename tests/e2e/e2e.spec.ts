import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObjects/PageObject';

// 1.3 FIXME
test("Mens category shows the expected clothing categories", async ({ page }) => {
    const po = new PageObject(page);
    await po.goto();

    await po.expandMenCategories();

    await expect(po.menCategories.filter({ visible: true })).toHaveText(["TShirts", "Jeans"], { ignoreCase: true });
});

// 1.4 FIXME
test("A user can successfully add an item to their cart", async ({ page }) => {
    const po = new PageObject(page);
    await po.goto();

    await po.addToCart("Blue Top");
    await expect(po.cartModal).toContainText("Your product has been added to cart.");

    await po.openCartFromModal();
    await expect(po.cartRows).toHaveCount(1);
    await expect(po.cartRows.locator(".cart_description h4")).toHaveText("Blue Top");
    await expect(po.cartRows.locator(".cart_quantity")).toHaveText("1");
});
