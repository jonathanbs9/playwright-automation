import { Locator, Page } from '@playwright/test';

export class ReproduccionPage {
    private page: Page;
    readonly reproducirText: Locator;
    readonly titleText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.reproducirText = this.page.locator("//p[contains(text(),'Reproducir')]");
        this.titleText = this.page.locator("p[class='movie']");
    }

    async waitTitleText() {
        await this.titleText.waitFor({ state: 'visible' })
    }

    async getURL() {
        await this.waitTitleText()
        return await this.page.url();
    }


}

