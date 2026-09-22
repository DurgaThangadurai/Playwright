
export class LoginPage {

constructor(page)
{

this.page = page;
this.username =  page.locator("#username");
this.password =  page.locator("#password");
this.login=  page.locator(".btn");

}

async loginAction(username, password)
{
  await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
    

}
}
