import { test as base, expect } from "@playwright/test";

// Third-party ads (Google vignette interstitials) hijack link clicks at random and cause flaky failures.
// They're not part of what we're testing, so every test that uses `page` gets them blocked.
// A fixture instead of a beforeEach, so any new spec file gets this just by importing `test` from here.
const AD_HOSTS = /googlesyndication\.com|doubleclick\.net|adtrafficquality\.google|fundingchoicesmessages\.google\.com/;

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(AD_HOSTS, route => route.abort());
    await use(page);
  },
});

export { expect };
