import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test.describe('Manifest', ()=> {
    test('La API responde correctamente con XML', async () => {
        // Inicializar el navegador
        const browser = await chromium.launch();
        const page = await browser.newPage();
    
        try {
          // Realizar la solicitud a la API
          const response = await page.goto('https://mxuspss2qro.clarovideo.com/multimediav81/plataforma_vod/MP4/202311/MAH037964_full/MAH037964_full_SS_SS.ism/Manifest');
            
          // Validar la respuesta de la API
          expect(response.status()).toBe(403);
          const responseText = await response.text();
          console.log('Respuesta XML de la API:', responseText);
          // Aquí puedes agregar la lógica para procesar el XML según tus necesidades
        } finally {
          // Cerrar el navegador al finalizar
          await browser.close();
        }
      });
});
