import { test as base, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";

// Google vignette ads hijack link clicks at random, so block ad hosts for every test that uses `page`
const AD_HOSTS = /googlesyndication\.com|doubleclick\.net|adtrafficquality\.google|fundingchoicesmessages\.google\.com/;

type Pages = {
  homePage: HomePage;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  page: async ({ page }, use) => {
    await page.route(AD_HOSTS, route => route.abort());
    await use(page);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };
