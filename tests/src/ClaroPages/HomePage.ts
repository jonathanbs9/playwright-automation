import { chromium, Locator, Page } from '@playwright/test';

export class HomePage {
    private page: Page;
    readonly divInicio: Locator;
    readonly inputSearch: Locator;
    readonly primerElementoBusqueda: Locator;
    readonly navBarText: Locator;
    readonly footerContact: Locator;


    constructor(page: Page) {
        this.page = page;
        this.divInicio = page.locator("//div[contains(text(),'Inicio')]")
        this.inputSearch = page.locator("input[placeholder='Buscar']");
        this.primerElementoBusqueda = page.locator("div.c-s-result__media-overlay");
        this.navBarText = page.locator("div.claro-navitem_text");
        this.footerContact = page.locator("p.visible-lg")
    }

    async searchContent(content: string) {
        await this.inputSearch.fill(content)
        await this.inputSearch.press("Enter")
    }
    async clickPrimerElementoBusqueda() {
        await this.primerElementoBusqueda.click();
    }

    async getDivInicioText() {
        return await this.divInicio.innerText();
    }

    async isLoggedIn() {
        return this.page.url() === "https://www.clarovideo.com/argentina/homeuser";
    }

    async getNavBarText() {
        return await this.navBarText.allInnerTexts();
    }

    async getFooterContactText() {
        return await this.footerContact.innerText();
    }

    async getURL() {
        return await this.page.url();
    }

}