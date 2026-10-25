import { Page } from "@playwright/test";

export class PageObject {
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly men: string = "#Men"
    readonly menToggle: string = "a[href='#Men']"
    readonly menCategories: string = "#Men li"

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}