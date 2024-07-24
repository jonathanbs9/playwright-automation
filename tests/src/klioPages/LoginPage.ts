import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly inputEmail: Locator;
    readonly inputPass: Locator;
    readonly buttonEnter: Locator;
    readonly loginErrorMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.locator('//input[@type="email"]');
        this.inputPass = page.locator('//input[@type=\'password\']');
        this.buttonEnter = page.locator('button.MuiButton-contained');
        this.loginErrorMessageText = page.locator('span.form-error');
    }

    async navigate() {
        try {
            await this.page.goto('https://app.propago.com.ar/ingresar');
        } catch (error) {
            console.error('Navigation to login page failed', error);
        }
    }

    async email(email: string) {
        await this.inputEmail.fill(email);
    }

    async password(password: string) {
        await this.inputPass.fill(password);
    }

    async clickEnter() {
        await this.buttonEnter.click();
    }

    async login(email: string, password: string) {
        await this.email(email);
        await this.password(password);
        await this.clickEnter();
    }

    async getLoginErrorMessage() {
        const errorMessageLocator = this.loginErrorMessageText
        await errorMessageLocator.waitFor({ state: 'visible' });
        return await errorMessageLocator.innerText();
        //await this.loginErrorMessageText.waitFor({ state: 'visible' })
        //return await this.loginErrorMessageText.innerText();    
    }

    async getEmailValidationMessage() {
        const errorMessageLocator = this.page.locator('//span[contains(text(),\'Requerido\')]');
        await errorMessageLocator.waitFor({ state: 'visible' });
        return await errorMessageLocator.innerText();
    }

    async getPasswordValidationMessage() {
        const errorMessageLocator = this.page.locator('span[title=\'8 caracteres como mínimo\']');
        await errorMessageLocator.waitFor({ state: 'visible' });
        return await errorMessageLocator.innerText();
    }

}