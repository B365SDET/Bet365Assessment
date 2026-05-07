import { Locator, Page } from "@playwright/test";

export class PageObject {
  static readonly BASE_URL = "https://automationexercise.com";
  static readonly VIEW_CART_URL = `${PageObject.BASE_URL}/view_cart`;

  readonly accordian: Locator;
  readonly menHeading: Locator;
  readonly menCategories: Locator;

  readonly productCard: Locator;
  readonly addToCart: Locator;
  readonly viewCartLink: Locator;
  readonly cartRow: Locator;
  readonly cartDescription: Locator;
  readonly cartPrice: Locator;
  readonly cartQuantity: Locator;
  readonly cartTotalPrice: Locator;
  readonly emptyCart: Locator;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.accordian = page.locator("#accordian");
    this.menHeading = page.locator("a[href='#Men']");
    this.menCategories = page.locator("#Men li");

    this.productCard = page.locator(".features_items .product-image-wrapper");
    this.addToCart = page.locator(".overlay-content .add-to-cart");
    this.viewCartLink = page.locator("#cartModal a[href='/view_cart']");
    this.cartRow = page.locator("#cart_info_table tbody tr");
    this.cartDescription = page.locator(".cart_description h4 a");
    this.cartPrice = page.locator(".cart_price p");
    this.cartQuantity = page.locator(".cart_quantity button");
    this.cartTotalPrice = page.locator(".cart_total_price");
    this.emptyCart = page.locator("#empty_cart");
  }

  getProductName(card: Locator): Locator {
    return card.locator(".productinfo p");
  }

  getProductPrice(card: Locator): Locator {
    return card.locator(".productinfo h2");
  }

  async blockAds() {
    await this.page.route(/googlesyndication|doubleclick/, (route) =>
      route.abort(),
    );
  }
}
