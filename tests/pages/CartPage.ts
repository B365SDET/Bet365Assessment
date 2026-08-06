import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * The cart page at /view_cart, showing the products the user has added.
 */
export class CartPage extends BasePage {
    readonly rows: Locator;
    readonly productNames: Locator;

    constructor(page: Page) {
        super(page);
        this.rows = page.locator('#cart_info_table tbody tr');
        this.productNames = page.locator('#cart_info_table .cart_description h4 a');
    }

    async waitUntilLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/view_cart/);
    }
}
