import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#username-92');
    this.passwordInput = page.locator('#user_password-92');

    this.loginButton = page.getByRole('button', {name: 'Login'});

    this.loginError = page.locator('.um-field-error');
  }

  async open() {
    await this.page.goto('./');
    await this.page.locator('#menu-item-130').getByRole('link', { name: 'Login' }).click();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.loginError).toBeVisible();
  }
}