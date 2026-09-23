import {test, expect} from '@playwright/test';

test('amazon add to cart linear', async ({ page, context }) => {

   await page.goto('https://www.amazon.in//');

    await page.locator('#twotabsearchtextbox').fill('laptop');

    await page.locator('#nav-search-submit-button').click(); 

   await page.waitForURL('**/s**')     

  const item = page.locator("div[data-component-type='s-search-result']");

  const count = await item.count();

    console.log('Total items found: ' + count);

    await page.mouse.wheel(0, 1000);

    await page.waitForTimeout(5000);
    
    const product = await item.nth(0)

    await page.waitForTimeout(5000);

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    product.locator('h2').click()
]);

await newPage.waitForLoadState('domcontentloaded');

await newPage.getByRole('button', { name: 'Add to cart' }).first().click();

await page.reload();

const cartCount = await newPage.locator('#nav-cart-count').textContent();

await expect(cartCount).toBe('1');

console.log('Cart count after adding product: ' + cartCount);

})