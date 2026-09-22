import { test, expect } from '../fixtures/loginfixture';

import {excelRead} from '../utils/filereader.js'

const filepath='./testdata/testdata.xlsx'

const logindata = excelRead(filepath);

console.log(logindata);

for (const data of logindata) 
{
test(`Excel Login Test with ${data.username}`, async ({fixturelogin}) => {

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