import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
        process.env.TEST_USERNAME,
        process.env.TEST_PASSWORD
    );

    await expect(page).toHaveURL(/user/i);
  });

  test('user cannot log in with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      'invalid-user@example.com',
      'invalid-password'
    );

    await loginPage.expectLoginError();
  });
});