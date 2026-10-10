import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly menCategories: Locator;
    readonly menToggle: Locator;
    readonly featuredProducts: Locator;
    readonly cartModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menCategories = page.locator("#Men li");
        this.menToggle = page.locator("a[href='#Men']");
        this.featuredProducts = page.locator(".features_items .product-image-wrapper");
        this.cartModal = page.locator("#cartModal");
    }

    async expandMenCategory() {
        await this.menToggle.click();
    }

    productCard(productId: number) {
        return this.featuredProducts
            .filter({ has: this.page.locator(`a[data-product-id="${productId}"]`) });
    }

    // Scoped to .productinfo: the hover overlay repeats the same name/price, so a bare `p`/`h2` matches twice
    productName(productId: number) {
        return this.productCard(productId).locator(".productinfo p");
    }

    productPrice(productId: number) {
        return this.productCard(productId).locator(".productinfo h2");
    }

    async addProductToCart(productId: number) {
        const card = this.productCard(productId);
        await card.hover();
        await card.locator(".product-overlay .add-to-cart").click();
    }
}
