import { test, expect } from '@playwright/test';

test.describe('Shop navigation', () => {
  test('user can navigate to a product from the shop', async ({ page }) => {
    await page.goto('./');

    await page
      .locator('a')
      .filter({ hasText: 'Jenkins Actor' })
      .first()
      .click();

    await expect(page).toHaveURL(/product|jenkins/i);
  });

  test('unauthenticated user can not access the Account page', async ({ page }) => {
    await page.goto('./');

    await page.locator('#menu-item-127').getByRole('link', { name: 'Account' }).click();

    await expect(page).not.toHaveURL(/\/account\//);
  });

  test('user can navigate to the login page', async ({ page }) => {
    await page.goto('./');

      await page.locator('#menu-item-130').getByRole('link', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login\//);
  });

  test('user can navigate to the register page', async ({ page }) => {
    await page.goto('./');

      await page.locator('#menu-item-129').getByRole('link', { name: 'Register' }).click();

    await expect(page).toHaveURL(/\/register\//);
  });

  test('user can navigate to the shop page', async ({ page }) => {
    await page.goto('./');

      await page.locator('#menu-item-126').getByRole('link', { name: 'Shop' }).click();

    await expect(page).toHaveURL(/\/shop\/shop\/$/);
  });

  test('user can navigate to cart page', async ({ page }) => {
    await page.goto('./');

    const cartLink = page.locator('#site-header-cart a.cart-contents');

    await expect(cartLink).toBeVisible();

    await cartLink.click();
    //await page.locator('#site-header-cart').getByRole('link', { name: View your shopping cart' }).click();

    await expect(page).toHaveURL(/\/cart\//);
  });

});