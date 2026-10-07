import { Locator, Page } from "@playwright/test";

// Added for 1.4 so we can check what actually ended up in the cart.
export class CartPage {
    readonly page: Page;
    readonly cartRows: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartRows = page.locator("#cart_info_table tbody tr");
        this.emptyCartMessage = page.locator("#empty_cart");
    }

    async goto() {
        await this.page.goto("/view_cart");
    }

    cartRow(productId: number): Locator {
        return this.page.locator(`#product-${productId}`);
    }

    productName(productId: number): Locator {
        return this.cartRow(productId).locator(".cart_description h4 a");
    }

    productQuantity(productId: number): Locator {
        return this.cartRow(productId).locator(".cart_quantity");
    }
}
