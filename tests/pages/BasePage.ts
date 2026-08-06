import { Page } from "@playwright/test";

/**
 * Shared behavior for all page objects: holds the Playwright page reference and
 * cross-cutting concerns (navigation, ad blocking). Contains no page-specific
 * locators — those live on the concrete page objects.
 */
export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * automationexercise serves Google ads, including full-page vignette
     * interstitials that intercept clicks and cause flaky E2E runs. Block the
     * ad networks so pages are stable to interact with. Registered once per
     * page; the route persists for subsequent navigations.
     */
    protected async blockAds(): Promise<void> {
        await this.page.route(
            /googlesyndication|doubleclick|googleadservices|googletagservices|google-analytics|pagead|adservice\.google/,
            (route) => route.abort()
        );
    }

    protected async goto(path: string): Promise<void> {
        await this.page.goto(path);
    }
}
