import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../klioPages/LoginPage';

const errorMessages = {
    incorrectUserPass: "El usuario o la contraseña son incorrectos",
    emailRequired: "Requerido",
    minCharacters: "8 caracteres como mínimo"
}

/*test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
        width: 390,
        height: 844,
    });
});*/


test("TC00001 - Alternative Path - Should Not Login Successfull - invalid email", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login("amcopruebas.aut.arply+hbo_110@gmail.com", "Player123");
    const errorMessage = await login.getLoginErrorMessage();

    console.log(login.getLoginErrorMessage());
    console.log(errorMessages.incorrectUserPass)

    //await expect(login.getLoginErrorMessage()).toStrictEqual(errorMessages.incorrectUserPass)
    expect(errorMessage).toBe(errorMessages.incorrectUserPass)
})


test("TC00002 - Alternative Path - Should Not Login Successfull - Empty email", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login("", "Player123");
    const errorMessage = await login.getEmailValidationMessage();

    expect(errorMessage).toBe(errorMessages.emailRequired)
})

test("TC0003 - Alternative Path - Should not Login Successfull - Empty email and empty password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    login.clickEnter();

    const errorEmailValidationMessage = await login.getEmailValidationMessage();
    const errorPassValidationMessage = await login.getPasswordValidationMessage();

    expect(errorEmailValidationMessage).toBe(errorMessages.emailRequired)
    expect(errorPassValidationMessage).toBe(errorMessages.minCharacters)
})

test("TC00004 - Happy Path - Should Login Successfull", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login("jonathan.brull.schroeder@gmail.com", "@Rivercapo9");
    //const errorMessage = await login.getEmailValidationMessage();

    //expect(errorMessage).toBe(errorMessages.emailRequired)
})

/*test.afterEach(async ({ page }) => {
    await page.close();
});*/