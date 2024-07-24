import { chromium, Locator, Page } from '@playwright/test';


export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //amcopruebas.aut.arply+hbo_120@gmail.com
    async pressKeys(input: string) {
        for (const char of input) {
            await this.page.getByRole("link", { name: char }).click()
        }
    }

}