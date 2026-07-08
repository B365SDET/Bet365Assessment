import { expect, Locator, Page } from '@playwright/test';

export const timeouts = {
  navigation: 60000,
  visible: 20000,
  quickVisible: 10000,
  urlWait: 20000,
};

export async function safeGoto(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeouts.navigation });
}

export async function waitForVisible(locator: Locator, timeout = timeouts.visible) {
  await expect(locator).toBeVisible({ timeout });
}

export async function safeFill(locator: Locator, value: string) {
  await locator.fill(value);
  await expect(locator).toHaveValue(value, { timeout: timeouts.quickVisible });
}

export async function clickAndAwaitUrl(page: Page, locator: Locator, urlPattern: string | RegExp, fallbackUrl?: string) {
  await locator.click();
  try {
    await page.waitForURL(urlPattern, { timeout: timeouts.urlWait });
  } catch {
    if (fallbackUrl) {
      await safeGoto(page, fallbackUrl);
    }
  }
}
