import { Locator, Page } from "@playwright/test";

// Replaces the old PageObject.ts, which only held selector strings. Having the locators
// and actions here keeps the selectors in one place instead of spread across tests.
export class HomePage {
    readonly page: Page;
    readonly categorySidebar: Locator;
    readonly featuredItems: Locator;
    readonly cartModal: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categorySidebar = page.locator("#accordian");
        this.featuredItems = page.locator(".features_items");
        this.cartModal = page.locator("#cartModal");
        this.viewCartLink = this.cartModal.getByRole("link", { name: "View Cart" });
    }

    async goto() {
        await this.page.goto("/");
    }

    /** Toggle link in the sidebar for a top-level category, e.g. "Men". */
    categoryToggle(name: string): Locator {
        return this.categorySidebar.locator(`a[href="#${name}"]`);
    }

    /** Sub-category links inside a top-level category panel. */
    subCategories(name: string): Locator {
        return this.categorySidebar.locator(`#${name} li a`);
    }

    // categories are collapsed by default, so they need to be clicked open first
    async expandCategory(name: string) {
        await this.categoryToggle(name).click();
    }

    // Scoped to .features_items because the "Recommended items" carousel further down
    // shows the same products, which gave a strict mode violation (2 matches).
    productCard(productId: number): Locator {
        return this.featuredItems.locator(".productinfo").filter({
            has: this.page.locator(`a.add-to-cart[data-product-id="${productId}"]`),
        });
    }

    async addProductToCart(productId: number) {
        await this.productCard(productId).locator("a.add-to-cart").click();
    }
}
