import { test, expect} from '@playwright/test'

test('webtable', async ({page}) => {


await page.goto("https://assertqa.com/practice/webtables", {waitUntil:'domcontentloaded'})

let data = ""
let textFound = false;
const searchtext="Durga"

while(true)
{

const rows= await page.locator("#employees-table tr")

const nextButton = page.locator('//button[@data-cy="pagination-next"]');

for (let i=0;i<await rows.count();i++)
{
  data = await rows.nth(i).textContent();

    if (data.trim().includes(searchtext))
    {
        textFound = true;
        console.log("Text found in "+ (i+1) +"th row:", data.trim());
    }
}

    if (textFound) 
    {
      break;
    }

    if (await nextButton.isDisabled()) 
    {
      break;
    }

   await nextButton.click();

}

if (textFound) {
    console.log("The text "+searchtext+" was found in the table.");
}
else
{
    console.log("The text " + searchtext+ " was not found in the table.");
}


})
