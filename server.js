const {Builder, By, until} = require('selenium-webdriver');

// FOR LOCAL OS X
// let userDataDir = '/Users/eprokop/spring2019/cs244/cs244-webrtc-client/user-data-dir';
// let downloadDir = '/Users/eprokop/spring2019/cs244/cs244-webrtc-client/downloads';

// FOR REMOTE UBUNTU:
let userDataDir = '/home/eprokop/cs244-webrtc-client-driver/user-data-dir';
let downloadDir = '/home/eprokop/cs244-webrtc-client-driver/downloads';
let signalServer = 'http://35.211.152.60';
let TIMEOUT_MS = 40000;

let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');
console.log(chromedriver.path);

let o = new chrome.Options();

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
o.addArguments('--disable-web-security');
o.addArguments('--safebrowsing-disable-download-protection');
o.addArguments('--remote-debugging-port=9222');
o.addArguments('--user-data-dir=' + userDataDir);
o.addArguments('--reduce-security-for-testing');
o.addArguments('--allow-http-screen-capture');
o.addArguments('--unsafely-treat-insecure-origin-as-secure=' + signalServer);
o.setUserPreferences({
    'download.default_directory': downloadDir,
    'Page.setDownloadBehavior': {
        'behavior': 'allow',
        'downloadPath': downloadDir,
    },
    'download.prompt_for_download': 'false',
});

// Don't need these if running with Xvfb
// o.addArguments('--headless');
// o.addArguments('--disable-gpu');

(async function example() {
    let driver = await new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    async function quit() {
        await driver.quit();
    }

    try {
        await driver.get(signalServer + ':8080');
    } finally {
        setTimeout(quit, TIMEOUT_MS);
    }
})();
