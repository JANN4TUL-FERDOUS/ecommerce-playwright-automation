import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';

test.describe('Checkout', () => {
    test('user can proceed to checkout with a product in the cart', async ({ page }) => {
        const productName = 'Jenkins Actor';

        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await page.goto('./');

        await page.getByRole('link', { name: productName }).first().click();

        await productPage.expectProductTitle(productName);

        await productPage.addToCart();

        await cartPage.open();

        await cartPage.expectProductInCart(productName);

        await page.getByRole('link', { name: /Proceed to checkout/i }).click();

        await expect(page).toHaveURL(/\/checkout\/?$/);
        await checkoutPage.expectPlaceOrderButtonVisible();
    });

    test('user can fill billing information', async ({ page }) => {
        const productName = 'Jenkins Actor';

        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await page.goto('./');

        await page.getByRole('link', { name: productName }).first().click();

        await productPage.expectProductTitle(productName);
        await productPage.addToCart();

        await cartPage.open();
        await cartPage.expectProductInCart(productName);

        await page.getByRole('link', { name: /Proceed to checkout/i }).click();

        await checkoutPage.fillBillingDetails({
            firstName: 'Test',
            lastName: 'User',
            country: 'NL',
            address: 'Test Street 123',
            postcode: '1011AB',
            city: 'Amsterdam',
            phone: '0612345678',
            email: 'test@example.com',
        });

        await checkoutPage.expectPlaceOrderButtonVisible();
    });

    test('user cannot checkout without required billing information', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await page.goto('./');

        const productName = 'Jenkins Actor';

        await page.getByRole('link', { name: productName }).first().click();

        await productPage.expectProductTitle(productName);

        await productPage.addToCart();

        await cartPage.open();

        await cartPage.expectProductInCart(productName);

        await page.getByRole('link', { name: /Proceed to checkout/i }).click();

        await checkoutPage.expectCheckoutPage();

        await checkoutPage.placeOrder();

        await checkoutPage.expectCheckoutValidation();
    });
    
    test('user cannot checkout with an invalid email address', async ({ page }) => {
        const productName = 'Jenkins Actor';

        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await page.goto('./');

        await page.getByRole('link', { name: productName }).first().click();
        await productPage.expectProductTitle(productName);
        await productPage.addToCart();

        await cartPage.open();
        await cartPage.expectProductInCart(productName);

        await page.getByRole('link', { name: /Proceed to checkout/i }).click();

        await checkoutPage.fillBillingDetails({
            firstName: 'Test',
            lastName: 'User',
            country: 'NL',
            address: 'Test Street 123',
            postcode: '1011AB',
            city: 'Amsterdam',
            phone: '0612345678',
            email: 'invalid-email',
        });

        await checkoutPage.placeOrder();
       
        await checkoutPage.expectCheckoutValidation();
    });

});