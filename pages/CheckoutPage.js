import { expect } from '@playwright/test';

export class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.firstNameInput = page.locator('#billing_first_name');
        this.lastNameInput = page.locator('#billing_last_name');
        this.countrySelect = page.locator('#billing_country');
        this.addressInput = page.locator('#billing_address_1');
        this.postcodeInput = page.locator('#billing_postcode');
        this.cityInput = page.locator('#billing_city');
        this.phoneInput = page.locator('#billing_phone');
        this.emailInput = page.locator('#billing_email');

        this.emailError = page.locator('#billing_email_description');

        this.stripePayment = page.locator('#payment_method_stripe');
        this.codPayment = page.locator('#payment_method_cod');

        this.placeOrderButton = page.locator('#place_order');
        this.orderReview = page.locator('#order_review');
    }

    async open() {
        await this.page.goto('/checkout/');
        await this.expectCheckoutPage();
    }

    async expectCheckoutPage() {
        await expect(this.page).toHaveURL(/\/checkout\/?$/);
        await expect(this.orderReview).toBeVisible();
    }

    async fillBillingDetails({
        firstName,
        lastName,
        country,
        address,
        postcode,
        city,
        phone,
        email,
    }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);

        if (country) {
            await this.countrySelect.selectOption(country);
        }

        await this.addressInput.fill(address);
        await this.postcodeInput.fill(postcode);
        await this.cityInput.fill(city);
        await this.phoneInput.fill(phone);
        await this.emailInput.fill(email);
    }

    async selectPaymentMethod(method = 'stripe') {
        if (method === 'stripe') {
            await this.page.locator('label[for="payment_method_stripe"]').click();
        }

        if (method === 'cod') {
            await this.page.locator('label[for="payment_method_cod"]').click();
        }
    }

    async expectPlaceOrderButtonVisible() {
        await expect(this.placeOrderButton).toBeVisible();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }

    async expectInvalidEmailError() {
        await expect(this.emailError).toBeVisible();
        await expect(this.emailError).toContainText(
            'Email address is not a valid email address.'
        );
    }
    
    async expectOrderNotPlaced() {
        await expect(this.page).toHaveURL(/\/checkout\/?$/);
        await expect(this.orderReview).toBeVisible();
    }
}