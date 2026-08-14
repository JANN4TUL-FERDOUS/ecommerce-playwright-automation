import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Use one worker on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Test timeout */
  timeout: 30 * 1000,

  /* Assertion timeout */
  expect: {
    timeout: 5 * 1000,
  },

  /* HTML report */
  reporter: [['html', { open: 'never' }]],

  /* Shared settings for all projects */
  use: {
    /* Base URL for the application */
    baseURL: 'https://demo.nopcommerce.com',

    /* Capture screenshot only when a test fails */
    screenshot: 'only-on-failure',

    /* Record trace on first retry */
    trace: 'on-first-retry',

    /* Record video on first retry */
    video: 'on-first-retry',

    /* Browser viewport */
    viewport: { width: 1440, height: 900 },
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});