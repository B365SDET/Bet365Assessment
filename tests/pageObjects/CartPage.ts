import { Page } from "@playwright/test";

export class CartPage {
    readonly cartRows: string = "#cart_info_table tbody tr";

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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
