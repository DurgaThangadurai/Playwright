import { test, expect} from '@playwright/test'

test('broken links', async ({page, request}) => {

    test.setTimeout(120000);


await page.goto("https://www.amazon.in", { waitUntil: 'domcontentloaded' });

await page.waitForTimeout(5000);

const totallinks = await page.locator('a')

console.log("Total links on the page are: " + await totallinks.count())

const limit=Math.min(await totallinks.count(), 20);

console.log('Checking only:', limit, 'links');

for (let i=0;i<limit;i++)
{

	const href=await totallinks.nth(i).getAttribute('href')


   /* if (!href) {
      continue;
    }*/

    if (!href || href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:'))
        {
                 continue;
        }



    const url = new URL(href, page.url()).href;

    const response = await request.get(url, {failOnStatusCode: false });

    if (response.status() >= 400) {
      console.log('Broken link:', url);
      console.log('Status code: ' + response.status());
    }

	
}

})

