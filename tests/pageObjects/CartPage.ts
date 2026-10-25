import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly emptyCartMessage: Locator;
    readonly items: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emptyCartMessage = page.getByText("Cart is empty!");
        this.items = page.locator("#cart_info_table tbody tr");
    }

    async goto() {
        await this.page.goto("/view_cart");
    }

    item(productName: string) {
        const row = this.items.filter({ has: this.page.getByRole("link", { name: productName, exact: true }) });

        return {
            price: row.locator(".cart_price"),
            quantity: row.locator(".cart_quantity"),
            total: row.locator(".cart_total"),
        };
    }
}
