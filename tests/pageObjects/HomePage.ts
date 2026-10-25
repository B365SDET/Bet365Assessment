import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly addedToCartMessage: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        const cartModal = page.locator("#cartModal");
        this.addedToCartMessage = cartModal.getByText("Your product has been added to cart.");
        this.viewCartLink = cartModal.getByRole("link", { name: "View Cart" });
    }

    async goto() {
        await this.page.goto("/");
    }

    async expandCategory(category: string) {
        await this.page.locator(`#accordian a[href="#${category}"]`).click();
    }

    subCategories(category: string) {
        return this.page.locator(`#${category} li`);
    }

    async addToCart(productName: string) {
        await this.page
            .locator(".features_items .productinfo")
            .filter({ has: this.page.getByText(productName, { exact: true }) })
            .getByText("Add to cart")
            .click();
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}
