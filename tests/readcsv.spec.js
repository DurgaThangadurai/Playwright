import { test, expect } from '../fixtures/loginfixture';

import {csvRead} from '../utils/filereader.js'

const filepath='./testdata/testdata.csv'

const logindata = csvRead(filepath);

console.log(logindata);

for (const data of logindata) 
{
test(`CSV Login Test with ${data.username}`, async ({fixturelogin}) => {

//await page.goto("https://practicetestautomation.com/practice-test-login/");

//const loginPage = new LoginPage(page);

await fixturelogin.loginAction(data.username, data.password);

fixturelogin.page.on('request', request => {
  console.log(request.method(),"     " + request.url());
});

if(data.expectedType=='success')
{
 await expect(fixturelogin.page.locator("//h1[text()='Logged In Successfully']")).toHaveText(data.expectedValue);

}
else if (data.expectedType=='failure')
{
    await expect(fixturelogin.page.locator("//div[text()='Your username is invalid!']")).toHaveText(data.expectedValue);
}

//await fixturelogin.page.waitForTimeout(5000);

})

}