import { Locator, Page } from "@playwright/test";

export class PageObject {
    readonly page: Page;
    readonly accordian: Locator;
    readonly menToggle: Locator;
    readonly men: Locator;
    readonly menCategories: Locator;
    readonly products: Locator;
    readonly cartModal: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accordian = page.locator("#accordian");
        this.menToggle = this.accordian.locator("a[href='#Men']");
        this.men = page.locator("#Men");
        this.menCategories = this.men.locator("li");
        this.products = page.locator(".features_items .product-image-wrapper");
        this.cartModal = page.locator("#cartModal");
        this.viewCartLink = this.cartModal.getByRole("link", { name: "View Cart" });
    }

    async goto() {
        await this.page.goto("/");
    }

    async expandMenCategory() {
        await this.menToggle.click();
    }

    product(name: string): Locator {
        return this.products.filter({ has: this.page.locator(".productinfo p", { hasText: name }) });
    }

    async addProductToCart(name: string) {
        await this.product(name).locator(".productinfo .add-to-cart").click();
    }
}

export class CartPage {
    readonly page: Page;
    readonly rows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator("#cart_info_table tbody tr");
    }

    row(name: string): Locator {
        return this.rows.filter({ has: this.page.locator(".cart_description", { hasText: name }) });
    }
}
