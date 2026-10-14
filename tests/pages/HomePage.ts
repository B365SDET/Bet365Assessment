import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly menToggle: Locator;
    readonly menPanel: Locator;
    readonly menCategories: Locator;
    readonly cartModal: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menToggle = page.locator("#accordian").getByText("Men", { exact: true });
        this.menPanel = page.locator("#Men");
        this.menCategories = this.menPanel.getByRole("link");
        this.cartModal = page.locator("#cartModal");
        this.viewCartLink = this.cartModal.getByRole("link", { name: "View Cart" });
    }

    async goto() {
        await this.page.goto("/");
    }

    async expandMenCategory() {
        await this.menToggle.click();
    }

    productCard(productId: number) {
        return this.page.locator(".features_items .product-image-wrapper")
            .filter({ has: this.page.locator(`[data-product-id="${productId}"]`) });
    }

    // The hover overlay repeats the name and price, so read them from .productinfo
    productName(productId: number) {
        return this.productCard(productId).locator(".productinfo p");
    }

    productPrice(productId: number) {
        return this.productCard(productId).locator(".productinfo h2");
    }

    // Hover the card and click the overlay's button, like a user does
    async addProductToCart(productId: number) {
        const card = this.productCard(productId);
        await card.hover();
        await card.locator(".product-overlay").getByText("Add to cart").click();
    }
}
