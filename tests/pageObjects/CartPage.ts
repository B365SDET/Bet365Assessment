import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartRows = page.locator("#cart_info_table tbody tr");
    }

    cartRow(productId: number) {
        return this.page.locator(`#product-${productId}`);
    }

    productName(productId: number) {
        return this.cartRow(productId).locator(".cart_description h4");
    }

    productPrice(productId: number) {
        return this.cartRow(productId).locator(".cart_price");
    }

    productQuantity(productId: number) {
        return this.cartRow(productId).locator(".cart_quantity");
    }
}
