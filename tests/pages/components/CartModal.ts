import { Page, Locator, expect } from "@playwright/test";
import { CartPage } from "../CartPage";

/**
 * The "Added!" confirmation modal (#cartModal) that appears after adding a
 * product to the cart. A reusable component object, since this modal is shown
 * from any page that has an add-to-cart action.
 */
export class CartModal {
    readonly page: Page;

    // The name of the product that was added, carried through so the caller can
    // assert it later on the cart page.
    readonly addedProductName: string;

    readonly modal: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page, addedProductName: string) {
        this.page = page;
        this.addedProductName = addedProductName;
        this.modal = page.locator('#cartModal');
        this.viewCartLink = this.modal.locator('a[href="/view_cart"]');
    }

    async waitUntilVisible(): Promise<void> {
        await expect(this.modal).toBeVisible();
    }

    /** Follows the "View Cart" link to the cart page. */
    async viewCart(): Promise<CartPage> {
        await this.viewCartLink.click();

        const cart = new CartPage(this.page);
        await cart.waitUntilLoaded();
        return cart;
    }
}
