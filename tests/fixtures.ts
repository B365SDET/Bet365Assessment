import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/uiPages/home.page';

type Fixtures = {
  home: HomePage;
};

export const test = base.extend<Fixtures>({
  home: async ({ page }, use) => {
    const home = new HomePage(page);
    await home.goto();
    await use(home);
  },
});

export { expect };
