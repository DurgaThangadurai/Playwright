import {test, expect} from '@playwright/test';

test('amazon add to cart linear', async ({ page, context }) => {

   await page.goto('https://www.amazon.in//');

    await page.locator('#twotabsearchtextbox').fill('shoes');

    await page.locator('#nav-search-submit-button').click(); 

   await page.waitForURL('**/s**')     

  const item = page.locator('//div[@data-cy="asin-faceout-container"]');

  const count = await item.count();

    console.log('Total items found: ' + count);

    //await page.mouse.wheel(0, 1000);

    await page.waitForTimeout(5000);
    
    const product = await item.first()

    const producttitle= await product.locator('h2').nth(1)

    console.log('Product title: '+ await producttitle.innerText())
    
    await producttitle.scrollIntoViewIfNeeded()

    await page.waitForTimeout(5000);

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    producttitle.click()    
]);

await newPage.waitForLoadState('domcontentloaded');

await newPage.locator('add-to-cart-button').nth(1).click()

await newPage.reload();

const cartCount = await newPage.locator('#nav-cart-count').textContent();

await expect(cartCount).toBe('1');

console.log('Cart count after adding product: ' + cartCount);

})