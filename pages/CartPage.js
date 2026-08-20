import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator(
      '.woocommerce-cart-form__cart-item.cart_item'
    );

    this.productNames = page.locator(
      '.woocommerce-cart-form__cart-item .product-name'
    );

    this.updateCartButton = page.locator(
      'button[name="update_cart"]'
    );

    this.checkoutButton = page.getByRole('link', {
      name: /proceed to checkout/i,
    });
  }

  async open() {
    await this.page.goto('./');

    await this.page.locator('#site-header-cart a.cart-contents').click();

    await expect(this.page).toHaveURL(/\/cart\/?$/);
  }

  async expectProductInCart(productName) {
    const product = this.productNames.filter({
      hasText: productName,
    });

    await expect(product.first()).toBeVisible();
  }

  async expectProductNotInCart(productName) {
    const product = this.productNames.filter({
      hasText: productName,
    });

    await expect(product).toHaveCount(0);
  }

  async setProductQuantity(productName, quantity) {
    const cartItem = this.cartItems.filter({
      hasText: productName,
    });

    await cartItem
      .locator('input.qty')
      .fill(String(quantity));
  }

  async updateCart() {
    await this.updateCartButton.click();
  }

  async expectProductQuantity(productName, quantity) {
    const quantityInput = this.page
      .locator('.woocommerce-cart-form__cart-item')
      .filter({ hasText: productName })
      .locator('input.qty');

    await expect(quantityInput).toHaveValue(String(quantity));
  }

  async removeProduct(productName) {
    const cartItem = this.page
      .locator('.woocommerce-cart-form__cart-item.cart_item')
      .filter({ hasText: productName });

    await cartItem.locator('a.remove').click();
  }
}