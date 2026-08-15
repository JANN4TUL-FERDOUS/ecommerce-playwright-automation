import { test, expect } from '@playwright/test';

test.describe('Shop homepage',()=>{
    test('user can open the shop homepage', async({page})=>{
        await page.goto('./');

        await expect(page).toHaveTitle(/Automation Demo Site/i);
        
        await expect(page.getByRole('heading',{name: 'Shop by Category' })).toBeVisible();

        await expect(page.getByRole('heading', {name: 'New In'})).toBeVisible();

        await expect(page.getByRole('link',{name: 'Jenkins Actor' }).first()).toBeVisible();
    });
});