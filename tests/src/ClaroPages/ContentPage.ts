import { Locator, Page } from '@playwright/test';

export class ContentPage {
    private page: Page;
    readonly reproducirText: Locator;
    readonly reproducirButtton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.reproducirText = this.page.locator("//p[contains(text(),'Reproducir')]");
        this.reproducirButtton = this.page.locator("div.play-button");
    }

    async clickPrimerButton() {
        await this.reproducirButtton.waitFor({ state: 'visible' })
        await this.reproducirButtton.first().click()
    }

    async clickReproducir() {
        await this.reproducirText.waitFor({ state: 'visible' })
        await this.reproducirText.click()
    }
}