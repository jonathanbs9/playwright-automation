import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly maybeLaterButton: Locator;
    readonly subscribeButton: Locator;
    readonly hiddeButton: Locator;
    readonly overallBalanceDiv: Locator;
    readonly detailBanaceDiv: Locator;
    readonly gotoMyWalletsButton: Locator;
    readonly cvuSpan: Locator;
    readonly moneyIncomeSpan: Locator;
    readonly moneyOutcomeSpan: Locator;

    constructor(page: Page) {
        this.page = page;
        this.maybeLaterButton = page.getByRole('button', { name: 'Tal vez luego' })
        this.subscribeButton = page.getByRole('button', { name: 'Suscribir' })
        this.hiddeButton = page.getByRole('button', { name: 'Ocultar' })
        this.overallBalanceDiv = page.locator('div.overall-balance')
        this.detailBanaceDiv = page.getByRole('button', { name: 'Ver detalles del saldo' })
        this.gotoMyWalletsButton = page.getByRole('button', { name: 'Ir a Mis Carteras' })
        this.cvuSpan = page.locator("//span[contains(text(),'CVU/CBUs')]")
        this.moneyIncomeSpan = page.locator("span.MuiFab-label").first();
    }

    async navigate() {
        await this.page.goto('https://app.propago.com.ar/ingresar');
    }

    async email(email: string) {
        //await this.inputEmail.fill(email)
    }

    async password(password: string) {
        //await this.inputPass.fill(password)
    }

    async clickEnter() {
        //await this.buttonEnter.click()
    }

    async login(email: string, password: string) {
        await this.email(email);
        await this.password(password);
        await this.clickEnter();
    }

    async getLoginErrorMessage() {
        //const errorMessageLocator = this.loginErrorMessageText
        //await errorMessageLocator.waitFor({ state: 'visible' });
        //return await errorMessageLocator.innerText();

        //await this.loginErrorMessageText.waitFor({ state: 'visible' })
        //return await this.loginErrorMessageText.innerText();    
    }

    async getEmailValidationMessage() {
        const errorMessageLocator = this.page.locator('//span[contains(text(),\'Requerido\')]');
        await errorMessageLocator.waitFor({ state: 'visible' })
        return await errorMessageLocator.innerText();
    }

    async getPasswordValidationMessage() {
        const errorMessageLocator = this.page.locator('span[title=\'8 caracteres como mínimo\']')
        await errorMessageLocator.waitFor({ state: 'visible' })
        return await errorMessageLocator.innerText();
    }

}