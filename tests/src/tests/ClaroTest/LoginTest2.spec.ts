import { test, expect } from '@playwright/test';
import { LoginPage } from '../../ClaroPages/LoginPage';
import { HomePage } from '../../ClaroPages/HomePage';
import { SearchResultsPage } from '../../ClaroPages/SearchResultsPage';
import { ContentPage } from '../../ClaroPages/ContentPage';
import { ReproduccionPage } from '../../ClaroPages/ReproduccionPage';


test.beforeEach(async ({ page }) => {
    console.log("BEFORE EACH")
})

test("TC00001 - Should Login Successfull", async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    await login.navigate();
    await login.login("amcopruebas.aut.arply+hbo_110@gmail.com", "Player123");

    const inicioText = await home.getDivInicioText();

    expect(home.isLoggedIn()).toBeTruthy;
    expect(inicioText).toBe("Inicio");
})

test("TC00002 - Should Not Login - Invalid email should response message 'Ingresá un correo electrónico válido.'", async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.inputEmailAndClick("invalidEmailCaranalga");
    const actualMessage = await login.getEmailMessage();

    expect(actualMessage).toEqual("Ingresá un correo electrónico válido.");
})

test("TC00003 - Should Not Login - Empty email should response message 'Debés completar este campo' ", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.inputEmailAndClick("");
    const actualMessage = await login.getEmailMessage();

    expect(actualMessage).toEqual("Debés completar este campo");
})

test("TC00004 - Buscar 'araña' y visualizar reproduccion", async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);
    const content = new ContentPage(page);
    const reproduccion = new ReproduccionPage(page);

    await login.navigate();
    await login.login("amcopruebas.aut.arply+hbo_100@gmail.com", "Player123");
    await home.searchContent("araña");
    await results.clickSuggestedResult();
    await content.clickPrimerButton();
    const actualURL = await reproduccion.getURL();

    expect(actualURL).toContain('watch')
})

test("TC00005 - Debe ingresar a VER GRATIS", async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    await login.navigate();
    await login.clickVerGratis();
    const navBarListText = await home.getNavBarText()
    const homeURL = await home.getURL()
    const footerContactTxt = await home.getFooterContactText();

    expect(navBarListText).toContain('Inicio')
    expect(navBarListText).toContain('Películas')
    expect(navBarListText).toContain('Series')
    expect(navBarListText).toContain('Claro TV')
    expect(navBarListText).toContain('Premium')
    expect(homeURL).toContain('/homeuser')
    expect(footerContactTxt).toBe("Contactanos llamando sin costo al *611 desde tu Claro o al 0800 123 0611")
})



/*test.afterEach(async ({ page }) => {
    await page.close();
});*/