import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
    trace: 'retain-on-failure',
  },
  projects: [
    // API tests don't need a browser, so they run once instead of once per browser
    {
      name: 'api',
      testDir: './tests/api',
      use: { extraHTTPHeaders: { Accept: 'application/json' } },
    },
    {
      name: 'chromium',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
