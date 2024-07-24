
(async () => {
    const { spawn } = require("child_process");

    const chrome = spawn(
        `"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"`,
        ["--remote-debugging-port=9222"],
        { shell: true }
    )

    await new Promise((r) => setTimeout(r, 10_000));

    const browser = await chromium.connectOverDCP("http://localhost:9222");
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[0];

    await page.goto("https://app.propago.com.ar/")

    await new Promise((r) => setTimeout(r, 10_000));

    page.close();
})();

