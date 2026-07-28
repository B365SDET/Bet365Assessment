import { Page, Locator } from "@playwright/test";

export class PageObject {
    readonly page: Page;

    readonly menLink: Locator;
    readonly tshirtsLink: Locator;
    readonly jeansLink: Locator;
    readonly menCategoryLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menLink = page.locator('a[href="#Men"]');
        this.tshirtsLink = page.getByRole('link', { name: 'TShirts'});
        this.jeansLink = page.getByRole('link', { name: 'Jeans'});
        this.menCategoryLink = page.locator('#Men').getByRole('link');

    }

    async goto() {
        await this.page.goto('/');
    }

    async blockAds() {
        await this.page.route(/(googlesyndication|doubleclick|googleadservices|adtrafficquality)/, route => route.abort());
    }

    async viewMenCategories() {
        await this.menLink.click();
    }
}