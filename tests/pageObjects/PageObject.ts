import { Page } from "@playwright/test";

export class PageObject {
    // Unused after the 1.3/1.4 rewrite: verified no test or page object method references these.
    // `collapse` matched all three category toggles (Women/Men/Kids) and was only used by the
    // original no-op `.all()` call; `menToggle` below targets the Men toggle specifically.
    // readonly accordian: string = "#accordian";
    // readonly collapse: string = "[data-parent='#accordian']";
    // readonly men: string = "#Men"
    readonly menCategories: string = "#Men li"
    readonly menToggle: string = "a[href='#Men']";
    readonly featuredProducts: string = ".features_items .product-image-wrapper";
    readonly cartModal: string = "#cartModal";

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expandMenCategory() {
        await this.page.locator(this.menToggle).click();
    }

    productCard(productId: number) {
        return this.page.locator(this.featuredProducts)
            .filter({ has: this.page.locator(`a[data-product-id="${productId}"]`) });
    }

    async addProductToCart(productId: number) {
        const card = this.productCard(productId);
        await card.hover();
        await card.locator(".product-overlay .add-to-cart").click();
    }
}