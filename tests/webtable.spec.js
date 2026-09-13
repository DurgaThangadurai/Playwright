import { test, expect} from '@playwright/test'

test('webtable', async ({page}) => {


await page.goto("https://practicetestautomation.com/practice-test-table/", {waitUntil:'domcontentloaded'})


const rows= await page.locator("#courses_table tr")

const cols=await page.locator("#courses_table th")

let data = ""
let textFound = false;
const searchtext="Selenium with Java"

for (let i=0;i<await rows.count();i++)
{
  data = await rows.nth(i).textContent();

    if (data.trim().includes(searchtext))
    {
        textFound = true;
        console.log("Text found in "+ i +"th row:", data.trim());
    }

}

if (textFound) {
    console.log("The text "+searchtext+" was found in the table.");
}
else
{
    console.log("The text " + searchtext+ " was not found in the table.");
}


})
