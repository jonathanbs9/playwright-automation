import { test, expect } from '@playwright/test'
import { HomePage } from '../../AAF/HomePage'
import { LoginPage } from '../../AAF/LoginPage';

test('AAF Simple Test example ', async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
    homePage.clickRegistrate();
    //homePage.clickLogin();
    //homePage.clickVerGratis();
    //const loginPage = new LoginPage(page);
    const loginPage = new LoginPage(page);
    loginPage.pressKeys("amcopruebas.aut.arply+hbo_120@gmail.com");
    //page.pause();
})