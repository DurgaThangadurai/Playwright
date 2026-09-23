import {test, expect} from '@playwright/test';

import { searchPage } from '../pages/searchPage.js';

import { cartToAdd } from '../pages/cartToAdd.js';

test('Add to cart Scenario', async ({ page, context }) => {


    //Object creation

   const Prodsearch= new searchPage(page);

   const add = new cartToAdd(page,context)

   //Values capturing

   const url= 'https://www.amazon.in//'

   const searchtext= 'laptop'

   //Invoking the function for search products

   await Prodsearch.amazonlaunch(url);

   const {count, productslist} = await Prodsearch.searchproduct(searchtext)

    console.log('Total items found: ' + count);

    await page.mouse.wheel(0, 1000);

    await page.waitForTimeout(5000);

    const product = await productslist.nth(0)

    //Invoking the function for product add to cart 
  
    const cartCount = await add.addingProduct(product)

    await expect(cartCount).toBe('1');

    console.log('Cart count after adding product: ' + cartCount);

})