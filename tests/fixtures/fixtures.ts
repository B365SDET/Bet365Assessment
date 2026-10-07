import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";
import { CartPage } from "../pageObjects/CartPage";

// The site loads Google ads that sometimes pop up over the page and block clicks.
// Blocking them makes the UI tests a lot more stable.
const AD_HOSTS = /googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoicesmessages/;

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
