import { test } from '@playwright/test';
import { SearchPage } from  '../../pages/SearchPage.js';

test.describe('Product search',()=>{
    test('user can search for a product', async({page})=>{
        const searchPage = new SearchPage(page);

        await page.goto('./');

        await searchPage.searchForProduct('Jenkins Actor');

        await searchPage.expectProductVisible('Jenkins Actor');
    });
});
