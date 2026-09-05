import {test, expect} from '@playwright/test';

import {LoginPage} from '../pages/LoginPage';

const logindata= require ('../testdata/testdata.json');


for (const data of logindata)

{

test(`firsttest with ${data.username}`, async ({ page }) => {


await page.goto("https://practicetestautomation.com/practice-test-login/");

const loginPage = new LoginPage(page);

await loginPage.loginAction(data.username, data.password);

if(data.expectedType=='success')
{
 await expect(page.locator("//h1[text()='Logged In Successfully']")).toHaveText(data.expectedValue);

}
else if (data.expectedType=='failure')

{
    await expect(page.locator("//div[text()='Your username is invalid!']")).toHaveText(data.expectedValue);
}


await page.waitForTimeout(5000);

})

}


/* await page.locator("#username").fill("student");

await page.locator("#password").fill("Password123");

await page.locator(".btn").click();*/