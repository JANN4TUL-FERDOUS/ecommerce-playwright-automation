import { test, expect} from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage.js';

test.describe('Registration', () => {
    test('user can register with valid information', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);

        await registrationPage.open();

        const timestamp = Date.now();

        const username = `testuser_${timestamp}`;
        const email = `test_${timestamp}@example.com`;

        await registrationPage.register({
            username,
            firstName: 'Test',
            lastName: 'User',
            email,
            password: 'Password@123',
            confirmPassword: 'Password@123',
            gender: 'Male',
        });

        await expect(page).toHaveURL(new RegExp(`/user/${username}/?$`));

    });

    test('user cannot register when passwords do not match', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);

        await registrationPage.open();

        await registrationPage.register({
            username: `testuser_${Date.now()}`,
            firstName: 'Test',
            lastName: 'User',
            email: `test_${Date.now()}@example.com`,
            password: 'Password@123',
            confirmPassword: 'DifferentPassword@123',
            gender: 'Male',
        });

        await expect(registrationPage.confirmPasswordError).toBeVisible();
    });

    test('user cannot register with an invalid email address', async ({page,}) => {
        const registrationPage = new RegistrationPage(page);

        await registrationPage.open();

        await registrationPage.register({
            username: `testuser_${Date.now()}`,
            firstName: 'Test',
            lastName: 'User',
            email: 'invalid-email',
            password: 'Password@123',
            confirmPassword: 'Password@123',
            gender: 'Male',
        });

         await expect(registrationPage.emailError).toBeVisible();
    
    });

    test('user cannot register without required information', async ({ page,}) => {
        const registrationPage = new RegistrationPage(page);

        await registrationPage.open();

        await registrationPage.register({
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        await expect(registrationPage.genderError).toBeVisible();
    
    });
});