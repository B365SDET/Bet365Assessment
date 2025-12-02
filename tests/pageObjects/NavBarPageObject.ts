import { Page } from "@playwright/test";

export class NavBarPageObject {
   
    readonly productsMenu: string = "a[href='/products']";
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async navigateToProducts() {
        await this.page.click(this.productsMenu);
    }
}