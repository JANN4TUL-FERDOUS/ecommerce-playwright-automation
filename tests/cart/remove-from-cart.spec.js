import { test } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';

test.describe('Remove from cart', () => {
  test('user can remove a product from the cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto('./');

    const productName = 'Jenkins Actor'; 

    await page.getByRole('link', {name: productName}).first().click();

    await productPage.expectProductTitle(productName);

    await productPage.addToCart();

    await cartPage.open();

    await cartPage.expectProductInCart(productName);

    await cartPage.removeProduct(productName);

    await cartPage.expectProductNotInCart(productName);
  });
});