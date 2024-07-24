import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import assert from 'assert';

class LoginTest {
    private loginPage: LoginPage;
    private homePage: HomePage;

    constructor(loginPage: LoginPage, homePage: HomePage) {
        this.loginPage = loginPage;
        this.homePage = homePage;
    }

    async loginSuccessfull(email: string, password: string) {
        await this.loginPage.navigate();
        await this.loginPage.login(email, password);
        const isLoggedIn = await this.homePage.isLoggedIn();

        assert.strictEqual(isLoggedIn, true, 'Logged in NOT successfull');
        console.log("Inicio de sesión Exitoso!")
    }
}

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        const loginTest = new LoginTest(loginPage, homePage);
        await loginTest.loginSuccessfull('amcopruebas.aut.arply+hbo_110@gmail.com', 'Player123');
    } catch (error) {
        console.error("Error while exeuting test", error);
    } finally {
        await browser.close();
    }
})();