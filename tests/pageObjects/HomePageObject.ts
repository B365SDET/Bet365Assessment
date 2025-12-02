import { Page } from "@playwright/test";

export class HomePageObject {
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly men: string = "#Men"
    readonly menCategories: string = "#Men li"
    readonly menToggle: string = "a[href='#Men']"

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expandMen() {
 
        const className = await this.page.getAttribute(this.men, 'class');
        if (className?.includes('collapse')) {
            await this.page.click(this.menToggle);
            await this.page.waitForSelector(`${this.menCategories}`);
        }
    }
}