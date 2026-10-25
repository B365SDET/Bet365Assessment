import { test as base, expect } from "@playwright/test";
import { AutomationExerciseApi } from "./apiClients/AutomationExerciseApi";
import { CartPage } from "./pageObjects/CartPage";
import { HomePage } from "./pageObjects/HomePage";

type Fixtures = {
    api: AutomationExerciseApi;
    homePage: HomePage;
    cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
    // Third-party ads (e.g. Google vignettes) can cover the page and swallow clicks.
    context: async ({ context, baseURL }, use) => {
        const siteHost = new URL(baseURL!).hostname;
        await context.route("**/*", route =>
            new URL(route.request().url()).hostname === siteHost ? route.continue() : route.abort(),
        );
        await use(context);
    },

    api: async ({ request }, use) => {
        await use(new AutomationExerciseApi(request));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export { expect };
