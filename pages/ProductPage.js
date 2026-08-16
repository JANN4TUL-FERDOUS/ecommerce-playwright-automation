import { expect } from '@playwright/test';

export class ProductPage{
    constructor(page){
        this.page=page;

        this.productTitle = page.locator('h1');
        this.productPrice = page.locator('.price').first();
        this.productDescription = page.locator('#tab-description');

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
    
}
