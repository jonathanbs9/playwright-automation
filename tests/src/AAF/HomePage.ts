import { Locator, Page, selectors } from '@playwright/test';

export class HomePage {
    private page: Page;
    readonly registrateLink: Locator;
    readonly loginLink: Locator;
    readonly verGratisLink: Locator;

    constructor(page: Page) {
        this.page = page;

        //this.registrateLink = page.locator("//a[contains(text(),'REGISTRATE')]");
        //this.registrateLink = page.locator("a.aaf_button").first();
        this.registrateLink = page.locator('a', { hasText: 'REGISTRATE' })


        //this.loginLink = this.page.getByRole('link', { name: 'INICIAR SESIÓN' });
        //this.loginLink = this.page.locator("//a[contains(text(),'INICIAR')]")
        this.loginLink = this.page.locator("a.aaf_button").nth(1)
        //this.loginLink = page.locator("div.root-workstation:nth-child(4) div.container:nth-child(3) div.aaf_app_landing div.aaf_app_landing-relative div.aaf_app_landing-center div.aaf_grid:nth-child(4) div.aaf_row div.aaf_column.aaf_app_landing-buttons-up.aaf_app_landing-content-center.aaf_column-12 > a.aaf_button.aaf_button-purple.focusable.aaf_app_landing-button-login.button-container")
        //this.verGratisLink = page.getByRole("link", { name: "VER GRATIS" });
        this.verGratisLink = page.locator("a.aaf_button").nth(2)
    }


    async navigate() {
        await this.page.goto("https://aaf-cvideo-tv.clarovideo.net/landing");
    }

    async clickRegistrate() {
        //await this.page.waitForSelector("div.aaf_column-12", { state: 'visible' });
        await this.registrateLink.click();
    }

    async clickLogin() {
        //await this.page.waitForSelector("a.aaf_column-12", { state: 'visible' });
        await this.loginLink.click();
    }

    async clickVerGratis() {
        await this.verGratisLink.click();
    }
}