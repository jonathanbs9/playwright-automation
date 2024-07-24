import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private page: Page;
    private readonly buttonRegistrar: Locator;
    private readonly buttonIniciarSesion: Locator;
    private readonly buttonVerGratis: Locator;
    private readonly inputEmail: Locator;
    private readonly buttonNextEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonNextPassword: Locator;
    private readonly textEmailErrorMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.buttonRegistrar = page.locator("button.landingRegisterBtn")
        this.buttonIniciarSesion = page.getByRole('button', { name: 'INICIAR SESIÓN' })
        this.buttonVerGratis = page.getByRole('button', { name: 'VER GRATIS' })
        this.inputEmail = page.locator("#emailLogin")
        this.buttonNextEmail = page.locator("#submitEmail")

        this.inputPassword = page.locator("#password")
        this.buttonNextPassword = page.locator("#submitPassword")

        this.textEmailErrorMessage = page.locator('//div[contains(@class, \'_2Mos8 _F_wpe _1GWlq\')]')

    }

    async navigate() {
        await this.page.goto('https://www.clarovideo.com/argentina/landing');
        await this.buttonIniciarSesion.click();
    }

    async inputEmailAndClick(email: string) {
        await this.inputEmail.fill(email)
        await this.buttonNextEmail.click()
    }

    async inputPasswordAndClick(password: string) {
        await this.inputPassword.fill(password)
        await this.buttonNextPassword.click()
    }

    async login(email: string, password: string) {
        await this.inputEmailAndClick(email);
        await this.inputPasswordAndClick(password)
    }

    async getEmailMessage() {
        return await this.textEmailErrorMessage.innerText();
    }

    async clickVerGratis() {
        await this.buttonVerGratis.click();
    }
}