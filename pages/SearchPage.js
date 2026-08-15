import {expect} from '@playwright/test';

export class SearchPage{
    constructor(page){
        this.page=page;

        this.searchInput=page.getByRole('searchbox');
        this.searchButton=page.getByRole('button', {name: /search/i});
    }

    async searchForProduct(productName){
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    }

    async expectProductVisible(productName){
        await expect(
            this.page.getByRole('link',{name:productName}).first()
        ).toBeVisible();
    }
}