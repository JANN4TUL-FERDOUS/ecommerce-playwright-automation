import { test } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';

test.describe('Update cart', () => {
  test('user can update product quantity in the cart', async ({ page }) => {
    const productName = 'Jenkins Actor';

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto('./');

    await page.getByRole('link', { name: productName }).first().click();

    await productPage.expectProductTitle(productName);

    await productPage.addToCart();

    await cartPage.open();

    await cartPage.expectProductInCart(productName);

    await cartPage.setProductQuantity(productName, 2);

    await cartPage.updateCart();

    await cartPage.expectProductQuantity(productName, 2);
    
  });
});