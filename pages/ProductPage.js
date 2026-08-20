import { expect } from '@playwright/test';

export class ProductPage{
    constructor(page){
        this.page=page;

        this.productTitle = page.locator('.product_title');
        this.productPrice = page.locator('.price').first();
        this.productDescription = page.locator('#tab-description');
        
        this.quantityInput = page.locator('form.cart input[name="quantity"]');

        this.addToCartButton = page.getByRole('button',{name: 'Add to cart'});
    }

    async expectProductTitle(productName) {
        await expect(this.productTitle).toHaveText(productName);
    }

    async expectProductPriceVisible(){
        await expect(this.productPrice).toBeVisible();
    }

    async expectProductDescriptionVisible(){
        await expect(this.productDescription).toBeVisible();
    }
    
    async setQuantity(quantity) {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton.first().click();
    }
}
