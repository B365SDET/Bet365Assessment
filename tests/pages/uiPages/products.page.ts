import { Locator, Page } from '@playwright/test';
import { waitForVisible, timeouts } from '../../utils/ui-utils';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.features_items, .product-list, .product-image-wrapper');
    this.addToCartButtons = page.locator('a:has-text("Add to cart"), button:has-text("Add to cart")');
  }

  async waitForPageReady() {
    await waitForVisible(this.productList.first(), timeouts.quickVisible).catch(() => null);
  }

  async addFirstProductToCart() {
    await waitForVisible(this.addToCartButtons.first(), timeouts.quickVisible);
    await this.addToCartButtons.first().click();
    await this.page.waitForSelector('#cartModal', { state: 'visible', timeout: timeouts.visible }).catch(() => null);
  }
}
