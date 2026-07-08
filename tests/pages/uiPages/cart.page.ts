import { Locator, Page } from '@playwright/test';
import { safeGoto, waitForVisible, timeouts } from '../../utils/ui-utils';

export class CartPage {
  readonly page: Page;
  readonly baseUrl = 'https://automationexercise.com';
  readonly cartRows: Locator;
  readonly cartEmptyMessage: Locator;
  readonly viewCartModalLink: Locator;
  readonly headerCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('table tbody tr');
    this.cartEmptyMessage = page.locator('text=Cart is empty!');
    this.viewCartModalLink = page.locator('#cartModal a:has-text("View Cart")');
    this.headerCartLink = page.locator('a[href="/view_cart"]');
  }

  async open() {
    if (await this.page.locator('#cartModal').count() && (await this.viewCartModalLink.count())) {
      await waitForVisible(this.viewCartModalLink.first(), timeouts.visible);
      await this.viewCartModalLink.first().click();
      await this.page.waitForURL(/view_cart/, { timeout: timeouts.urlWait });
    } else if (await this.headerCartLink.count()) {
      await this.headerCartLink.first().click();
      await this.page.waitForURL(/view_cart/, { timeout: timeouts.urlWait });
    } else {
      await safeGoto(this.page, `${this.baseUrl}/view_cart`);
    }

    await Promise.race([
      this.page.waitForSelector('table tbody tr', { state: 'visible', timeout: timeouts.visible }),
      this.page.waitForSelector('text=Cart is empty!', { state: 'visible', timeout: timeouts.visible }),
    ]).catch(() => null);
  }

  async getItemCount() {
    const count = await this.cartRows.count();
    return count;
  }
}