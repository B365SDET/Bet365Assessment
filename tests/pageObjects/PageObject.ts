import { Locator, Page } from '@playwright/test';

export class PageObject {
  readonly menCategoryToggle: Locator;
  readonly menCategoryPanel: Locator;
  readonly menCategories: Locator;
  readonly productCards: Locator;
  readonly cartModal: Locator;
  readonly cartRows: Locator;

  constructor(page: Page) {
    this.menCategoryToggle = page.locator('#accordian a[data-toggle="collapse"][href="#Men"]');
    this.menCategoryPanel = page.locator('#Men');
    this.menCategories = page.locator('#Men li a');
    this.productCards = page.locator('.product-image-wrapper');
    this.cartModal = page.locator('#cartModal');
    this.cartRows = page.locator('#cart_info_table tbody tr');
  }
}
