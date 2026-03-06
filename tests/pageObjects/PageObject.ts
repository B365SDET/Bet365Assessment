import { Page,Locator } from "@playwright/test";

export class PageObject {
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly men: string = "#Men"
    readonly menCategories: string = "#Men li"
    readonly menTshirtsProductLink: Locator
    readonly addToCartButton: Locator

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.menTshirtsProductLink = this.page.getByRole('link', { name: ' View Product' }).nth(1);
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    }
}