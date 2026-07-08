import { Locator, Page } from '@playwright/test';
import { safeGoto, waitForVisible, timeouts } from '../../utils/ui-utils';
import { ProductsPage } from './products.page';

export class HomePage {
  readonly page: Page;
  readonly baseUrl = 'https://automationexercise.com';

  readonly menToggle: Locator;
  readonly menSection: Locator;
  readonly menCategoryItems: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menToggle = page.locator('a[href="#Men"]');
    this.menSection = page.locator('#Men');
    this.menCategoryItems = page.locator('#Men li');
    this.addToCartButtons = page.locator('a:has-text("Add to cart"), button:has-text("Add to cart")');
  }

  async goto() {
    await safeGoto(this.page, this.baseUrl);
  }

  async openMenCategory() {
    await this.menToggle.click();
    await waitForVisible(this.menSection, timeouts.quickVisible);
  }

  async getMenCategoryNames() {
    return (await this.menCategoryItems.allTextContents()).map((t) => t.trim().toUpperCase());
  }

  async isMenCategoryVisible(categoryName: string) {
    return this.menCategoryItems.filter({ hasText: categoryName }).first().isVisible();
  }

  async goToProducts(): Promise<ProductsPage> {
    await this.page.click('a:has-text("Products")');
    const products = new ProductsPage(this.page);
    await products.waitForPageReady();
    return products;
  }

  async addFirstProductToCartOnHome() {
    await waitForVisible(this.addToCartButtons.first(), timeouts.quickVisible);
    await this.addToCartButtons.first().click();
    await this.page.waitForSelector('#cartModal', { state: 'visible', timeout: timeouts.visible }).catch(() => null);
  }
}
