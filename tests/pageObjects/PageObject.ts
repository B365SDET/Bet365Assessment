import { Page } from "@playwright/test";

export class PageObject {
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly menToggle = "div [href='#Men']";
    readonly menCategories: string = "#Men li";

    // Product & Cart selectors
    readonly productCard = ".features_items .col-sm-4";
    readonly addToCartBtn = ".productinfo a.add-to-cart"; 
    readonly modalViewCartBtn = "a:has-text('View Cart')";
    readonly cartTable = "table.table.table-condensed";
    readonly cartEmptyText = "Cart is empty!";
    readonly cartEmptyContainer = "#empty_cart";

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
