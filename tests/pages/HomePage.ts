import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartModal } from "./components/CartModal";

/**
 * The automationexercise.com home page: the left-hand category accordion and
 * the featured products grid.
 */
export class HomePage extends BasePage {
    // The clickable "Men" accordion header. Note the site's own markup misspells
    // the accordion id as "#accordian" — the selector must match the site.
    readonly menCategoryToggle: Locator;

    // The individual category items shown once the "Men" panel is expanded.
    readonly menCategoryItems: Locator;

    // The first featured product card.
    readonly firstProduct: Locator;

    constructor(page: Page) {
        super(page);
        this.menCategoryToggle = page.locator('#accordian a[href="#Men"]');
        this.menCategoryItems = page.locator('#Men .panel-body li');
        this.firstProduct = page.locator('.features_items .product-image-wrapper').first();
    }

    async open(): Promise<void> {
        await this.blockAds();
        await this.goto('/');
    }

    /** Expand the "Men" accordion panel so its categories become viewable. */
    async expandMenCategories(): Promise<void> {
        await this.menCategoryToggle.scrollIntoViewIfNeeded();
        // The site's Bootstrap collapse handler may not be wired up the instant
        // the page loads, so a single click can be a no-op. Retry clicking until
        // the panel actually expands and its items are visible.
        await expect(async () => {
            if (!(await this.menCategoryItems.first().isVisible())) {
                await this.menCategoryToggle.click();
            }
            await expect(this.menCategoryItems.first()).toBeVisible({ timeout: 2000 });
        }).toPass({ timeout: 15000 });
    }

    /** The visible Men category names, e.g. ["Tshirts", "Jeans"]. */
    async getMenCategoryNames(): Promise<string[]> {
        const names = await this.menCategoryItems.allTextContents();
        return names.map((name) => name.trim());
    }

    /** Adds the first featured product to the cart and returns the confirmation modal. */
    async addFirstProductToCart(): Promise<CartModal> {
        const name = (await this.firstProduct.locator('.productinfo p').textContent())?.trim() ?? '';
        await this.firstProduct.locator('.productinfo a.add-to-cart').click();

        const modal = new CartModal(this.page, name);
        await modal.waitUntilVisible();
        return modal;
    }
}
