import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';

export const test = base.extend({

    fixturelogin: async ({ page }, use) => {

        await page.goto("https://practicetestautomation.com/practice-test-login/");

        const fixturelogin = new LoginPage(page);

        await use(fixturelogin);
    } 

});

export { expect } from '@playwright/test';