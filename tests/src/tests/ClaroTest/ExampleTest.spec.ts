import { test, expect } from '@playwright/test'

test('Test Web Table ', async ({ page }) => {
    await page.goto("https://cosmocode.io/automation-practice-webtable/")

    const tableContainer = await page.locator("xpath=//table[@id='countries']")

    const rows = await tableContainer.locator("xpath=.//tr").all()

    console.log(rows.length)

    /*for (let row of rows) {
        console.info(await row.innerText())
    }*/

    const row7 = rows.at(7)
    const countryName = await row7?.locator('xpath=.//td[2]').innerText()
    const countryCapital = await row7?.locator('xpath=.//td[3]').innerText()
    const countryCurrency = await row7?.locator('xpath=.//td[4]').innerText()
    const countryPrimaryLanguage = await row7?.locator('xpath=.//td[5]').innerText()

    console.log(countryName + " " + countryCapital + " " + countryCurrency + " " + countryPrimaryLanguage)

    page.screenshot({ path: 'screenshots/country-full_table.png', fullPage: true })
    page.screenshot({ path: 'screenshots/country-table.png', fullPage: false })

    const countries: Country[] = []

    for (let row of rows) {
        let country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText(),
        }

        countries.push(country)
    }

    /*for (let c of countries) {
        console.info(c)
    }*/

    const countriesSpeakSpanish = countries.filter(c => c.primaryLanguage.includes('Spanish'))
    console.info(countriesSpeakSpanish)
})

test("Interceptor Example", async ({ page }) => {
    await page.route(
        //"**/*.{png,jpg,jpeg,svg,css}",
        "https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `
                {
                    "books": [
                        {
                        "isbn": "9781593277574",
                        "title": "Playwright Automation Testing",
                        "subTitle": "The Definitive Guide for JavaScript Developers",
                        "author": "Nicholas C. Zakas",
                        "publish_date": "2016-09-03T00:00:00.000Z",
                        "publisher": "No Starch Press",
                        "pages": 232,
                        "description": "Playwright represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
                        "website": "https://leanpub.com/understandinges6/read"
                        }
                    ]
                }
            `
            })
        }
    );

    page.goto("https://demoqa.com/books")
    page.pause()
    await page.screenshot({ path: 'books.png', fullPage: true })
})

interface Country {
    name: String,
    capital: String,
    currency: String,
    primaryLanguage: String
}