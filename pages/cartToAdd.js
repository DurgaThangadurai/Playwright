export class cartToAdd {

constructor(page,context)
{
    this.page = page;

    this.context=context;
}


async addingProduct(product)
{
    const [newPage] = await Promise.all([
    this.context.waitForEvent('page'),
    product.locator('h2').click()
]);

    await newPage.waitForLoadState('domcontentloaded');

    await newPage.getByRole('button', { name: 'Add to cart' }).first().click();

    const count = await newPage.locator('#nav-cart-count').textContent();
 
    return count

}



}