import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class ProductPageObject {
    readonly page: Page;

   readonly addToCartButton = (id: string | number) =>
    `a.add-to-cart[data-product-id="${id}"]`;
    readonly productAddedToCartModal: string = "#cartModal";
    
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Click Add to Cart by product ID
     * @param productId - value of data-product-id
     */
    async addToCartByProductId(productId: string | number) {
       await this.page.click(this.addToCartButton(productId));
    }

    /**
     * Verify that the product added to cart modal is visible
     */
    async verifyProductAddedToCartModalVisible() {
         const modal = this.page.locator(this.productAddedToCartModal);
        await expect(modal).toBeVisible(); 
        await expect(modal).toContainText("Your product has been added to cart.");
    };


}