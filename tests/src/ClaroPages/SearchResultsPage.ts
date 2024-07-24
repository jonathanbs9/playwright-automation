import { Locator, Page } from '@playwright/test';

export class SearchResultsPage {
    private page: Page;
    readonly suggestedResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.suggestedResult = this.page.locator("img.suggest-slide_image")
    }

    async clickSuggestedResult() {
        await this.suggestedResult.waitFor({ state: 'visible' })
        await this.suggestedResult.click()
    }
}