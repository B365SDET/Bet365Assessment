import { Page } from "@playwright/test";

export class PageObject {
    // 1.3
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly men: string = "a[href='#Men']";
    readonly menCategories: string = "#Men li";

    // 1.4
    readonly productCard: string = ".productinfo";
    readonly productName: string = "p";
    readonly addToCart: string = ".add-to-cart";
    readonly viewCartLink: string = "u:has-text('View Cart')";
    readonly cartProducts: string = "#cart_info_table tbody tr";
    readonly cartProductName: string = ".cart_description h4 a";

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}