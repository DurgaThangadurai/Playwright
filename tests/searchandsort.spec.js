import { test, expect} from '@playwright/test'

test('searchandsort', async ({page}) => {

    test.setTimeout(60000);

await page.goto("https://www.amazon.in/", {waitUntil:'domcontentloaded'})

await page.getByPlaceholder('Search Amazon.in').click();

await page.getByPlaceholder('Search Amazon.in').fill("toys");

await page.locator("#nav-search-submit-button").click();

await page.waitForURL('**/s**');

console.log('Current URL:', page.url());

const items= await page.locator('div[data-component-type="s-search-result"]')

const count = await items.count();

console.log("Total products found: " + count)

const limit=Math.min(count,20)

console.log('Checking only:', limit, 'products');

const productdetails=[]

for(let i=0;i<limit;i++)
{
    const product = await items.nth(i)

    const productName = await product
      .locator('h2')
      .innerText()
      .catch(() => 'Product name not found');

    const pricetext = await product
      .locator('span.a-price-whole')
      .innerText()
      .catch(() => 'Price not found');

   // console.log(productName + ' : ₹' + pricetext);

    const price= Number(pricetext.replace(/,/g,""));

   if(price>0)
	{
	await productdetails.push({
		name: productName,
		price: price
	});

    }
}    
productdetails.sort((a, b) => a.price - b.price);

for(const details of productdetails)
{
   	console.log(details.name+ " : ₹" + details.price)
    console.log("\n")
}

let max=0;
let maxproduct="";

for(let i=0;i<productdetails.length;i++)
{
    
    if(productdetails[i].price>max)
    {
        max=productdetails[i].price;
        maxproduct=productdetails[i].name;
    }
    
}

console.log("\n Most expensive product is: " + maxproduct + " \n Cost is : ₹" + max.toLocaleString("en-IN"))



})