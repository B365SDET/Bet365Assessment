import { Locator, Page } from "@playwright/test";

export class PageObject {
    readonly page: Page;
    readonly menToggle: Locator;
    readonly menCategories: Locator;
    readonly featuredProducts: Locator;
    readonly cartModal: Locator;
    readonly cartRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menToggle = page.locator("[data-parent='#accordian'][href='#Men']");
        this.menCategories = page.locator("#Men li");
        this.featuredProducts = page.locator(".features_items .product-image-wrapper");
        this.cartModal = page.locator("#cartModal");
        this.cartRows = page.locator("#cart_info_table tbody tr");
    }

    async goto() {
        await this.page.goto("/");
    }

    async expandMenCategories() {
        await this.menToggle.click();
    }

    async addToCart(productName: string) {
        const card = this.featuredProducts.filter({ hasText: productName });
        await card.hover();
        await card.locator(".product-overlay .add-to-cart").click();
    }

    async openCartFromModal() {
        await this.cartModal.getByRole("link", { name: "View Cart" }).click();
    }
}
