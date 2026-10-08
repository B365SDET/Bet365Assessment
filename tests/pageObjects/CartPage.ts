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
}
