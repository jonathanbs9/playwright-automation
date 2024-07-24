import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.clarovideo.com/');
  await page.goto('https://www.clarovideo.com/argentina/landing');
  await page.getByRole('button', { name: 'INICIAR SESIÓN' }).click();
  await page.getByPlaceholder('Correo').fill('amcopruebas.aut.arply+amco_100.@gmail.com');
  await page.getByRole('button', { name: 'SIGUIENTE' }).click();
  await page.locator('#password').fill('Player123');
  await page.getByRole('button', { name: 'SIGUIENTE' }).click();
});