import { test, expect } from '@playwright/test';

test.describe('Successful Login', () => {
  test('Login with valid credentials', async ({ page }) => {
    // 1. Navigate to https://practicetestautomation.com/practice-test-login/
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // 2. Inspect the page and locate the username input, password input, and Submit button
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.getByRole('textbox', { name: 'Password' });
    const submit = page.getByRole('button', { name: 'Submit' });

    // 3. Enter username `student`
    await username.fill('student');

    // 4. Enter password `Password123`
    await password.fill('Password123');

    // 5. Click the Submit button
    await submit.click();

    // 6. Validate that `Logged In Successfully` is visible
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
  });
});
