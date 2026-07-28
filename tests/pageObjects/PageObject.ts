import { Page, Locator } from "@playwright/test";

export class PageObject {
    readonly page: Page;

    readonly menLink: Locator;
    readonly tshirtsLink: Locator;
    readonly jeansLink: Locator;
    readonly menCategoryLink: Locator;

    readonly addFirstProductToCartBtn: Locator;
    readonly viewCartLink: Locator;
    readonly cartRows: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menLink = page.locator('a[href="#Men"]');
        this.tshirtsLink = page.getByRole('link', { name: 'TShirts'});
        this.jeansLink = page.getByRole('link', { name: 'Jeans'});
        this.menCategoryLink = page.locator('#Men').getByRole('link');

        this.addFirstProductToCartBtn = page.getByText('Add to cart').first();
        this.viewCartLink = page.getByRole('link', { name: 'View Cart'});
        this.cartRows = page.locator('#cart_info_table tbody tr');
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

    async addFirstProductToCart() {
        await this.addFirstProductToCartBtn.click();
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}