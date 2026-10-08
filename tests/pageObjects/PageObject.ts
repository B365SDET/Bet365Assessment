import { Page } from "@playwright/test";

export class PageObject {
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly men: string = "#Men"
    readonly menCategories: string = "#Men li"
    readonly menToggle: string = "a[href='#Men']";

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expandMenCategory() {
        await this.page.locator(this.menToggle).click();
    }
}