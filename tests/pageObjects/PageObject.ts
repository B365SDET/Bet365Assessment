import { Page } from "@playwright/test";

export class PageObject {
    readonly accordian: string = "#accordian";
    readonly collapse: string = "[data-parent='#accordian']";
    readonly men: string = "#Men"
    readonly menCategories: string = "#Men .panel-body li a"
    readonly menToggle: string = 'a[href="#Men"]';

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

     
    async expandMenCategory() {
    await this.dismissGoogleVignette();
    const toggle = this.page.locator(this.menToggle);
    const panel = this.page.locator('#Men .panel-body');
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
    // If vignette appeared, reload clears it — but also collapses accordion, so click again
    if (this.page.url().includes('#google_vignette')) {
        await this.page.goto('https://automationexercise.com/');
        await toggle.click();
    }
    await panel.waitFor({ state: 'visible' });
    }

   async dismissGoogleVignette(): Promise<void> {
    if (this.page.url().includes('#google_vignette')) {
        await this.page.goto('https://automationexercise.com/');
        }
    }
}