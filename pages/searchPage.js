export class searchPage {

constructor(page)
{
    this.page = page;
    this.searchtextbox=page.locator('#twotabsearchtextbox')
    this.searchbutton=page.locator('#nav-search-submit-button')
    this.searchresults= page.locator("div[data-component-type='s-search-result']");

}

async amazonlaunch(url)
{
    await this.page.goto(url)
}


async searchproduct(searchtext)
{
    await this.searchtextbox.fill(searchtext);
    
    await this.searchbutton.click()
    
    await this.page.waitForURL('**/s**');
    
    const productslist= this.searchresults

    const count = await this.searchresults.count();
    
    return { count, productslist} ;

}











}
