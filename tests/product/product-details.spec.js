import { test } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage.js';

test.describe('Product destails', ()=>{
    test('user can view product details', async({page})=>{
        const productPage = new ProductPage(page);

        await page.goto('./');

        const productName = 'Jenkins Actor'; 

        await page.getByRole('link', {name: productName}).first().click();

        await productPage.expectProductTitle(productName);
        await productPage.expectProductPriceVisible();
        await productPage.expectProductDescriptionVisible();
    });
});

