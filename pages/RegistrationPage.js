import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#user_login-91');
    this.firstNameInput = page.locator('#first_name-91');
    this.lastNameInput = page.locator('#last_name-91');

    this.emailInput = page.locator('#user_email-91');
    this.passwordInput = page.locator('#user_password-91');
    this.confirmPasswordInput = page.locator(
      '#confirm_user_password-91'
    );

    this.genderMale = page.locator(
      'label.um-field-radio:has(input[value="Male"])'
    );

    this.genderFemale = page.locator(
      'label.um-field-radio:has(input[value="Female"])'
    );

    this.birthDateInput = page.locator('#birth_date-91');
    this.countrySelect = page.locator('#country');
    this.phoneInput = page.locator('#phone_number-91');

    this.registerButton = page.locator('#um-submit-btn');

    this.loginLink = page.getByRole('link', {
      name: 'Login',
      exact: true,
    });

    this.emailError = page.locator('#um_field_91_user_email .um-field-error');

  this.passwordError = page.locator(
    '#um_field_91_user_password .um-field-error'
  );

  this.confirmPasswordError = page.locator(
    '#um_field_91_confirm_user_password .um-field-error'
  );

  this.genderError = page.locator(
    '#um_field_91_gender .um-field-error'
  );
  }

  async open() {
    await this.page.goto('./');

    await this.page.locator('#menu-item-129').getByRole('link', { name: 'Register' }).click();

    await this.page.locator('.um-register').waitFor({
        state: 'visible',
    });

    await this.usernameInput.waitFor({
          state: 'visible',
    });

  }

  async register({
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gender,
    phone,
  }) {
    await this.usernameInput.fill(username);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);

    if (gender === 'Male') {
      await this.genderMale.click();
    }

    if (gender === 'Female') {
      await this.genderFemale.click();
    }

    if (phone) {
      await this.phoneInput.fill(phone);
    }

    await this.registerButton.click();
  }

}